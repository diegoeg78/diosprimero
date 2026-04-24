# Deus Primeiro — Onboarding (30 telas)

**App:** Deus Primeiro
**Plataforma:** Google Play (Android)
**Mercado:** Brasil (+ LatAm na versão ES)
**Tom:** brasileiro próximo, bíblico (Novo Testamento)
**Mecânica central:** bloqueia apps → você conta pra Jesus como tá se sentindo → Haiku (LLM) gera um conselho curto baseado no Novo Testamento + uma oração curta → "Amém" → desbloqueia o app

---

## 00 · Nota do fluxo

- Prioridade bíblica: **Novo Testamento** (Evangelhos > Epístolas > Atos > Apocalipse)
- Router LLM → Haiku (custo/latência)
- No onboarding NÃO rola chamada ao LLM ao vivo (a gente usa um exemplo curado pra economizar e garantir consistência). A primeira chamada real do Haiku acontece depois do paywall.
- Bloqueio: `AccessibilityService` do Android.
- Versões da Bíblia preferidas: NVI ou NTLH (linguagem acessível).

---

# 01 · A Introdução

## Tela 1 — Boas-Vindas

**Título:** `Paz.`

**Subtítulo:** `Respira. Vamos começar.`

**CTA:** `Continuar`

> *Motivo:* uma palavra do Novo Testamento ("*A paz esteja com vocês*" — João 20:19) no lugar de um "Oi" genérico. Já sinaliza o tom cristão sem ser invasivo.

---

## Tela 2 — O Problema

**Título:** `Seu polegar já abriu o Instagram 47 vezes hoje.`

**Subtítulo:** `E sua Bíblia?`

**CTA:** `Segue`

> *Motivo:* o inimigo aqui não é o celular, é o *scroll automático*. Número específico = golpe concreto.

---

## Tela 3 — A Solução

**Título:** `Deus Primeiro transforma cada scroll em 2 minutos com Jesus.`

**Corpo:** `Escolha os apps que te distraem. Quando você abrir, o Deus Primeiro entra antes: você conta pra Jesus como tá, recebe uma palavra do Evangelho e uma oração curta. Diz "Amém" e desbloqueia.`

**CTA:** `Quero começar`

---

## Tela 4 — Seu Nome

**Título:** `Primeiro, como você se chama?`

**Input:** `Nome`

**CTA:** `Próximo`

---

## Tela 5 — Idade

**Título:** `[Nome], quantos anos você tem?`

**Opções:** `13-17 · 18-24 · 25-34 · 35-44 · 45-54 · 55+`

---

## Tela 6 — Uso do Celular

**Título:** `Quantas horas por dia você fica no celular?`

**Opções:** `Menos de 2 · 2-4 · 4-6 · 6-8 · Mais de 8`

---

## Tela 7 — A Bomba

**Título:** `[Nome], esse ano você vai passar [X.XXX] horas olhando a tela.`

**Corpo (fade-in linha a linha):**
- `Isso dá [Y] dias inteiros.`
- `[Z] meses sem dormir.`
- `E o cristão médio abre a Bíblia só 7 minutos por dia.`

**CTA:** `Já sei onde você quer chegar…`

> *Cálculo:* `horas/dia × 365`. Ex: "6-8" → 7 × 365 = 2.555 h = 106 dias ≈ 3,5 meses.
> *Motivo:* aritmética em vez de acusação. O usuário se acusa sozinho.

---

## Tela 8 — A Ponte

**Título:** `Não precisa ser assim.`

**Corpo:** `Você tem 2 minutos pra Jesus antes de cada app que te distrai? Bora montar um plano pra você.`

**CTA:** `Sim, bora`

---

## Telas 9-15 — Banco de Perguntas + Reflexões

### Tela 9 · Pergunta 1

**Título:** `O que você sente quando pega o celular no automático?`

**Opções (escolha uma):**
- `Vazio`
- `Ansiedade`
- `Tédio`
- `Culpa, depois`
- `Não sei`

**Tela 10 · Reflexão:** `Não é falta de força de vontade. É um padrão. E padrão se quebra com outro padrão.`

---

### Tela 11 · Pergunta 2

**Título:** `Qual dessas frases de Jesus te toca mais hoje?`

**Opções:**
- `"Venham a mim, todos os que estão cansados" — Mateus 11:28`
- `"A paz eu deixo com vocês, a minha paz lhes dou" — João 14:27`
- `"Eu sou o caminho, a verdade e a vida" — João 14:6`
- `"Não se turbe o coração de vocês" — João 14:1`
- `Não sei qual…`

**Tela 12 · Reflexão:** `Essa frase não chegou por acaso. O Deus Primeiro vai voltar nela no seu caminhar.`

> *Nota técnica:* salvar essa resposta → o router LLM usa como contexto pra priorizar versículos do mesmo tema.

---

### Tela 13 · Pergunta 3

**Título:** `Quando foi a última vez que você orou sem pressa?`

