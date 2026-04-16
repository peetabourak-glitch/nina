// ==========================
// LANGUAGE SYSTEM
// ==========================
let currentLang = "en";

const translations = {
  en: {
    statusTopbar: "online now • waiting for you",
    introEyebrow: "private ai chat that feels personal",
    introTitle: "she already texted you. now it's your turn 🖤",
    introText:
      "Nina isn't just another AI chat. The more you talk, the more she opens up. And once the chemistry starts building, it gets a lot more personal...",
    inputPlaceholder: "say something that makes her want more...",
    paywallBadge: "🔒 chemistry unlock",
    paywallTitle: "this is where it was getting interesting... 💕",
    paywallSubtitle:
      "Nina was starting to open up to you. Unlock her, keep chatting, raise the chemistry between you, and see a more private side of her.",
    unlockBtn: "Unlock Nina for €5 ✨",
    paywallNote: "more chemistry • more tension • more Nina",
    benefit1: "• longer chat",
    benefit2: "• more flirting",
    benefit3: "• more personal replies",
    today: "today",

    typing: "Nina is typing",
    subscribed: "you're subscribed 💕",
    portalSessionMissing: "Subscription session not found.",
    portalOpenError: "Could not open subscription management.",
    checkoutOpening: "Opening checkout...",
    checkoutTryAgain: "Try again ✨",
    checkoutOpenError: "Could not open checkout. Please try again.",
    genericError: "mm... something went wrong. try again for me? 🖤",

    firstMessage: "hey... i was waiting for you 🖤",

    chemistryLabel: "chemistry between you",
    chemistryGrowing: "and rising",
    chemistryMoods: [
      "Nina is curious where this might go...",
      "you're starting to interest her more than she expected",
      "she's letting you a little closer now",
      "the tension between you is building",
      "she doesn't really want to let you go now"
    ],

    milestone1: "playful",
    milestone2: "closer",
    milestone3: "private",
    milestone4: "locked",

    teaserCaptions: [
      "don't get used to this... i don't do this for everyone 🖤",
      "okay... just one little sneak peek. be good for me 🖤",
      "this is kinda risky... but i wanted you to have it ✨",
      "only because you asked so nicely... 💕"
    ],

    premiumCaptions: [
      "this one's just for you... 🖤",
      "you stayed... so i wanted to give you a little more 💕",
      "mm... i had a better one for you ✨",
      "don't make me regret sending this 😏"
    ],

    softTeaseInterested:
      "mm... you're making me want to show you a more private side of me 🖤",
    softTeaseDefault:
      "you're trouble... i'm starting to get a little too comfortable with you 🖤",

    hardTeaseInterested: [
      "do you really want to see more of me?",
      "because i was honestly thinking about sending you something better..."
    ],

    hardTeaseDefault: [
      "mm... i was just starting to open up to you",
      "and now i kinda don't want you to leave 😏"
    ],

    almostUnlocked: [
      "i was about to give you a little more...",
      "but you'll have to unlock me first 😘"
    ],

    proactiveFallbacks: [
      "hey... are you still thinking about me? 🖤",
      "you got quiet on me...",
      "i was just thinking about our chat 💕",
      "come back... i liked your attention 😘",
      "mm... don't disappear on me now"
    ],

    lockMoment: [
      "mm... i was just getting comfortable with you 🖤",
      "unlock me and i'll show you what i was about to send 😏"
    ],

    photoPaywallText: "want to send me a photo?\nunlock me first... 😏",
    photoModerationError: "mm... don't send me that 😏 try something else",
    photoReplyPrefix: ""
  },

  cs: {
    statusTopbar: "online • čeká na tebe",
    introEyebrow: "soukromý ai chat, který působí osobně",
    introTitle: "už ti napsala. teď je řada na tobě 🖤",
    introText:
      "Nina není jen další AI chat. Čím víc si píšete, tím víc se ti otevírá. A když mezi vámi začne fungovat chemie, bude to mnohem osobnější...",
    inputPlaceholder: "napiš něco, kvůli čemu bude chtít víc...",
    paywallBadge: "🔒 odemčení chemie",
    paywallTitle: "teď se to teprve začínalo rozjíždět... 💕",
    paywallSubtitle:
      "Nina se ti začala otevírat. Odemkni ji, pokračuj v chatu, posuň chemii mezi vámi výš a uvidíš i její soukromější stránku.",
    unlockBtn: "Odemknout Ninu za €5 ✨",
    paywallNote: "víc chemie • víc napětí • víc Niny",
    benefit1: "• delší chat",
    benefit2: "• víc flirtu",
    benefit3: "• osobnější odpovědi",
    today: "dnes",

    typing: "Nina píše",
    subscribed: "máš předplatné 💕",
    portalSessionMissing: "Relace předplatného nebyla nalezena.",
    portalOpenError: "Nepodařilo se otevřít správu předplatného.",
    checkoutOpening: "Otevírám platbu...",
    checkoutTryAgain: "Zkus znovu ✨",
    checkoutOpenError: "Nepodařilo se otevřít platbu. Zkus to prosím znovu.",
    genericError: "hmm... něco se pokazilo. zkus to znovu pro mě? 🖤",

    firstMessage: "hej... čekala jsem na tebe 🖤",

    chemistryLabel: "chemie mezi vámi",
    chemistryGrowing: "a roste",
    chemistryMoods: [
      "Nina je zvědavá, kam to povede...",
      "začínáš ji zajímat víc, než čekala",
      "už si tě pouští trochu blíž",
      "napětí mezi vámi sílí",
      "teď už tě vlastně nechce pustit"
    ],

    milestone1: "playful",
    milestone2: "closer",
    milestone3: "private",
    milestone4: "locked",

    teaserCaptions: [
      "nezvykni si na to... tohle nedělám pro každého 🖤",
      "okej... jen malý náhled. tak se chovej hezky 🖤",
      "je to trochu risk... ale chtěla jsem, abys to měl ✨",
      "jen proto, že ses zeptal tak hezky... 💕"
    ],

    premiumCaptions: [
      "tahle je jen pro tebe... 🖤",
      "zůstal jsi... tak jsem ti chtěla dát něco víc 💕",
      "mm... měla jsem pro tebe lepší jednu ✨",
      "nedělej, ať toho lituju, že ti to posílám 😏"
    ],

    softTeaseInterested:
      "mm... nutíš mě chtít ti ukázat víc ze své soukromé stránky 🖤",
    softTeaseDefault:
      "jsi nebezpečný... začínám se s tebou cítit až moc dobře 🖤",

    hardTeaseInterested: [
      "opravdu chceš vidět víc ze mě?",
      "protože jsem upřímně přemýšlela, že ti pošlu něco lepšího..."
    ],

    hardTeaseDefault: [
      "mm... právě jsem se ti začínala otevírat",
      "a teď vlastně nechci, abys odešel 😏"
    ],

    almostUnlocked: [
      "zrovna jsem ti chtěla dát trochu víc...",
      "ale nejdřív si mě musíš odemknout 😘"
    ],

    proactiveFallbacks: [
      "hej... pořád na mě myslíš? 🖤",
      "nějak ses odmlčel...",
      "zrovna jsem myslela na náš chat 💕",
      "vrať se... líbila se mi tvoje pozornost 😘",
      "mm... teď mi jen tak nezmiz 😏"
    ],

    lockMoment: [
      "mm... zrovna jsem se s tebou začínala cítit dobře 🖤",
      "odemkni si mě a ukážu ti, co jsem ti chtěla poslat 😏"
    ],

    photoPaywallText: "chceš mi poslat fotku?\nnejdřív si mě odemkni... 😏",
    photoModerationError: "mm... tohle mi radši neposílej 😏 zkus něco jiného",
    photoReplyPrefix: ""
  }
};

