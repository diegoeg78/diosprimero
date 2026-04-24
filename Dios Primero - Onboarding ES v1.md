# Dios Primero — Onboarding (30 pantallas)

**App:** Dios Primero
**Plataforma:** Google Play (Android)
**Mercado:** LatAm + Brasil (PT-BR en archivo aparte)
**Tono:** LatAm neutro, cercano, bíblico (Nuevo Testamento)
**Mecánica central:** bloquea apps → le cuentas a Jesús cómo te sientes → Haiku (LLM) genera consejo corto basado en el Nuevo Testamento + oración corta → "Amén" → se desbloquea el app

---

## 00 · Nota del flujo

- Prioridad bíblica: **Nuevo Testamento** (Evangelios > Epístolas > Hechos > Apocalipsis)
- Router LLM → Haiku para costo/latencia
- En el onboarding NO se llama al LLM en vivo (se usa un ejemplo curado para ahorrar y dar consistencia). La primera llamada real a Haiku ocurre después del paywall.
- Bloqueo: `AccessibilityService` de Android.

---

# 01 · La Introducción

## Pantalla 1 — Bienvenida

**Titular:** `Paz.`

**Subtítulo:** `Respira. Empecemos.`

**CTA:** `Continuar`

> *Razón:* una palabra del Nuevo Testamento ("*Paz a ustedes*" — Juan 20:19) en vez del "Hey" genérico. Diferencia inmediata vs Prayer Lock y señaliza el tono cristiano sin ser invasiva.

---

## Pantalla 2 — El Problema

**Titular:** `Tu pulgar ya abrió Instagram 47 veces hoy.`

**Subtítulo:** `¿Y tu Biblia?`

**CTA:** `Sigue`

> *Razón:* el ángulo no es "el celular recibe más atención que Dios" (Prayer Lock). Aquí el enemigo no es el celular, es el *scroll automático* — un hábito que se puede interrumpir. Golpea con un número específico.

---

## Pantalla 3 — La Solución

**Titular:** `Dios Primero convierte cada scroll en 2 minutos con Jesús.`

**Cuerpo:** `Elige las apps que te distraen. Cuando las abras, Dios Primero se activa primero: le cuentas a Jesús cómo estás, recibes una palabra del Evangelio y una oración corta. Dices "Amén" y desbloqueas.`

**CTA:** `Quiero empezar`

> *Razón:* explica el mecanismo en una frase, con verbos en primera persona del usuario.

---

## Pantalla 4 — Tu Nombre

**Titular:** `Primero, ¿cómo te llamas?`

**Input:** `Nombre`

**CTA:** `Siguiente`

> *Razón:* se usará en las pantallas siguientes para personalizar ("[Nombre], pasarás...").

---

## Pantalla 5 — Edad

**Titular:** `[Nombre], ¿cuántos años tienes?`

**Opciones:** `13-17 · 18-24 · 25-34 · 35-44 · 45-54 · 55+`

---

## Pantalla 6 — Uso del Celular

**Titular:** `¿Cuántas horas al día pasas en el celular?`

**Opciones:** `Menos de 2 · 2-4 · 4-6 · 6-8 · Más de 8`

> *Razón:* estas dos preguntas alimentan el cálculo de la pantalla 7.

---

## Pantalla 7 — La Bomba

**Titular:** `[Nombre], este año pasarás [X,XXX] horas mirando la pantalla.`

**Cuerpo (fade-in línea por línea):**
- `Eso son [Y] días completos.`
- `[Z] meses sin dormir.`
- `Y el cristiano promedio abre su Biblia solo 7 minutos al día.`

**CTA:** `Ya sé a dónde vas…`

> *Cálculo:* `horas/día × 365`. Si eligen "6-8" usar 7 × 365 = 2,555 h = 106 días = 3.5 meses.
> *Razón:* el "aha" cuantifica la brecha. No acusamos ("eres adicto"), mostramos la aritmética — el usuario se acusa solo.

---

## Pantalla 8 — El Puente

**Titular:** `No tiene que ser así.`

