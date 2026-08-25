"use client";

import { useRef, type ReactNode } from "react";
import { ImageIcon, Upload } from "lucide-react";
import { useFileDrop, useShotSrc } from "@/components/site/use-shot-src";
import { setShot } from "@/lib/shots-store";

interface ShotDropProps {
  id: string;
  fallback: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  imgClassName?: string;
  rounded?: string;
  children?: ReactNode;
}

/**
 * Imagem que aceita arrastar-e-soltar arquivos para substituir a print
 * exibida. Mostra overlay com instrução durante o drag-over.
 */
export function ShotDrop({
  id,
  fallback,
  alt,
  width,
  height,
  className = "",
  imgClassName = "",
  rounded = "rounded-2xl",
  children,
}: ShotDropProps) {
  const src = useShotSrc(id, fallback);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    await setShot(id, file);
  };

  const { isOver, onDragOver, onDragLeave, onDrop } = useFileDrop(handleFile);

  return (
    <div
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={`group/shot relative ${className}`}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`block w-full ${imgClassName}`}
        draggable={false}
      />

      {/* Hover hint */}
      <div
        className={`pointer-events-none absolute inset-0 flex items-end justify-center gap-2 bg-gradient-to-t from-black/60 via-transparent to-transparent p-3 text-xs font-medium text-white opacity-0 transition-opacity duration-200 ${rounded} group-hover/shot:opacity-100`}
      >
        <Upload className="h-3.5 w-3.5" aria-hidden="true" />
        Arraste uma print do app aqui para trocar
      </div>

      {/* Drag-over overlay */}
      {isOver && (
        <div
          className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-[#b57bee] bg-[#0a0712]/85 text-center backdrop-blur-sm ${rounded}`}
        >
          <ImageIcon
            className="h-7 w-7 text-[#c99bf5]"
            aria-hidden="true"
          />
          <p className="text-sm font-semibold text-white">
            Solte para substituir esta print
          </p>
          <p className="text-[11px] text-zinc-400">
            PNG/JPG/WebP — idealmente 1180×760
          </p>
        </div>
      )}

      {/* Hidden file input (for click fallback) */}
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />

      {children}
    </div>
  );
}
