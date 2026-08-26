// Última release de um repositório do grupo GroupHalla via API pública do GitHub.
// A api.github.com permite CORS, então funciona direto no navegador, sem backend.
// A resposta é cacheada em localStorage por ~1h para não estourar o limite de
// 60 req/h por IP da API sem token (bem acima do que uma landing page gasta).

const BASE = "https://api.github.com/repos/GroupHalla";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hora

export type ReleaseAsset = {
  name: string;
  browser_download_url: string;
  size?: number;
};

export type LatestRelease = {
  /** tag_name da última release, ex.: "v1.1.0" */
  tag: string;
  assets: ReleaseAsset[];
};

type CacheEntry = {
  at: number;
  data: LatestRelease;
};

/** Evita fetches duplicados do mesmo repo no mesmo tick (ex.: dois componentes). */
const inflight = new Map<string, Promise<LatestRelease | null>>();

export async function latestRelease(
  repo: string,
  force = false
): Promise<LatestRelease | null> {
  if (typeof window === "undefined") return null;

  const cacheKey = `halla:release:${repo}`;
  const now = Date.now();

  if (!force) {
    try {
      const raw = window.localStorage.getItem(cacheKey);
      if (raw) {
        const entry = JSON.parse(raw) as CacheEntry;
        if (entry?.data?.tag && now - entry.at < CACHE_TTL_MS) {
          return entry.data;
        }
      }
    } catch {
      // localStorage indisponível — segue sem cache
    }

    const pending = inflight.get(repo);
    if (pending) return pending;
  }

  const request = (async () => {
    try {
      const res = await fetch(`${BASE}/${repo}/releases/latest`, {
        headers: { Accept: "application/vnd.github+json" },
      });
      if (!res.ok) return null;
      const j = (await res.json()) as {
        tag_name?: string;
        assets?: Array<Partial<ReleaseAsset>>;
      };
      if (!j.tag_name) return null;
      const data: LatestRelease = {
        tag: j.tag_name,
        assets: (j.assets ?? [])
          .filter((a): a is ReleaseAsset => Boolean(a?.name))
          // checksums não são download — ignora os .sha256
          .filter((a) => !a.name.toLowerCase().endsWith(".sha256")),
      };
      try {
        window.localStorage.setItem(
          cacheKey,
          JSON.stringify({ at: now, data } satisfies CacheEntry)
        );
      } catch {
        // modo privado / cota cheia — ignora
      }
      return data;
    } catch {
      return null;
    }
  })();

  inflight.set(repo, request);
  try {
    return await request;
  } finally {
    if (inflight.get(repo) === request) inflight.delete(repo);
  }
}

/** Encontra o asset da release que casa com o filtro de nome. */
export function pickAsset(
  release: LatestRelease | null | undefined,
  match: (name: string) => boolean
): ReleaseAsset | undefined {
  return release?.assets.find((a) => match(a.name));
}
