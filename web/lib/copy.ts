import type { Locale } from "./types";

type Choice<T extends string> = { value: T; label: string };

export type ScreenCopy = {
  // Navigation
  continue: string;
  next: string;
  back: string;
  yes: string;
  no: string;

  // Progress
  step: (n: number, total: number) => string;

  // Screen 1 — Welcome
  welcomeTitle: string;
  welcomeSub: string;
  welcomeCta: string;

  // Screen 2 — Problem
  problemTitle: string;
  problemSub: string;

  // Screen 3 — Solution
  solutionTitle: string;
  solutionBody: string;
  solutionCta: string;

  // Screen 4 — Name
  nameTitle: string;
  namePlaceholder: string;

  // Screen 5 — Age
  ageTitle: (name: string) => string;
  ageOptions: Array<Choice<string>>;

  // Screen 6 — Phone usage
  phoneTitle: string;
  phoneOptions: Array<Choice<string>>;

  // Screen 7 — Bomb
  bombTitle: (name: string, hours: number) => string;
  bombLine1: (days: number) => string;
  bombLine2: (months: number) => string;
  bombLine3: string;
  bombCta: string;

  // Screen 8 — Bridge
  bridgeTitle: string;
  bridgeBody: string;
  bridgeCta: string;

  // Screens 9-14 — Question bank
  q1Title: string;
  q1Options: Array<Choice<string>>;
  r1Body: string;

  q2Title: string;
  q2Options: Array<Choice<string>>;
  r2Body: string;

  q3Title: string;
  q3Options: Array<Choice<string>>;
  r3Body: string;

  // Screen 15 — Final reflection
  r15Lines: (name: string, mood: string) => string[];
  r15Final: string;

  // Screens 16-17 — Analytics questions
  q16Intro: string;
  q16Title: string;
  q16Options: Array<Choice<string>>;
  q17Title: string;
  q17Options: Array<Choice<string>>;

  // Screen 18 — Mirror
  mirrorTitle: (name: string) => string;
  mirrorBullet1: (mood: string) => string;
  mirrorBullet2: (phrase: string) => string;
  mirrorBullet3: (when: string) => string;
  mirrorBullet4: (hours: number) => string;

  // Screen 19 — Chart + verse
  chartTitle: string;
  chartLegendBad: string;
  chartLegendGood: string;
  chartVerse: string;
  chartCta: string;

  // Screen 20 — Choose an app
  appsTitle: string;
  appsSub: string;
  appsOptions: Array<Choice<string>>;
  appsCta: string;

  // Screen 21 — Tell Jesus
  tellTitle: (app: string) => string;
  tellSub: string;
  tellPlaceholder: string;
  tellCta: string;

  // Screen 22 — Verse + advice + prayer
  responseTitle: string;
  responseVerseText: string;
  responseVerseRef: string;
  responseAdvice: string;
  responsePrayer: string;
  responseCta: (app: string) => string;

  // Screen 23 — Day 1
  day1Title: string;
  day1Sub: string;
  day1StatStreak: string;
  day1StatPrayers: string;
  day1StatVerses: string;

  // Screen 24 — Review modal
  reviewTitle: string;
  reviewBody: string;
  reviewCta: string;
  reviewSkip: string;

  // Screen 25 — Loading
  loadingLine1: string;
  loadingLine2: (phraseRef: string) => string;
  loadingLine3: string;

  // Screen 26 — Summary
  summaryTitle: (name: string) => string;
  summaryToday: (mood: string) => string;
  summaryGoal: string;
  summaryIn30: string;

  // Screen 27 — Commitment level
  commitmentTitle: string;
  commitmentOptions: Array<Choice<string>>;

  // Screen 28 — Affirmation
  affirmationTotalmente: string;
  affirmationMuy: string;
  affirmationPoco: string;
  affirmationProbando: string;

  // Screen 29 — Final yes
  finalYesTitle: string;
  finalYesQuote: string;
  finalYesYes: string;
  finalYesNo: string;

  // Screen 30 — Faith snapshot
  snapshotTitle: (name: string) => string;
  snapshotToday: (mood: string, hours: number, prayed: string) => string;
  snapshotFuture: string;
  snapshotCta: string;

  // Screen 31 — Accessibility
  accTitle: string;
  accBody: string;
  accCta: string;
  accPrivacy: string;

  // Screen 32 — Notifications
  notifTitle: string;
  notifBody: string;
  notifCta: string;

  // Screen 33 — Social proof
  proofTitle: string;
  proofStat1: string;
  proofStat2: string;
  proofQuote: string;
  proofCta: string;

  // Screen 34 — Paywall
  paywallTitle: (name: string) => string;
  paywallAnnualLabel: string;
  paywallAnnualPrice: string;
  paywallAnnualSub: string;
  paywallWeeklyLabel: string;
  paywallWeeklyPrice: string;
  paywallFeatures: string[];
  paywallTrust: string;
  paywallCta: string;
  paywallLater: string;

  // Outro / demo end
  outroTitle: string;
  outroBody: string;
  outroCta: string;
};

