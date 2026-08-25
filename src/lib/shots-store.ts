"use client";

/**
 * shots-store.ts
 *
 * Persiste prints personalizadas do app no IndexedDB do navegador.
 * Cada print tem um id ("demo", "main", etc.) e um arquivo de fallback
 * em /public/shots/. Se existir um blob salvo no IDB, ele é usado no
 * lugar do fallback. Não precisa de backend.
 */

type Listener = () => void;
const listeners = new Set<Listener>();

const DB_NAME = "halla-shots";
const STORE = "shots";
const cache = new Map<string, string>(); // id -> object URL
const loading = new Set<string>();

function emit() {
  listeners.forEach((l) => l());
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) {
        req.result.createObjectStore(STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function getShotBlob(id: string): Promise<Blob | null> {
  try {
    const db = await openDB();
    return await new Promise((resolve) => {
      const tx = db.transaction(STORE, "readonly");
      const r = tx.objectStore(STORE).get(id);
      r.onsuccess = () => resolve((r.result as Blob | undefined) ?? null);
      r.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

async function setShotBlob(id: string, blob: Blob): Promise<void> {
  const db = await openDB();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(blob, id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function deleteShotBlob(id: string): Promise<void> {
  const db = await openDB();
  await new Promise<void>((resolve) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => resolve();
  });
}

async function clearShotsDB(): Promise<void> {
  const db = await openDB();
  await new Promise<void>((resolve) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).clear();
    tx.oncomplete = () => resolve();
    tx.onerror = () => resolve();
  });
}

/* ---------- pub/sub store ---------- */

export function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getShot(id: string): string | undefined {
  return cache.get(id);
}

export async function ensureShotLoaded(id: string): Promise<void> {
  if (cache.has(id) || loading.has(id)) return;
  loading.add(id);
  try {
    const blob = await getShotBlob(id);
    if (blob) {
      cache.set(id, URL.createObjectURL(blob));
      emit();
    }
  } finally {
    loading.delete(id);
  }
}

export async function listCustomShots(): Promise<string[]> {
  try {
    const db = await openDB();
    return await new Promise<string[]>((resolve) => {
      const tx = db.transaction(STORE, "readonly");
      const r = tx.objectStore(STORE).getAllKeys();
      r.onsuccess = () => resolve((r.result as string[]) ?? []);
      r.onerror = () => resolve([]);
    });
  } catch {
    return [];
  }
}

export async function setShot(id: string, file: Blob): Promise<void> {
  await setShotBlob(id, file);
  const old = cache.get(id);
  if (old) URL.revokeObjectURL(old);
  cache.set(id, URL.createObjectURL(file));
  emit();
}

export async function deleteShot(id: string): Promise<void> {
  await deleteShotBlob(id);
  const old = cache.get(id);
  if (old) URL.revokeObjectURL(old);
  cache.delete(id);
  emit();
}

export async function clearAllShots(): Promise<void> {
  await clearShotsDB();
  cache.forEach((url) => URL.revokeObjectURL(url));
  cache.clear();
  emit();
}

/** Canonical list of app screenshots shown on the site. */
export const SHOTS = [
  {
    id: "demo",
    label: "Servidor conectado",
    fallback: "/shots/demo.png",
    caption:
      "Tema escuro atual: toolbar com grupos arredondados, árvore de canais com indicador de fala, painel do servidor com banner roxo e chat em abas com bolhas.",
  },
  {
    id: "channel",
    label: "Criar canal",
    fallback: "/shots/channel.png",
    caption:
      "Editor de canal: nome, tópico, senha, tipo, codec, qualidade, bitrate e limite de clientes.",
  },
  {
    id: "connect",
    label: "Conectar",
    fallback: "/shots/connect.png",
    caption:
      "Diálogo de conexão: endereço, porta, apelido, senha e identidade Ed25519 verificada — com pinagem TOFU do certificado.",
  },
  {
    id: "options",
    label: "Opções",
    fallback: "/shots/options.png",
    caption:
      "Opções com navegação lateral por categoria e tema claro/escuro trocável em tempo real, sem reiniciar.",
  },
  {
    id: "main",
    label: "Boas-vindas",
    fallback: "/shots/main.png",
    caption:
      "Tela inicial do cliente: estado não conectado com atalhos de conexão e gerenciamento de favoritos.",
  },
] as const;

export type ShotId = (typeof SHOTS)[number]["id"];