**Cuerpo:** `¿Tienes 2 minutos para Jesús antes de cada app que te distrae? Armemos un plan para ti.`

**CTA:** `Sí, armemos un plan`

> *Razón:* ofrece salida concreta (2 min) y enmarca como personalizado.

---

## Pantallas 9-15 — Banco de Preguntas + Reflexiones

### Pantalla 9 · Pregunta 1

**Titular:** `¿Qué sientes cuando agarras el celular sin pensar?`

**Opciones (elige una):**
- `Vacío`
- `Ansiedad`
- `Aburrimiento`
- `Culpa, después`
- `No sé`

**Pantalla 10 · Reflexión:** `No es falta de fuerza de voluntad. Es un patrón. Y los patrones se rompen con otro patrón.`

---

### Pantalla 11 · Pregunta 2

**Titular:** `¿Cuál de estas frases de Jesús te llega más hoy?`

**Opciones:**
- `"Vengan a mí los que están cansados" — Mateo 11:28`
- `"La paz les dejo, mi paz les doy" — Juan 14:27`
- `"Yo soy el camino, la verdad y la vida" — Juan 14:6`
- `"No se turbe su corazón" — Juan 14:1`
- `No sé cuál…`

**Pantalla 12 · Reflexión:** `Esa frase no llegó por casualidad. Dios Primero va a volver a ella en tu caminar.`

> *Nota técnica:* guardar esta respuesta → el router LLM la usará como contexto para priorizar versículos del mismo tema.

---

### Pantalla 13 · Pregunta 3

**Titular:** `¿Cuándo fue la última vez que oraste sin prisa?`

**Opciones:**
- `Hoy`
- `Esta semana`
- `Este mes`
- `Hace más de un mes`
- `No me acuerdo`

**Pantalla 14 · Reflexión:** `No estás solo. 8 de cada 10 personas que bajan Dios Primero responden lo mismo.`

---

### Pantalla 15 · Reflexión Final (fade-in línea por línea)

`Sientes [respuesta Q1] al agarrar el celular.`
`Buscas a Jesús, pero el día se pasa.`
`Estás cansado del scroll.`
`Quieres volver.`

`Empecemos.`

**CTA:** `Sigue`

---

## Pantallas 16-17 — Preguntas de Analítica

### Pantalla 16

**Titular:** `Una última cosa para armar tu plan.`

**Pregunta:** `¿Con qué tradición te identificas?`

**Opciones:**
- `Católico`
- `Evangélico`
- `Cristiano, sin denominación`
- `Buscando`
- `Prefiero no decir`

### Pantalla 17

**Pregunta:** `¿Cómo supiste de Dios Primero?`

**Opciones:**
- `Instagram / TikTok`
- `YouTube`
- `Un amigo / familia`
- `Búsqueda en Google Play`
- `Otro`

> *Razón:* puro analytics. Pero el usuario no lo sabe — lo percibe como personalización.

---

## Pantalla 18 — Reflexión Espejo

**Titular:** `Esto es lo que nos dijiste, [Nombre]:`

**Cuerpo (bullets):**
- `Sientes [Q1] cuando agarras el celular.`
- `La frase de Jesús que te llega hoy: [Q2].`
- `Oraste sin prisa [Q3].`
- `Pasas [Q uso] horas al día en el celular.`

**CTA:** `Sigue`

---

## Pantalla 19 — El Gráfico + Cita

**Titular:** `Sin un hábito, el tiempo con Dios se diluye.`

**Visual:** gráfico de dos líneas en 30 días:
- Línea 1 (gris, descendente): "Sin una pausa" → tiempo con Dios baja
- Línea 2 (dorada, ascendente): "Con Dios Primero" → tiempo con Dios crece

**Cita de cierre:** `"Permanezcan en mí, y yo en ustedes." — Juan 15:4`

**CTA:** `Vamos al caminar`

---

# 02 · El Clímax

## Pantalla 20 — Elige una App

**Titular:** `Empecemos por una.`

**Cuerpo:** `¿Qué app te roba más tiempo?`

