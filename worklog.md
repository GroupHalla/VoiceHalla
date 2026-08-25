# Worklog

---
Task ID: 1
Agent: main-agent (Super Z)
Task: Estudar os repositórios GroupHalla/Halla, Halla-Mobile e HallaServer e criar o site oficial do Halla

Work Log:
- Clonados os 3 repositórios para /home/z/my-project/repos/ (Halla, Halla-Mobile, HallaServer)
- Lidos os READMEs dos 3 projetos + PROTOCOL.md + halla-server.ini
- Identidade visual analisada via VLM + extração de cores: logo com gradiente roxo (#7133da→#a02bed) até ciano; screenshots do app analisados (tema claro/escuro, árvore de canais, chat em abas)
- Fatos-chave coletados: Desktop 1.1.0 (C++17/Qt6, Windows/Linux), Mobile 1.0.83 (Android nativo Kotlin+C++/JNI), Server 1.1.60 (self-hosted, Docker/Pterodactyl), protocolo aberto v5 (TCP/TLS+JSON, UDP Opus AEAD ChaCha20-Poly1305, identidade Ed25519, TOFU), servidor oficial 163.176.35.133:9987, licença Unlicense, feedback via Google Forms
- Assets copiados para public/: halla-logo.png + 6 screenshots (shots/)
- Site construído em Next.js 16 + Tailwind 4 + shadcn/ui + framer-motion + lucide-react, em pt-BR, tema dark roxo (cores da marca)
- Componentes criados em src/components/site/: navbar (fixed, menu mobile), hero (headline gradiente, card servidor oficial com copy-to-clipboard, screenshot em moldura de janela), stats strip, ecosystem (3 cards Desktop/Mobile/Server com links dos repos), features (10 cards), screenshots (galeria com abas), security (6 cards + diagrama do fluxo de áudio), protocol (tabela de transportes + fluxo de login Ed25519), downloads (abas por plataforma + code blocks com copiar), cta (servidor oficial + feedback), footer (projetos, recursos, Unlicense)
- Correções durante verificação: ícone LayoutTree inexistente → FolderTree; scroll horizontal mobile causado por glows decorativos → overflow-x-clip no root + overflow-hidden nas seções features/downloads; âncoras escondidas atrás do navbar fixo → scroll-mt-20 nas seções
- Verificação com Agent Browser: título OK, zero erros de console, copy do endereço funciona, abas de screenshots trocam imagens, abas de download mostram comandos corretos (gradlew/cmake/halla-server), menu mobile abre/navega/fecha, âncoras pousam a 80px do topo, sem scroll horizontal em 390px
- Verificação visual com VLM dos screenshots desktop e mobile: sem sobreposições, hierarquia clara, footer correto
- Lint final: limpo (repos/ e mini-services/ ignorados no eslint.config.mjs)

Stage Summary:
- Site do Halla entregue e funcional na rota / (dev server porta 3000)
- 10 seções: hero, stats, ecossistema, recursos, galeria, segurança, protocolo, downloads, CTA, footer
- Todo conteúdo é factual, extraído dos READMEs dos repositórios
- Artefatos: src/app/page.tsx, src/app/layout.tsx (metadata Halla), src/components/site/*.tsx, public/halla-logo.png, public/shots/*

---
Task ID: 2
Agent: main-agent (Super Z)
Task: Redesign visual completo do site do Halla (mais bonito, menos centralizado, mais animações) + verificar mudanças de licença

Work Log:
- Repos atualizados: licença agora é texto próprio em português do Unlicense (domínio público) nos 3 projetos — substância inalterada; footer atualizado para "Dedicado ao domínio público (Unlicense)"
- globals.css: adicionados keyframes e utilitários (eq bars, float, marquee, aurora, shimmer, beam border com @property, grid-drift, noise SVG, terminal cursor, flow-line, speaking-ring, prefers-reduced-motion)
- Novos componentes de efeito (effects.tsx): Eq (equalizador animado), CountUp (contador on-view), Typewriter (terminal digitando), SpotlightCard (glow segue o mouse), SectionHeader (cabeçalhos editoriais à esquerda), Aurora (blobs animados)
- navbar.tsx: barra de progresso de scroll com gradiente (useScroll+useSpring), underline animado nos links, menu mobile com stagger
- hero.tsx: reescrito — layout assimétrico (texto à esquerda), palavra rotativa com blur/slide ("seu servidor/sua regra/sua comunidade/sua liberdade"), mockup 3D com parallax do mouse (rotateX/rotateY springs), 4 chips flutuantes glassmorphism (Admin falando com eq+ring, Live 1080p60, Ed25519, ChaCha20), banner do servidor oficial com beam border rotativa, aurora + grid animado + noise de fundo
- stats.tsx: contadores animados (3, 20ms, 2160p, v5, 0 telemetria) em strip full-width com divisores
- marquee.tsx: dois tickers infinitos em direções opostas (tecnologias + plataformas), pausa no hover
- ecosystem.tsx: bento grid assimétrico 7/5 + 5/7 — card Desktop com árvore de canais viva (user "player_two" entra/sai em loop, Admin com eq + ring + coroa), card Mobile com PTT flutuante pulsante + card de notificação, card Server com terminal typewriter, card Protocolo com transportes
- features.tsx: 2 cards destacados (voz com equalizador gigante ao vivo; tela 4K com pills de qualidade) + 8 cards com SpotlightCard; reveals com stagger
- screenshots.tsx: layout editorial com abas verticais numeradas à esquerda + imagem à direita com slide/x animations
- security.tsx: split layout com painel sticky à esquerda (diagrama de fluxo do áudio + flow-line animada) e timeline de 6 itens à direita com linha de fluxo vertical animada
- protocol.tsx: tabela de transportes com reveal sequencial + stepper de login Ed25519 com delays encadeados e setas pulsantes
- downloads.tsx: tabs com layoutId glow animado, painel com SpotlightCard, code block com chrome de janela + botão copiar com feedback, shine nos CTAs
- cta.tsx: card com beam border + aurora + noise, à esquerda, com copiar endereço
- footer.tsx: hairline gradiente no topo, Eq junto ao logo
- Correções: imports errados no footer (Eq de effects vs ícones lucide), ícones verificados
- Verificação Agent Browser: 0 erros de console; palavra rotativa trocando; tabs da galeria e downloads funcionando; menu mobile abre; sem hscroll em 390px; âncoras pousam a 80px (smooth scroll confirmado com wait maior)
- VLM aprovou: hero assimétrico com chips flutuantes, bento renderizado (árvore de canais + terminal nos cards), features alinhadas, mobile empilhado sem cortes
- Lint final limpo

Stage Summary:
- Site do Halla totalmente redesenhado: hero assimétrico com parallax 3D e palavra rotativa, marquee duplo, stats com contadores, bento grid com mockups animados (árvore de canais viva, PTT flutuante, terminal digitando), spotlight cards, segurança split sticky, stepper de protocolo animado, beam borders e auroras
- Licença verificada: continua domínio público/Unlicense (texto em português); footer ajustado
- Todos os artefatos em src/components/site/*, effects.tsx centraliza os componentes de animação reutilizáveis

---
Task ID: 3
Agent: main-agent (Super Z)
Task: Corrigir seção "horrorosa" (marquee quebrado) + substituir screenshots velhos pela UI atual + atualizar licença

Work Log:
- Diagnóstico do print do usuário: marquee renderizado como lista vertical duplicada, sem CSS
- CAUSA RAIZ descoberta por bissecção: o bloco `@layer base { * { @apply border-border... } }` no globals.css quebrava o pipeline CSS do Tailwind v4/@tailwindcss/postcss — TODAS as regras após ele eram silenciosamente descartadas (marquee, eq, aurora, beam, flow-line, noise etc. nunca chegavam ao CSS servido). Testes: regra antes do @layer base aparecia (1 ocorrência), depois dele era descartada (0); removendo o bloco, todas as classes customizadas apareciam
- CORREÇÃO: reescrito @layer base em CSS puro (border-color/outline-color/background-color/color com var()) mantendo o mesmo efeito visual; verificado no CSS servido: marquee-track, eq-bar, aurora, beam, flow-line, noise, terminal-cursor, speaking-ring, text-shimmer, grid-drift todas presentes; no navegador: .marquee-track = display:flex + animation marquee 38s
- Repos atualizados (pull): LICENÇA MUDOU de Unlicense/domínio público para "livre para uso não comercial" (vender/alugar/serviço pago exige autorização escrita) nos 3 projetos — textos atualizados no hero badge, downloads, footer, marquee e OG description
- Screenshots: shots/ do repo mostram UI antiga (tema claro, demo.png exibia "versão 3.13.7"); imgur bloqueado no sandbox; sem issues no GitHub; compilar o app inviável (sem sudo para Qt6, 1GB RAM, sem swap)
- SOLUÇÃO: recriada a UI ATUAL em alta fidelidade (scripts/mockups/halla-ui.html) usando as cores EXATAS do Theme.cpp atual (window #080D1C, surface #0D1223, accent #7C3AED/#8B5CF6, green #22C55E etc.) e a estrutura real do MainWindow/ServerTab (menubar 40px, toolbar com 2 grupos arredondados 15px, treeCard+infoCard flutuantes, chatCard full-width, statusbar 38px, tree items 44px, tabs 10px)
- 5 telas capturadas via agent-browser em 1180×760: principal conectada (com Admin falando + eq, chat com bolhas e tags), boas-vindas, diálogo conectar (servidor oficial 163.176.35.133), opções (nav lateral 9 categorias), criar canal — substituídas em public/shots/ (demo, main, connect, options, channel); opt-* antigos removidos
- Hero e galeria: removida a moldura fake de janela (os mockups já são a janela completa); galeria agora 5 abas com legendas atualizadas
- Verificação: marquee flex+animação OK, galeria troca imagens OK, mobile 390px sem hscroll, 0 erros de console, lint limpo, VLM aprovou hero, marquee (2 tickers horizontais) e página completa

Stage Summary:
- Bug CSS crítico corrigido (pipeline Tailwind v4 quebrava após @layer base com @apply)
- Screenshots agora representam a UI ATUAL do Halla (tema escuro navy + roxo) em 5 telas
- Licença atualizada em todo o site para uso não comercial
- Mockup fonte reutilizável em scripts/mockups/halla-ui.html para futuras telas

---
Task ID: 4
Agent: main-agent (Super Z)
Task: Facilitar para o usuário colocar as prints reais do app no site

Work Log:
- Criado sistema de screenshots personalizáveis sem backend, com 3 formas de uso:
  1) Arrastar-e-soltar imagens direto sobre qualquer print do site (hero + galeria)
  2) Painel "Prints do app" (botão fixo bottom-right, Ctrl+Shift+P, ou ?prints=1) com upload/restaurar por slot
  3) Substituir arquivos em public/shots/ (mantido o workflow de filesystem)
- Arquitetura: IndexedDB (banco "halla-shots", store "shots") + pub-sub interno + hook useShotSrc + componente ShotDrop que envolve cada <img>
- Novos arquivos:
  - src/lib/shots-store.ts — store IDB + pub-sub + lista canônica SHOTS (id, label, fallback, caption)
  - src/components/site/use-shot-src.ts — hook useShotSrc (useSyncExternalStore-style) + useFileDrop
  - src/components/site/shot-drop.tsx — wrapper drag-drop com overlay "Solte para substituir" e hint no hover
  - src/components/site/shot-manager.tsx — modal admin: lista 5 shots com thumbnail/preview/botões Enviar+Restaurar, "Restaurar todas", preview em tela cheia, toast feedback (shadcn useToast)
- Hero e galeria refatorados para usar ShotDrop; galeria agora lê tabs da constante SHOTS centralizada
- Mockups originais backed up em public/shots/originals/ (5 prints) + README em public/shots/ explicando as 3 formas de trocar prints
- Verificação no navegador:
  - Botão "Prints do app" visível bottom-right em desktop e mobile (390px)
  - Modal abre, lista 5 slots com thumbnails reais
  - Upload via file input funciona: blob URL substitui /shots/X.png imediatamente
  - Persiste em IndexedDB: sobrevive a reload (blob URL regenerado on-load)
  - Botão Restaurar remove do IDB e volta para fallback
  - "Restaurar todas" limpa tudo
  - 0 erros de console, sem hscroll mobile, lint limpo

Stage Summary:
- Usuário agora pode trocar as prints de 3 formas, sendo a mais fácil o drag-drop direto no site (sem código nem arquivos)
- Sistema é client-side puro (IndexedDB), não depende de backend nem de build
- Estado "personalizada" indicado no modal com badge verde
- Documentação em public/shots/README.md
