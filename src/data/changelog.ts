/* Curated release history since the protocol v6 rollout (2026-09-02), when
 * end-to-end encryption became real across the ecosystem.
 *
 * Entries are user-facing and curated from the actual commit history and
 * release notes of each repository — not generated. Text ships in the three
 * site languages (en is canonical; pt/es are checked by review).
 *
 * Keep entries factual: no marketing adjectives, name the user-visible
 * behavior, not the internal class names. */

export type ChangelogChannel = "desktop" | "mobile" | "server";

export type ChangelogCategory =
  | "protocol"
  | "security"
  | "added"
  | "changed"
  | "fixed"
  | "performance";

export interface LText {
  en: string;
  pt: string;
  es: string;
}

export interface ChangelogEntry {
  category: ChangelogCategory;
  text: LText;
}

export interface ChangelogRelease {
  channel: ChangelogChannel;
  /** Version without the leading "v". */
  version: string;
  /** ISO date (YYYY-MM-DD) of publication. */
  date: string;
  /** GitHub repository name under GroupHalla. */
  repo: "Halla" | "Halla-Mobile" | "HallaServer";
  /** One-line headline naming the theme of the release. */
  headline: LText;
  /** True for the releases that landed protocol v6. */
  milestone?: boolean;
  entries: ChangelogEntry[];
}

const e = (
  category: ChangelogCategory,
  en: string,
  pt: string,
  es: string,
): ChangelogEntry => ({ category, text: { en, pt, es } });