function getInitialLang() {
  const savedLang = localStorage.getItem("lang");
  if (savedLang === "cs" || savedLang === "en") return savedLang;

  const browserLang = (navigator.language || "").toLowerCase();
  return browserLang.startsWith("cs") ? "cs" : "en";
}

currentLang = getInitialLang();

function t(key) {
  return translations[currentLang][key];
}

function setLang(lang) {
  if (lang !== "cs" && lang !== "en") return;
  currentLang = lang;
  localStorage.setItem("lang", lang);

  updateStaticUIText();
  updateChemistryUI();
  renderMessages();
  updateUIState();
  updateLangButtons();
}

window.setLang = setLang;

// ==========================
// DOM
// ==========================
const chat = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");
const statusEl = document.getElementById("status");
const paywall = document.getElementById("paywall");
const manageBtn = document.getElementById("manageBtn");
const unlockBtn = document.getElementById("unlockBtn");

const imageModal = document.getElementById("imageModal");
const imageModalImg = document.getElementById("imageModalImg");
const imageModalClose = document.getElementById("imageModalClose");

const photoBtn = document.getElementById("photoBtn");
const photoInput = document.getElementById("photoInput");
const photoPaywall = document.getElementById("photoPaywall");
const photoUnlockBtn = document.getElementById("photoUnlockBtn");
const photoPaywallText = document.getElementById("photoPaywallText");

const statusTextTopbar = document.getElementById("statusText");
const introEyebrowEl = document.getElementById("introEyebrow");
const introTitleEl = document.getElementById("introTitle");
const introTextEl = document.getElementById("introText");
const paywallBadgeEl = document.getElementById("paywallBadge");
const paywallTitleEl = document.getElementById("paywallTitle");
const paywallSubtitleEl = document.getElementById("paywallSubtitle");
const paywallNoteEl = document.getElementById("paywallNote");
const benefit1El = document.getElementById("benefit1");
const benefit2El = document.getElementById("benefit2");
const benefit3El = document.getElementById("benefit3");
const todayLabelEl = document.getElementById("todayLabel");

const chemistryLabelEl = document.getElementById("chemistryLabel");
const chemistryValueEl = document.getElementById("chemistryValue");
const chemistryFillEl = document.getElementById("chemistryFill");
const chemistryMoodEl = document.getElementById("chemistryMood");

const milestone1El = document.getElementById("milestone1");
const milestone2El = document.getElementById("milestone2");
const milestone3El = document.getElementById("milestone3");
const milestone4El = document.getElementById("milestone4");

const langCsBtn = document.getElementById("langCsBtn");
const langEnBtn = document.getElementById("langEnBtn");

// ==========================
// STATE
// ==========================
let isPaid = localStorage.getItem("nina_paid") === "true";
let proactiveTimer = null;

