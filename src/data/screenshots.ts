import fs from "node:fs";
import path from "node:path";

/**
 * ───────────────────────────────────────────────────────────────
 *  PRINTS DO APP — DESCOBERTA AUTOMÁTICA
 * ───────────────────────────────────────────────────────────────
 *
 *  Como adicionar suas próprias prints:
 *
 *  1. Coloque seus PNG/JPG/WEBP na pasta  public/screenshots/
 *  2. (opcional) Prefixe com um número para fixar a ordem:
 *       01-janela-principal.png   → ordem 1, label "Janela Principal"
 *       02-boas-vindas.png        → ordem 2, label "Boas Vindas"
 *       03-conectar.png           → ordem 3, label "Conectar"
 *     Sem prefixo numérico, ordena alfabeticamente.
 *  3. (opcional) Quer legenda personalizada ou fixar o hero?
 *     Crie  public/screenshots/meta.json  com:
 *
 *       {
 *         "hero": "01-janela-principal.png",
 *         "items": [
 *           { "file": "01-janela-principal.png",
 *             "label": "Janela Principal",
 *             "caption": "Tudo o que você precisa em uma tela." },
 *           ...
 *         ]
 *       }
 *
 *  4. Salve. O dev server recarrega sozinho.
 *     Em produção, reconstrua o site (npm run build).
 *
 *  Não há menu, upload, IndexedDB, ou qualquer UI — apenas a pasta.
 */

const SHOTS_DIR = path.join(process.cwd(), "public", "screenshots");
const SHOTS_URL = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/screenshots`;
const IMG_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);

export type Shot = {
  /** URL pública da imagem, ex: "/screenshots/01-janela-principal.png" */
  src: string;
  /** Nome original do arquivo no disco */
  filename: string;
  /** Rótulo curto exibido na aba/galeria (humanizado do nome do arquivo) */
  label: string;
  /** Legenda exibida sob a imagem na galeria */
  caption: string;
  /** Texto alternativo para acessibilidade */
  alt: string;
  /** Ordem de exibição (prefixo numérico do nome ou Infinity) */
  order: number;
};

type MetaItem = {
  file: string;
  label?: string;
  caption?: string;
  alt?: string;
  order?: number;
};

type Meta = {
  /** Nome do arquivo a ser usado como print do hero (default: o primeiro) */
  hero?: string;
  items?: MetaItem[];
};

/**
 * Transforma "01-janela-principal" → "Janela Principal"
 * Remove prefixo numérico, separa por - ou _, capitaliza cada palavra.
 */
function humanize(name: string): string {
  const stripped = name.replace(/^\d+[-_]?/, "");
  return stripped
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function readMeta(): Meta | null {
  const metaPath = path.join(SHOTS_DIR, "meta.json");
  try {
    if (fs.existsSync(metaPath)) {
      const raw = fs.readFileSync(metaPath, "utf8");
      return JSON.parse(raw) as Meta;
    }
  } catch (e) {
    console.warn("[screenshots] Falha ao ler meta.json:", e);
  }
  return null;
}

/**
 * Lista todas as prints da pasta public/screenshots/ em ordem.
 * Roda no build (server-side). Sempre retorna um array (vazio se a pasta
 * não existir ou estiver vazia) — nunca lança.
 */
export function getScreenshots(): Shot[] {
  let files: string[];
  try {
    files = fs
      .readdirSync(SHOTS_DIR)
      .filter((f) => IMG_EXT.has(path.extname(f).toLowerCase()))
      .filter((f) => !f.startsWith("."));
  } catch {
    return [];
  }

  const meta = readMeta();
  const overrideByFile = new Map(
    (meta?.items ?? []).map((i) => [i.file, i] as const),
  );

  const shots: Shot[] = files.map((file) => {
    const base = path.basename(file, path.extname(file));
    const human = humanize(base);
    const override = overrideByFile.get(file);
    const numMatch = base.match(/^(\d+)/);
    const numericOrder = numMatch ? parseInt(numMatch[1], 10) : Number.MAX_SAFE_INTEGER;
    const order = override?.order ?? numericOrder;
    return {
      src: `${SHOTS_URL}/${file}`,
      filename: file,
      label: override?.label ?? human,
      caption: override?.caption ?? `Tela do app Halla — ${human}.`,
      alt: override?.alt ?? `Captura de tela do Halla: ${human}`,
      order,
    };
  });

  shots.sort(
    (a, b) => a.order - b.order || a.filename.localeCompare(b.filename),
  );
  return shots;
}

/**
 * A print principal do hero. Se meta.hero apontar para um arquivo, usa ela.
 * Caso contrário, usa a primeira da lista ordenada.
 */
export function getHeroShot(): Shot | null {
  const all = getScreenshots();
  if (all.length === 0) return null;
  const meta = readMeta();
  if (meta?.hero) {
    const found = all.find((s) => s.filename === meta.hero);
    if (found) return found;
  }
  return all[0];
}
