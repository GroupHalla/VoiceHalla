# VoiceHalla — site oficial do Halla

Site estático (HTML + CSS + JS puro, sem build) publicado em
**https://grouphalla.github.io/VoiceHalla/**

## Estrutura

- `index.html` — página única (hero, voz, tela, privacidade, servidor, downloads, add-ons, FAQ)
- `css/style.css` — estilos (tema escuro, blocos light/dark/violet)
- `js/main.js` — interações (nav, marquee, rail de screenshots, reveal on scroll, FAQ)
- `assets/` — logo, ícone e screenshots do cliente v1.1.37

## Deploy

Push na `main` dispara `.github/workflows/deploy.yml` — o conteúdo do repo é
publicado direto no GitHub Pages (sem etapa de build).

## Atualizar screenshots

As capturas são geradas rodando o AppImage oficial em Xvfb (UI em inglês),
incluindo os modos embutidos `Halla --shot <arquivo> <janela>` do cliente.