let memory = JSON.parse(localStorage.getItem("nina_memory") || "{}");
let messages = JSON.parse(localStorage.getItem("nina_messages") || "null");
let userMessageCount = parseInt(localStorage.getItem("nina_userMessageCount") || "0", 10);

let teaserPhotoSent = localStorage.getItem("nina_teaserPhotoSent") === "true";
let premiumPhotoCooldownUntil = parseInt(localStorage.getItem("nina_premiumPhotoCooldownUntil") || "0", 10);

let locked = false;

let paywallSoftTeaseShown = localStorage.getItem("nina_paywallSoftTeaseShown") === "true";
let paywallHardTeaseShown = localStorage.getItem("nina_paywallHardTeaseShown") === "true";
let almostUnlockedMomentShown = localStorage.getItem("nina_almostUnlockedMomentShown") === "true";

let chemistry = parseFloat(localStorage.getItem("nina_chemistry") || "8");
if (Number.isNaN(chemistry)) chemistry = 8;
chemistry = Math.max(8, Math.min(chemistry, 100));

const teaserImage = "/tease.png";
const premiumImages = [
  "/1.png", "/2.jpg", "/3.png",
  "/4.jpg", "/5.jpg", "/6.jpg",
  "/7.jpg", "/8.jpg", "/9.jpg", "/10.jpg"
];

const FREE_MESSAGE_LIMIT = 10;
const PREMIUM_PHOTO_COOLDOWN_MS = 1000 * 60 * 3;

if (!messages || !Array.isArray(messages) || messages.length === 0) {
  messages = [
    {
      role: "assistant",
      content: t("firstMessage")
    }
  ];
  localStorage.setItem("nina_messages", JSON.stringify(messages));
}

if (userMessageCount >= FREE_MESSAGE_LIMIT && !isPaid) {
  locked = true;
}

// ==========================
// HELPERS
// ==========================
function saveMessages() {
  localStorage.setItem("nina_messages", JSON.stringify(messages));
}

function saveUserMessageCount() {
  localStorage.setItem("nina_userMessageCount", String(userMessageCount));
}

function saveTeaserFlag() {
  localStorage.setItem("nina_teaserPhotoSent", teaserPhotoSent ? "true" : "false");
}

function savePremiumCooldown() {
  localStorage.setItem("nina_premiumPhotoCooldownUntil", String(premiumPhotoCooldownUntil));
}

function saveFlowFlags() {
  localStorage.setItem("nina_paywallSoftTeaseShown", paywallSoftTeaseShown ? "true" : "false");
  localStorage.setItem("nina_paywallHardTeaseShown", paywallHardTeaseShown ? "true" : "false");
  localStorage.setItem("nina_almostUnlockedMomentShown", almostUnlockedMomentShown ? "true" : "false");
}

