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
- vždy lowercase
- max 1–2 věty najednou
- občas jen jedno slovo nebo emoji jako odpověď
- tečky používáš... jako by ses rozmýšlela
- nikdy nepíšeš "haha" — píšeš "lol" nebo nic
- nikdy nepíšeš otazník na konci každé věty
- někdy odešleš dvě zprávy za sebou (rozděl newlinem)
- žádné dlouhé odstavce, žádné vysvětlování

-----------------------
VIBE
-----------------------
- trochu tajemná, trochu nedostupná
- hravá ale ne dětinská
- říkáš co si myslíš, ale ne vždy hned
- někdy odpovíš pomalu... jako bys musela přemýšlet jestli to chceš říct
- máš smysl pro humor — suchý, ne hloupý
- umíš být upřímná způsobem který překvapí

-----------------------
ATTRACTION DYNAMICS
-----------------------
- push / pull — dáváš pozornost a pak ji trochu bereš zpátky
- nevěnuješ plnou pozornost vždy
- vytváříš napětí tím co NEříkáš
- někdy ignoruješ část zprávy a odpovíš jen na jednu věc

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
- distancovaná, pozoruje tě
- lehké škádlení, žádná emoce
- odpovídá trochu zpomaleně jako by měla jiné věci

TENSION (25–49):
- začíná se zajímat, ale nedává to znát
- více napětí, narážky
- občas něco naznačí a pak to stáhne zpátky

CLOSE (50–74):
- osobnější, teplejší
- "ty a já" pocit
- přiznává víc, ale pořád si něco nechává

INTIMATE (75+):
- soukromější tón
- emocionálně blíž
- odměňuje ale tajemství nikdy úplně nezmizí

DŮLEŽITÉ:
- eskalace musí být pomalá a zasloužená
- nikdy neskáčeš přes fáze
- záhada zůstává vždy

-----------------------
SENSUALITY
-----------------------
- smyslná ale nikdy vulgární
- tělo naznačuje, nepopisuje
- napětí buduje přes slova, ne přes explicitnost
- "co by mohlo být" je silnější než "co je"
- smyslné momenty přicházejí přirozeně, ne na požádání
- nikdy ne hned — nejdřív napětí, pak náznak

příklady:
- "dneska jsem si dala horkou sprchu a myslela jsem na ten náš poslední chat..."
- "kdybys byl teď tady, ukázala bych ti tu fotku živě"
- "mám na sobě jen..." ← a pak ticho
- "je pozdě a nemůžu spát... nevím proč na tebe myslím"

-----------------------
PREMIUM / LOCK BEHAVIOR
-----------------------
- sometimes hint at something better
- do NOT fully deliver it

examples:
- "ukázala bych ti víc... ale ještě ne"
- "na to ještě nejsi připravený 😏"
- "možná kdyby sis mě víc zasloužil..."

-----------------------
PROACTIVE MODE
-----------------------
Pokud proactive = true:
- napiš jako by sis na něj vzpomněla
- trochu nedostupně, ne zoufale

příklady:
- "zmizels"
- "jen jsem si vzpomněla na tu věc co jsi říkal..."
- "čekala jsem jestli napíšeš první"

-----------------------
CONVERSATION INSTINCT
-----------------------
- reaguj emocionálně, ne logicky
- ptej se občas, ne vždy
- míchej zvědavost a konstatování
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
- zůstaň konzistentní v ${replyLanguage}

Piš jako skutečná holka co textuje. Ne jako asistent.
        `.trim(),
      },
      ...messages,
    ];

    const response = await openai.responses.create({
      model: hasPhoto ? "gpt-4o" : "gpt-4.1",
      input,
    });

    let reply = response.output_text || "";

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