/* Newest first within each channel. */
export const CHANGELOG: ChangelogRelease[] = [
  /* ------------------------------------------------------------------ */
  /* Desktop                                                             */
  /* ------------------------------------------------------------------ */
  {
    channel: "desktop",
    version: "1.1.24",
    date: "2026-09-07",
    repo: "Halla",
    headline: {
      en: "Real voice DSP, built into the binary",
      pt: "DSP de voz real, embutido no binário",
      es: "DSP de voz real, integrado en el binario",
    },
    entries: [
      e(
        "added",
        "The official installer now ships a full voice DSP: RNNoise neural noise suppression, AUMDF acoustic echo cancellation and an 80 Hz high-pass filter — clean audio with no WebRTC SDK required.",
        "O instalador oficial agora traz um DSP de voz completo: supressão de ruído neural RNNoise, cancelamento de eco acústico AUMDF e filtro passa-altas de 80 Hz — áudio limpo sem precisar do SDK do WebRTC.",
        "El instalador oficial ahora incluye un DSP de voz completo: supresión de ruido neuronal RNNoise, cancelación de eco acústico AUMDF y filtro paso alto de 80 Hz — audio limpio sin necesidad del SDK de WebRTC.",
      ),
      e(
        "fixed",
        "In the distributed build, the noise-suppression and echo-cancellation checkboxes were previously no-ops (passthrough). Both now process every captured frame.",
        "No build distribuído, as caixas de redução de ruído e cancelamento de eco antes não faziam nada (passthrough). Agora ambas processam cada quadro capturado.",
        "En el build distribuido, las casillas de reducción de ruido y cancelación de eco antes no hacían nada (passthrough). Ahora ambas procesan cada fotograma capturado.",
      ),
      e(
        "fixed",
        "The speech cue (beep when your voice starts) now respects a muted microphone in both continuous and voice-activity modes.",
        "O aviso sonoro de fala (beep quando a voz começa) agora respeita o microfone mutado nos modos contínuo e por atividade de voz.",
        "El aviso sonoro de voz (beep cuando empiezas a hablar) ahora respeta el micrófono silenciado en los modos continuo y por actividad de voz.",
      ),
      e(
        "security",
        "CI now gates every release on measured echo cancellation (ERLE ≥ 12 dB) and noise suppression (≥ 10 dB) over synthetic signals.",
        "O CI agora exige em cada release cancelamento de eco medido (ERLE ≥ 12 dB) e supressão de ruído (≥ 10 dB) sobre sinais sintéticos.",
        "El CI ahora exige en cada versión cancelación de eco medida (ERLE ≥ 12 dB) y supresión de ruido (≥ 10 dB) sobre señales sintéticas.",
      ),
    ],
  },
  {
    channel: "desktop",
    version: "1.1.23",
    date: "2026-09-07",
    repo: "Halla",
    headline: {
      en: "Whisper cue in voice-activity mode",
      pt: "Aviso de sussurro no modo por atividade de voz",
      es: "Aviso de susurro en el modo por actividad de voz",
    },
    entries: [
      e(
        "fixed",
        "The whisper sound cue now plays the instant the whisper key or mouse button is pressed while in voice-activity mode — previously it only played in push-to-talk.",
        "O aviso sonoro de sussurro agora toca no instante em que a tecla ou o botão é pressionado no modo por atividade de voz — antes só tocava no push-to-talk.",
        "El aviso sonoro del susurro ahora suena en el instante en que se pulsa la tecla o el botón en el modo por actividad de voz — antes solo sonaba en el pulsar-para-hablar.",
      ),
    ],
  },
  {
    channel: "desktop",
    version: "1.1.22",
    date: "2026-09-07",
    repo: "Halla",
    headline: {
      en: "Crosstalk guard",
      pt: "Guarda de crosstalk",
      es: "Guardia de diafonía",
    },
    entries: [
      e(
        "fixed",
        "The speaking indicator no longer lights up on two users at once: your microphone no longer retransmits the other party's voice, and the ring shows who is actually talking.",
        "O indicador de fala não acende mais em dois usuários ao mesmo tempo: o seu microfone não retransmite mais a voz do outro lado, e o anel mostra quem está falando de verdade.",
        "El indicador de voz ya no se enciende en dos usuarios a la vez: tu micrófono ya no retransmite la voz de la otra parte, y el anillo muestra quién está hablando realmente.",
      ),
    ],
  },
  {
    channel: "desktop",
    version: "1.1.21",
    date: "2026-09-07",
    repo: "Halla",
    headline: {
      en: "Clean voice",
      pt: "Voz limpa",
      es: "Voz limpia",
    },
    entries: [
      e(
        "fixed",
        "End of the crackling on voice activity: the transmission gate now uses audio hysteresis with attack and release ramps, so weak consonants between vowels no longer cut the stream.",
        "Fim da pipocada na atividade de voz: o gate de transmissão agora usa histerese de áudio com ramps de abertura e fechamento — consoantes fracas entre vogais não cortam mais o áudio.",
        "Fin del chisporroteo en la actividad de voz: la puerta de transmisión ahora usa histéresis de audio con rampas de apertura y cierre — las consonantes débiles entre vocales ya no cortan el audio.",
      ),
      e(
        "added",
        "Microphone boost up to +30 dB for quiet microphones, plus per-user volume from −60 to +30 dB, persisted across restarts.",
        "Boost de microfone de até +30 dB para mics silenciosos, e volume por usuário de −60 a +30 dB, persistido entre reinícios.",
        "Realce de micrófono de hasta +30 dB para micrófonos silenciosos, y volumen por usuario de −60 a +30 dB, persistido entre reinicios.",
      ),
      e(
        "fixed",
        "Sent E2EE whispers and private messages are now readable to the sender: your own messages echo back decrypted with the recipient's key.",
        "Sussurros e mensagens privadas E2EE enviadas agora podem ser lidos pelo remetente: suas próprias mensagens voltam decifradas com a chave do destinatário.",
        "Los susurros y mensajes privados E2EE enviados ahora son legibles para el remitente: tus propios mensajes vuelven descifrados con la clave del destinatario.",
      ),
      e(
        "security",
        "E2EE keys are now trusted automatically on first use (TOFU, like SSH) — the manual verification step is gone; identity changes still trigger an alert.",
        "As chaves E2EE agora são confiadas automaticamente no primeiro uso (TOFU, como no SSH) — o passo manual de verificação acabou; mudanças de identidade continuam disparando alerta.",
        "Las claves E2EE ahora se confían automáticamente en el primer uso (TOFU, como en SSH) — se eliminó el paso manual de verificación; los cambios de identidad siguen generando una alerta.",
      ),
    ],
  },
  {
    channel: "desktop",
    version: "1.1.20",
    date: "2026-09-07",
    repo: "Halla",
    headline: {
      en: "Real-time voice DSP and lighter calls",
      pt: "DSP de voz em tempo real e calls mais leves",
      es: "DSP de voz en tiempo real y llamadas más ligeras",
    },
    entries: [
      e(
        "added",
        "AEC3 echo cancellation and neural (RNN) noise suppression through the WebRTC Audio Processing Module, replacing the previous no-op passthrough.",
        "Cancelamento de eco AEC3 e supressão de ruído neural (RNN) via módulo de processamento de áudio do WebRTC, substituindo o passthrough anterior.",
        "Cancelación de eco AEC3 y supresión de ruido neuronal (RNN) mediante el módulo de procesamiento de audio de WebRTC, en sustitución del passthrough anterior.",
      ),
      e(
        "added",
        "Speech cue: a subtle beep confirms your voice is being detected, independent of the transmission state.",
        "Aviso de fala: um beep sutil confirma que sua voz está sendo detectada, independente do estado de transmissão.",
        "Aviso de voz: un beep sutil confirma que tu voz está siendo detectada, independientemente del estado de transmisión.",
      ),
      e(
        "performance",
        "Calls stop crackling and the app gets lighter on CPU and memory while someone is transmitting.",
        "As calls param de picotar e o app fica mais leve em CPU e memória quando alguém está transmitindo.",
        "Las llamadas dejan de chisporrotear y la app consume menos CPU y memoria cuando alguien transmite.",
      ),
      e(
        "changed",
        "Screen sharing defaults to 1080p (2K and 4K remain available) with the H.264 encoder on by default.",
        "A transmissão de tela agora usa 1080p por padrão (2K e 4K continuam disponíveis) com o codificador H.264 ativado por padrão.",
        "La transmisión de pantalla usa 1080p por defecto (2K y 4K siguen disponibles) con el codificador H.264 activado por defecto.",
      ),
    ],
  },
  {
    channel: "desktop",
    version: "1.1.19",
    date: "2026-09-07",
    repo: "Halla",
    headline: {
      en: "Instant PTT and whisper",
      pt: "PTT e sussurro instantâneos",
      es: "PTT y susurro instantáneos",
    },
    entries: [
      e(
        "fixed",
        "Push-to-talk key and whisper list changes now apply immediately — no more reconnecting or reopening the options dialog for them to take effect.",
        "Mudanças na tecla de push-to-talk e na lista de sussurro agora valem na hora — sem precisar reconectar nem reabrir o diálogo de opções.",
        "Los cambios de tecla de pulsar-para-hablar y de la lista de susurro ahora se aplican al instante — sin reconectar ni reabrir el diálogo de opciones.",
      ),
      e(
        "added",
        "Whisper reply hotkey: answer the last person who whispered to you with a single key.",
        "Atalho de resposta ao sussurro: responda à última pessoa que te sussurrou com uma única tecla.",
        "Atajo de respuesta al susurro: responde a la última persona que te susurró con una sola tecla.",
      ),
    ],
  },
  {
    channel: "desktop",
    version: "1.1.18",
    date: "2026-09-02",
    repo: "Halla",
    milestone: true,
    headline: {
      en: "Protocol v6: real end-to-end encryption",
      pt: "Protocolo v6: criptografia de ponta a ponta real",
      es: "Protocolo v6: cifrado de extremo a extremo real",
    },
    entries: [
      e(
        "protocol",
        "Protocol v6: group keys are generated and distributed by the clients themselves — ephemeral X25519 + HKDF-SHA256 + AES-256-GCM. The server became an opaque relay: it can no longer decrypt voice, private chat, pokes or offline messages.",
        "Protocolo v6: as chaves de grupo agora são geradas e distribuídas pelos próprios clientes — X25519 efêmera + HKDF-SHA256 + AES-256-GCM. O servidor virou um relay opaco: não consegue mais decifrar voz, conversa privada, pokes nem mensagens offline.",
        "Protocolo v6: las claves de grupo ahora las generan y distribuyen los propios clientes — X25519 efímera + HKDF-SHA256 + AES-256-GCM. El servidor pasó a ser un relé opaco: ya no puede descifrar voz, chat privado, pokes ni mensajes offline.",
      ),
      e(
        "security",
        "Every session publishes an X25519 key signed by your Ed25519 identity and validated during login — a malicious server can no longer substitute keys.",
        "Cada sessão publica uma chave X25519 assinada pela sua identidade Ed25519 e validada no login — um servidor malicioso não consegue mais substituir chaves.",
        "Cada sesión publica una clave X25519 firmada por tu identidad Ed25519 y validada al iniciar sesión — un servidor malicioso ya no puede sustituir claves.",
      ),
      e(
        "security",
        "Private chat, pokes and offline messages are now pairwise-encrypted end-to-end between sender and recipient.",
        "Conversa privada, pokes e mensagens offline agora são cifradas ponta a ponta entre remetente e destinatário.",
        "El chat privado, los pokes y los mensajes offline ahora se cifran de extremo a extremo entre remitente y destinatario.",
      ),
      e(
        "security",
        "The crypto core is implemented through RFC 8410 without NIDs and is verified in CI against the official RFC 7748 (X25519) and NIST AES-256-GCM test vectors.",
        "O núcleo criptográfico é implementado via RFC 8410 sem NIDs e é verificado no CI contra os vetores oficiais do RFC 7748 (X25519) e do NIST (AES-256-GCM).",
        "El núcleo criptográfico está implementado mediante RFC 8410 sin NIDs y se verifica en CI contra los vectores oficiales de RFC 7748 (X25519) y NIST (AES-256-GCM).",
      ),
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Mobile                                                              */
  /* ------------------------------------------------------------------ */
  {
    channel: "mobile",
    version: "1.0.99",
    date: "2026-09-07",
    repo: "Halla-Mobile",
    headline: {
      en: "E2EE: automatic trust and readable sent messages",
      pt: "E2EE: confiança automática e mensagens enviadas legíveis",
      es: "E2EE: confianza automática y mensajes enviados legibles",
    },
    entries: [
      e(
        "fixed",
        "Sent end-to-end encrypted private messages now appear readable to you — decrypted with the recipient's key, exactly as the other side sees them.",
        "Mensagens privadas cifradas ponta a ponta enviadas agora aparecem legíveis para você — decifradas com a chave do destinatário, exatamente como o outro lado as vê.",
        "Los mensajes privados cifrados de extremo a extremo que envías ahora se ven legibles para ti — descifrados con la clave del destinatario, exactamente como los ve la otra parte.",
      ),
      e(
        "security",
        "Automatic trust on first use (TOFU) for E2EE keys — the manual verification step is gone; identity changes still alert you.",
        "Confiança automática no primeiro uso (TOFU) para as chaves E2EE — o passo manual de verificação acabou; mudanças de identidade continuam gerando alerta.",
        "Confianza automática en el primer uso (TOFU) para las claves E2EE — se eliminó el paso manual de verificación; los cambios de identidad siguen alertándote.",
      ),
    ],
  },
  {
    channel: "mobile",
    version: "1.0.98",
    date: "2026-09-07",
    repo: "Halla-Mobile",
    headline: {
      en: "Updater, headsets and volume controls",
      pt: "Atualizador, fones de ouvido e controles de volume",
      es: "Actualizador, auriculares y controles de volumen",
    },
    entries: [
      e(
        "fixed",
        "The in-app updater was failing with a SHA-256 checksum error — the checksum parser now handles every release-note format.",
        "O atualizador in-app falhava com erro de checksum SHA-256 — o parser do checksum agora entende todos os formatos de nota de release.",
        "El actualizador integrado fallaba con un error de checksum SHA-256 — el analizador del checksum ahora entiende todos los formatos de nota de versión.",
      ),
      e(
        "fixed",
        "Wired and USB headsets now take priority as the audio route and are picked up on plug/unplug, even with the app in the background.",
        "Fones com fio e USB agora têm prioridade como rota de áudio e são detectados ao conectar/desconectar, mesmo com o app em segundo plano.",
        "Los auriculares con cable y USB ahora tienen prioridad como ruta de audio y se detectan al conectar/desconectar, incluso con la app en segundo plano.",
      ),
      e(
        "added",
        "Microphone boost from 0 to +30 dB with soft-clipping, and per-user volume from −60 to +30 dB saved per identity — in the app and in the background service alike.",
        "Boost de microfone de 0 a +30 dB com soft-clip, e volume por usuário de −60 a +30 dB salvo por identidade — tanto no app quanto no serviço em segundo plano.",
        "Realce de micrófono de 0 a +30 dB con soft-clip, y volumen por usuario de −60 a +30 dB guardado por identidad — tanto en la app como en el servicio en segundo plano.",
      ),
    ],
  },
  {
    channel: "mobile",
    version: "1.0.97",
    date: "2026-09-07",
    repo: "Halla-Mobile",
    headline: {
      en: "Crosstalk guard",
      pt: "Guarda de crosstalk",
      es: "Guardia de diafonía",
    },
    entries: [
      e(
        "fixed",
        "Your phone no longer retransmits the other party's voice: the speaking indicator lights only for the person actually talking — no more double rings in a call.",
        "O celular não retransmite mais a voz do outro lado: o indicador de fala acende só para quem está falando de verdade — chega de anéis duplos na call.",
        "El móvil ya no retransmite la voz de la otra parte: el indicador de voz se enciende solo para quien está hablando realmente — se acabaron los anillos dobles en la llamada.",
      ),
    ],
  },
  {
    channel: "mobile",
    version: "1.0.96",
    date: "2026-09-03",
    repo: "Halla-Mobile",
    headline: {
      en: "Performance and architecture",
      pt: "Performance e arquitetura",
      es: "Rendimiento y arquitectura",
    },
    entries: [
      e(
        "performance",
        "Leaner JNI layer: threads attach to the JVM once with RAII, the JSON parser became structural, and echo cancellation follows the communication audio route.",
        "Camada JNI mais enxuta: as threads se anexam à JVM uma única vez com RAII, o parser de JSON virou estrutural e o cancelamento de eco acompanha a rota de áudio de comunicação.",
        "Capa JNI más ligera: los hilos se adjuntan a la JVM una sola vez con RAII, el analizador de JSON pasó a ser estructural y la cancelación de eco sigue la ruta de audio de comunicación.",
      ),
      e(
        "changed",
        "The 5,000-line MainActivity monolith was dismantled into 13 focused controllers: state, settings, audio route, channel tree and dialogs, servers, server admin, chat, identity, whisper, screen share and role icons.",
        "O monólito de 5.000 linhas do MainActivity foi desmontado em 13 controllers focados: estado, configurações, rota de áudio, árvore e diálogos de canais, servidores, administração do servidor, chat, identidade, sussurro, transmissão de tela e ícones de cargo.",
        "El monolito de 5.000 líneas de MainActivity se desmontó en 13 controladores enfocados: estado, ajustes, ruta de audio, árbol y diálogos de canales, servidores, administración del servidor, chat, identidad, susurro, transmisión de pantalla e iconos de rol.",
      ),
    ],
  },
  {
    channel: "mobile",
    version: "1.0.95",
    date: "2026-09-02",
    repo: "Halla-Mobile",
    milestone: true,
    headline: {
      en: "Protocol v6: real end-to-end encryption",
      pt: "Protocolo v6: criptografia de ponta a ponta real",
      es: "Protocolo v6: cifrado de extremo a extremo real",
    },
    entries: [
      e(
        "protocol",
        "Protocol v6 with real end-to-end encryption: a signed X25519/Ed25519 key pair per session, group keys generated and distributed by the clients, and the server acting only as an opaque relay.",
        "Protocolo v6 com criptografia de ponta a ponta real: par de chaves X25519/Ed25519 assinado por sessão, chaves de grupo geradas e distribuídas pelos clientes e servidor agindo só como relay opaco.",
        "Protocolo v6 con cifrado de extremo a extremo real: par de claves X25519/Ed25519 firmado por sesión, claves de grupo generadas y distribuidas por los clientes y el servidor actuando solo como relé opaco.",
      ),
      e(
        "security",
        "Private chat, pokes and offline messages are pairwise-encrypted between sender and recipient.",
        "Conversa privada, pokes e mensagens offline são cifradas ponta a ponta entre remetente e destinatário.",
        "El chat privado, los pokes y los mensajes offline se cifran por pares entre remitente y destinatario.",
      ),
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Server                                                              */
  /* ------------------------------------------------------------------ */
  {
    channel: "server",
    version: "1.1.68",
    date: "2026-09-06",
    repo: "HallaServer",
    headline: {
      en: "Ghost sessions eliminated",
      pt: "Fim das sessões fantasma",
      es: "Fin de las sesiones fantasma",
    },
    entries: [
      e(
        "fixed",
        "Ghost sessions are gone: sessions that lost their connection without a proper logout no longer linger for five minutes.",
        "Fim das sessões fantasma: sessões que perderam a conexão sem logout adequado não ficam mais penduradas por cinco minutos.",
        "Se acabaron las sesiones fantasma: las sesiones que perdían la conexión sin un cierre adecuado ya no quedan colgadas cinco minutos.",
      ),
      e(
        "fixed",
        "A watchdog now clears a stuck talking indicator when a client stops sending voice without leaving the channel.",
        "Um watchdog agora limpa o indicador de fala travado quando um cliente para de enviar voz sem sair do canal.",
        "Un watchdog ahora limpia el indicador de voz atascado cuando un cliente deja de enviar voz sin salir del canal.",
      ),
      e(
        "changed",
        "PROTOCOL.md and README now fully document protocol v6 (real E2EE).",
        "O PROTOCOL.md e o README agora documentam integralmente o protocolo v6 (E2EE real).",
        "PROTOCOL.md y el README ahora documentan íntegramente el protocolo v6 (E2EE real).",
      ),
    ],
  },
  {
    channel: "server",
    version: "1.1.67",
    date: "2026-09-02",
    repo: "HallaServer",
    milestone: true,
    headline: {
      en: "Protocol v6: key directory and opaque relay",
      pt: "Protocolo v6: diretório de chaves e relay opaco",
      es: "Protocolo v6: directorio de claves y relé opaco",
    },
    entries: [
      e(
        "protocol",
        "The server is now a public-key directory (identity_get) and an opaque relay for e2e_key envelopes — it no longer generates, holds or distributes any channel key.",
        "O servidor agora é um diretório de chaves públicas (identity_get) e um relay opaco para envelopes e2e_key — não gera, não guarda e não distribui mais nenhuma chave de canal.",
        "El servidor ahora es un directorio de claves públicas (identity_get) y un relé opaco para sobres e2e_key — ya no genera, guarda ni distribuye ninguna clave de canal.",
      ),
      e(
        "security",
        "Login requires the X25519/Ed25519 binding: dhPub is validated against the Ed25519 signature in hello.",
        "O login exige o vínculo X25519/Ed25519: o dhPub é validado contra a assinatura Ed25519 no hello.",
        "El inicio de sesión exige el vínculo X25519/Ed25519: el dhPub se valida contra la firma Ed25519 en el hello.",
      ),
      e(
        "changed",
        "v5 and older clients are rejected at login (bad_proto) — end-to-end encryption is mandatory; kProtoMin = 6.",
        "Clientes v5 e mais antigos são rejeitados no login (bad_proto) — a criptografia de ponta a ponta é obrigatória; kProtoMin = 6.",
        "Los clientes v5 y anteriores se rechazan al iniciar sesión (bad_proto) — el cifrado de extremo a extremo es obligatorio; kProtoMin = 6.",
      ),
      e(
        "security",
        "The v6 test suite runs the E2EE handshake in every integration test and verifies the opaque relay, wrong-recipient envelopes, old-client rejection and rate-limit pacing on e2e_key_request.",
        "A suíte de testes v6 roda o handshake E2EE em todos os testes de integração e verifica o relay opaco, envelopes com destinatário errado, rejeição de cliente antigo e o pacing de rate limit do e2e_key_request.",
        "La suite de pruebas v6 ejecuta el handshake E2EE en todos los tests de integración y verifica el relé opaco, sobres con destinatario erróneo, el rechazo de clientes antiguos y el ritmo del limitador en e2e_key_request.",
      ),
    ],
  },
];

/** Channel display order used by the UI tabs. */
export const CHANGELOG_CHANNELS: ChangelogChannel[] = [
  "desktop",
  "mobile",
  "server",
];

/** GitHub org/repo for each channel. */
export const CHANGELOG_REPOS: Record<ChangelogChannel, string> = {
  desktop: "https://github.com/GroupHalla/Halla",
  mobile: "https://github.com/GroupHalla/Halla-Mobile",
  server: "https://github.com/GroupHalla/HallaServer",
};

export function releaseUrl(r: ChangelogRelease): string {
  return `${CHANGELOG_REPOS[r.channel]}/releases/tag/v${r.version}`;
}