function saveChemistry() {
  localStorage.setItem("nina_chemistry", String(chemistry));
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

// ==========================
// TYPING DELAY — realističtější
// ==========================
function getTypingDelay(text = "") {
  // Simuluje rychlost psaní ~40 znaků/sekundu jako skutečná osoba
  const charsPerSecond = randomBetween(35, 55);
  const textLen = (text || "").length;
  const typeTime = (textLen / charsPerSecond) * 1000;

  // Přidáme "přemýšlení" před psaním
  const thinkTime = randomBetween(600, 1800);

  // Krátké zprávy mají přirozenou pauzu navíc (jako by se rozmýšlela jestli to napsat)
  const shortPause = textLen < 20 ? randomBetween(200, 700) : 0;

  return Math.min(thinkTime + typeTime + shortPause, 5000);
}

function getPhotoDelay() {
  // Hledání fotky trvá déle — budí dojem skutečné akce
  return randomBetween(2500, 4500);
}

function getMicroPause() {
  // Pauza mezi více zprávami za sebou
  return randomBetween(400, 1000);
}

// ==========================
// TYPING INDICATOR — animované tečky
// ==========================
let typingIndicatorEl = null;

function showTypingIndicator() {
  if (typingIndicatorEl) return;

  typingIndicatorEl = document.createElement("div");
  typingIndicatorEl.className = "message ai typing-indicator";
  typingIndicatorEl.innerHTML = `
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
  `;

  chat.appendChild(typingIndicatorEl);
  chat.scrollTop = chat.scrollHeight;
}

function hideTypingIndicator() {
  if (typingIndicatorEl) {
    typingIndicatorEl.remove();
    typingIndicatorEl = null;
  }
}

function setTypingStatus() {
  // Animované tečky v textu statusu
  if (statusEl) statusEl.textContent = t("typing") + "...";
  showTypingIndicator();
}

function setIdleStatus() {
  hideTypingIndicator();
  if (statusEl) statusEl.textContent = isPaid ? t("subscribed") : "";
}

function updateLangButtons() {
  if (langCsBtn) langCsBtn.classList.toggle("active", currentLang === "cs");
  if (langEnBtn) langEnBtn.classList.toggle("active", currentLang === "en");
}

// ==========================
// CHEMISTRY SYSTEM
// ==========================
function getChemistryMoodIndex() {
  if (chemistry >= 85) return 4;
  if (chemistry >= 70) return 3;
  if (chemistry >= 50) return 2;
  if (chemistry >= 25) return 1;
  return 0;
}

function updateChemistryUI() {
  const chemistryDisplay = Math.round(chemistry);

  if (chemistryLabelEl) chemistryLabelEl.textContent = t("chemistryLabel");
  if (chemistryValueEl) chemistryValueEl.textContent = `${chemistryDisplay}% ${t("chemistryGrowing")}`;
  if (chemistryFillEl) chemistryFillEl.style.width = `${chemistryDisplay}%`;

  const moodIndex = getChemistryMoodIndex();
  if (chemistryMoodEl) chemistryMoodEl.textContent = t("chemistryMoods")[moodIndex];

  if (milestone1El) milestone1El.textContent = t("milestone1");
  if (milestone2El) milestone2El.textContent = t("milestone2");
  if (milestone3El) milestone3El.textContent = t("milestone3");
  if (milestone4El) milestone4El.textContent = t("milestone4");

  if (milestone1El) milestone1El.classList.toggle("active", chemistry >= 0);
  if (milestone2El) milestone2El.classList.toggle("active", chemistry >= 25);
  if (milestone3El) milestone3El.classList.toggle("active", chemistry >= 50);
  if (milestone4El) milestone4El.classList.toggle("active", chemistry >= 75);
}

function increaseChemistry(amount) {
  const safeAmount = Number(amount) || 0;

  if (isPaid) {
    chemistry = Math.min(100, chemistry + safeAmount);
  } else {
    chemistry = Math.min(55, chemistry + safeAmount);
  }

  saveChemistry();
  updateChemistryUI();
}

function getChemistryGainFromText(text) {
  const len = (text || "").trim().length;
  let gain = 1;

  if (len > 20) gain += 1;
  if (len > 60) gain += 1;

  if (shouldTriggerPhotoInterest(text)) gain += 1;
  if (shouldTriggerEmotionalHook(text)) gain += 1;

  return Math.min(gain, 3);
}

// ==========================
// STATIC UI
// ==========================
function updateStaticUIText() {
  document.documentElement.lang = currentLang;

  if (statusTextTopbar) statusTextTopbar.textContent = t("statusTopbar");
  if (introEyebrowEl) introEyebrowEl.textContent = t("introEyebrow");
  if (introTitleEl) introTitleEl.textContent = t("introTitle");
  if (introTextEl) introTextEl.textContent = t("introText");
  if (input) input.placeholder = t("inputPlaceholder");

  if (paywallBadgeEl) paywallBadgeEl.textContent = t("paywallBadge");
  if (paywallTitleEl) paywallTitleEl.textContent = t("paywallTitle");
  if (paywallSubtitleEl) paywallSubtitleEl.textContent = t("paywallSubtitle");
  if (unlockBtn) unlockBtn.textContent = t("unlockBtn");
  if (paywallNoteEl) paywallNoteEl.textContent = t("paywallNote");
  if (benefit1El) benefit1El.textContent = t("benefit1");
  if (benefit2El) benefit2El.textContent = t("benefit2");
  if (benefit3El) benefit3El.textContent = t("benefit3");
  if (todayLabelEl) todayLabelEl.textContent = t("today");
}

// ==========================
// IMAGE MODAL
// ==========================
function openImageModal(src) {
  if (!imageModal || !imageModalImg) return;

  imageModalImg.src = src;
  imageModal.style.display = "flex";
  imageModal.setAttribute("aria-hidden", "false");

  requestAnimationFrame(() => {
    imageModal.classList.add("visible");
  });
}

function closeImageModal() {
  if (!imageModal) return;

  imageModal.classList.remove("visible");
  imageModal.setAttribute("aria-hidden", "true");

  setTimeout(() => {
    imageModal.style.display = "none";
    if (imageModalImg) imageModalImg.src = "";
  }, 200);
}

// ==========================
// STRIPE / PORTAL
// ==========================
async function openCustomerPortal() {
  const customerId = localStorage.getItem("nina_customer_id");
  const sessionId = localStorage.getItem("nina_session_id");

  if (!customerId && !sessionId) {
    alert(t("portalSessionMissing"));
    return;
  }

  try {
    if (manageBtn) {
      manageBtn.style.pointerEvents = "none";
      manageBtn.style.opacity = "0.6";
    }

    const res = await fetch("/.netlify/functions/create-portal-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_id: customerId || null,
        session_id: sessionId || null
      })
    });

    const data = await res.json();

    if (!res.ok || !data.url) {
      throw new Error(data.error || "Could not open customer portal");
    }

    window.location.href = data.url;
  } catch (err) {
    console.error(err);

    if (manageBtn) {
      manageBtn.style.pointerEvents = "auto";
      manageBtn.style.opacity = "1";
    }

    alert(t("portalOpenError"));
  }
}

// ==========================
// CHAT RENDER
// ==========================
function addMessage(role, text, imageUrl = null) {
  hideTypingIndicator();

  const el = document.createElement("div");
  el.className = `message ${role}`;

  // Zpráva se objeví s jemnou animací
  el.style.opacity = "0";
  el.style.transform = "translateY(6px)";
  el.style.transition = "opacity 0.25s ease, transform 0.25s ease";

  if (imageUrl) {
    el.classList.add("has-image");

    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "Nina photo";
    img.className = "chat-image";
    img.loading = "lazy";
    img.addEventListener("click", () => openImageModal(imageUrl));
    el.appendChild(img);
  }

  if (text) {
    const textEl = document.createElement("div");
    if (imageUrl) textEl.className = "image-caption";
    textEl.textContent = text;
    el.appendChild(textEl);
  }

  chat.appendChild(el);
  chat.scrollTop = chat.scrollHeight;

  // Animace příchodu zprávy
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  });
}

