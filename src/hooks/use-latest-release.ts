"use client";

import { useEffect, useState } from "react";
import { latestRelease, type LatestRelease } from "@/lib/github";

export type UseLatestRelease = {
  release: LatestRelease | null;
  /** true enquanto a primeira consulta (cache ou API) não resolveu */
  loading: boolean;
  /** tag_name, ex.: "v1.1.0" — null enquanto carrega ou se a API falhou */
  tag: string | null;
};

type ReleaseState = {
  release: LatestRelease | null;
  settled: boolean;
};

export function useLatestRelease(repo: string): UseLatestRelease {
  const [state, setState] = useState<ReleaseState>({
    release: null,
    settled: false,
  });

  useEffect(() => {
    let alive = true;
    latestRelease(repo).then((data) => {
      if (!alive) return;
      setState({ release: data, settled: true });
    });
    return () => {
      alive = false;
    };
  }, [repo]);

  return {
    release: state.release,
    loading: !state.settled,
    tag: state.release?.tag ?? null,
  };
}
