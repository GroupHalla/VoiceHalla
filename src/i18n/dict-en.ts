/* English — the canonical dictionary. The Dict type is derived from this
 * object (see dictionaries.ts), so pt/es are checked against it at build
 * time. String templates use {tag}/{v} placeholders replaced at use sites. */

const en = {
  lang: {
    ariaLabel: "Language",
  },
  nav: {
    ariaHome: "Halla — home",
    ariaOpenMenu: "Open menu",
    ariaCloseMenu: "Close menu",
    logoAlt: "Halla logo",
    links: [
      { href: "#features", label: "Features" },
      { href: "#ecosystem", label: "Ecosystem" },
      { href: "#security", label: "Security" },
      { href: "#protocol", label: "Protocol" },
      { href: "#changelog", label: "Changelog" },
      { href: "#download", label: "Download" },
    ],
  },
  hero: {
    badge: "Open source · Free for non-commercial use",
    title: "Your voice,",
    rotating: [
      "your server.",
      "your rules.",
      "your community.",
      "your freedom.",
    ],
    description:
      "Halla is a complete voice communication ecosystem — a desktop client for Windows and Linux, a native Android app, and a self-hostable server. Encrypted Opus audio, channels with granular permissions, whisper, 4K screen sharing, and an open, documented protocol. No telemetry, no middlemen, no cost.",
    downloadCta: "Download Halla",
    githubCta: "View on GitHub",
    lowLatency: "Low-latency Opus",
    encryptedVoice: "Per-channel encrypted voice",
    noTelemetry: "No telemetry",
    speakingNow: "speaking now",
    uidVerified: "Ed25519 · verified UID",
    liveLabel: "Live · 1080p60",
    heroLabel: "Main window",
    heroAlt:
      "Halla main window in the current dark theme: channel tree with speaking indicators, info panel with purple banner, and tabbed chat",
    officialTitle: "Official server online — try it now",
    officialDesc:
      "Permanent and temporary channels, open to the public, cross-platform access.",
    copyAria: "Copy the official server address",
    copied: "Address copied — paste it into the Halla client's Connect dialog.",
  },
  marquee: {
    ariaLabel: "Halla technologies and platforms",
    tech: [
      "Opus voice 20 ms",
      "ChaCha20-Poly1305",
      "Ed25519 identity",
      "WebRTC 4K/60",
      "Open protocol v6",
      "Whisper",
      "Floating PTT",
      "Temporary channels",
      "Ed25519 badges",
      "TLS + TOFU pinning",
      "3D audio and radio",
      ".halla-addon packs",
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
      "Optional TURN",
      "Non-commercial use",
      "pt-BR · en · es",
    ],
  },
  stats: {
    ariaLabel: "Halla in numbers",
    items: [
      "platforms speaking the same protocol",
      "per Opus voice frame, over UDP",
      "of resolution in screen sharing",
      "open, documented protocol",
      "telemetry, ads or mandatory accounts",
    ],
  },
  ecosystem: {
    kicker: "Ecosystem",
    title: "One protocol, three projects —",
    titleLine2: "from your pocket to the datacenter",
    description:
      "Desktop, Mobile and Server speak the same language: the open v6 protocol. Join the same server from your PC or phone, share your screen from either one, and host everything on your own infrastructure.",
    versionAria: "Loading version",
    treeServer: "myserver.example.com",
    treeLobby: "Lobby",
    treeGameRoom: "Game room",
    treeMeetings: "Meetings",
    treePassword: "password",
    treeTempChannel: "Temporary channel…",
    desktopDesc:
      "The full client for Windows and Linux, in C++17 with Qt 6. Icons drawn at runtime, instant light/dark theme, and every administration tool a community needs.",
    desktopChips: [
      "Push-to-talk",
      "Whisper",
      "Global hotkeys",
      "Call overlay",
      "WAV recording",
    ],
    mobileDesc:
      "Native Android app (Kotlin + C++/JNI core) — no Qt, no wrapper. Voice with echo cancellation and noise suppression, silent reconnection when switching networks, and a foreground service that survives a locked screen.",
    mobileChips: [
      "Floating PTT",
      "Wi-Fi ↔ cellular",
      "MediaProjection",
      "pt · en · es",
    ],
    mobileNotifTitle: "Halla · Game room",
    mobileNotifSub: "3 in channel · connected",
    mobilePttLabel: "Floating PTT · over other apps",
    mobilePttAria: "Example of a floating push-to-talk button",
    serverDesc:
      "Self-hostable server in C++/Qt: TLS on the control channel, pure relay voice — it never decrypts audio. SQLite or MySQL.",
    serverChips: ["Docker", "systemd", "Pterodactyl", "Optional TURN"],
    terminalLines: [
      "[ok] TLS active — self-signed cert.pem",
      "[ok] control TCP/9987 · voice UDP/9987",
      "[ok] SQLite connected · 32 clients max.",
      "[ok] AEAD relay — the server never decrypts",
    ],
    terminalReady: "Halla Server {v} ready.",
    terminalReadyPlain: "Halla Server ready.",
    protocolTitle: "Open protocol v6",
    protocolBadge: "public",
    protocolDesc:
      "The specification is open for anyone to implement compatible clients, bots and tools. The security layer — TLS, Ed25519 and AEAD voice — is mandatory in every version.",
    transports: [
      { label: "TCP + TLS 1.2+", sub: "control · JSON" },
      { label: "UDP · Opus AEAD", sub: "voice · 20 ms" },
      { label: "DTLS-SRTP P2P", sub: "screen · WebRTC" },
      { label: "TLS", sub: "ServerQuery" },
    ],
    readSpec: "Read the full specification",
  },
  features: {
    kicker: "Features",
    title: "Built for communities",
    titleLine2: "that take voice seriously",
    description:
      "Every feature exists to give you total control: over the audio, the permissions and the infrastructure. No paid features, no ads, no mandatory accounts.",
    voiceTitle: "Low-latency voice",
    voiceDesc:
      "Opus codec with 20 ms frames, echo cancellation, noise removal, typing attenuation and automatic ducking. Push-to-talk (hotkey or mouse button), voice detection or continuous transmission.",
    screenTitle: "Screen sharing up to 4K/60",
    screenDesc:
      "WebRTC P2P with DTLS-SRTP and hardware H.264 with VP8 fallback. PC audio captured without echo from the call's voices.",
    items: [
      {
        title: "Whisper",
        description:
          "Speak to a single channel, a channel and its subchannels, or a fixed list of users — with its own visual indicator, distinct from the normal speaking indicator.",
      },
      {
        title: "Channels and permissions",
        description:
          "Tree with subchannels, on-demand temporary rooms, password-protected, moderated and linked channels. Groups with granular permissions and talk power.",
      },
      {
        title: "Text chat",
        description:
          "Tabs per server and channel, BBCode with bold, italics, colors and links, emojis, offline messages and file transfer.",
      },
      {
        title: "Add-ons",
        description:
          ".halla-addon packs with a public C ABI shared between Desktop and Mobile: PCM audio hooks, radio effect and v6 data transport.",
      },
      {
        title: "Verifiable badges",
        description:
          "Global badges tied to your UID, distributed through a signed Ed25519 registry and kept in cache — they even work offline.",
      },
      {
        title: "Recording and TTS",
        description:
          "Record calls locally to WAV, hear announcements via text-to-speech, and get sound alerts for connections and permissions.",
      },
      {
        title: "Moderated community",
        description:
          "Poke, complaints, ban list, avatars, BBCode descriptions and multiple local identities with audio profiles.",
      },
      {
        title: "Open protocol",
        description:
          "Publicly documented v6 specification for implementing clients, bots and tools. TCP/TLS control with JSON and encrypted UDP voice.",
      },
    ],
  },
  gallery: {
    kicker: "Interface",
    title: "Clean, classic and",
    titleLine2: "straight to the point",
    description:
      "The interface follows the tradition of the great voice clients: information-dense, easy to master, with light and dark themes switchable in real time — no restart needed.",
    ariaLabel: "Halla screenshots",
    emptyPrefix: "No screenshots found in",
    emptySuffix: ". Add PNGs to that folder to see them here.",
    shots: {
      "01-janela-principal": {
        label: "Main window",
        caption:
          "The main window in the dark theme: channels, info and chat in one place.",
        alt: "Halla screenshot: main window with channel tree, info panel and tabbed chat",
      },
      "02-boas-vindas": {
        label: "Welcome",
        caption: "The first-run welcome screen with quick setup.",
        alt: "Halla screenshot: welcome screen",
      },
      "03-conectar": {
        label: "Connect",
        caption: "Connecting to a server, with the address book.",
        alt: "Halla screenshot: connect dialog",
      },
      "04-opcoes": {
        label: "Options",
        caption: "Audio, identity, hotkeys and notification settings.",
        alt: "Halla screenshot: options dialog",
      },
      "05-criar-canal": {
        label: "Create channel",
        caption: "Creating a channel with permissions and codec settings.",
        alt: "Halla screenshot: create-channel dialog",
      },
    },
  },
  security: {
    kicker: "Security first",
    title: "The server never hears",
    titleLine2: "what you say",
    description:
      "Halla's security architecture is mandatory for every connection, regardless of protocol version. It is not a premium option — it is the default.",
    flowTitle: "how audio travels",
    flowServerChip: "server",
    flowServer: "forwards encrypted",
    flowServerDenied: "without being able to decrypt",
    flowYou: "you",
    flowValidateTag: "validates AEAD tag",
    flowDecode: "decodes",
    flowSpeaker: "speaker",
    items: [
      {
        title: "Ed25519 identity",
        description:
          "Every client generates an Ed25519 key pair. Login requires signing a nonce challenge — and the UID is derived from the public key, never from what the client claims to be. Bans, groups and badges are tied to that identity.",
      },
      {
        title: "Per-channel encrypted voice",
        description:
          "Opus audio and transmissions encrypted with ChaCha20-Poly1305 (AEAD) using a 32-byte group key generated by the clients themselves. The server is a pure relay: it only forwards e2e_key envelopes it cannot open.",
      },
      {
        title: "Key rotation",
        description:
          "Whenever a channel's membership changes — someone joins, leaves or is moved — the group key is rotated and redistributed by the clients, sealed with ephemeral X25519. Forward secrecy built into the protocol, with no effort from the user.",
      },
      {
        title: "TLS with TOFU pinning",
        description:
          "The control channel runs over TLS 1.2+. On the first connection the certificate fingerprint is pinned; if it changes later, the client warns about a possible man-in-the-middle — SSH's trust model.",
      },
      {
        title: "Keys in the OS vault",
        description:
          "The private key is never kept in plain text: the Desktop uses Credential Manager, Keychain or Secret Service through QtKeychain; Mobile encrypts it with an AES key from the Android Keystore, with a portable password-protected backup.",
      },
      {
        title: "Verified updates",
        description:
          "Before installing any update, the client checks the SHA-256 checksum and only downloads from a fixed domain. On Mobile, the signed APK goes through apksigner verify before being published.",
      },
    ],
  },
  protocol: {
    kicker: "Open protocol v6",
    title: "Documented for everyone.",
    titleLine2: "Closed to no one.",
    description:
      "The full specification is public: anyone can implement compatible clients, bots and tools. The security layer — TLS, Ed25519 and AEAD voice — is mandatory in all versions.",
    thChannel: "Channel",
    thTransport: "Transport",
    thPort: "Port",
    transports: [
      {
        channel: "Control",
        transport: "TCP + TLS 1.2+",
        port: "9987",
        use: "Authentication, channels, chat, states, moderation and WebRTC signaling — JSON messages, one per line, up to 2 MiB.",
      },
      {
        channel: "Voice",
        transport: "UDP · Opus AEAD",
        port: "9987",
        use: "20 ms packets encrypted with ChaCha20-Poly1305 and a per-channel key. The server only relays them.",
      },
      {
        channel: "Screen (modern)",
        transport: "WebRTC P2P · DTLS-SRTP",
        port: "dynamic",
        use: "Screen-share video and audio travel directly between clients; offer/answer and ICE go through the TLS control channel.",
      },
      {
        channel: "Screen (legacy)",
        transport: "UDP · JPEG",
        port: "9987",
        use: "Sliced, encrypted JPEG frames as an alternative that needs no native WebRTC SDK.",
      },
      {
        channel: "ServerQuery",
        transport: "TCP + TLS",
        port: "configurable",
        use: "Remote server administration, disabled by default and bound to localhost when enabled.",
      },
    ],
    loginTitle: "Login with proof of possession",
    spoofNote:
      "The server ignores the UID sent by the client and recalculates it from the public key. Identity spoofing becomes impractical.",
    readSpec: "Read the full specification",
  },
  changelog: {
    kicker: "Changelog",
    title: "Every release,",
    titleLine2: "on the record",
    description:
      "The full history since protocol v6 — the day end-to-end encryption became real. Pick a project and follow along: no hidden launches, no silent changes.",
    channelAria: "Choose the project",
    channels: {
      desktop: "Desktop",
      mobile: "Mobile",
      server: "Server",
    },
    latest: "Latest",
    milestone: "Protocol v6",
    viewRelease: "View release",
    viewReleaseAria: "View release {tag} on GitHub",
    fullHistory: "Full release history on GitHub",
    categories: {
      protocol: "Protocol",
      security: "Security",
      added: "Added",
      changed: "Changed",
      fixed: "Fixed",
      performance: "Performance",
    },
    sinceNote:
      "Showing releases since the protocol v6 rollout · September 2026",
  },
  downloads: {
    kicker: "Download",
    title: "Start talking in minutes",
    description:
      "Free for personal, educational and community use: use, study, modify and redistribute without asking permission. Selling it or embedding it in a commercial product requires written authorization from the maintainers.",
    platformsAria: "Halla platforms",
    buildTitle: "Build from source",
    copyAria: "Copy commands",
    copied: "copied",
    copy: "copy",
    downloadTag: "Download {tag}",
    downloadFallback: "Download release",
    releasesLink: "or open the releases page on GitHub →",
    sourceLink: "Source code on GitHub",
    targetsAria: "Choose the server platform",
    platforms: {
      desktop: {
        label: "Desktop",
        title: "Halla Desktop",
        subtitle: "Windows · Linux · C++17 + Qt 6",
        description:
          "Download the NSIS installer for Windows — the button always points to the latest published release. On Linux, build from source with CMake. The native WebRTC screen-sharing mode is optional and uses the prebuilt Halla WebRTC Builds SDK.",
        releaseNote:
          "Installers and binaries live in the repository's Releases tab.",
        code: `# Linux (installs dependencies if missing)
./build-linux.sh
./build/Halla

# Windows / manual — any platform
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build`,
        filename: "bash — linux / windows",
        deps: ["CMake >= 3.21", "Qt 6.2+", "OpenSSL", "libopus", "QtKeychain"],
      },
      mobile: {
        label: "Mobile",
        title: "Halla Mobile",
        subtitle: "Android 8.0+ (API 26) · Kotlin + C++/JNI",
        description:
          "Native Android app with a foreground service, floating PTT and screen sharing via MediaProjection. The button always downloads the latest signed APK; updates can also be installed from inside the app itself.",
        releaseNote:
          "APK signed with apksigner verification, with the SHA-256 published alongside it.",
        code: `# Build from source
./gradlew assembleDebug      # development

# Official release (CI on v* tags)
./gradlew assembleRelease`,
        filename: "bash — android",
        deps: [
          "Android Studio",
          "JDK 17",
          "Android SDK 34",
          "NDK 25.2.9519653",
          "Internet on first build",
        ],
      },
      server: {
        label: "Server",
        title: "Halla Server",
        subtitle: "Self-hosted · C++/Qt · SQLite/MySQL",
        description:
          "Run your own server: a single binary with INI configuration, self-signed certificate generated on first run (or Let's Encrypt), Docker, systemd and a ready-made Pterodactyl egg.",
        releaseNote:
          "Dockerfile, systemd service and Pterodactyl egg included in the repo.",
        code: `# Run
./halla-server --config halla-server.ini

# Default ports
# TCP+UDP 9987 (TLS control + Opus AEAD voice)`,
        filename: "bash — server",
        deps: [
          "CMake + C++17",
          "Qt 6 (Network, Sql)",
          "OpenSSL",
          "SQLite or MySQL",
          "Optional TURN",
        ],
      },
    },
  },
  cta: {
    kicker: "official server · open to the public",
    title: "Join the official server",
    titleLine2: "and share your opinion",
    description:
      "Permanent and temporary channels to test low-latency audio, screen sharing and the full ecosystem — from both Desktop and Mobile. Found a bug or have a suggestion? The feedback channel is official and direct.",
    report: "Report a bug or suggest an improvement",
    copyAria: "Copy the official server address",
    copied: "Address copied — paste it into the Halla client's Connect dialog.",
  },
  footer: {
    logoAlt: "Halla logo",
    tagline:
      "Open-source voice communication ecosystem: desktop, mobile and a self-hostable server with its own documented protocol, encrypted by default.",
    github: "GroupHalla on GitHub",
    projectsAria: "Halla projects",
    projectsTitle: "Projects",
    projects: [
      "Windows/Linux client",
      "Native Android client",
      "Self-hosted server",
      "Native WebRTC SDK",
    ],
    resourcesAria: "Resources and documentation",
    resourcesTitle: "Resources",
    resources: [
      "Protocol specification",
      "Plugin guide",
      "Server security",
      "Feedback program",
    ],
    license:
      "Free for non-commercial use — use, study, modify and redistribute at no cost. Commercial use requires written authorization from the maintainers.",
    backToTop: "Back to top",
    backToTopAria: "Back to top",
    thirdParty:
      "Third-party components (Qt, Opus, OpenSSL, libwebrtc, mbedTLS) follow their respective licenses.",
  },
};

export default en;
