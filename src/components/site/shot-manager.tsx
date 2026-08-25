"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Check,
  Eye,
  FileImage,
  ImagePlus,
  RotateCcw,
  Trash2,
  X,
} from "lucide-react";
import { SHOTS, clearAllShots, deleteShot, listCustomShots, setShot, subscribe } from "@/lib/shots-store";
import { useShotSrc } from "@/components/site/use-shot-src";
import { useToast } from "@/hooks/use-toast";

function ShotRow({
  shot,
  onPreview,
}: {
  shot: (typeof SHOTS)[number];
  onPreview: (id: string) => void;
}) {
  const src = useShotSrc(shot.id, shot.fallback);
  const [custom, setCustom] = useState(false);
  const [busy, setBusy] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    listCustomShots().then((ids) => setCustom(ids.includes(shot.id)));
    const unsub = subscribe(() =>
      listCustomShots().then((ids) => setCustom(ids.includes(shot.id)))
    );
    return unsub;
  }, [shot.id]);

  const onPick = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Arquivo não suportado",
        description: "Use PNG, JPG ou WebP.",
        variant: "destructive",
      });
      return;
    }
    setBusy(true);
    try {
      await setShot(shot.id, file);
      setCustom(true);
      toast({
        title: "Print atualizada",
        description: `${shot.label} agora usa ${file.name}.`,
      });
    } finally {
      setBusy(false);
    }
  };

  const onRestore = async () => {
    await deleteShot(shot.id);
    setCustom(false);
    toast({
      title: "Print restaurada",
      description: `${shot.label} voltou para o mockup original.`,
    });
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3 transition-colors hover:border-white/[0.14]">
      <button
        type="button"
        onClick={() => onPreview(shot.id)}
        className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-[#0b0713]"
        aria-label={`Pré-visualizar ${shot.label}`}
      >
        <img src={src} alt={shot.label} className="h-full w-full object-cover" />
        <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity hover:opacity-100">
          <Eye className="h-4 w-4 text-white" aria-hidden="true" />
        </span>
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-sm font-semibold text-white">
            {shot.label}
          </p>
          {custom && (
            <span className="rounded-md border border-emerald-400/25 bg-emerald-400/[0.1] px-1.5 py-0.5 text-[10px] font-medium text-emerald-300">
              personalizada
            </span>
          )}
        </div>
        <p className="truncate font-mono text-[11px] text-zinc-500">
          {shot.fallback}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <label
          className={`flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#b57bee]/30 bg-[#b57bee]/[0.1] px-3 py-1.5 text-xs font-medium text-[#c99bf5] transition-colors hover:bg-[#b57bee]/[0.18] ${
            busy ? "opacity-60" : ""
          }`}
        >
          <ImagePlus className="h-3.5 w-3.5" aria-hidden="true" />
          {custom ? "Trocar" : "Enviar"}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            disabled={busy}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onPick(f);
              e.target.value = "";
            }}
          />
        </label>
        {custom && (
          <button
            type="button"
            onClick={onRestore}
            className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:text-white"
            aria-label={`Restaurar ${shot.label}`}
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}

function PreviewModal({
  shotId,
  onClose,
}: {
  shotId: string | null;
  onClose: () => void;
}) {
  const shot = SHOTS.find((s) => s.id === shotId) ?? null;
  const src = useShotSrc(shotId ?? "", shot?.fallback ?? "");
  return (
    <AnimatePresence>
      {shot && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-white/15 bg-[#0b0713] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-3.5">
              <div className="flex items-center gap-2">
                <FileImage className="h-4 w-4 text-[#c99bf5]" aria-hidden="true" />
                <span className="text-sm font-semibold text-white">
                  {shot.label}
                </span>
              </div>
              <button
                onClick={onClose}
                className="rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Fechar pré-visualização"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <img
              src={src}
              alt={shot.label}
              className="block max-h-[80vh] w-full object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ShotManager() {
  const [open, setOpen] = useState(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).get("prints") === "1";
  });
  const [previewId, setPreviewId] = useState<string | null>(null);
  const { toast } = useToast();

  // Open via Ctrl+Shift+P
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "p") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onClearAll = async () => {
    await clearAllShots();
    toast({
      title: "Tudo restaurado",
      description: "Todas as prints voltaram para o mockup original.",
    });
  };

  return (
    <>
      {/* Floating entry button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-white/10 bg-[#0a0712]/85 px-4 py-2.5 text-xs font-medium text-zinc-300 shadow-lg backdrop-blur-xl transition-all hover:border-[#b57bee]/40 hover:text-white"
        aria-label="Gerenciar prints do app"
      >
        <ImagePlus
          className="h-4 w-4 text-[#c99bf5]"
          aria-hidden="true"
        />
        Prints do app
        <span className="hidden font-mono text-[10px] text-zinc-500 sm:inline">
          ⌘⇧P
        </span>
      </button>

      {/* Manager modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.96, y: 12, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 12, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/12 bg-[#0d0916] shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-white/[0.07] p-6">
                <div>
                  <h2 className="flex items-center gap-2 text-lg font-bold text-white">
                    <ImagePlus
                      className="h-5 w-5 text-[#c99bf5]"
                      aria-hidden="true"
                    />
                    Prints do app
                  </h2>
                  <p className="mt-1.5 text-sm text-zinc-400">
                    Arraste uma imagem sobre cada print do site, ou use os
                    botões para enviar. As imagens ficam salvas só neste
                    navegador.
                  </p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="shrink-0 rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Fechar"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              {/* Body: shot rows */}
              <div className="flex-1 space-y-2.5 overflow-y-auto p-6">
                {SHOTS.map((shot) => (
                  <ShotRow
                    key={shot.id}
                    shot={shot}
                    onPreview={setPreviewId}
                  />
                ))}
              </div>

              {/* Footer */}
              <div className="flex flex-col gap-3 border-t border-white/[0.07] bg-black/30 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <Check className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                  Persiste neste navegador — sobrevive a reloads.
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={onClearAll}
                    className="flex items-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/[0.08] px-3 py-2 text-xs font-medium text-red-300 transition-colors hover:bg-red-500/[0.15]"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Restaurar todas
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-lg bg-gradient-to-r from-[#8b31e8] to-[#6d28d9] px-4 py-2 text-xs font-semibold text-white"
                  >
                    Concluir
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <PreviewModal shotId={previewId} onClose={() => setPreviewId(null)} />
    </>
  );
}