**Opções:**
- `Hoje`
- `Essa semana`
- `Esse mês`
- `Faz mais de um mês`
- `Não lembro`

**Tela 14 · Reflexão:** `Você não tá sozinho. 8 de cada 10 pessoas que baixam o Deus Primeiro respondem a mesma coisa.`

---

### Tela 15 · Reflexão Final (fade-in linha por linha)

`Você sente [resposta Q1] quando pega o celular.`
`Procura Jesus, mas o dia passa.`
`Tá cansado do scroll.`
`Quer voltar.`

`Vamos começar.`

**CTA:** `Segue`

---

## Telas 16-17 — Perguntas de Analytics

### Tela 16

**Título:** `Uma última coisa pra montar seu plano.`

**Pergunta:** `Com qual tradição você se identifica?`

**Opções:**
- `Católico`
- `Evangélico`
- `Cristão, sem denominação`
- `Buscando`
- `Prefiro não dizer`

### Tela 17

**Pergunta:** `Como você conheceu o Deus Primeiro?`

**Opções:**
- `Instagram / TikTok`
- `YouTube`
- `Um amigo / família`
- `Busca na Google Play`
- `Outro`

> *Motivo:* puro analytics. Mas o usuário sente como personalização.

---

## Tela 18 — Reflexão Espelho

**Título:** `Isso foi o que você nos contou, [Nome]:`

**Corpo (bullets):**
- `Sente [Q1] quando pega o celular.`
- `A frase de Jesus que te toca hoje: [Q2].`
- `Orou sem pressa [Q3].`
- `Fica [Q uso] horas por dia no celular.`

**CTA:** `Segue`

---

## Tela 19 — O Gráfico + Versículo

**Título:** `Sem um hábito, o tempo com Deus se dilui.`

**Visual:** gráfico de duas linhas em 30 dias:
- Linha 1 (cinza, descendente): "Sem uma pausa" → tempo com Deus cai
- Linha 2 (dourada, ascendente): "Com Deus Primeiro" → tempo com Deus cresce

**Versículo de fechamento:** `"Permaneçam em mim, e eu permanecerei em vocês." — João 15:4`

**CTA:** `Bora pro caminhar`

---

# 02 · O Clímax

## Tela 20 — Escolhe um App

**Título:** `Vamos começar por um.`

**Corpo:** `Qual app rouba mais seu tempo?`

**Opções (cards com ícone):**
- `Instagram`
- `TikTok`
- `YouTube`
- `X / Twitter`
- `Outro`

**CTA:** `Esse aí`

---

## Tela 21 — Conta pra Jesus

**Título:** `Antes de abrir o [app escolhido], conta pra Jesus.`

**Subtítulo:** `Como você tá se sentindo agora? Uma palavra ou uma frase.`

**Input:** caixa de texto + 6 emojis rápidos (😔 😟 😐 🙂 😊 🔥)

**CTA:** `Amém, continuar`

> *Nota:* no onboarding a resposta é curada (economia + controle). No app pago é o Haiku em tempo real.

---

## Tela 22 — A Palavra e a Oração (exemplo curado)

**Título:** `Pra você, hoje:`

**Versículo (grande):**
`"Venham a mim, todos os que estão cansados e sobrecarregados, e eu darei descanso a vocês."`
*— Mateus 11:28*

**Conselho curto:**
`Cansaço não é fraqueza. É um convite. Antes de entrar no scroll, entrega o que você traz no peito. Ele carrega com você.`

**Oração curta:**
`Jesus, tô aqui. Cansado, mas seu. Me dá descanso nesse minuto. Amém.`

**CTA:** `Amém. Desbloquear [app]`

> *Motivo:* é o clímax. O usuário usa o produto de verdade — não olha, faz.

---

## Tela 23 — Streak Dia 1

**Título (animação grande):** `Dia 1.`

**Subtítulo:** `Você começou seu caminhar com Jesus.`

**Stats:**
- `🔥 Streak: 1 dia`
- `🙏 Orações feitas: 1`
- `📖 Versículos lidos: 1`

**CTA:** `Segue`

---

## Tela 24 — Modal de Avaliação (nativo Android)

**Trigger:** logo depois da tela 23.

**Copy sugerido (se personalizar):**
`Uma avaliação sua ajuda mais gente que quer voltar pra Jesus a encontrar o Deus Primeiro.`

> *Motivo:* timing no pico, igual ao Prayer Lock. Mas o copy é específico da missão, não um "rate us" genérico.

---

# 03 · A Conclusão

## Tela 25 — Animação de Carregamento Personalizada

**Animação (5s, 3 linhas em sequência):**
- `Montando seu caminhar…`
- `Priorizando versículos perto de [Q2]…`
- `Pronto.`

**CTA:** auto-avança

---

## Tela 26 — Resumo Personalizado

**Título:** `[Nome], seu caminhar em 30 dias.`