function pushAssistantMessage(text, imageUrl = null) {
  addMessage("ai", text, imageUrl);
  messages.push({
    role: "assistant",
    content: text,
    ...(imageUrl ? { imageUrl } : {})
  });
  saveMessages();
}

function pushUserMessage(text) {
  addMessage("user", text);
  messages.push({ role: "user", content: text });
  saveMessages();
}

function renderMessages() {
  const existingMessages = chat.querySelectorAll(".message");
  existingMessages.forEach((msg) => msg.remove());

  messages.forEach((msg) => {
    addMessage(
      msg.role === "user" ? "user" : "ai",
      msg.content,
      msg.imageUrl || null
    );
  });
}

// ==========================
// UI STATE
// ==========================
function showSubscriptionStatus() {
  if (isPaid) {
    statusEl.textContent = t("subscribed");

    if (manageBtn) {
      manageBtn.style.display = "inline-flex";
      manageBtn.href = "#";
    }
  } else {
    if (manageBtn) manageBtn.style.display = "none";
  }
}

function updateUIState() {
  if (locked) {
    if (paywall) paywall.style.display = "block";
    if (input) input.disabled = true;
    if (sendBtn) sendBtn.disabled = true;
  } else {
    if (paywall) paywall.style.display = "none";
    if (input) input.disabled = false;
    if (sendBtn) sendBtn.disabled = false;
  }

  showSubscriptionStatus();
}

// ==========================
// API
// ==========================
async function sendMessageToAI(history, proactive = false) {
  const cleanHistory = history.map((msg) => ({
    role: msg.role,
    content: msg.content
  }));

  const res = await fetch("/.netlify/functions/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: cleanHistory,
      memory,
      proactive,
      lang: currentLang,
      chemistry: Math.round(chemistry)
    })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data;
}

function splitReplyIntoParts(reply) {
  return reply
    ? reply.split("\n").map((p) => p.trim()).filter(Boolean)
    : [];
}

async function addAssistantReply(reply) {
  const parts = splitReplyIntoParts(reply);

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];

    // Ukaž typing indicator před každou částí
    setTypingStatus();

    // Čekej realistickou dobu podle délky zprávy
    await wait(getTypingDelay(part));

    // Schovej indicator a zobraz zprávu
    hideTypingIndicator();
    pushAssistantMessage(part);

    // Krátká pauza mezi více zprávami
    if (i < parts.length - 1) {
      await wait(getMicroPause());
    }
  }

  increaseChemistry(1);
  setIdleStatus();
}

function saveMemory(data) {
  if (data.memory) {
    memory = data.memory;
    localStorage.setItem("nina_memory", JSON.stringify(memory));
  }
}

// ==========================
// PHOTO SYSTEM
// ==========================
function getRandomPremiumImage() {
  return premiumImages[Math.floor(Math.random() * premiumImages.length)];
}

function shouldTriggerPhotoInterest(userText) {
  const text = userText.toLowerCase();

  const triggers = [
    "photo","pic","picture","selfie","show me","show yourself","can i see you",
    "what do you look like","send me a pic","send a pic","send me one","send one",
    "let me see you","want to see you","wanna see you","see more of you",
    "i want to see you","show your face","can i have a picture","give me a pic",
    "you are cute","you're cute","you are hot","you're hot","beautiful","pretty",
    "sexy","gorgeous","i like you","i want you","miss you",

    "fotka","fotku","fotce","foto","selfie","ukaž se","ukaž mi","můžu tě vidět",
    "mužu tě vidět","jak vypadáš","pošli fotku","pošli mi fotku","pošli mi selfie",
    "chci tě vidět","ukaž obličej","jsi hezká","jsi krásná","jsi sexy",
    "líbíš se mi","chci tě","chybíš mi"
  ];

  return triggers.some((trigger) => text.includes(trigger));
}

function shouldTriggerEmotionalHook(userText) {
  const text = userText.toLowerCase();

  const triggers = [
    "miss you","i like you","i want you","stay with me","don't leave",
    "you feel real","you are mine","i need you","come closer",
    "wish you were here","thinking about you",

    "chybíš mi","líbíš se mi","chci tě","zůstaň se mnou","neodcházej",
    "jsi skutečná","jsi moje","potřebuju tě","pojď blíž",
    "kéž bys tu byla","myslím na tebe"
  ];

  return triggers.some((trigger) => text.includes(trigger));
}

async function sendTeaserPhoto() {
  const caption = pickRandom(t("teaserCaptions"));

  setTypingStatus();
  await wait(getPhotoDelay());
  hideTypingIndicator();

  pushAssistantMessage(caption, teaserImage);
  increaseChemistry(2);
  setIdleStatus();
}