**Opciones (tarjetas con ícono):**
- `Instagram`
- `TikTok`
- `YouTube`
- `X / Twitter`
- `Otra`

**CTA:** `Esta es`

> *Razón:* compromiso activo. El usuario ya "eligió" lo que va a bloquear.

---

## Pantalla 21 — Cuéntale a Jesús

**Titular:** `Antes de abrir [app seleccionada], cuéntale a Jesús.`

**Subtítulo:** `¿Cómo te sientes ahora? Una palabra o una frase.`

**Input:** caja de texto + 6 emojis rápidos (😔 😟 😐 🙂 😊 🔥)

**CTA:** `Amén, continuar`

> *Nota:* esta es la única pantalla donde, en la app real, se dispara el LLM. En onboarding usamos respuesta curada para ahorrar y controlar calidad (según el emoji/palabra).

---

## Pantalla 22 — La Palabra y la Oración (ejemplo curado)

**Titular:** `Para ti, hoy:`

**Versículo (grande):**
`"Vengan a mí todos los que están cansados y agobiados, y yo les daré descanso."`
*— Mateo 11:28*

**Consejo breve:**
`Cansancio no es debilidad. Es una invitación. Antes de entrar al scroll, entrega lo que traes en el pecho. Él carga contigo.`

**Oración corta:**
`Jesús, aquí estoy. Cansado, pero tuyo. Dame descanso en este minuto. Amén.`

**CTA:** `Amén. Desbloquear [app]`

> *Razón:* este es el clímax. El usuario vive el producto real — no lo mira, lo hace. El copy es el mismo que generará Haiku, solo que curado.

---

## Pantalla 23 — Racha Día 1

**Titular (animación grande):** `Día 1.`

**Subtítulo:** `Empezaste tu caminar con Jesús.`

**Stats:**
- `🔥 Racha: 1 día`
- `🙏 Oraciones hechas: 1`
- `📖 Versículos leídos: 1`

**CTA:** `Sigue`

> *Razón:* dopamina + concreción. Pico emocional → aquí va la reseña.

---

## Pantalla 24 — Modal de Reseña (nativo Android)

**Trigger:** inmediatamente después de pantalla 23.

**Copy sugerido (si se personaliza):**
`Una reseña tuya ayuda a que más personas que buscan volver a Jesús encuentren Dios Primero.`

> *Razón:* timing en el pico, igual que Prayer Lock. Pero el copy es específico a misión, no solo "rate us".

---

# 03 · La Conclusión

## Pantalla 25 — Animación de Carga Personalizada

**Animación (5s, 3 líneas en secuencia):**
- `Armando tu caminar…`
- `Priorizando versículos cercanos a [Q2]…`
- `Listo.`

**CTA:** auto-avanza

---

## Pantalla 26 — Resumen Personalizado

**Titular:** `[Nombre], tu caminar en 30 días.`

**Cuerpo:**
- `Hoy: sientes [Q1] y cargas [frase].`
- `Meta: construir un hábito de 2 minutos con Jesús antes de cada distracción.`
- `En 30 días: [X] oraciones, [Y] versículos del Nuevo Testamento, una racha que se siente.`

**Visual:** barra de progreso 0/30 días

**CTA:** `Seguir`

---

## Pantalla 27 — Compromiso (Cialdini I)

**Titular:** `¿Qué tan comprometido estás con este caminar?`

**Opciones:**
- `Totalmente comprometido`
- `Muy comprometido`
- `Un poco`
- `Solo estoy probando`

> *Respuestas condicionales (pantalla 28):*

---

## Pantalla 28 — Afirmación según compromiso

- Si `Totalmente`: `Jesús también va a cumplir su parte. "El que comenzó en ustedes la buena obra la irá perfeccionando." — Filipenses 1:6`
- Si `Muy`: `Está bien. El caminar no pide perfección, pide volver. Un paso hoy.`
- Si `Un poco`: `También se empieza así. Lo importante es no cerrar la puerta.`
- Si `Solo probando`: `Prueba. Él no se asusta de tu duda. (Juan 20:27)`

**CTA:** `Sigue`

---

## Pantalla 29 — Commitment Final