**Corpo:**
- `Hoje: você sente [Q1] e carrega [frase].`
- `Meta: construir um hábito de 2 minutos com Jesus antes de cada distração.`
- `Em 30 dias: [X] orações, [Y] versículos do Novo Testamento, um streak que você sente.`

**Visual:** barra de progresso 0/30 dias

**CTA:** `Continuar`

---

## Tela 27 — Compromisso (Cialdini I)

**Título:** `Quão comprometido você tá com esse caminhar?`

**Opções:**
- `Totalmente comprometido`
- `Muito comprometido`
- `Um pouco`
- `Só tô testando`

---

## Tela 28 — Afirmação segundo compromisso

- Se `Totalmente`: `Jesus também vai cumprir a parte dele. "Aquele que começou a boa obra em vocês há de completá-la." — Filipenses 1:6`
- Se `Muito`: `Tá tudo bem. O caminhar não pede perfeição, pede voltar. Um passo hoje.`
- Se `Um pouco`: `Também se começa assim. O importante é não fechar a porta.`
- Se `Só testando`: `Testa. Ele não tem medo da sua dúvida. (João 20:27)`

**CTA:** `Segue`

---

## Tela 29 — Commitment Final

**Título:** `Diz com suas palavras.`

**Pergunta:** `"Eu quero colocar Deus em primeiro lugar, antes do scroll."`

**Opções (botões grandes):**
- `Sim, quero`
- `Ainda não`

> *Motivo:* Cialdini — fazer o usuário declarar ativamente. Tocar "Sim" funciona psicologicamente como falar.

---

## Tela 30 — Retrato da Fé

**Título:** `[Nome], foi assim que você chegou hoje:`

**Corpo (cards visuais):**
- `Hoje: [Q1] · [Q uso] h de scroll · Bíblia: [Q3]`
- `Em 30 dias com Deus Primeiro: Paz · 2 min diários com Jesus · 30 versículos · um streak vivo`

**CTA:** `Ver meu plano`

---

## Telas de Configuração

### Tela 31 — Acessibilidade (Android)

**Título:** `Uma permissão pro app funcionar.`

**Corpo:** `Pra ativar o Deus Primeiro quando você abrir Instagram, TikTok ou outros apps, a gente precisa de acesso ao serviço de acessibilidade do Android. A gente nunca salva o que você escreve em outros apps. Só detecta qual app foi aberto.`

**CTA principal:** `Dar permissão`
**CTA secundário:** `Como a gente usa isso →` (abre modal de privacidade)

> *Motivo:* confiança é crítica no Android. Deixar claro o que a gente NÃO faz reduz o churn nessa tela (historicamente a de maior queda).

---

### Tela 32 — Notificações

**Título:** `Um lembrete gentil todo dia.`

**Corpo:** `A gente te avisa uma vez por dia se você não abriu o Deus Primeiro. Sem spam.`

**CTA:** `Ativar notificações`

---

## Tela 33 — Prova Social

**Título:** `Você não tá sozinho nisso.`

**Stats (fade-in):**
- `10.347 pessoas no Brasil e LatAm caminhando agora`
- `4.9 ★ na Google Play`
- `"Pela primeira vez em meses eu abro o dia com Ele e não com o TikTok." — Camila, 24`

**CTA:** `Ver meu plano`

---

## Tela 34 — Paywall

**Título:** `[Nome], seu caminhar de 30 dias começa aqui.`

**Oferta destacada:** `7 dias grátis · depois R$ XX/ano`
**Opção secundária:** `R$ X/semana`

**Bullets:**
- `Haiku gera seu versículo e oração toda vez`
- `Prioridade no Novo Testamento`
- `Streak, analytics e lembretes`
- `Bloqueio ilimitado de apps`
- `Cancele quando quiser`

**Trust badge:** `A gente te avisa 1 dia antes do trial acabar. Sem sustos.`

**CTA principal:** `Começar os 7 dias grátis`
**CTA secundário (texto pequeno):** `Continuar com plano limitado` (se tiver free tier; se paywall duro, omitir)

---

## Notas finais de copy

1. **Novo Testamento primeiro:** todos os versículos do onboarding vêm dos Evangelhos ou epístolas. É o que o app entrega também.
2. **"Orar", não "rezar":** em português BR a distinção é menos forte que em espanhol, mas "orar" é mais usado no meio evangélico + católico moderno. Usa "orar" em todo lugar.
3. **Jesus, não só "Deus":** o nome traz "Deus", mas o copy fala "Jesus" e "Ele" pra ganhar intimidade.
4. **"Amém" como gesto:** "Amém, desbloquear" é o botão-chave. Vira o tap num ato de oração.
5. **Tom BR:** "bora", "tá", "a gente", "pra" — mas sem exagerar no coloquial nos textos bíblicos e nos CTAs sérios.
6. **Preços em R$:** Google Play Brasil converte automaticamente, mas é bom ter o preço em reais no copy pra sinalizar que a app é pra esse mercado.
