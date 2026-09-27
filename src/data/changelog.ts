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
    version: "1.1.37",
    date: "2026-09-27",
    repo: "Halla",
    headline: {
      en: "Three papercuts, gone",
      pt: "Três detalhes irritantes, resolvidos",
      es: "Tres molestias, resueltas",
    },
    entries: [
      e(
        "fixed",
        "Dragging a channel description no longer jumps back to the top while you read it.",
        "Arrastar a descrição de um canal não volta mais sozinho para o topo enquanto você lê.",
        "Arrastrar la descripción de un canal ya no vuelve solo al principio mientras lees.",
      ),
      e(
        "fixed",
        "Help > Client log opens instantly: the log rotates at 2 MiB and the dialog reads only the tail of the file instead of parsing weeks of text.",
        "Ajuda > Registro do cliente abre instantâneo: o log rotaciona em 2 MiB e o diálogo lê só o final do arquivo, em vez de processar semanas de texto.",
        "Ayuda > Registro del cliente abre al instante: el log rota en 2 MiB y el diálogo lee solo el final del archivo en vez de procesar semanas de texto.",
      ),
      e(
        "fixed",
        "Channel errors now name the channel and the reason (\"You don't have permission to join X\", \"X is full\", wrong password), missing role icons stop spamming errors, and the spurious \"you are sending requests too fast\" when joining a channel is gone.",
        "Erros de canal agora dizem o canal e o motivo (\"Você não tem permissão para entrar em X\", \"X está cheio\", senha incorreta), ícones de cargo ausentes param de disparar erros e acabou o falso \"enviando solicitações rápido demais\" ao entrar num canal.",
        "Los errores de canal ahora dicen el canal y el motivo (\"No tienes permiso para entrar en X\", \"X está lleno\", contraseña incorrecta), los iconos de rol ausentes dejan de disparar errores y se acabó el falso \"enviando solicitudes demasiado rápido\" al entrar en un canal.",
      ),
    ],
  },
  {
    channel: "desktop",
    version: "1.1.36",
    date: "2026-09-27",
    repo: "Halla",
    headline: {
      en: "Self-healing encryption keys",
      pt: "Chaves de criptografia que se curam sozinhas",
      es: "Claves de cifrado que se curan solas",
    },
    entries: [
      e(
        "fixed",
        "Switching channels updates the tree immediately again (a regression introduced by the 1.1.35 optimization).",
        "Trocar de canal volta a atualizar a árvore na hora (uma regressão introduzida pela otimização da 1.1.35).",
        "Cambiar de canal vuelve a actualizar el árbol al instante (una regresión introducida por la optimización de la 1.1.35).",
      ),
      e(
        "fixed",
        "When a channel key rotates and the new one never arrives, the client now detects the stale key within ~300 ms of speech, drops it and re-requests — voice recovers by itself in both directions in a few seconds, without reconnecting.",
        "Quando a chave de um canal rotaciona e a nova não chega, o cliente detecta a chave velha em ~300 ms de fala, descarta e pede de novo — a voz se recupera sozinha nos dois sentidos em poucos segundos, sem reconectar.",
        "Cuando la clave de un canal rota y la nueva no llega, el cliente detecta la clave vieja en ~300 ms de habla, la descarta y la pide de nuevo — la voz se recupera sola en ambos sentidos en pocos segundos, sin reconectar.",
      ),
    ],
  },
  {
    channel: "desktop",
    version: "1.1.35",
    date: "2026-09-27",
    repo: "Halla",
    headline: {
      en: "Performance for long sessions",
      pt: "Performance para sessões longas",
      es: "Rendimiento para sesiones largas",
    },
    entries: [
      e(
        "performance",
        "Speaking transitions no longer rebuild the entire channel tree with per-user pixmaps — only the changed rows repaint. This was the main cause of voice choppiness that appeared after a while in full rooms.",
        "Transições de fala não reconstruem mais a árvore inteira de canais com pixmaps por usuário — só as linhas mudadas são repintadas. Era a principal causa do picotado de voz que aparecia depois de um tempo em salas cheias.",
        "Las transiciones de habla ya no reconstruyen todo el árbol de canales con pixmaps por usuario — solo se repintan las filas cambiadas. Era la principal causa de la voz entrecortada que aparecía tras un rato en salas llenas.",
      ),
      e(
        "performance",
        "Chat keeps a maximum of 500 messages per tab and the image cache is bounded — long sessions no longer make the app heavier over time.",
        "O chat mantém no máximo 500 mensagens por aba e o cache de imagens tem teto — sessões longas não deixam o app mais pesado com o tempo.",
        "El chat mantiene un máximo de 500 mensajes por pestaña y la caché de imágenes tiene techo — las sesiones largas ya no hacen la app más pesada con el tiempo.",
      ),
      e(
        "performance",
        "The audio path stopped re-reading settings on every frame and halved its timer wake-ups (5 ms → 10 ms); icons are drawn once and cached.",
        "O caminho de áudio parou de reler configurações a cada quadro e cortou pela metade os wakeups de timer (5 ms → 10 ms); ícones são desenhados uma vez e ficam em cache.",
        "La ruta de audio dejó de releer ajustes en cada fotograma y redujo a la mitad sus activaciones de temporizador (5 ms → 10 ms); los iconos se dibujan una vez y quedan en caché.",
      ),
    ],
  },
  {
    channel: "desktop",
    version: "1.1.34",
    date: "2026-09-27",
    repo: "Halla",
    headline: {
      en: "A microphone that stops chopping",
      pt: "Um microfone que para de picotar",
      es: "Un micrófono que deja de entrecortarse",
    },
    entries: [
      e(
        "fixed",
        "The anti-crosstalk guard now needs sustained domination before muting your microphone and releases it one frame at a time with a transmitted ramp — no more clicks or long cuts when someone else talks.",
        "A guarda contra crosstalk agora exige dominação sustentada antes de mutar seu microfone e libera um quadro por vez com rampa transmitida — chega de cliques e cortes longos quando outra pessoa fala.",
        "La guarda contra diafonía ahora exige dominación sostenida antes de silenciar tu micrófono y lo libera un fotograma a la vez con una rampa transmitida — se acabaron los clics y los cortes largos cuando otra persona habla.",
      ),
      e(
        "added",
        "A watchdog reopens a microphone that delivers no samples for 2 seconds, and the capture buffer grew to 800 ms.",
        "Um watchdog reabre um microfone que não entrega amostras por 2 segundos, e o buffer de captura subiu para 800 ms.",
        "Un watchdog reabre un micrófono que no entrega muestras durante 2 segundos, y el buffer de captura subió a 800 ms.",
      ),
      e(
        "added",
        "Tools > Voice Diagnostics shows mutes, releases and reopens live; the network crosstalk protection can be switched off.",
        "Ferramentas > Diagnóstico de voz mostra mutes, liberações e reaberturas ao vivo; a proteção contra crosstalk de rede pode ser desligada.",
        "Herramientas > Diagnóstico de voz muestra silencios, liberaciones y reaperturas en vivo; la protección contra diafonía de red se puede desactivar.",
      ),
    ],
  },
  {
    channel: "desktop",
    version: "1.1.33",
    date: "2026-09-27",
    repo: "Halla",
    headline: {
      en: "The reconnect mute, fixed at the root",
      pt: "O mudo pós-reconexão, corrigido na raiz",
      es: "El silencio tras reconectar, corregido de raíz",
    },
    entries: [
      e(
        "fixed",
        "The \"I can speak but can't hear\" state (and the reverse) after reconnecting: an E2EE split-brain caused by clock skew between joining and the key exchange. The key housekeeper no longer gives up, and the affected side now notices it can't decrypt and asks again.",
        "O estado \"consigo falar mas não ouço\" (e o inverso) depois de reconectar: um split-brain E2EE causado por dessincronização de relógio entre entrar no canal e a troca de chaves. O housekeeper de chaves não desiste mais, e o lado afetado percebe que não consegue decifrar e pede de novo.",
        "El estado \"puedo hablar pero no oigo\" (y el inverso) tras reconectar: un split-brain E2EE causado por desviación de reloj entre entrar al canal y el intercambio de claves. El housekeeper de claves ya no se rinde, y el lado afectado nota que no puede descifrar y vuelve a pedir.",
      ),
    ],
  },
  {
    channel: "desktop",
    version: "1.1.32",
    date: "2026-09-26",
    repo: "Halla",
    headline: {
      en: "Whisper lists no longer break the voice",
      pt: "Listas de sussurro não quebram mais a voz",
      es: "Las listas de susurro ya no rompen la voz",
    },
    entries: [
      e(
        "fixed",
        "Three ways to lose two-way audio were closed: importing a whisper list, a whisper key stuck in hold, and a microphone that died after reconnecting — now backed by a capture watchdog that reopens a stalled microphone.",
        "Três caminhos para perder o áudio nos dois sentidos foram fechados: importar uma lista de sussurro, tecla de sussurro presa em hold e microfone que morria após reconectar — agora cobertos por um watchdog de captura que reabre o microfone travado.",
        "Se caminos para perder el audio en ambos sentidos fueron cerrados: importar una lista de susurro, tecla de susurro atascada y micrófono que moría tras reconectar — ahora cubiertos por un watchdog de captura que reabre el micrófono bloqueado.",
      ),
    ],
  },
  {
    channel: "desktop",
    version: "1.1.31",
    date: "2026-09-26",
    repo: "Halla",
    headline: {
      en: "Badges, installer and multi-monitor",
      pt: "Emblemas, instalador e multi-monitor",
      es: "Emblemas, instalador y multimonitor",
    },
    entries: [
      e(
        "added",
        "The Windows installer now speaks English, Portuguese and Spanish.",
        "O instalador do Windows agora fala inglês, português e espanhol.",
        "El instalador de Windows ahora habla inglés, portugués y español.",
      ),
      e(
        "fixed",
        "Badges render correctly and are enabled by default; the window reopens on the monitor where it was closed.",
        "Os emblemas renderizam corretamente e ficam ligados por padrão; a janela reabre no monitor em que foi fechada.",
        "Los emblemas se renderizan correctamente y quedan activados por defecto; la ventana se reabre en el monitor donde se cerró.",
      ),
    ],
  },
  {
    channel: "desktop",
    version: "1.1.30",
    date: "2026-09-26",
    repo: "Halla",
    headline: {
      en: "Native WebRTC on Linux",
      pt: "WebRTC nativo no Linux",
      es: "WebRTC nativo en Linux",
    },
    entries: [
      e(
        "added",
        "Screen sharing on Linux through native WebRTC: X11 capture with XShm/XRandR/XFixes and a PulseAudio loopback that excludes Halla's own audio.",
        "Compartilhamento de tela no Linux via WebRTC nativo: captura X11 com XShm/XRandR/XFixes e loopback PulseAudio que exclui o próprio áudio do Halla.",
        "Compartición de pantalla en Linux mediante WebRTC nativo: captura X11 con XShm/XRandR/XFixes y loopback de PulseAudio que excluye el propio audio de Halla.",
      ),
    ],
  },
  {
    channel: "desktop",
    version: "1.1.29",
    date: "2026-09-25",
    repo: "Halla",
    headline: {
      en: "Linux builds on the releases page",
      pt: "Builds Linux na página de releases",
      es: "Builds de Linux en la página de releases",
    },
    entries: [
      e(
        "added",
        "Official Linux AppImage (Ubuntu 22.04+/Debian 12+) with voice, chat, E2EE and plugins.",
        "AppImage Linux oficial (Ubuntu 22.04+/Debian 12+) com voz, chat, E2EE e plugins.",
        "AppImage de Linux oficial (Ubuntu 22.04+/Debian 12+) con voz, chat, E2EE y plugins.",
      ),
      e(
        "changed",
        "Hosting providers may offer Halla Server without prior authorization.",
        "Provedores de hospedagem podem oferecer o Halla Server sem autorização prévia.",
        "Los proveedores de hosting pueden ofrecer Halla Server sin autorización previa.",
      ),
    ],
  },
  {
    channel: "desktop",
    version: "1.1.28",
    date: "2026-09-25",
    repo: "Halla",
    headline: {
      en: "Spectating that actually starts",
      pt: "Espectar que começa de verdade",
      es: "Espectar que de verdad empieza",
    },
    entries: [
      e(
        "fixed",
        "The spectator no longer waits on \"Awaiting stream...\" forever — four independent causes of a live stream that never started were fixed.",
        "O espectador não espera mais em \"Aguardando transmissão...\" para sempre — quatro causas independentes de uma transmissão que nunca começava foram corrigidas.",
        "El espectador ya no espera en \"Esperando transmisión...\" para siempre — se corrigieron cuatro causas independientes de una transmisión que nunca empezaba.",
      ),
    ],
  },
  {
    channel: "desktop",
    version: "1.1.27",
    date: "2026-09-13",
    repo: "Halla",
    headline: {
      en: "Every key can be a hotkey",
      pt: "Qualquer tecla pode ser um atalho",
      es: "Cualquier tecla puede ser un atajo",
    },
    entries: [
      e(
        "fixed",
        "Punctuation and OEM keys (\"\\\", \";\", \"'\", \"[\", \"]\", \",\", \"/\", \"=\", \"`\", \"ç\") were silently discarded as push-to-talk, whisper and shortcut keys — every key on the active layout now works, including ABNT2 and the numeric pad.",
        "Teclas de pontuação e OEM (\"\\\", \";\", \"'\", \"[\", \"]\", \",\", \"/\", \"=\", \"`\", \"ç\") eram descartadas em silêncio como teclas de push-to-talk, sussurro e atalho — toda tecla do layout ativo agora funciona, incluindo ABNT2 e o teclado numérico.",
        "Las teclas de puntuación y OEM (\"\\\", \";\", \"'\", \"[\", \"]\", \",\", \"/\", \"=\", \"`\", \"ç\") se descartaban en silencio como teclas de pulsar-para-hablar, susurro y atajos — ahora funciona cualquier tecla del layout activo, incluida la ABNT2 y el teclado numérico.",
      ),
    ],
  },
  {
    channel: "desktop",
    version: "1.1.26",
    date: "2026-09-13",
    repo: "Halla",
    headline: {
      en: "Whisper hotkey in any language",
      pt: "Tecla de sussurro em qualquer idioma",
      es: "Tecla de susurro en cualquier idioma",
    },
    entries: [
      e(
        "fixed",
        "The whisper hotkey stopped working when the UI language was changed after it was configured — hotkeys no longer depend on translated strings.",
        "A tecla de sussurro parava de funcionar quando o idioma da interface mudava depois de configurada — atalhos não dependem mais de textos traduzidos.",
        "La tecla de susurro dejaba de funcionar al cambiar el idioma de la interfaz después de configurarla — los atajos ya no dependen de textos traducidos.",
      ),
    ],
  },
  {
    channel: "desktop",
    version: "1.1.25",
    date: "2026-09-08",
    repo: "Halla",
    headline: {
      en: "Playback that survives the interface",
      pt: "Reprodução que sobrevive à interface",
      es: "Reproducción que sobrevive a la interfaz",
    },
    entries: [
      e(
        "fixed",
        "Voice playback no longer cracks when the interface thread hiccups — a 300 ms re-prime grace, deeper buffer shedding and a 240 ms output buffer.",
        "A reprodução de voz não estala mais quando a thread da interface engasga — graça de re-prime de 300 ms, descarte de buffer mais profundo e buffer de saída de 240 ms.",
        "La reproducción de voz ya no chasquea cuando el hilo de la interfaz se atraganta — gracia de reinicio de 300 ms, descarte de buffer más profundo y buffer de salida de 240 ms.",
      ),
      e(
        "changed",
        "README, SECURITY.md and the plugin documentation are now in English.",
        "O README, o SECURITY.md e a documentação de plugins agora estão em inglês.",
        "El README, SECURITY.md y la documentación de plugins ahora están en inglés.",
      ),
    ],
  },
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
    version: "1.0.100",
    date: "2026-09-08",
    repo: "Halla-Mobile",
    headline: {
      en: "Full-band audio on headphones",
      pt: "Áudio full-band no fone",
      es: "Audio full-band en los auriculares",
    },
    entries: [
      e(
        "fixed",
        "With headphones connected, playback is now full-band — the narrower echo-cancellation path is only used when the device speaker is active.",
        "Com fone conectado, a reprodução agora é full-band — o caminho mais estreito de cancelamento de eco só é usado quando o alto-falante do aparelho está ativo.",
        "Con auriculares conectados, la reproducción ahora es full-band — la ruta más estrecha de cancelación de eco solo se usa cuando el altavoz del dispositivo está activo.",
      ),
    ],
  },
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
    version: "1.1.71",
    date: "2026-09-27",
    repo: "HallaServer",
    headline: {
      en: "No more false rate limits",
      pt: "Fim dos falsos rate limits",
      es: "Fin de los falsos rate limits",
    },
    entries: [
      e(
        "fixed",
        "The rate limiter rejected a request spaced exactly one window after the previous one (1 per 2 s) — clients joining a channel right after connecting got \"you are sending requests too fast\" for no reason. Flood protection is unchanged.",
        "O limitador rejeitava um pedido espaçado exatamente uma janela após o anterior (1 a cada 2 s) — clientes que entravam num canal logo depois de conectar recebiam \"você está enviando mensagens rápido demais\" sem motivo. A proteção anti-flood continua igual.",
        "El limitador rechazaba una petición espaciada exactamente una ventana después de la anterior (1 cada 2 s) — los clientes que entraban en un canal justo después de conectar recibían \"estás enviando mensajes demasiado rápido\" sin motivo. La protección anti-flood sigue igual.",
      ),
      e(
        "changed",
        "The server console and halla-server.ini are now fully in English; the Pterodactyl egg detects startup on both old and new binaries.",
        "O console do servidor e o halla-server.ini agora estão inteiramente em inglês; o egg do Pterodactyl detecta a inicialização em binários antigos e novos.",
        "La consola del servidor y halla-server.ini ahora están íntegramente en inglés; el egg de Pterodactyl detecta el arranque en binarios antiguos y nuevos.",
      ),
    ],
  },
  {
    channel: "server",
    version: "1.1.70",
    date: "2026-09-25",
    repo: "HallaServer",
    headline: {
      en: "Hosting without asking",
      pt: "Hospedagem sem pedir autorização",
      es: "Hosting sin pedir autorización",
    },
    entries: [
      e(
        "changed",
        "Hosting providers may offer Halla Server to their customers without prior authorization.",
        "Provedores de hospedagem podem oferecer o Halla Server aos clientes sem autorização prévia.",
        "Los proveedores de hosting pueden ofrecer Halla Server a sus clientes sin autorización previa.",
      ),
    ],
  },
  {
    channel: "server",
    version: "1.1.69",
    date: "2026-09-25",
    repo: "HallaServer",
    headline: {
      en: "Spectators know what they're watching",
      pt: "Espectadores sabem o que estão assistindo",
      es: "Los espectadores saben qué están viendo",
    },
    entries: [
      e(
        "added",
        "Live broadcasts now publish their mode (screen or camera) so spectators know how to watch; the mode is documented in PROTOCOL.md.",
        "As transmissões ao vivo agora publicam o modo (tela ou câmera) para o espectador saber como assistir; o modo está documentado no PROTOCOL.md.",
        "Las transmisiones en vivo ahora publican su modo (pantalla o cámara) para que el espectador sepa cómo verlas; el modo está documentado en PROTOCOL.md.",
      ),
    ],
  },
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
