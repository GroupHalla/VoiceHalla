# VoiceHalla — site oficial do Halla

Site estático (HTML + CSS + JS puro, sem build) publicado em
**https://grouphalla.github.io/VoiceHalla/**

## Estrutura

- `index.html` — página única (hero com réplica da UI do app, voz, tela,
  privacidade, servidor, downloads, add-ons, FAQ)
- `css/style.css` — estilos (tema escuro, blocos light/dark/violet,
  mockup do app com a paleta real #080D1C/#0D1223/#7C3AED)
- `js/main.js` — interações (nav, marquee, rail de screenshots, reveal, FAQ)
- `js/i18n-dict.js` + `js/i18n.js` — site trilíngue PT/EN/ES (seletor na nav,
  persistência em localStorage, detecção por navigator.language)
- `js/latest.js` — download direto da última release via API do GitHub
  (Windows .exe, Linux .AppImage, Android .apk; servidor aponta pro repo)
- `assets/` — logo, ícone e screenshots do cliente v1.1.37 em tema escuro

## Deploy

Push na `main` dispara `.github/workflows/deploy.yml` — o conteúdo do repo é
publicado direto no GitHub Pages (sem etapa de build).

## Atualizar screenshots

`scripts/shots/take_dark.sh` (no ambiente de automação) roda o AppImage oficial
em Xvfb com `design/theme=1` (tema escuro) e UI em inglês — gera as 6 capturas
da galeria, incluindo os modos embutidos `Halla --shot <arquivo> <janela>`.

## Atualizar traduções

As strings do `index.html` são anotadas com `data-i18n` por
`scripts/site_v2_i18n_annotate.py`; as traduções vivem em
`scripts/site_v2_translations{1,2}.py` e `scripts/site_v2_i18n_build.py`
gera o `js/i18n-dict.js` (string sem tradução quebra o build com erro).