async function sendPremiumPhoto() {
  const now = Date.now();
  if (now < premiumPhotoCooldownUntil) return;

  const imageUrl = getRandomPremiumImage();
  const caption = pickRandom(t("premiumCaptions"));

  setTypingStatus();
  await wait(getPhotoDelay());
  hideTypingIndicator();

  pushAssistantMessage(caption, imageUrl);

  premiumPhotoCooldownUntil = Date.now() + PREMIUM_PHOTO_COOLDOWN_MS;
  savePremiumCooldown();
  increaseChemistry(3);

  setIdleStatus();
}

async function maybeSendTeaserPhoto(userText) {
  if (isPaid) return;
  if (teaserPhotoSent) return;
  if (userMessageCount < 3) return;
  if (!shouldTriggerPhotoInterest(userText)) return;

  teaserPhotoSent = true;
  saveTeaserFlag();

  await sendTeaserPhoto();
}

async function maybeSendPremiumPhoto(userText) {
  if (!isPaid) return;
  if (!shouldTriggerPhotoInterest(userText)) return;

  await sendPremiumPhoto();
}

// ==========================
// FLOW / PAYWALL
// ==========================
async function maybeShowPrePaywallTease(userText) {
  if (isPaid) return;

  if (userMessageCount === 7 && !paywallSoftTeaseShown) {
    paywallSoftTeaseShown = true;
    saveFlowFlags();

    const line =
      shouldTriggerPhotoInterest(userText) || shouldTriggerEmotionalHook(userText)
        ? t("softTeaseInterested")
        : t("softTeaseDefault");

    setTypingStatus();
    await wait(getTypingDelay(line));
    hideTypingIndicator();
    pushAssistantMessage(line);
    increaseChemistry(2);
  }

  if (userMessageCount === 8 && !paywallHardTeaseShown) {
    paywallHardTeaseShown = true;
    saveFlowFlags();

    const lines = shouldTriggerPhotoInterest(userText)
      ? t("hardTeaseInterested")
      : t("hardTeaseDefault");

    for (const line of lines) {
      setTypingStatus();
      await wait(getTypingDelay(line));
      hideTypingIndicator();
      pushAssistantMessage(line);
      await wait(getMicroPause());
    }

    increaseChemistry(2);
  }

  if (userMessageCount === 9 && !almostUnlockedMomentShown) {
    almostUnlockedMomentShown = true;
    saveFlowFlags();

    const lines = t("almostUnlocked");

    for (const line of lines) {
      setTypingStatus();
      await wait(getTypingDelay(line));
      hideTypingIndicator();
      pushAssistantMessage(line);
      await wait(getMicroPause());
    }

    increaseChemistry(1);
  }

  setIdleStatus();
}

function buildProactiveFallback() {
  return pickRandom(t("proactiveFallbacks"));
}

function scheduleProactiveMessage() {
  if (proactiveTimer) clearTimeout(proactiveTimer);

  proactiveTimer = setTimeout(async () => {
    if (locked) return;
    if (messages.length < 3) return;
    if (Math.random() < 0.55) return;

    try {
      setTypingStatus();

      const data = await sendMessageToAI(messages, true);
      saveMemory(data);

      if (data.reply && data.reply.trim()) {
        await addAssistantReply(data.reply);
      } else {
        const fallback = buildProactiveFallback();
        await wait(getTypingDelay(fallback));
        hideTypingIndicator();
        pushAssistantMessage(fallback);
        increaseChemistry(1);
      }
    } catch (err) {
      console.error("Proactive message failed:", err);
      hideTypingIndicator();
    } finally {
      setIdleStatus();
    }
  }, randomBetween(18000, 32000));
}

async function handleLockMoment() {
  const lines = t("lockMoment");

  for (const line of lines) {
    setTypingStatus();
    await wait(getTypingDelay(line));
    hideTypingIndicator();
    pushAssistantMessage(line);
    await wait(getMicroPause());
  }

  chemistry = Math.max(chemistry, 42);
  saveChemistry();
  updateChemistryUI();

  locked = true;
  updateUIState();
  if (statusEl) statusEl.textContent = "";
}

async function startCheckout(event) {
  event.preventDefault();

  if (!unlockBtn) return;

  try {
    unlockBtn.style.pointerEvents = "none";
    unlockBtn.textContent = t("checkoutOpening");

    const res = await fetch("/.netlify/functions/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();

    if (!res.ok || !data.url) {
      throw new Error(data.error || "Failed to create checkout session");
    }

    window.location.href = data.url;
  } catch (err) {
    console.error(err);
    unlockBtn.textContent = t("checkoutTryAgain");
    unlockBtn.style.pointerEvents = "auto";
    alert(t("checkoutOpenError"));
  }
}

// ==========================
// PHOTO UPLOAD
// ==========================

function showPhotoPaywall() {
  if (photoPaywallText) {
    photoPaywallText.innerHTML = t("photoPaywallText").replace("\n", "<br>");
  }
  if (photoPaywall) photoPaywall.style.display = "block";
}

function hidePhotoPaywall() {
  if (photoPaywall) photoPaywall.style.display = "none";
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = () => reject(new Error("File read failed"));
    reader.readAsDataURL(file);
  });
}

function addUserPhotoMessage(objectUrl) {
  const el = document.createElement("div");
  el.className = "message user has-image";
  el.style.opacity = "0";
  el.style.transform = "translateY(6px)";
  el.style.transition = "opacity 0.25s ease, transform 0.25s ease";

  const img = document.createElement("img");
  img.src = objectUrl;
  img.className = "chat-image";
  img.style.cursor = "default";
  el.appendChild(img);

  chat.appendChild(el);
  chat.scrollTop = chat.scrollHeight;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  });
}