export const copy: Record<Locale, ScreenCopy> = {
  es: {
    continue: "Continuar",
    next: "Siguiente",
    back: "Atrás",
    yes: "Sí",
    no: "No",

    step: (n, total) => `Paso ${n} de ${total}`,

    welcomeTitle: "Paz.",
    welcomeSub: "Respira. Empecemos.",
    welcomeCta: "Continuar",

    problemTitle: "Tu pulgar ya abrió Instagram 47 veces hoy.",
    problemSub: "¿Y tu Biblia?",

    solutionTitle: "Dios Primero convierte cada scroll en 2 minutos con Jesús.",
    solutionBody:
      "Elige las apps que te distraen. Cuando las abras, Dios Primero se activa primero: le cuentas a Jesús cómo estás, recibes una palabra del Evangelio y una oración corta. Dices “Amén” y desbloqueas.",
    solutionCta: "Quiero empezar",

    nameTitle: "Primero, ¿cómo te llamas?",
    namePlaceholder: "Tu nombre",

    ageTitle: (name) => `${name || "Tú"}, ¿cuántos años tienes?`,
    ageOptions: [
      { value: "13-17", label: "13 – 17" },
      { value: "18-24", label: "18 – 24" },
      { value: "25-34", label: "25 – 34" },
      { value: "35-44", label: "35 – 44" },
      { value: "45-54", label: "45 – 54" },
      { value: "55+", label: "55 +" },
    ],

    phoneTitle: "¿Cuántas horas al día pasas en el celular?",
    phoneOptions: [
      { value: "lt2", label: "Menos de 2" },
      { value: "2-4", label: "2 – 4" },
      { value: "4-6", label: "4 – 6" },
      { value: "6-8", label: "6 – 8" },
      { value: "gt8", label: "Más de 8" },
    ],

    bombTitle: (name, hours) =>
      `${name || "Tú"}, este año pasarás ${Math.round(
        hours * 365,
      ).toLocaleString("es")} horas mirando la pantalla.`,
    bombLine1: (days) => `Eso son ${days} días completos.`,
    bombLine2: (months) => `${months} meses sin dormir.`,
    bombLine3: "Y el cristiano promedio abre su Biblia solo 7 minutos al día.",
    bombCta: "Ya sé a dónde vas…",

    bridgeTitle: "No tiene que ser así.",
    bridgeBody:
      "¿Tienes 2 minutos para Jesús antes de cada app que te distrae? Armemos un plan para ti.",
    bridgeCta: "Sí, armemos un plan",

    q1Title: "¿Qué sientes cuando agarras el celular sin pensar?",
    q1Options: [
      { value: "vacio", label: "Vacío" },
      { value: "ansiedad", label: "Ansiedad" },
      { value: "aburrimiento", label: "Aburrimiento" },
      { value: "culpa", label: "Culpa, después" },
      { value: "no-se", label: "No sé" },
    ],
    r1Body:
      "No es falta de fuerza de voluntad. Es un patrón. Y los patrones se rompen con otro patrón.",

    q2Title: "¿Cuál de estas frases de Jesús te llega más hoy?",
    q2Options: [
      { value: "cansados", label: "“Vengan a mí los que están cansados” — Mateo 11:28" },
      { value: "paz", label: "“La paz les dejo, mi paz les doy” — Juan 14:27" },
      { value: "camino", label: "“Yo soy el camino, la verdad y la vida” — Juan 14:6" },
      { value: "no-turbe", label: "“No se turbe su corazón” — Juan 14:1" },
      { value: "no-se", label: "No sé cuál…" },
    ],
    r2Body:
      "Esa frase no llegó por casualidad. Dios Primero va a volver a ella en tu caminar.",

    q3Title: "¿Cuándo fue la última vez que oraste sin prisa?",
    q3Options: [
      { value: "hoy", label: "Hoy" },
      { value: "semana", label: "Esta semana" },
      { value: "mes", label: "Este mes" },
      { value: "mas-mes", label: "Hace más de un mes" },
      { value: "no-me-acuerdo", label: "No me acuerdo" },
    ],
    r3Body:
      "No estás solo. 8 de cada 10 personas que bajan Dios Primero responden lo mismo.",

    r15Lines: (name, mood) => [
      `Sientes ${mood || "algo"} al agarrar el celular.`,
      "Buscas a Jesús, pero el día se pasa.",
      "Estás cansado del scroll.",
      "Quieres volver.",
      `Empecemos, ${name || "hermano"}.`,
    ],
    r15Final: "Sigue",

    q16Intro: "Una última cosa para armar tu plan.",
    q16Title: "¿Con qué tradición te identificas?",
    q16Options: [
      { value: "catolico", label: "Católico" },
      { value: "evangelico", label: "Evangélico" },
      { value: "sin-denominacion", label: "Cristiano, sin denominación" },
      { value: "buscando", label: "Buscando" },
      { value: "prefiero-no-decir", label: "Prefiero no decir" },
    ],
    q17Title: "¿Cómo supiste de Dios Primero?",
    q17Options: [
      { value: "social", label: "Instagram / TikTok" },
      { value: "youtube", label: "YouTube" },
      { value: "amigo", label: "Un amigo / familia" },
      { value: "busqueda", label: "Búsqueda en Google Play" },
      { value: "otro", label: "Otro" },
    ],

    mirrorTitle: (name) => `Esto es lo que nos dijiste, ${name || "hermano"}:`,
    mirrorBullet1: (mood) => `Sientes ${mood} cuando agarras el celular.`,
    mirrorBullet2: (phrase) => `La frase de Jesús que te llega hoy: ${phrase}.`,
    mirrorBullet3: (when) => `Oraste sin prisa ${when}.`,
    mirrorBullet4: (hours) => `Pasas ${hours} horas al día en el celular.`,

    chartTitle: "Sin un hábito, el tiempo con Dios se diluye.",
    chartLegendBad: "Sin una pausa",
    chartLegendGood: "Con Dios Primero",
    chartVerse: "“Permanezcan en mí, y yo en ustedes.” — Juan 15:4",
    chartCta: "Vamos al caminar",

    appsTitle: "Empecemos por una.",
    appsSub: "¿Qué app te roba más tiempo?",
    appsOptions: [
      { value: "instagram", label: "Instagram" },
      { value: "tiktok", label: "TikTok" },
      { value: "youtube", label: "YouTube" },
      { value: "twitter", label: "X / Twitter" },
      { value: "otra", label: "Otra" },
    ],
    appsCta: "Esta es",

    tellTitle: (app) => `Antes de abrir ${app}, cuéntale a Jesús.`,
    tellSub: "¿Cómo te sientes ahora? Una palabra o una frase.",
    tellPlaceholder: "Escribe aquí…",
    tellCta: "Amén, continuar",

    responseTitle: "Para ti, hoy:",
    responseVerseText:
      "“Vengan a mí todos los que están cansados y agobiados, y yo les daré descanso.”",
    responseVerseRef: "Mateo 11:28",
    responseAdvice:
      "Cansancio no es debilidad. Es una invitación. Antes de entrar al scroll, entrega lo que traes en el pecho. Él carga contigo.",
    responsePrayer:
      "Jesús, aquí estoy. Cansado, pero tuyo. Dame descanso en este minuto. Amén.",
    responseCta: (app) => `Amén · Desbloquear ${app}`,

    day1Title: "Día 1.",
    day1Sub: "Empezaste tu caminar con Jesús.",
    day1StatStreak: "Racha",
    day1StatPrayers: "Oraciones",
    day1StatVerses: "Versículos",

    reviewTitle: "¿Nos dejas una reseña?",
    reviewBody:
      "Un minuto tuyo ayuda a que más personas que buscan volver a Jesús encuentren Dios Primero.",
    reviewCta: "Dejar reseña",
    reviewSkip: "Ahora no",

    loadingLine1: "Armando tu caminar…",
    loadingLine2: (phraseRef) => `Priorizando versículos cercanos a ${phraseRef}…`,
    loadingLine3: "Listo.",

    summaryTitle: (name) => `${name || "Tu"} caminar en 30 días.`,
    summaryToday: (mood) => `Hoy: sientes ${mood} y cargas con lo del día.`,
    summaryGoal:
      "Meta: construir un hábito de 2 minutos con Jesús antes de cada distracción.",
    summaryIn30:
      "En 30 días: 60+ oraciones, 30+ versículos del Nuevo Testamento, una racha que se siente.",

    commitmentTitle: "¿Qué tan comprometido estás con este caminar?",
    commitmentOptions: [
      { value: "totalmente", label: "Totalmente comprometido" },
      { value: "muy", label: "Muy comprometido" },
      { value: "poco", label: "Un poco" },
      { value: "probando", label: "Solo estoy probando" },
    ],
    affirmationTotalmente:
      "Jesús también va a cumplir su parte. “El que comenzó en ustedes la buena obra la irá perfeccionando.” — Filipenses 1:6",
    affirmationMuy:
      "Está bien. El caminar no pide perfección, pide volver. Un paso hoy.",
    affirmationPoco:
      "También se empieza así. Lo importante es no cerrar la puerta.",
    affirmationProbando:
      "Prueba. Él no se asusta de tu duda. (Juan 20:27)",

    finalYesTitle: "Dilo con tus palabras.",
    finalYesQuote:
      "“Quiero poner a Dios primero, antes del scroll.”",
    finalYesYes: "Sí, lo quiero",
    finalYesNo: "Todavía no",

    snapshotTitle: (name) => `${name || "Tú"}, así llegaste hoy:`,
    snapshotToday: (mood, hours, prayed) =>
      `Hoy: ${mood || "buscando"} · ${hours} h de scroll · última oración: ${prayed}`,
    snapshotFuture:
      "En 30 días con Dios Primero: paz · 2 min diarios con Jesús · 30 versículos · una racha viva",
    snapshotCta: "Ver mi plan",

    accTitle: "Un permiso para que funcione.",
    accBody:
      "Para activar Dios Primero cuando abras Instagram, TikTok u otras apps, necesitamos acceso al servicio de accesibilidad de Android. Nunca guardamos lo que escribes en otras apps. Solo detectamos qué app abriste.",
    accCta: "Dar permiso",
    accPrivacy: "Cómo lo usamos →",

    notifTitle: "Un recordatorio amable cada día.",
    notifBody:
      "Te avisamos una vez al día si no has abierto Dios Primero. Sin spam.",
    notifCta: "Activar notificaciones",

    proofTitle: "No estás solo en esto.",
    proofStat1: "10,347 personas caminando ahora en LatAm y Brasil",
    proofStat2: "4.9 ★ en Google Play",
    proofQuote:
      "“Por primera vez en meses abro el día con Él y no con TikTok.” — Camila, 24",
    proofCta: "Ver mi plan",

    paywallTitle: (name) => `${name || "Tu"} caminar de 30 días empieza aquí.`,
    paywallAnnualLabel: "Anual",
    paywallAnnualPrice: "MXN 299 / año",
    paywallAnnualSub: "~ MXN 5,75 / semana · 7 días gratis",
    paywallWeeklyLabel: "Semanal",
    paywallWeeklyPrice: "MXN 69 / semana",
    paywallFeatures: [
      "Versículo y oración para cada momento",
      "Prioridad al Nuevo Testamento",
      "Racha y analítica de tu caminar",
      "Bloqueo ilimitado de apps",
      "Cancela cuando quieras",
    ],
    paywallTrust: "Te avisamos 1 día antes de que termine tu prueba. Sin sorpresas.",
    paywallCta: "Empezar los 7 días gratis",
    paywallLater: "Ver luego",

    outroTitle: "Fin de la demo.",
    outroBody:
      "Esto es solo el onboarding. La app real bloquea Instagram, TikTok y otras apps hasta que ores. ¿Quieres enterarte cuando esté lista?",
    outroCta: "Empezar de nuevo",
  },

  pt: {
    continue: "Continuar",
    next: "Próximo",
    back: "Voltar",
    yes: "Sim",
    no: "Não",

    step: (n, total) => `Passo ${n} de ${total}`,

    welcomeTitle: "Paz.",
    welcomeSub: "Respira. Vamos começar.",
    welcomeCta: "Continuar",

    problemTitle: "Seu polegar já abriu o Instagram 47 vezes hoje.",
    problemSub: "E sua Bíblia?",

    solutionTitle: "Deus Primeiro transforma cada scroll em 2 minutos com Jesus.",
    solutionBody:
      "Escolha os apps que te distraem. Quando você abrir, o Deus Primeiro entra antes: você conta pra Jesus como tá, recebe uma palavra do Evangelho e uma oração curta. Diz “Amém” e desbloqueia.",
    solutionCta: "Quero começar",

    nameTitle: "Primeiro, como você se chama?",
    namePlaceholder: "Seu nome",

    ageTitle: (name) => `${name || "Você"}, quantos anos você tem?`,
    ageOptions: [
      { value: "13-17", label: "13 – 17" },
      { value: "18-24", label: "18 – 24" },
      { value: "25-34", label: "25 – 34" },
      { value: "35-44", label: "35 – 44" },
      { value: "45-54", label: "45 – 54" },
      { value: "55+", label: "55 +" },
    ],

    phoneTitle: "Quantas horas por dia você fica no celular?",
    phoneOptions: [
      { value: "lt2", label: "Menos de 2" },
      { value: "2-4", label: "2 – 4" },
      { value: "4-6", label: "4 – 6" },
      { value: "6-8", label: "6 – 8" },
      { value: "gt8", label: "Mais de 8" },
    ],

    bombTitle: (name, hours) =>
      `${name || "Você"}, esse ano vai passar ${Math.round(
        hours * 365,
      ).toLocaleString("pt-BR")} horas olhando a tela.`,
    bombLine1: (days) => `Isso dá ${days} dias inteiros.`,
    bombLine2: (months) => `${months} meses sem dormir.`,
    bombLine3: "E o cristão médio abre a Bíblia só 7 minutos por dia.",
    bombCta: "Já sei onde você quer chegar…",

    bridgeTitle: "Não precisa ser assim.",
    bridgeBody:
      "Você tem 2 minutos pra Jesus antes de cada app que te distrai? Bora montar um plano pra você.",
    bridgeCta: "Sim, bora",

    q1Title: "O que você sente quando pega o celular no automático?",
    q1Options: [
      { value: "vacio", label: "Vazio" },
      { value: "ansiedad", label: "Ansiedade" },
      { value: "aburrimiento", label: "Tédio" },
      { value: "culpa", label: "Culpa, depois" },
      { value: "no-se", label: "Não sei" },
    ],
    r1Body:
      "Não é falta de força de vontade. É um padrão. E padrão se quebra com outro padrão.",

    q2Title: "Qual dessas frases de Jesus te toca mais hoje?",
    q2Options: [
      { value: "cansados", label: "“Venham a mim, todos os que estão cansados” — Mateus 11:28" },
      { value: "paz", label: "“A paz eu deixo com vocês, a minha paz lhes dou” — João 14:27" },
      { value: "camino", label: "“Eu sou o caminho, a verdade e a vida” — João 14:6" },
      { value: "no-turbe", label: "“Não se turbe o coração de vocês” — João 14:1" },
      { value: "no-se", label: "Não sei qual…" },
    ],
    r2Body:
      "Essa frase não chegou por acaso. O Deus Primeiro vai voltar nela no seu caminhar.",

    q3Title: "Quando foi a última vez que você orou sem pressa?",
    q3Options: [
      { value: "hoy", label: "Hoje" },
      { value: "semana", label: "Essa semana" },
      { value: "mes", label: "Esse mês" },
      { value: "mas-mes", label: "Faz mais de um mês" },
      { value: "no-me-acuerdo", label: "Não lembro" },
    ],
    r3Body:
      "Você não tá sozinho. 8 de cada 10 pessoas que baixam o Deus Primeiro respondem a mesma coisa.",

    r15Lines: (name, mood) => [
      `Você sente ${mood || "algo"} quando pega o celular.`,
      "Procura Jesus, mas o dia passa.",
      "Tá cansado do scroll.",
      "Quer voltar.",
      `Vamos começar, ${name || "irmão"}.`,
    ],
    r15Final: "Segue",

    q16Intro: "Uma última coisa pra montar seu plano.",
    q16Title: "Com qual tradição você se identifica?",
    q16Options: [
      { value: "catolico", label: "Católico" },
      { value: "evangelico", label: "Evangélico" },
      { value: "sin-denominacion", label: "Cristão, sem denominação" },
      { value: "buscando", label: "Buscando" },
      { value: "prefiero-no-decir", label: "Prefiro não dizer" },
    ],
    q17Title: "Como você conheceu o Deus Primeiro?",
    q17Options: [
      { value: "social", label: "Instagram / TikTok" },
      { value: "youtube", label: "YouTube" },
      { value: "amigo", label: "Um amigo / família" },
      { value: "busqueda", label: "Busca na Google Play" },
      { value: "otro", label: "Outro" },
    ],

    mirrorTitle: (name) => `Isso foi o que você nos contou, ${name || "irmão"}:`,
    mirrorBullet1: (mood) => `Sente ${mood} quando pega o celular.`,
    mirrorBullet2: (phrase) => `A frase de Jesus que te toca hoje: ${phrase}.`,
    mirrorBullet3: (when) => `Orou sem pressa ${when}.`,
    mirrorBullet4: (hours) => `Fica ${hours} horas por dia no celular.`,

    chartTitle: "Sem um hábito, o tempo com Deus se dilui.",
    chartLegendBad: "Sem uma pausa",
    chartLegendGood: "Com Deus Primeiro",
    chartVerse: "“Permaneçam em mim, e eu permanecerei em vocês.” — João 15:4",
    chartCta: "Bora pro caminhar",

    appsTitle: "Vamos começar por um.",
    appsSub: "Qual app rouba mais seu tempo?",
    appsOptions: [
      { value: "instagram", label: "Instagram" },
      { value: "tiktok", label: "TikTok" },
      { value: "youtube", label: "YouTube" },
      { value: "twitter", label: "X / Twitter" },
      { value: "otra", label: "Outro" },
    ],
    appsCta: "Esse aí",

    tellTitle: (app) => `Antes de abrir o ${app}, conta pra Jesus.`,
    tellSub: "Como você tá se sentindo agora? Uma palavra ou uma frase.",
    tellPlaceholder: "Escreve aqui…",
    tellCta: "Amém, continuar",

    responseTitle: "Pra você, hoje:",
    responseVerseText:
      "“Venham a mim, todos os que estão cansados e sobrecarregados, e eu darei descanso a vocês.”",
    responseVerseRef: "Mateus 11:28",
    responseAdvice:
      "Cansaço não é fraqueza. É um convite. Antes de entrar no scroll, entrega o que você traz no peito. Ele carrega com você.",
    responsePrayer:
      "Jesus, tô aqui. Cansado, mas seu. Me dá descanso nesse minuto. Amém.",
    responseCta: (app) => `Amém · Desbloquear ${app}`,

    day1Title: "Dia 1.",
    day1Sub: "Você começou seu caminhar com Jesus.",
    day1StatStreak: "Streak",
    day1StatPrayers: "Orações",
    day1StatVerses: "Versículos",

    reviewTitle: "Deixa uma avaliação?",
    reviewBody:
      "Um minuto seu ajuda mais gente que quer voltar pra Jesus a encontrar o Deus Primeiro.",
    reviewCta: "Deixar avaliação",
    reviewSkip: "Agora não",

    loadingLine1: "Montando seu caminhar…",
    loadingLine2: (phraseRef) => `Priorizando versículos perto de ${phraseRef}…`,
    loadingLine3: "Pronto.",

    summaryTitle: (name) => `${name || "Seu"} caminhar em 30 dias.`,
    summaryToday: (mood) => `Hoje: você sente ${mood} e carrega o peso do dia.`,
    summaryGoal:
      "Meta: construir um hábito de 2 minutos com Jesus antes de cada distração.",
    summaryIn30:
      "Em 30 dias: 60+ orações, 30+ versículos do Novo Testamento, um streak que você sente.",

    commitmentTitle: "Quão comprometido você tá com esse caminhar?",
    commitmentOptions: [
      { value: "totalmente", label: "Totalmente comprometido" },
      { value: "muy", label: "Muito comprometido" },
      { value: "poco", label: "Um pouco" },
      { value: "probando", label: "Só tô testando" },
    ],
    affirmationTotalmente:
      "Jesus também vai cumprir a parte dele. “Aquele que começou a boa obra em vocês há de completá-la.” — Filipenses 1:6",
    affirmationMuy:
      "Tá tudo bem. O caminhar não pede perfeição, pede voltar. Um passo hoje.",
    affirmationPoco:
      "Também se começa assim. O importante é não fechar a porta.",
    affirmationProbando:
      "Testa. Ele não tem medo da sua dúvida. (João 20:27)",

    finalYesTitle: "Diz com suas palavras.",
    finalYesQuote:
      "“Eu quero colocar Deus em primeiro lugar, antes do scroll.”",
    finalYesYes: "Sim, quero",
    finalYesNo: "Ainda não",

    snapshotTitle: (name) => `${name || "Você"}, foi assim que chegou hoje:`,
    snapshotToday: (mood, hours, prayed) =>
      `Hoje: ${mood || "buscando"} · ${hours} h de scroll · última oração: ${prayed}`,
    snapshotFuture:
      "Em 30 dias com Deus Primeiro: paz · 2 min diários com Jesus · 30 versículos · um streak vivo",
    snapshotCta: "Ver meu plano",

    accTitle: "Uma permissão pro app funcionar.",
    accBody:
      "Pra ativar o Deus Primeiro quando você abrir Instagram, TikTok ou outros apps, a gente precisa de acesso ao serviço de acessibilidade do Android. A gente nunca salva o que você escreve em outros apps. Só detecta qual app foi aberto.",
    accCta: "Dar permissão",
    accPrivacy: "Como a gente usa →",

    notifTitle: "Um lembrete gentil todo dia.",
    notifBody:
      "A gente te avisa uma vez por dia se você não abriu o Deus Primeiro. Sem spam.",
    notifCta: "Ativar notificações",

    proofTitle: "Você não tá sozinho nisso.",
    proofStat1: "10.347 pessoas caminhando agora no Brasil e LatAm",
    proofStat2: "4.9 ★ na Google Play",
    proofQuote:
      "“Pela primeira vez em meses eu abro o dia com Ele e não com o TikTok.” — Camila, 24",
    proofCta: "Ver meu plano",

    paywallTitle: (name) => `${name || "Seu"} caminhar de 30 dias começa aqui.`,
    paywallAnnualLabel: "Anual",
    paywallAnnualPrice: "R$ 49,90 / ano",
    paywallAnnualSub: "~ R$ 0,96 / semana · 7 dias grátis",
    paywallWeeklyLabel: "Semanal",
    paywallWeeklyPrice: "R$ 9,90 / semana",
    paywallFeatures: [
      "Versículo e oração pra cada momento",
      "Prioridade no Novo Testamento",
      "Streak e analytics do seu caminhar",
      "Bloqueio ilimitado de apps",
      "Cancele quando quiser",
    ],
    paywallTrust: "A gente te avisa 1 dia antes do trial acabar. Sem sustos.",
    paywallCta: "Começar os 7 dias grátis",
    paywallLater: "Ver depois",

    outroTitle: "Fim da demo.",
    outroBody:
      "Isso foi só o onboarding. O app real bloqueia Instagram, TikTok e outros apps até você orar. Quer saber quando lançar?",
    outroCta: "Começar de novo",
  },
};
