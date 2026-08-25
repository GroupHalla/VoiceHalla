"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ensureShotLoaded,
  getShot,
  subscribe,
} from "@/lib/shots-store";

/**
 * Retorna a URL atual da print: o blob salvo no IndexedDB (se houver)
 * ou o fallback em /public/shots/X.png. Re-renderiza automaticamente
 * quando o usuário troca a print.
 */
export function useShotSrc(id: string, fallback: string): string {
  const [src, setSrc] = useState<string>(() => getShot(id) ?? fallback);

  useEffect(() => {
    let mounted = true;
    ensureShotLoaded(id).then(() => {
      if (!mounted) return;
      const next = getShot(id);
      if (next) setSrc(next);
    });
    const unsub = subscribe(() => {
      const next = getShot(id);
      setSrc(next ?? fallback);
    });
    return () => {
      mounted = false;
      unsub();
    };
  }, [id, fallback]);

  return src;
}

/**
 * Hook utilitário para detectar quando o usuário arrasta arquivos sobre
 * uma zona — retorna os handlers de drag e drop.
 */
export function useFileDrop(onFile: (file: File) => void) {
  const [isOver, setIsOver] = useState(false);
  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOver(true);
  }, []);
  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOver(false);
  }, []);
  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) onFile(file);
    },
    [onFile]
  );
  return { isOver, onDragOver, onDragLeave, onDrop };
}