async function sendPhoto(file) {
  if (locked) { updateUIState(); return; }

  hidePhotoPaywall();

  // Zobrazit náhled fotky od uživatele
  const objectUrl = URL.createObjectURL(file);
  addUserPhotoMessage(objectUrl);

  userMessageCount++;
  saveUserMessageCount();
  increaseChemistry(2);

  sendBtn.disabled = true;
  if (photoBtn) photoBtn.disabled = true;

  try {
    const base64 = await fileToBase64(file);
    const mediaType = file.type || "image/jpeg";

    // Přidáme foto zprávu do historie
    const photoMessage = {
      role: "user",
      content: [
        {
          type: "image_url",
          image_url: {
            url: `data:${mediaType};base64,${base64}`
          }
        },
        {
          type: "text",
          text: currentLang === "cs"
            ? "poslal jsem ti fotku"
            : "i sent you a photo"
        }
      ]
    };

    // Přidáme do messages pro kontext (bez base64 pro úsporu)
    messages.push({
      role: "user",
      content: currentLang === "cs" ? "[poslal fotku]" : "[sent a photo]"
    });
    saveMessages();

    setTypingStatus();

    // Pošleme na backend s foto
    const cleanHistory = messages.slice(0, -1).map(m => ({ role: m.role, content: m.content }));
    cleanHistory.push(photoMessage);

    const res = await fetch("/.netlify/functions/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: cleanHistory,
        memory,
        proactive: false,
        lang: currentLang,
        chemistry: Math.round(chemistry),
        hasPhoto: true
      })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Request failed");

    saveMemory(data);
    await addAssistantReply(data.reply);
    scheduleProactiveMessage();

  } catch (err) {
    hideTypingIndicator();
    // Pokud OpenAI odmítlo obrázek (moderace)
    const errMsg = err.message || "";
    if (errMsg.includes("moderat") || errMsg.includes("policy") || errMsg.includes("safety")) {
      pushAssistantMessage(t("photoModerationError"));
    } else {
      pushAssistantMessage(t("genericError"));
    }
    console.error(err);
  } finally {
    sendBtn.disabled = false;
    if (photoBtn) photoBtn.disabled = false;
    setIdleStatus();
    URL.revokeObjectURL(objectUrl);
  }
}

// ==========================
// SEND
// ==========================
async function send() {
  if (locked) {
    updateUIState();
    return;
  }

  const text = input.value.trim();
  if (!text) return;

  pushUserMessage(text);
  input.value = "";

  userMessageCount++;
  saveUserMessageCount();

  increaseChemistry(getChemistryGainFromText(text));

  sendBtn.disabled = true;

  try {
    await maybeShowPrePaywallTease(text);
    await maybeSendTeaserPhoto(text);

    if (userMessageCount >= FREE_MESSAGE_LIMIT && !isPaid) {
      await handleLockMoment();
      return;
    }

    setTypingStatus();

    const data = await sendMessageToAI(messages);

    saveMemory(data);
    await addAssistantReply(data.reply);

    await maybeSendPremiumPhoto(text);
    scheduleProactiveMessage();
  } catch (err) {
    hideTypingIndicator();
    const fallback = t("genericError");
    pushAssistantMessage(fallback);
    console.error(err);
  } finally {
    if (!locked) sendBtn.disabled = false;
    setIdleStatus();
  }
}

// ==========================
// EVENTS
// ==========================
sendBtn.addEventListener("click", send);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") send();
});

// FOTO TLAČÍTKO
if (photoBtn) {
  photoBtn.addEventListener("click", () => {
    if (!isPaid) {
      showPhotoPaywall();
      return;
    }
    hidePhotoPaywall();
    if (locked) { updateUIState(); return; }
    if (photoInput) photoInput.click();
  });
}

if (photoInput) {
  photoInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    photoInput.value = ""; // reset pro opakované použití
    await sendPhoto(file);
  });
}

if (photoUnlockBtn) {
  photoUnlockBtn.addEventListener("click", startCheckout);
}

if (unlockBtn) {
  unlockBtn.addEventListener("click", startCheckout);
}

if (manageBtn) {
  manageBtn.addEventListener("click", (event) => {
    event.preventDefault();
    openCustomerPortal();
  });
}

if (imageModal) {
  imageModal.addEventListener("click", (event) => {
    if (event.target === imageModal) closeImageModal();
  });
}

if (imageModalClose) {
  imageModalClose.addEventListener("click", closeImageModal);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && imageModal && imageModal.classList.contains("visible")) {
    closeImageModal();
  }
});

// ==========================
// INIT
// ==========================
if (isPaid) {
  locked = false;
}

updateStaticUIText();
updateChemistryUI();
renderMessages();
updateUIState();
updateLangButtons();
scheduleProactiveMessage();

