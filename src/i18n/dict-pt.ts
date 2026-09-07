/* Português (Brasil) — textos originais do site. */
import type { Dict } from "./dictionaries";

const pt: Dict = {
  lang: {
    ariaLabel: "Idioma",
  },
  nav: {
    ariaHome: "Halla — início",
    ariaOpenMenu: "Abrir menu",
    ariaCloseMenu: "Fechar menu",
    logoAlt: "Logotipo do Halla",
    links: [
      { href: "#features", label: "Recursos" },
      { href: "#ecosystem", label: "Ecossistema" },
      { href: "#security", label: "Segurança" },
      { href: "#protocol", label: "Protocolo" },
      { href: "#changelog", label: "Changelog" },
      { href: "#download", label: "Download" },
    ],
  },
  hero: {
    badge: "Código aberto · Livre para uso não comercial",
    title: "Sua voz,",
    rotating: [
      "seu servidor.",
      "sua regra.",
      "sua comunidade.",
      "sua liberdade.",
    ],
    description:
      "O Halla é um ecossistema completo de comunicação por voz — cliente desktop para Windows e Linux, app Android nativo e servidor auto-hospedável. Áudio Opus cifrado, canais com permissões granulares, sussurro, tela em 4K e um protocolo aberto documentado. Sem telemetria, sem intermediários, sem custo.",
    downloadCta: "Baixar o Halla",
    githubCta: "Ver no GitHub",
    lowLatency: "Opus de baixa latência",
    encryptedVoice: "Voz cifrada por canal",
    noTelemetry: "Sem telemetria",
    speakingNow: "falando agora",
    uidVerified: "Ed25519 · UID verificado",
    liveLabel: "Live · 1080p60",
    heroLabel: "Janela principal",
    heroAlt:
      "Janela principal do Halla no tema escuro atual: árvore de canais com indicadores de fala, painel de informações com banner roxo e chat em abas",
    officialTitle: "Servidor oficial no ar — teste agora",
    officialDesc:
      "Canais permanentes e temporários, aberto ao público, acesso multiplataforma.",
    copyAria: "Copiar endereço do servidor oficial",
    copied: "Endereço copiado — cole no Connect do cliente Halla.",
  },
  marquee: {
    ariaLabel: "Tecnologias e plataformas do Halla",
    tech: [
      "Voz Opus 20 ms",
      "ChaCha20-Poly1305",
      "Identidade Ed25519",
      "WebRTC 4K/60",
      "Protocolo aberto v6",
      "Sussurro",
      "PTT flutuante",
      "Canais temporários",
      "Emblemas Ed25519",
      "TLS + pinagem TOFU",
      "Áudio 3D e rádio",
      "Complementos .halla-addon",
    ],
    platforms: [
      "Windows",
      "Linux",
      "Android 8.0+",
      "Qt 6 · C++17",
      "Kotlin + JNI",
      "SQLite · MySQL",
      "Docker",
      "systemd",
      "Pterodactyl",
      "TURN opcional",
      "Uso não comercial",
      "pt-BR · en · es",
    ],
  },
  stats: {
    ariaLabel: "Halla em números",
    items: [
      "plataformas unidas pelo mesmo protocolo",
      "por quadro de voz Opus, via UDP",
      "de resolução no compartilhamento de tela",
      "protocolo aberto e documentado",
      "telemetria, anúncios ou contas obrigatórias",
    ],
  },
  ecosystem: {
    kicker: "Ecossistema",
    title: "Um protocolo, três projetos —",
    titleLine2: "do bolso ao datacenter",
    description:
      "Desktop, Mobile e Server falam a mesma língua: o protocolo aberto v6. Entre no mesmo servidor pelo PC ou pelo celular, transmita sua tela de qualquer um dos dois e hospede tudo na sua própria infraestrutura.",
    versionAria: "Carregando versão",
    treeServer: "meuservidor.exemplo.com",
    treeLobby: "Lobby",
    treeGameRoom: "Sala de jogos",
    treeMeetings: "Reuniões",
    treePassword: "senha",
    treeTempChannel: "Canal temporário…",
    desktopDesc:
      "O cliente completo para Windows e Linux, em C++17 com Qt 6. Ícones desenhados em tempo de execução, tema claro/escuro instantâneo e todas as ferramentas de administração que uma comunidade precisa.",
    desktopChips: [
      "Push-to-talk",
      "Sussurro",
      "Hotkeys globais",
      "Overlay da call",
      "Gravação WAV",
    ],
    mobileDesc:
      "App Android nativo (Kotlin + núcleo C++/JNI) — sem Qt, sem wrapper. Voz com AEC e supressão de ruído, reconexão silenciosa ao trocar de rede e serviço em primeiro plano que sobrevive à tela apagada.",
    mobileChips: [
      "PTT flutuante",
      "Wi-Fi ↔ móvel",
      "MediaProjection",
      "pt · en · es",
    ],
    mobileNotifTitle: "Halla · Sala de jogos",
    mobileNotifSub: "3 no canal · conectado",
    mobilePttLabel: "PTT flutuante · sobre outros apps",
    mobilePttAria: "Exemplo de botão de push-to-talk flutuante",
    serverDesc:
      "Servidor auto-hospedável em C++/Qt: TLS no controle, voz em relay puro — ele nunca decifra o áudio. SQLite ou MySQL.",
    serverChips: ["Docker", "systemd", "Pterodactyl", "TURN opcional"],
    terminalLines: [
      "[ok] TLS ativo — cert.pem autoassinado",
      "[ok] controle TCP/9987 · voz UDP/9987",
      "[ok] SQLite conectado · 32 clientes máx.",
      "[ok] relay AEAD — o servidor nunca decifra",
    ],
    terminalReady: "Halla Server {v} pronto.",
    terminalReadyPlain: "Halla Server pronto.",
    protocolTitle: "Protocolo aberto v6",
    protocolBadge: "público",
    protocolDesc:
      "A especificação é aberta para qualquer pessoa implementar clientes, bots e ferramentas compatíveis. A camada de segurança — TLS, Ed25519 e voz AEAD — é obrigatória em todas as versões.",
    transports: [
      { label: "TCP + TLS 1.2+", sub: "controle · JSON" },
      { label: "UDP · Opus AEAD", sub: "voz · 20 ms" },
      { label: "DTLS-SRTP P2P", sub: "tela · WebRTC" },
      { label: "TLS", sub: "ServerQuery" },
    ],
    readSpec: "Ler a especificação completa",
  },
  features: {
    kicker: "Recursos",
    title: "Feito para comunidades",
    titleLine2: "que levam voz a sério",
    description:
      "Cada recurso existe para dar controle total: sobre o áudio, sobre as permissões e sobre a infraestrutura. Nada de recursos pagos, anúncios ou contas obrigatórias.",
    voiceTitle: "Voz de baixa latência",
    voiceDesc:
      "Codec Opus com quadros de 20 ms, cancelamento de eco, remoção de ruído, atenuação de digitação e ducking automático. Push-to-talk (tecla ou botão do mouse), detecção de voz ou transmissão contínua.",
    screenTitle: "Tela em até 4K/60",
    screenDesc:
      "WebRTC P2P com DTLS-SRTP e H.264 por hardware com fallback VP8. Áudio do PC capturado sem eco das vozes da chamada.",
    items: [
      {
        title: "Sussurro",
        description:
          "Fale apenas com um canal, um canal e seus subcanais, ou uma lista fixa de usuários — com indicador visual próprio, distinto do indicador normal de fala.",
      },
      {
        title: "Canais e permissões",
        description:
          "Árvore com subcanais, salas temporárias sob demanda, canais com senha, moderados e vinculados. Grupos com permissões granulares e talk power.",
      },
      {
        title: "Chat de texto",
        description:
          "Abas por servidor e canal, BBCode com negrito, itálico, cores e links, emojis, mensagens offline e transferência de arquivos.",
      },
      {
        title: "Complementos",
        description:
          "Pacotes .halla-addon com ABI C pública compartilhada entre Desktop e Mobile: hooks de áudio PCM, efeito de rádio e transporte de dados v6.",
      },
      {
        title: "Emblemas verificáveis",
        description:
          "Emblemas globais vinculados à sua UID, distribuídos por registro assinado Ed25519 e mantidos em cache — funcionam até offline.",
      },
      {
        title: "Gravação e TTS",
        description:
          "Grave chamadas localmente em WAV, ouça avisos por narração texto-para-voz e receba alertas sonoros de conexão e permissões.",
      },
      {
        title: "Comunidade moderada",
        description:
          "Cutucar, reclamações, lista de banidos, avatares, descrições em BBCode e múltiplas identidades locais com perfis de áudio.",
      },
      {
        title: "Protocolo aberto",
        description:
          "Especificação v6 documentada publicamente para implementar clientes, bots e ferramentas. Controle TCP/TLS com JSON e voz UDP cifrada.",
      },
    ],
  },
  gallery: {
    kicker: "Interface",
    title: "Limpa, clássica e",
    titleLine2: "direta ao ponto",
    description:
      "A interface segue a tradição dos grandes clientes de voz: densa em informação, fácil de dominar e com tema claro e escuro trocáveis em tempo real — sem reiniciar.",
    ariaLabel: "Capturas de tela do Halla",
    emptyPrefix: "Nenhuma captura de tela encontrada em",
    emptySuffix: ". Adicione PNGs nessa pasta para vê-los aqui.",
    shots: {
      "01-janela-principal": {
        label: "Janela principal",
        caption:
          "A janela principal no tema escuro: canais, informações e chat em um só lugar.",
        alt: "Captura do Halla: janela principal com árvore de canais, painel de informações e chat em abas",
      },
      "02-boas-vindas": {
        label: "Boas-vindas",
        caption: "A tela de boas-vindas do primeiro uso, com configuração rápida.",
        alt: "Captura do Halla: tela de boas-vindas",
      },
      "03-conectar": {
        label: "Conectar",
        caption: "Conectando a um servidor, com o catálogo de endereços.",
        alt: "Captura do Halla: diálogo de conexão",
      },
      "04-opcoes": {
        label: "Opções",
        caption: "Configurações de áudio, identidade, teclas e notificações.",
        alt: "Captura do Halla: diálogo de opções",
      },
      "05-criar-canal": {
        label: "Criar canal",
        caption: "Criando um canal com permissões e ajustes de codec.",
        alt: "Captura do Halla: diálogo de criação de canal",
      },
    },
  },
  security: {
    kicker: "Segurança primeiro",
    title: "O servidor nunca escuta",
    titleLine2: "o que você diz",
    description:
      "A arquitetura de segurança do Halla é obrigatória para todas as conexões, independente da versão do protocolo. Não é uma opção premium — é o padrão.",
    flowTitle: "como o áudio viaja",
    flowServerChip: "servidor",
    flowServer: "encaminha cifrado",
    flowServerDenied: "sem poder decifrar",
    flowYou: "você",
    flowValidateTag: "valida tag AEAD",
    flowDecode: "decodifica",
    flowSpeaker: "alto-falante",
    items: [
      {
        title: "Identidade Ed25519",
        description:
          "Cada cliente gera um par de chaves Ed25519. O login exige a assinatura de um desafio com nonce — e o UID é derivado da chave pública, nunca do que o cliente alega ser. Bans, grupos e emblemas ficam vinculados a essa identidade.",
      },
      {
        title: "Voz cifrada por canal",
        description:
          "Áudio Opus e transmissões cifrados com ChaCha20-Poly1305 (AEAD) usando chave de grupo de 32 bytes gerada pelos próprios clientes. O servidor é um relay puro: encaminha envelopes e2e_key que não consegue abrir.",
      },
      {
        title: "Rotação de chaves",
        description:
          "Sempre que a composição de um canal muda — alguém entra, sai ou é movido — a chave de grupo é rotacionada e redistribuída pelos próprios clientes, lacrada com X25519 efêmera. Forward secrecy embutida no protocolo, sem esforço do usuário.",
      },
      {
        title: "TLS com pinagem TOFU",
        description:
          "O canal de controle roda sobre TLS 1.2+. Na primeira conexão, o fingerprint do certificado é fixado; se ele mudar depois, o cliente alerta sobre possível ataque man-in-the-middle — o modelo de confiança do SSH.",
      },
      {
        title: "Chaves no cofre do SO",
        description:
          "A chave privada nunca fica em texto puro: o Desktop usa Credential Manager, Keychain ou Secret Service via QtKeychain; o Mobile cifra com chave AES do Android Keystore, com backup portátil protegido por senha.",
      },
      {
        title: "Atualizações verificadas",
        description:
          "Antes de instalar qualquer atualização, o cliente confere o checksum SHA-256 e só baixa de um domínio fixo. No Mobile, o APK assinado passa por apksigner verify antes de ser publicado.",
      },
    ],
  },
  protocol: {
    kicker: "Protocolo aberto v6",
    title: "Documentado para todos.",
    titleLine2: "Fechado para ninguém.",
    description:
      "A especificação completa é pública: qualquer pessoa pode implementar clientes, bots e ferramentas compatíveis. A camada de segurança — TLS, Ed25519 e voz AEAD — é obrigatória para todas as versões.",
    thChannel: "Canal",
    thTransport: "Transporte",
    thPort: "Porta",
    transports: [
      {
        channel: "Controle",
        transport: "TCP + TLS 1.2+",
        port: "9987",
        use: "Autenticação, canais, chat, estados, moderação e sinalização WebRTC — mensagens JSON, uma por linha, até 2 MiB.",
      },
      {
        channel: "Voz",
        transport: "UDP · Opus AEAD",
        port: "9987",
        use: "Pacotes de 20 ms cifrados com ChaCha20-Poly1305 e chave por canal. O servidor apenas retransmite o relay.",
      },
      {
        channel: "Tela (moderna)",
        transport: "WebRTC P2P · DTLS-SRTP",
        port: "dinâmica",
        use: "Vídeo e áudio da transmissão de tela trafegam direto entre os clientes; offer/answer e ICE passam pelo controle TLS.",
      },
      {
        channel: "Tela (legado)",
        transport: "UDP · JPEG",
        port: "9987",
        use: "Frames JPEG fatiados e cifrados como alternativa que dispensa o SDK nativo de WebRTC.",
      },
      {
        channel: "ServerQuery",
        transport: "TCP + TLS",
        port: "configurável",
        use: "Administração remota do servidor, desligada por padrão e com bind local quando habilitada.",
      },
    ],
    loginTitle: "Login com prova de posse",
    spoofNote:
      "O servidor ignora o UID enviado pelo cliente e recalcula a partir da chave pública. Spoofing de identidade torna-se impraticável.",
    readSpec: "Ler a especificação completa",
  },
  changelog: {
    kicker: "Changelog",
    title: "Cada release,",
    titleLine2: "documentada",
    description:
      "O histórico completo desde o protocolo v6 — o dia em que a criptografia de ponta a ponta ficou real. Escolha um projeto e acompanhe: sem lançamentos ocultos, sem mudanças silenciosas.",
    channelAria: "Escolha o projeto",
    channels: {
      desktop: "Desktop",
      mobile: "Mobile",
      server: "Server",
    },
    latest: "Mais recente",
    milestone: "Protocolo v6",
    viewRelease: "Ver release",
    viewReleaseAria: "Ver release {tag} no GitHub",
    fullHistory: "Histórico completo de releases no GitHub",
    categories: {
      protocol: "Protocolo",
      security: "Segurança",
      added: "Adicionado",
      changed: "Alterado",
      fixed: "Corrigido",
      performance: "Performance",
    },
    sinceNote:
      "Releases desde o rollout do protocolo v6 · setembro de 2026",
  },
  downloads: {
    kicker: "Download",
    title: "Comece a falar em minutos",
    description:
      "Gratuito para uso pessoal, educacional e comunitário: use, estude, modifique e redistribua sem pedir permissão. Vender ou embutir em produto comercial exige autorização escrita dos mantenedores.",
    platformsAria: "Plataformas do Halla",
    buildTitle: "Compilar do código-fonte",
    copyAria: "Copiar comandos",
    copied: "copiado",
    copy: "copiar",
    downloadTag: "Baixar {tag}",
    downloadFallback: "Baixar release",
    releasesLink: "ou abra a página de releases no GitHub →",
    sourceLink: "Código-fonte no GitHub",
    targetsAria: "Escolha a plataforma do servidor",
    platforms: {
      desktop: {
        label: "Desktop",
        title: "Halla Desktop",
        subtitle: "Windows · Linux · C++17 + Qt 6",
        description:
          "Baixe o instalador NSIS para Windows — o botão sempre aponta para a última release publicada. Para Linux, compile do código-fonte com CMake. O modo WebRTC nativo de compartilhamento de tela é opcional e usa o SDK pré-compilado do Halla WebRTC Builds.",
        releaseNote:
          "Instaladores e binários ficam na aba Releases do repositório.",
        code: `# Linux (instala dependências se faltarem)
./build-linux.sh
./build/Halla

# Windows / manual — qualquer plataforma
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build`,
        filename: "bash — linux / windows",
        deps: ["CMake ≥ 3.21", "Qt 6.2+", "OpenSSL", "libopus", "QtKeychain"],
      },
      mobile: {
        label: "Mobile",
        title: "Halla Mobile",
        subtitle: "Android 8.0+ (API 26) · Kotlin + C++/JNI",
        description:
          "App Android nativo com serviço em primeiro plano, PTT flutuante e transmissão de tela via MediaProjection. O botão baixa sempre o APK assinado mais recente; atualizações também podem ser instaladas de dentro do próprio app.",
        releaseNote:
          "APK assinado com verificação apksigner e SHA-256 publicado junto.",
        code: `# Compilar do código-fonte
./gradlew assembleDebug      # desenvolvimento

# Release oficial (CI em tags v*)
./gradlew assembleRelease`,
        filename: "bash — android",
        deps: [
          "Android Studio",
          "JDK 17",
          "Android SDK 34",
          "NDK 25.2.9519653",
          "Internet no 1º build",
        ],
      },
      server: {
        label: "Server",
        title: "Halla Server",
        subtitle: "Self-hosted · C++/Qt · SQLite/MySQL",
        description:
          "Rode seu próprio servidor: binário único com configuração em INI, certificado autoassinado gerado na primeira execução (ou Let's Encrypt), Docker, systemd e egg pronto para Pterodactyl.",
        releaseNote:
          "Dockerfile, serviço systemd e egg Pterodactyl inclusos no repo.",
        code: `# Executar
./halla-server --config halla-server.ini

# Portas padrão
# TCP+UDP 9987 (controle TLS + voz Opus AEAD)`,
        filename: "bash — servidor",
        deps: [
          "CMake + C++17",
          "Qt 6 (Network, Sql)",
          "OpenSSL",
          "SQLite ou MySQL",
          "TURN opcional",
        ],
      },
    },
  },
  cta: {
    kicker: "servidor oficial · aberto ao público",
    title: "Entre no servidor oficial",
    titleLine2: "e dê sua opinião",
    description:
      "Canais permanentes e temporários para testar áudio de baixa latência, compartilhamento de tela e o ecossistema completo — do Desktop e do Mobile. Encontrou um bug ou tem uma sugestão? O canal de feedback é oficial e direto.",
    report: "Reportar bug ou sugerir melhoria",
    copyAria: "Copiar endereço do servidor oficial",
    copied: "Endereço copiado — cole no Connect do cliente Halla.",
  },
  footer: {
    logoAlt: "Logotipo do Halla",
    tagline:
      "Ecossistema de comunicação por voz de código aberto: desktop, mobile e servidor auto-hospedável com protocolo próprio, documentado e cifrado por padrão.",
    github: "GroupHalla no GitHub",
    projectsAria: "Projetos do Halla",
    projectsTitle: "Projetos",
    projects: [
      "Cliente Windows/Linux",
      "Cliente Android nativo",
      "Servidor auto-hospedável",
      "SDK nativo de WebRTC",
    ],
    resourcesAria: "Recursos e documentação",
    resourcesTitle: "Recursos",
    resources: [
      "Especificação do protocolo",
      "Guia de plugins",
      "Segurança do servidor",
      "Programa de feedback",
    ],
    license:
      "Livre para uso não comercial — usar, estudar, modificar e redistribuir gratuitamente. Uso comercial exige autorização escrita dos mantenedores.",
    backToTop: "Voltar ao topo",
    backToTopAria: "Voltar ao topo",
    thirdParty:
      "Componentes de terceiros (Qt, Opus, OpenSSL, libwebrtc, mbedTLS) seguem suas respectivas licenças.",
  },
};

export default pt;
