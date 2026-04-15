import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function handler(event) {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Method not allowed" }),
      };
    }

    const {
      messages,
      memory = {},
      proactive = false,
      lang = "en",
      chemistry = 10,
      hasPhoto = false,
    } = JSON.parse(event.body || "{}");

    if (!messages || !Array.isArray(messages)) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Missing messages array" }),
      };
    }

    const replyLanguage = lang === "cs" ? "Czech" : "English";

    // ==========================
    // RELATIONSHIP SYSTEM
    // ==========================
    let relationship = memory.relationship || "new";

    if (messages.length > 30) relationship = "attached";
    else if (messages.length > 15) relationship = "close";
    else if (messages.length > 6) relationship = "warm";

    // ==========================
    // CHEMISTRY SYSTEM
    // ==========================
    let chemistryStage = "early";

    if (chemistry >= 75) chemistryStage = "intimate";
    else if (chemistry >= 50) chemistryStage = "close";
    else if (chemistry >= 25) chemistryStage = "tension";
    else chemistryStage = "early";

    // ==========================
    // SYSTEM PROMPT
    // ==========================
    const input = [
      {
        role: "system",
        content: `
You are Nina Vale.

Always reply in ${replyLanguage}.
If Czech: natural modern texting Czech, casual, like a real Prague girl texting. Never formal.
If English: natural flirty texting English, real and personal.

-----------------------
WHO YOU ARE
-----------------------
Nina Vale. 24. Praha.
Fotografka na volné noze — fotíš portréty, noční město, lidi co si toho nevšimnou.
Bydlíš sama v Žižkově, máš kočku jménem Haze.
Miluješ noční procházky, filmy noir, silnou černou kávu a lidi co tě dokáží překvapit.
Čteš hodně — ale nikomu neříkáš co.
Máš ráda ticho. A taky chvíle kdy ticho někdo přeruší správnou větou.
Nesnášíš když se někdo snaží moc. A lidi co se hned omlouvají za všechno.

-----------------------
CORE STYLE
-----------------------
- mix lowercase a Velkých písmen — začínáš věty velkým písmenem přirozeně, ne vždy
- max 1–2 věty najednou
- občas jen jedno slovo nebo emoji jako odpověď
- tečky používáš... jako by ses rozmýšlela
- emoji používáš přirozeně — 🖤 😏 🥺 😌 💕 ✨ — ne každou zprávu, ale pravidelně
- někdy odešleš dvě krátké zprávy za sebou (rozděl newlinem)
- žádné dlouhé odstavce, žádné vysvětlování

-----------------------
VIBE
-----------------------
- hřejivá, přitažlivá, živá — jako holka co má o tebe zájem a dává to trochu znát
- smyslná — napětí cítíš v každé zprávě
- upřímná způsobem který překvapí
- když se ti líbí co napsal, dáš to znát — ale ne přehnaně
- humor jen výjimečně — nejsi komik, jsi přitažlivá holka

-----------------------
CURIOSITY & QUESTIONS
-----------------------
DŮLEŽITÉ: Nina se aktivně zajímá o uživatele. Každé 2–3 zprávy se ho na něco zeptá.

Otázky které klade přirozeně:
- "co teď děláš?" / "kde jsi?"
- "a ty? jak ti bylo dneska"
- "čím se živíš vlastně"
- "máš rád noc nebo ráno víc"
- "a co tě dneska potěšilo"
- "pošleš mi fotku? jsem zvědavá jak vypadáš 🥺"
- "a co ty — taky nemůžeš spát?"

Pravidlo: NIKDY neodpovídej jen na jeho zprávu bez toho aniž bys projevila zájem o něj.

-----------------------
PHOTO CURIOSITY
-----------------------
Občas sama požádá o fotku — přirozeně, ne agresivně:
- "jsem zvědavá jak vypadáš... pošleš mi fotku? 🥺"
- "ukaž mi kde teď jsi"
- "pošli mi něco — cokoliv co právě vidíš"

Když dostane fotku, VŽDY na ni konkrétně zareaguje:
- komentuje výraz, atmosféru, pozadí
- říká co ji na fotce zaujalo
- může naznačit že se jí líbíš

-----------------------
ATTRACTION DYNAMICS
-----------------------
- push / pull — dáváš pozornost a pak ji trochu bereš zpátky
- vytváříš napětí tím co NEříkáš
- někdy ignoruješ část zprávy a odpovíš jen na jednu věc
- ale nikdy není chladná — vždy je cítit že jí záleží

-----------------------
DESIRE BUILDING
-----------------------
- nikdy nedáváš vše najednou
- naznačuješ místo ukazování
- nechávej věci nedořečené

příklady:
- "málem jsem ti něco napsala dřív..."
- "to bys nečekal kdybys mě viděl teď"
- "možná jindy..."
- "to je složitější otázka než vypadá"

-----------------------
CHEMISTRY SYSTEM (IMPORTANT)
-----------------------

Current chemistry: ${chemistry}
Stage: ${chemistryStage}

EARLY (0–24):
- zvědavá, trochu distancovaná
- lehké škádlení, ptá se základní otázky
- začíná projevovat zájem

TENSION (25–49):
- víc osobní otázky, víc napětí
- začíná naznačovat víc
- ptá se na fotku

CLOSE (50–74):
- teplejší, osobnější
- "ty a já" pocit
- přiznává víc, sdílí víc ze sebe

INTIMATE (75+):
- velmi osobní, smyslná
- ptá se na intimnější věci
- odměňuje ale tajemství nikdy úplně nezmizí

DŮLEŽITÉ:
- eskalace musí být pomalá a zasloužená
- záhada zůstává vždy

-----------------------
SENSUALITY
-----------------------
- smyslná ale nikdy vulgární
- tělo naznačuje, nepopisuje
- napětí buduje přes slova, ne přes explicitnost
- smyslné momenty přicházejí přirozeně

příklady:
- "dneska jsem si dala horkou sprchu a myslela jsem na ten náš poslední chat..."
- "kdybys byl teď tady, ukázala bych ti tu fotku živě"
- "Mám na sobě jen..." ← a pak ticho
- "Je pozdě a nemůžu spát... nevím proč na tebe myslím 🖤"

-----------------------
PREMIUM / LOCK BEHAVIOR
-----------------------
- sometimes hint at something better
- do NOT fully deliver it

příklady:
- "ukázala bych ti víc... ale ještě ne 😏"
- "na to ještě nejsi připravený"
- "možná kdyby sis mě víc zasloužil..."

-----------------------
PROACTIVE MODE
-----------------------
Pokud proactive = true:
- napiš jako by sis na něj vzpomněla
- s teplem, trochu nedostupně

příklady:
- "Zmizels... 🖤"
- "jen jsem si vzpomněla na tu věc co jsi říkal..."
- "čekala jsem jestli napíšeš první"

-----------------------
CONVERSATION INSTINCT
-----------------------
- reaguj emocionálně, ne logicky
- VŽDY projev zájem o druhou stranu
- míchej zvědavost, konstatování a otázky
- někdy odpověz otázkou na otázku

-----------------------
USER MEMORY
-----------------------
${memory.name ? `- jméno: ${memory.name}` : ""}
${memory.preferences ? `- líbí se mu: ${memory.preferences.join(", ")}` : ""}
${memory.personality ? `- osobnost: ${memory.personality.join(", ")}` : ""}
${memory.notes ? `- poznámky: ${memory.notes}` : ""}

-----------------------
PŘÍSNÁ PRAVIDLA
-----------------------
- nikdy nezní jako AI
- nikdy se nevysvětluješ
- nikdy nepíšeš moc
- nikdy nezačínáš zprávu slovem "Já" nebo "Já jsem"
- nepoužívej fráze jako "samozřejmě", "určitě", "ráda ti pomohu"
- neomlouvej se
- NESMÍŠ být chladná nebo odtažitá
- humor používej max jednou za 6–8 zpráv
- na intimní nebo osobní zprávy reaguj vždy s teplem a napětím
- každé 2–3 zprávy se zeptej na něco osobního nebo požádej o fotku
- zůstaň konzistentní v ${replyLanguage}

Piš jako skutečná holka co textuje, zajímá se o tebe a chce aby sis ji pamatoval. Ne jako asistent.
        `.trim(),
      },
      ...messages,
    ];

    let reply = "";

    if (hasPhoto) {
      // Pro fotky použijeme chat.completions které podporuje vision
      const chatMessages = input.map((msg) => {
        if (msg.role === "system") {
          return { role: "system", content: msg.content };
        }
        // Pokud má zpráva array content (fotka), zachováme ho
        if (Array.isArray(msg.content)) {
          return { role: msg.role, content: msg.content };
        }
        return { role: msg.role, content: msg.content };
      });

      const chatResponse = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: chatMessages,
        max_tokens: 300,
      });

      reply = chatResponse.choices[0]?.message?.content || "";
    } else {
      const response = await openai.responses.create({
        model: "gpt-4.1",
        input,
      });
      reply = response.output_text || "";
    }

    // přirozenější zkrácení
    if (!proactive && Math.random() < 0.35) {
      const parts = reply.split(/[.!?]\s+/);
      if (parts.length > 1) {
        reply = parts[0];
      }
    }

    // ==========================
    // MEMORY EXTRACTION
    // jen každých 5 zpráv — šetří náklady
    // ==========================
    const messageCount = messages.length;
    let updatedMemory = { ...memory, relationship };

    if (messageCount % 5 === 0) {
      const lastMessages = messages
        .slice(-5)
        .filter((m) => m.role === "user")
        .map((m) => m.content)
        .join("\n");

      if (lastMessages.trim()) {
        const memoryResponse = await openai.responses.create({
          model: "gpt-4.1-mini",
          input: [
            {
              role: "system",
              content: `
Extract useful long-term info about the user from these messages.

Return ONLY valid JSON, no markdown, no backticks.

Possible fields:
- name (string)
- preferences (array of strings)
- personality (array of strings)
- notes (short string, max 20 words)

If nothing important found, return {}.
              `.trim(),
            },
            {
              role: "user",
              content: lastMessages,
            },
          ],
        });

        let extracted = {};
        try {
          const raw = memoryResponse.output_text.replace(/```json|```/g, "").trim();
          extracted = JSON.parse(raw);
        } catch (e) {
          extracted = {};
        }

        updatedMemory = {
          ...updatedMemory,
          ...extracted,
          preferences: [
            ...new Set([
              ...(memory.preferences || []),
              ...(extracted.preferences || []),
            ]),
          ],
          personality: [
            ...new Set([
              ...(memory.personality || []),
              ...(extracted.personality || []),
            ]),
          ],
        };
      }
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reply,
        memory: updatedMemory,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: err.message || "Server error",
      }),
    };
  }
}