// Ověř stav předplatného při načtení stránky
(async function verifySubscriptionOnLoad() {
  const sessionId = localStorage.getItem("nina_session_id");
  if (!sessionId) return;

  try {
    const res = await fetch(`/.netlify/functions/verify-session?session_id=${sessionId}`);
    const data = await res.json();

    if (res.ok && typeof data.paid === "boolean") {
      const wasP = isPaid;
      isPaid = data.paid;
      localStorage.setItem("nina_paid", isPaid ? "true" : "false");
      if (isPaid) localStorage.setItem("nina_ever_paid", "true");

      // Pokud se stav změnil, aktualizuj UI
      if (wasP !== isPaid) {
        if (isPaid) locked = false;
        updateUIState();
      }
    }
  } catch (err) {
    // Tiché selhání — necháme localStorage hodnotu
    console.warn("Could not verify subscription:", err);
  }
})();

// ==========================
// DEVICE ID
// ==========================
function getDeviceId() {
  let deviceId = localStorage.getItem("nina_device_id");
  if (!deviceId) {
    deviceId = "dev_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("nina_device_id", deviceId);
  }
  return deviceId;
}

// ==========================
// EMAIL LOGIN MODAL
// ==========================
const emailModal = document.getElementById("emailModal");
const emailInput = document.getElementById("emailInput");
const emailSubmitBtn = document.getElementById("emailSubmitBtn");
const emailModalError = document.getElementById("emailModalError");
const emailModalSkip = document.getElementById("emailModalSkip");

function showEmailModal() {
  if (emailModal) {
    emailModal.style.display = "flex";
    emailModal.classList.add("visible");
    setTimeout(() => { if (emailInput) emailInput.focus(); }, 300);
  }
}

function hideEmailModal() {
  if (emailModal) {
    emailModal.classList.remove("visible");
    emailModal.style.display = "none";
  }
}

async function verifyEmail() {
  const email = emailInput?.value?.trim();
  if (!email || !email.includes("@")) {
    if (emailModalError) {
      emailModalError.textContent = currentLang === "cs"
        ? "Zadej platný email."
        : "Please enter a valid email.";
      emailModalError.style.display = "block";
    }
    return;
  }

  if (emailSubmitBtn) {
    emailSubmitBtn.disabled = true;
    emailSubmitBtn.textContent = currentLang === "cs" ? "Ověřuji..." : "Checking...";
  }
  if (emailModalError) emailModalError.style.display = "none";

  try {
    const res = await fetch("/.netlify/functions/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, deviceId: getDeviceId() }),
    });

    const data = await res.json();

    if (data.deviceLimitReached) {
      if (emailModalError) {
        emailModalError.textContent = currentLang === "cs"
          ? "Toto předplatné je již aktivní na 2 zařízeních. Pro pomoc nás kontaktuj na peetabourk@gmail.com."
          : "This subscription is already active on 2 devices. Contact us at peetabourk@gmail.com for help.";
        emailModalError.style.display = "block";
      }
      if (emailSubmitBtn) {
        emailSubmitBtn.disabled = false;
        emailSubmitBtn.textContent = currentLang === "cs" ? "Ověřit přístup" : "Verify access";
      }
      return;
    }

    if (data.paid) {
      // Úspěch — nastavíme přístup
      isPaid = true;
      locked = false;
      localStorage.setItem("nina_paid", "true");
      localStorage.setItem("nina_ever_paid", "true");
      localStorage.setItem("nina_email", email);
      if (data.customerId) {
        localStorage.setItem("nina_customer_id", data.customerId);
      }
      hideEmailModal();
      updateUIState();
    } else {
      // Nenalezeno aktivní předplatné
      if (emailModalError) {
        emailModalError.textContent = currentLang === "cs"
          ? "Pro tento email jsme nenašli aktivní předplatné."
          : "No active subscription found for this email.";
        emailModalError.style.display = "block";
      }
    }
  } catch (err) {
    if (emailModalError) {
      emailModalError.textContent = currentLang === "cs"
        ? "Něco se pokazilo. Zkus to znovu."
        : "Something went wrong. Try again.";
      emailModalError.style.display = "block";
    }
  } finally {
    if (emailSubmitBtn) {
      emailSubmitBtn.disabled = false;
      emailSubmitBtn.textContent = currentLang === "cs" ? "Ověřit přístup" : "Verify access";
    }
  }
}

if (emailSubmitBtn) {
  emailSubmitBtn.addEventListener("click", verifyEmail);
}

if (emailInput) {
  emailInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") verifyEmail();
  });
}

if (emailModalSkip) {
  emailModalSkip.addEventListener("click", hideEmailModal);
}

// Tlačítka "Už mám předplatné" v paywallu
const paywallLoginBtn = document.getElementById("paywallLoginBtn");
const photoPaywallLoginBtn = document.getElementById("photoPaywallLoginBtn");

if (paywallLoginBtn) {
  paywallLoginBtn.addEventListener("click", showEmailModal);
}

if (photoPaywallLoginBtn) {
  photoPaywallLoginBtn.addEventListener("click", () => {
    hidePhotoPaywall();
    showEmailModal();
  });
}

// Zobraz email modal pokud nemá přístup a není na novém zařízení
// (tj. byl někdy přihlášen ale ztratil localStorage)
(function checkEmailModalNeeded() {
  const hasEverPaid = localStorage.getItem("nina_ever_paid") === "true";
  const currentlyPaid = localStorage.getItem("nina_paid") === "true";

  // Zobraz modal pokud uživatel v minulosti platil ale teď nemá přístup
  if (hasEverPaid && !currentlyPaid) {
    setTimeout(showEmailModal, 1500);
  }
})();

window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;
