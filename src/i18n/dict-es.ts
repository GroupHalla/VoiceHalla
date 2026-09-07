/* Español — traducción completa del sitio. */
import type { Dict } from "./dictionaries";

const es: Dict = {
  lang: {
    ariaLabel: "Idioma",
  },
  nav: {
    ariaHome: "Halla — inicio",
    ariaOpenMenu: "Abrir menú",
    ariaCloseMenu: "Cerrar menú",
    logoAlt: "Logotipo de Halla",
    links: [
      { href: "#features", label: "Funciones" },
      { href: "#ecosystem", label: "Ecosistema" },
      { href: "#security", label: "Seguridad" },
      { href: "#protocol", label: "Protocolo" },
      { href: "#download", label: "Descarga" },
    ],
  },
  hero: {
    badge: "Código abierto · Gratis para uso no comercial",
    title: "Tu voz,",
    rotating: [
      "tu servidor.",
      "tus reglas.",
      "tu comunidad.",
      "tu libertad.",
    ],
    description:
      "Halla es un ecosistema completo de comunicación por voz — cliente de escritorio para Windows y Linux, app Android nativa y servidor auto-alojable. Audio Opus cifrado, canales con permisos granulares, susurro, pantalla en 4K y un protocolo abierto y documentado. Sin telemetría, sin intermediarios, sin coste.",
    downloadCta: "Descargar Halla",
    githubCta: "Ver en GitHub",
    lowLatency: "Opus de baja latencia",
    encryptedVoice: "Voz cifrada por canal",
    noTelemetry: "Sin telemetría",
    speakingNow: "hablando ahora",
    uidVerified: "Ed25519 · UID verificado",
    liveLabel: "Live · 1080p60",
    heroLabel: "Ventana principal",
    heroAlt:
      "Ventana principal de Halla en el tema oscuro actual: árbol de canales con indicadores de voz, panel de información con banner morado y chat con pestañas",
    officialTitle: "Servidor oficial en línea — pruébalo ahora",
    officialDesc:
      "Canales permanentes y temporales, abierto al público, acceso multiplataforma.",
    copyAria: "Copiar la dirección del servidor oficial",
    copied: "Dirección copiada — pégala en el diálogo Conectar del cliente Halla.",
  },
  marquee: {
    ariaLabel: "Tecnologías y plataformas de Halla",
    tech: [
      "Voz Opus 20 ms",
      "ChaCha20-Poly1305",
      "Identidad Ed25519",
      "WebRTC 4K/60",
      "Protocolo abierto v5",
      "Susurro",
      "PTT flotante",
      "Canales temporales",
      "Emblemas Ed25519",
      "TLS + pin TOFU",
      "Audio 3D y radio",
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
      "Uso no comercial",
      "pt-BR · en · es",
    ],
  },
  stats: {
    ariaLabel: "Halla en números",
    items: [
      "plataformas unidas por el mismo protocolo",
      "por trama de voz Opus, vía UDP",
      "de resolución al compartir pantalla",
      "protocolo abierto y documentado",
      "telemetría, anuncios ni cuentas obligatorias",
    ],
  },
  ecosystem: {
    kicker: "Ecosistema",
    title: "Un protocolo, tres proyectos —",
    titleLine2: "del bolsillo al centro de datos",
    description:
      "Desktop, Mobile y Server hablan el mismo idioma: el protocolo abierto v5. Entra al mismo servidor desde el PC o el móvil, comparte tu pantalla desde cualquiera de los dos y aloja todo en tu propia infraestructura.",
    versionAria: "Cargando versión",
    treeServer: "miservidor.ejemplo.com",
    treeLobby: "Lobby",
    treeGameRoom: "Sala de juegos",
    treeMeetings: "Reuniones",
    treePassword: "contraseña",
    treeTempChannel: "Canal temporal…",
    desktopDesc:
      "El cliente completo para Windows y Linux, en C++17 con Qt 6. Iconos dibujados en tiempo de ejecución, tema claro/oscuro instantáneo y todas las herramientas de administración que una comunidad necesita.",
    desktopChips: [
      "Pulsar para hablar",
      "Susurro",
      "Atajos globales",
      "Overlay de la llamada",
      "Grabación WAV",
    ],
    mobileDesc:
      "App Android nativa (Kotlin + núcleo C++/JNI) — sin Qt, sin wrapper. Voz con cancelación de eco y supresión de ruido, reconexión silenciosa al cambiar de red y servicio en primer plano que sobrevive a la pantalla apagada.",
    mobileChips: [
      "PTT flotante",
      "Wi-Fi ↔ móvil",
      "MediaProjection",
      "pt · en · es",
    ],
    mobileNotifTitle: "Halla · Sala de juegos",
    mobileNotifSub: "3 en el canal · conectado",
    mobilePttLabel: "PTT flotante · sobre otras apps",
    mobilePttAria: "Ejemplo de botón flotante de pulsar para hablar",
    serverDesc:
      "Servidor auto-alojable en C++/Qt: TLS en el control, voz en relé puro — nunca descifra el audio. SQLite o MySQL.",
    serverChips: ["Docker", "systemd", "Pterodactyl", "TURN opcional"],
    terminalLines: [
      "[ok] TLS activo — cert.pem autofirmado",
      "[ok] control TCP/9987 · voz UDP/9987",
      "[ok] SQLite conectado · 32 clientes máx.",
      "[ok] relé AEAD — el servidor nunca descifra",
    ],
    terminalReady: "Halla Server {v} listo.",
    terminalReadyPlain: "Halla Server listo.",
    protocolTitle: "Protocolo abierto v5",
    protocolBadge: "público",
    protocolDesc:
      "La especificación está abierta para que cualquiera implemente clientes, bots y herramientas compatibles. La capa de seguridad — TLS, Ed25519 y voz AEAD — es obligatoria en todas las versiones.",
    transports: [
      { label: "TCP + TLS 1.2+", sub: "control · JSON" },
      { label: "UDP · Opus AEAD", sub: "voz · 20 ms" },
      { label: "DTLS-SRTP P2P", sub: "pantalla · WebRTC" },
      { label: "TLS", sub: "ServerQuery" },
    ],
    readSpec: "Leer la especificación completa",
  },
  features: {
    kicker: "Funciones",
    title: "Hecho para comunidades",
    titleLine2: "que se toman la voz en serio",
    description:
      "Cada función existe para darte control total: sobre el audio, los permisos y la infraestructura. Nada de funciones de pago, anuncios ni cuentas obligatorias.",
    voiceTitle: "Voz de baja latencia",
    voiceDesc:
      "Códec Opus con tramas de 20 ms, cancelación de eco, eliminación de ruido, atenuación de tecleo y ducking automático. Pulsar para hablar (tecla o botón del ratón), detección de voz o transmisión continua.",
    screenTitle: "Pantalla hasta 4K/60",
    screenDesc:
      "WebRTC P2P con DTLS-SRTP y H.264 por hardware con respaldo VP8. Audio del PC capturado sin eco de las voces de la llamada.",
    items: [
      {
        title: "Susurro",
        description:
          "Habla solo con un canal, un canal y sus subcanales, o una lista fija de usuarios — con indicador visual propio, distinto del indicador normal de voz.",
      },
      {
        title: "Canales y permisos",
        description:
          "Árbol con subcanales, salas temporales bajo demanda, canales con contraseña, moderados y vinculados. Grupos con permisos granulares y talk power.",
      },
      {
        title: "Chat de texto",
        description:
          "Pestañas por servidor y canal, BBCode con negrita, cursiva, colores y enlaces, emojis, mensajes sin conexión y transferencia de archivos.",
      },
      {
        title: "Complementos",
        description:
          "Paquetes .halla-addon con ABI C pública compartida entre Desktop y Mobile: hooks de audio PCM, efecto de radio y transporte de datos v5.",
      },
      {
        title: "Emblemas verificables",
        description:
          "Emblemas globales vinculados a tu UID, distribuidos mediante un registro firmado Ed25519 y en caché — funcionan incluso sin conexión.",
      },
      {
        title: "Grabación y TTS",
        description:
          "Graba llamadas localmente en WAV, escucha avisos por voz sintética y recibe alertas sonoras de conexiones y permisos.",
      },
      {
        title: "Comunidad moderada",
        description:
          "Poke, quejas, lista de baneados, avatares, descripciones en BBCode y múltiples identidades locales con perfiles de audio.",
      },
      {
        title: "Protocolo abierto",
        description:
          "Especificación v5 documentada públicamente para implementar clientes, bots y herramientas. Control TCP/TLS con JSON y voz UDP cifrada.",
      },
    ],
  },
  gallery: {
    kicker: "Interfaz",
    title: "Limpia, clásica y",
    titleLine2: "directa al grano",
    description:
      "La interfaz sigue la tradición de los grandes clientes de voz: densa en información, fácil de dominar y con tema claro y oscuro intercambiables en tiempo real — sin reiniciar.",
    ariaLabel: "Capturas de pantalla de Halla",
    emptyPrefix: "No se encontraron capturas en",
    emptySuffix: ". Añade PNG a esa carpeta para verlos aquí.",
    shots: {
      "01-janela-principal": {
        label: "Ventana principal",
        caption:
          "La ventana principal en el tema oscuro: canales, información y chat en un solo lugar.",
        alt: "Captura de Halla: ventana principal con árbol de canales, panel de información y chat con pestañas",
      },
      "02-boas-vindas": {
        label: "Bienvenida",
        caption: "La pantalla de bienvenida del primer uso, con configuración rápida.",
        alt: "Captura de Halla: pantalla de bienvenida",
      },
      "03-conectar": {
        label: "Conectar",
        caption: "Conectándose a un servidor, con la libreta de direcciones.",
        alt: "Captura de Halla: diálogo de conexión",
      },
      "04-opcoes": {
        label: "Opciones",
        caption: "Ajustes de audio, identidad, atajos y notificaciones.",
        alt: "Captura de Halla: diálogo de opciones",
      },
      "05-criar-canal": {
        label: "Crear canal",
        caption: "Creando un canal con permisos y ajustes de códec.",
        alt: "Captura de Halla: diálogo de creación de canal",
      },
    },
  },
  security: {
    kicker: "Seguridad ante todo",
    title: "El servidor nunca escucha",
    titleLine2: "lo que dices",
    description:
      "La arquitectura de seguridad de Halla es obligatoria para todas las conexiones, sin importar la versión del protocolo. No es una opción premium — es el valor por defecto.",
    flowTitle: "cómo viaja el audio",
    flowServerChip: "servidor",
    flowServer: "reenvía cifrado",
    flowServerDenied: "sin poder descifrar",
    flowYou: "tú",
    flowValidateTag: "valida la etiqueta AEAD",
    flowDecode: "decodifica",
    flowSpeaker: "altavoz",
    items: [
      {
        title: "Identidad Ed25519",
        description:
          "Cada cliente genera un par de claves Ed25519. El inicio de sesión exige firmar un desafío con nonce — y el UID se deriva de la clave pública, nunca de lo que el cliente dice ser. Baneos, grupos y emblemas quedan vinculados a esa identidad.",
      },
      {
        title: "Voz cifrada por canal",
        description:
          "Audio Opus y transmisiones cifrados con ChaCha20-Poly1305 (AEAD) usando una clave de 32 bytes por canal. El servidor es un relé puro: reenvía los paquetes, pero nunca tiene la clave para descifrarlos.",
      },
      {
        title: "Rotación de claves",
        description:
          "Siempre que la composición de un canal cambia — alguien entra, sale o es movido — la clave del componente se rota y redistribuye. Secreto hacia adelante básico incorporado en el protocolo, sin esfuerzo del usuario.",
      },
      {
        title: "TLS con pin TOFU",
        description:
          "El canal de control funciona sobre TLS 1.2+. En la primera conexión se fija la huella del certificado; si cambia después, el cliente avisa de un posible ataque man-in-the-middle — el modelo de confianza de SSH.",
      },
      {
        title: "Claves en la bóveda del SO",
        description:
          "La clave privada nunca queda en texto plano: Desktop usa Credential Manager, Keychain o Secret Service vía QtKeychain; Mobile la cifra con una clave AES del Android Keystore, con respaldo portátil protegido por contraseña.",
      },
      {
        title: "Actualizaciones verificadas",
        description:
          "Antes de instalar cualquier actualización, el cliente comprueba el checksum SHA-256 y solo descarga de un dominio fijo. En Mobile, el APK firmado pasa por apksigner verify antes de publicarse.",
      },
    ],
  },
  protocol: {
    kicker: "Protocolo abierto v5",
    title: "Documentado para todos.",
    titleLine2: "Cerrado para nadie.",
    description:
      "La especificación completa es pública: cualquiera puede implementar clientes, bots y herramientas compatibles. La capa de seguridad — TLS, Ed25519 y voz AEAD — es obligatoria en todas las versiones.",
    thChannel: "Canal",
    thTransport: "Transporte",
    thPort: "Puerto",
    transports: [
      {
        channel: "Control",
        transport: "TCP + TLS 1.2+",
        port: "9987",
        use: "Autenticación, canales, chat, estados, moderación y señalización WebRTC — mensajes JSON, uno por línea, hasta 2 MiB.",
      },
      {
        channel: "Voz",
        transport: "UDP · Opus AEAD",
        port: "9987",
        use: "Paquetes de 20 ms cifrados con ChaCha20-Poly1305 y clave por canal. El servidor solo los retransmite.",
      },
      {
        channel: "Pantalla (moderna)",
        transport: "WebRTC P2P · DTLS-SRTP",
        port: "dinámica",
        use: "El vídeo y el audio de la compartición viajan directos entre clientes; offer/answer e ICE pasan por el control TLS.",
      },
      {
        channel: "Pantalla (heredado)",
        transport: "UDP · JPEG",
        port: "9987",
        use: "Tramas JPEG troceadas y cifradas como alternativa que no necesita el SDK nativo de WebRTC.",
      },
      {
        channel: "ServerQuery",
        transport: "TCP + TLS",
        port: "configurable",
        use: "Administración remota del servidor, desactivada por defecto y con bind local al habilitarse.",
      },
    ],
    loginTitle: "Inicio de sesión con prueba de posesión",
    spoofNote:
      "El servidor ignora el UID enviado por el cliente y lo recalcula a partir de la clave pública. La suplantación de identidad se vuelve inviable.",
    readSpec: "Leer la especificación completa",
  },
  downloads: {
    kicker: "Descarga",
    title: "Empieza a hablar en minutos",
    description:
      "Gratis para uso personal, educativo y comunitario: usa, estudia, modifica y redistribuye sin pedir permiso. Venderlo o integrarlo en un producto comercial requiere autorización escrita de los mantenedores.",
    platformsAria: "Plataformas de Halla",
    buildTitle: "Compilar desde el código fuente",
    copyAria: "Copiar comandos",
    copied: "copiado",
    copy: "copiar",
    downloadTag: "Descargar {tag}",
    downloadFallback: "Descargar release",
    releasesLink: "o abre la página de releases en GitHub →",
    sourceLink: "Código fuente en GitHub",
    targetsAria: "Elige la plataforma del servidor",
    platforms: {
      desktop: {
        label: "Desktop",
        title: "Halla Desktop",
        subtitle: "Windows · Linux · C++17 + Qt 6",
        description:
          "Descarga el instalador NSIS para Windows — el botón siempre apunta a la última release publicada. En Linux, compila desde el código fuente con CMake. El modo WebRTC nativo de compartición de pantalla es opcional y usa el SDK precompilado de Halla WebRTC Builds.",
        releaseNote:
          "Instaladores y binarios están en la pestaña Releases del repositorio.",
        code: `# Linux (instala dependencias si faltan)
./build-linux.sh
./build/Halla

# Windows / manual — cualquier plataforma
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
          "App Android nativa con servicio en primer plano, PTT flotante y compartición de pantalla vía MediaProjection. El botón descarga siempre el último APK firmado; las actualizaciones también se pueden instalar desde dentro de la propia app.",
        releaseNote:
          "APK firmado con verificación apksigner y SHA-256 publicado junto.",
        code: `# Compilar desde el código fuente
./gradlew assembleDebug      # desarrollo

# Release oficial (CI en tags v*)
./gradlew assembleRelease`,
        filename: "bash — android",
        deps: [
          "Android Studio",
          "JDK 17",
          "Android SDK 34",
          "NDK 25.2.9519653",
          "Internet en el primer build",
        ],
      },
      server: {
        label: "Server",
        title: "Halla Server",
        subtitle: "Auto-alojado · C++/Qt · SQLite/MySQL",
        description:
          "Ejecuta tu propio servidor: binario único con configuración INI, certificado autofirmado generado en la primera ejecución (o Let's Encrypt), Docker, systemd y egg listo para Pterodactyl.",
        releaseNote:
          "Dockerfile, servicio systemd y egg Pterodactyl incluidos en el repo.",
        code: `# Ejecutar
./halla-server --config halla-server.ini

# Puertas por defecto
# TCP+UDP 9987 (control TLS + voz Opus AEAD)`,
        filename: "bash — servidor",
        deps: [
          "CMake + C++17",
          "Qt 6 (Network, Sql)",
          "OpenSSL",
          "SQLite o MySQL",
          "TURN opcional",
        ],
      },
    },
  },
  cta: {
    kicker: "servidor oficial · abierto al público",
    title: "Entra al servidor oficial",
    titleLine2: "y da tu opinión",
    description:
      "Canales permanentes y temporales para probar audio de baja latencia, compartición de pantalla y el ecosistema completo — desde Desktop y Mobile. ¿Encontraste un bug o tienes una sugerencia? El canal de feedback es oficial y directo.",
    report: "Reportar un bug o sugerir una mejora",
    copyAria: "Copiar la dirección del servidor oficial",
    copied: "Dirección copiada — pégala en el diálogo Conectar del cliente Halla.",
  },
  footer: {
    logoAlt: "Logotipo de Halla",
    tagline:
      "Ecosistema de comunicación por voz de código abierto: escritorio, móvil y servidor auto-alojable con protocolo propio, documentado y cifrado por defecto.",
    github: "GroupHalla en GitHub",
    projectsAria: "Proyectos de Halla",
    projectsTitle: "Proyectos",
    projects: [
      "Cliente Windows/Linux",
      "Cliente Android nativo",
      "Servidor auto-alojable",
      "SDK nativo de WebRTC",
    ],
    resourcesAria: "Recursos y documentación",
    resourcesTitle: "Recursos",
    resources: [
      "Especificación del protocolo",
      "Guía de plugins",
      "Seguridad del servidor",
      "Programa de feedback",
    ],
    license:
      "Libre para uso no comercial — usar, estudiar, modificar y redistribuir gratis. El uso comercial requiere autorización escrita de los mantenedores.",
    backToTop: "Volver arriba",
    backToTopAria: "Volver arriba",
    thirdParty:
      "Los componentes de terceros (Qt, Opus, OpenSSL, libwebrtc, mbedTLS) siguen sus respectivas licencias.",
  },
};

export default es;