**Titular:** `Dilo con tus palabras.`

**Pregunta:** `"Quiero poner a Dios primero, antes del scroll."`

**Opciones (botones grandes):**
- `Sí, lo quiero`
- `Todavía no`

> *Razón:* Cialdini — hacer que el usuario declare activamente. Tocar "Sí" funciona psicológicamente como decirlo.

---

## Pantalla 30 — Foto de tu Fe

**Titular:** `[Nombre], así llegaste hoy:`

**Cuerpo (cards visuales):**
- `Hoy: [Q1] · [Q uso] h de scroll · Biblia: [Q3]`
- `En 30 días con Dios Primero: Paz · 2 min diarios con Jesús · 30 versículos · una racha viva`

**CTA:** `Ver mi plan`

---

## Pantallas de Configuración (post-Paywall sería natural, pero aquí van antes para respetar el flujo original)

### Pantalla 31 — Accesibilidad (Android)

**Titular:** `Un permiso para que funcione.`

**Cuerpo:** `Para activar Dios Primero cuando abras Instagram, TikTok u otras apps, necesitamos acceso al servicio de accesibilidad de Android. Nunca guardamos lo que escribes en otras apps. Solo detectamos qué app abriste.`

**CTA primario:** `Dar permiso`
**CTA secundario:** `Cómo lo usamos →` (abre modal de privacidad)

> *Razón:* la confianza es crítica en Android. Ser explícitos sobre qué NO hacemos reduce el churn en esta pantalla (históricamente la de mayor caída).

---

### Pantalla 32 — Notificaciones

**Titular:** `Un recordatorio amable cada día.`

**Cuerpo:** `Te avisamos una vez al día si no has abierto Dios Primero. Sin spam.`

**CTA:** `Activar notificaciones`

---

## Pantalla 33 — Prueba Social

**Titular:** `No estás solo en esto.`

**Stats (fade-in):**
- `10,347 personas en LatAm y Brasil caminando ahora`
- `4.9 ★ en Google Play`
- `"Por primera vez en meses abro el día con Él y no con TikTok." — Camila, 24`

**CTA:** `Ver mi plan`

---

## Pantalla 34 — Paywall

**Titular:** `[Nombre], tu caminar de 30 días empieza aquí.`

**Oferta destacada:** `7 días gratis · después $X/año`
**Opción secundaria:** `$X/semana`

**Bullets:**
- `Haiku genera tu versículo y oración cada vez`
- `Prioridad al Nuevo Testamento`
- `Racha, analítica y recordatorios`
- `Bloqueo ilimitado de apps`
- `Cancela cuando quieras`

**Trust badge:** `Te avisamos 1 día antes de que termine tu prueba. Sin sorpresas.`

**CTA primario:** `Empezar los 7 días gratis`
**CTA secundario (texto pequeño):** `Continuar con plan limitado` (si se decide tener free tier; si es paywall duro, omitir)

---

## Notas finales de copy

1. **Nuevo Testamento primero:** todos los versículos mostrados en onboarding vienen de los Evangelios o epístolas. Es lo que la app entrega también.
2. **Sin "rezar":** en LatAm neutro se usa "orar" como más amplio. "Rezar" queda Catholic-specific. Dios Primero usa "orar" en todo.
3. **Jesús, no solo "Dios":** el nombre del app tiene "Dios", pero el producto habla de "Jesús" y "Él" para diferenciarse y bajar la fricción con usuarios cristianos activos.
4. **Amén como gesto:** "Amén, desbloquear" es el botón clave. Convierte el tap en un acto de oración.
5. **Variaciones vs Prayer Lock:**
   - Nombre distinto
   - Hook distinto (scroll vs atención)
   - Preguntas distintas (incluye Q sobre frase favorita de Jesús — alimenta el LLM)
   - Aha con cálculo diferente (meses vs días)
   - In-app experience con 3 partes (versículo + consejo + oración), no solo oración
   - Commitment con cita específica NT en vez de copy genérico
   - Configuración: Accessibility Service (Android) en vez de Screen Time (iOS)
