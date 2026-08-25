# Prints do app — como colocar as suas

É só isso aqui:

1. **Arraste seus PNGs para esta mesma pasta.**
   ```
   public/screenshots/
   ├── 01-janela-principal.png   ← a primeira vira o print do hero
   ├── 02-boas-vindas.png
   ├── 03-conectar.png
   ├── 04-opcoes.png
   └── 05-criar-canal.png
   ```

2. **Salve.** Pronto — aparecem no site.

O dev server recarrega sozinho. Em produção, rode `npm run build` de novo.

## Regências de nome

- **Ordem:** Prefixe com número para fixar a ordem: `01-…`, `02-…`. Sem prefixo, ordena por nome.
- **Rótulo da aba:** Vem do nome do arquivo. `01-janela-principal.png` → "Janela Principal". Use `-` ou `_` para separar palavras.
- **Hero:** A primeira print (em ordem) vira o destaque do topo. Para escolher outra, crie `meta.json` (ver abaixo).

## Opcional — legendas personalizadas

Se quiser um rótulo, legenda ou hero diferentes do que sai do nome do arquivo, crie um `meta.json` aqui do lado dos PNGs:

```json
{
  "hero": "03-conectar.png",
  "items": [
    { "file": "01-janela-principal.png", "label": "Janela Principal",
      "caption": "Tudo em uma tela: canais, chat e usuários." },
    { "file": "03-conectar.png", "label": "Conectar",
      "caption": "Diálogo para entrar em um servidor." }
  ]
}
```

Arquivos não citados no `meta.json` continuam aparecendo, só que com o rótulo/legenda automáticos.

## Format

- PNG, JPG, WEBP ou AVIF.
- Proporção ~3:2 (ex: 1180×760) para combinar com o molde do site. Outras resoluções funcionam, mas podem ficar com aspect diferente.
