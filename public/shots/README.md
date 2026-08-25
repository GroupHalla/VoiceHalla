# Prints do Halla — como trocar

Há **três formas** de colocar as prints reais do app no site. Escolha a que
preferir.

---

## 1. Arrastar-e-soltar no próprio site (mais fácil, sem código)

1. Abra o site.
2. **Arraste** um arquivo PNG/JPG/WebP diretamente sobre qualquer print
   visível (no hero ou na galeria de capturas).
3. Solte. A imagem é salva no IndexedDB do navegador e aparece imediatamente.
4. Para restaurar uma print original, use o botão **Prints do app** no
   canto inferior direito (ou `Ctrl+Shift+P`, ou `?prints=1` na URL) e clique
   no ícone de **↻ Restaurar** da print desejada.

As imagens trocadas **sobrevivem a reloads** do navegador, mas vivem só
neste navegador/dispositivo — não são compartilhadas com outros visitantes.

**Dimensão ideal:** 1180×760 px (aspect 47:32).

---

## 2. Substituir os arquivos neste diretório (permanente, comitado)

Basta sobrescrever os arquivos abaixo com as prints reais do app, mantendo
o mesmo nome:

| Arquivo              | Conteúdo esperado                                          |
| -------------------- | ---------------------------------------------------------- |
| `demo.png`           | Janela principal conectada, com árvore de canais e chat    |
| `main.png`           | Tela de boas-vindas (não conectado)                        |
| `connect.png`        | Diálogo "Conectar a um servidor"                           |
| `options.png`        | Janela de Opções                                            |
| `channel.png`        | Diálogo "Criar canal"                                      |

Use 1180×760 px para manter a proporção e evitar distorção.

Os originais (mockups em alta fidelidade do tema atual) estão em
`originals/` — copie de volta se quiser reverter:

```bash
cp originals/*.png .
```

---

## 3. Por código

As prints são definidas em `src/lib/shots-store.ts` na constante `SHOTS`.
Cada item tem `id`, `label`, `fallback` (caminho) e `caption`. Edite ali
para adicionar novas slots ou mudar legendas.

O componente `ShotDrop` (em `src/components/site/shot-drop.tsx`) cuida
automaticamente de: mostrar o fallback, aceitar drag-and-drop e persistir
no IndexedDB.
