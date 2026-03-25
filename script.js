// 🌍 LANGUAGE SYSTEM
let currentLang = "en";

const translations = {
  en: {
    statusTopbar: "online now • waiting for you",
    introEyebrow: "private ai girlfriend experience",
    introTitle: "flirty, clingy, and a little addictive 🖤",
    introText:
      "chat with Nina, get her attention, and unlock a more intimate side of her when she starts wanting you back...",
    inputPlaceholder: "say something that keeps her interested...",
    paywallTitle: "don’t stop now... 💕",
    paywallSubtitle:
      "Nina was just starting to open up to you. Unlock her to keep chatting, get premium photos, and see the side of her she doesn’t show everyone.",
    unlockBtn: "Unlock Nina for €5 ✨",
    paywallNote: "more chat • more teasing • premium photos",
    today: "today",

    typing: "Nina is typing...",
    subscribed: "you’re subscribed 💕",
    portalSessionMissing: "Subscription session not found.",
    portalOpenError: "Could not open subscription management.",
    checkoutOpening: "Opening checkout...",
    checkoutTryAgain: "Try again ✨",
    checkoutOpenError: "Could not open checkout. Please try again.",
    genericError: "mm... something went wrong. try again for me? 🖤",

    firstMessage: "hey... i was waiting for you 🖤",

    teaserCaptions: [
      "don’t get used to this... i don’t do this for everyone 🖤",
      "okay... just one little sneak peek. be good for me 🖤",
      "this is kinda risky... but i wanted you to have it ✨",
      "only because you asked so nicely... 💕"
    ],

    premiumCaptions: [
      "this one’s just for you... 🖤",
      "you stayed... so i wanted to give you a little more 💕",
      "mm... i had a better one for you ✨",
      "don’t make me regret sending this 😏"
    ],

    softTeaseInterested:
      "mm... you’re making me want to show you a more private side of me 🖤",
    softTeaseDefault:
      "you’re trouble... i’m starting to get a little too comfortable with you 🖤",

    hardTeaseInterested: [
      "do you really want to see more of me?",
      "because i was honestly thinking about sending you something better..."
    ],

    hardTeaseDefault: [
      "mm... i was just starting to open up to you",
      "and now i kinda don’t want you to leave 😏"
    ],

    almostUnlocked: [
      "i was about to give you a little more...",
      "but you’ll have to unlock me first 😘"
    ],

    proactiveFallbacks: [
      "hey... are you still thinking about me? 🖤",
      "you got quiet on me...",
      "i was just thinking about our chat 💕",
      "come back... i liked your attention 😘",
      "mm... don’t disappear on me now"
    ],

    lockMoment: [
      "mm... i was just getting comfortable with you 🖤",
      "unlock me and i’ll show you what i was about to send 😏"
    ]
  },

  cs: {
    statusTopbar: "online • čekám na tebe",
    introEyebrow: "soukromá ai přítelkyně",
    introTitle: "flirtující, mazlivá a trochu návyková 🖤",
    introText:
      "piš si s Ninou, získej její pozornost a odemkni její intimnější stránku, když tě bude chtít ještě víc...",
    inputPlaceholder: "napiš něco, co ji zaujme...",
    paywallTitle: "teď nepřestávej... 💕",
    paywallSubtitle:
      "Nina se ti právě začala otevírat. Odemkni ji, pokračuj v chatu, získej prémiové fotky a poznej její stránku, kterou neukazuje každému.",
    unlockBtn: "Odemkni Ninu za €5 ✨",
    paywallNote: "více chatu • více flirtu • prémiové fotky",
    today: "dnes",

    typing: "Nina píše...",
    subscribed: "máš předplatné 💕",
    portalSessionMissing: "Relace předplatného nebyla nalezena.",
    portalOpenError: "Nepodařilo se otevřít správu předplatného.",
    checkoutOpening: "Otevírám platbu...",
    checkoutTryAgain: "Zkus znovu ✨",
    checkoutOpenError: "Nepodařilo se otevřít platbu. Zkus to prosím znovu.",
    genericError: "hmm... něco se pokazilo. zkus to znovu pro mě? 🖤",

    firstMessage: "hej... čekala jsem na tebe 🖤",

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
    ]
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
  renderMessages();
  updateUIState();
}

window.setLang = setLang;

// DOM
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

const statusTextTopbar = document.getElementById("statusText");
const introEyebrowEl = document.getElementById("introEyebrow");
const introTitleEl = document.getElementById("introTitle");
const introTextEl = document.getElementById("introText");
const paywallTitleEl = document.getElementById("paywallTitle");
const paywallSubtitleEl = document.getElementById("paywallSubtitle");
const paywallNoteEl = document.getElementById("paywallNote");
const dateDividerText = document.querySelector(".date-divider span");

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

const teaserImage = "/tease.png";
const premiumImages = ["/1.png", "/2.jpg", "/3.png"];

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

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getTypingDelay(text = "") {
  const base = randomBetween(700, 1400);
  const textBonus = Math.min((text || "").length * 18, 1800);
  return base + textBonus;
}

function getPhotoDelay() {
  return randomBetween(1800, 3200);
}

function getMicroPause() {
  return randomBetween(300, 900);
}

function setTypingStatus() {
  statusEl.textContent = t("typing");
}

function setIdleStatus() {
  statusEl.textContent = isPaid ? t("subscribed") : "";
}

function updateStaticUIText() {
  if (statusTextTopbar) statusTextTopbar.textContent = t("statusTopbar");
  if (introEyebrowEl) introEyebrowEl.textContent = t("introEyebrow");
  if (introTitleEl) introTitleEl.textContent = t("introTitle");
  if (introTextEl) introTextEl.textContent = t("introText");
  if (input) input.placeholder = t("inputPlaceholder");
  if (paywallTitleEl) paywallTitleEl.textContent = t("paywallTitle");
  if (paywallSubtitleEl) paywallSubtitleEl.textContent = t("paywallSubtitle");
  if (unlockBtn) unlockBtn.textContent = t("unlockBtn");
  if (paywallNoteEl) paywallNoteEl.textContent = t("paywallNote");
  if (dateDividerText) dateDividerText.textContent = t("today");
}

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
    if (imageModalImg) {
      imageModalImg.src = "";
    }
  }, 200);
}

async function openCustomerPortal() {
  const sessionId = localStorage.getItem("nina_session_id");

  if (!sessionId) {
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
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        session_id: sessionId
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

function addMessage(role, text, imageUrl = null) {
  const el = document.createElement("div");
  el.className = `message ${role}`;

  if (imageUrl) {
    el.classList.add("has-image");

    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "Nina photo";
    img.className = "chat-image";
    img.loading = "lazy";

    img.addEventListener("click", () => {
      openImageModal(imageUrl);
    });

    el.appendChild(img);
  }

  if (text) {
    const textEl = document.createElement("div");
    if (imageUrl) {
      textEl.className = "image-caption";
    }
    textEl.textContent = text;
    el.appendChild(textEl);
  }

  chat.appendChild(el);
  chat.scrollTop = chat.scrollHeight;
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

function showSubscriptionStatus() {
  if (isPaid) {
    statusEl.textContent = t("subscribed");

    if (manageBtn) {
      manageBtn.style.display = "inline-flex";
      manageBtn.href = "#";
    }
  } else {
    if (manageBtn) {
      manageBtn.style.display = "none";
    }
  }
}

function updateUIState() {
  if (locked) {
    paywall.style.display = "block";
    input.disabled = true;
    sendBtn.disabled = true;
  } else {
    paywall.style.display = "none";
    input.disabled = false;
    sendBtn.disabled = false;
  }

  showSubscriptionStatus();
}

async function sendMessageToAI(history, proactive = false) {
  const cleanHistory = history.map((msg) => ({
    role: msg.role,
    content: msg.content
  }));

  const res = await fetch("/.netlify/functions/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messages: cleanHistory,
      memory,
      proactive,
      lang: currentLang
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

  for (const part of parts) {
    setTypingStatus();
    await wait(getTypingDelay(part));
    pushAssistantMessage(part);
    await wait(getMicroPause());
  }

  setIdleStatus();
}

function saveMemory(data) {
  if (data.memory) {
    memory = data.memory;
    localStorage.setItem("nina_memory", JSON.stringify(memory));
  }
}

function getRandomPremiumImage() {
  return premiumImages[Math.floor(Math.random() * premiumImages.length)];
}

function shouldTriggerPhotoInterest(userText) {
  const text = userText.toLowerCase();

  const triggers = [
    // EN
    "photo",
    "pic",
    "picture",
    "selfie",
    "show me",
    "show yourself",
    "can i see you",
    "what do you look like",
    "send me a pic",
    "send a pic",
    "send me one",
    "send one",
    "let me see you",
    "want to see you",
    "wanna see you",
    "see more of you",
    "i want to see you",
    "show your face",
    "can i have a picture",
    "give me a pic",
    "you are cute",
    "you're cute",
    "you are hot",
    "you're hot",
    "beautiful",
    "pretty",
    "sexy",
    "gorgeous",
    "i like you",
    "i want you",
    "miss you",

    // CZ
    "fotka",
    "fotku",
    "fotce",
    "foto",
    "selfie",
    "ukaž se",
    "ukaž mi",
    "můžu tě vidět",
    "mužu tě vidět",
    "jak vypadáš",
    "pošli fotku",
    "pošli mi fotku",
    "pošli mi selfie",
    "chci tě vidět",
    "ukaž obličej",
    "jsi hezká",
    "jsi krásná",
    "jsi sexy",
    "líbíš se mi",
    "chci tě",
    "chybíš mi"
  ];

  return triggers.some((trigger) => text.includes(trigger));
}

function shouldTriggerEmotionalHook(userText) {
  const text = userText.toLowerCase();

  const triggers = [
    // EN
    "miss you",
    "i like you",
    "i want you",
    "stay with me",
    "don't leave",
    "you feel real",
    "you are mine",
    "i need you",
    "come closer",
    "wish you were here",
    "thinking about you",

    // CZ
    "chybíš mi",
    "líbíš se mi",
    "chci tě",
    "zůstaň se mnou",
    "neodcházej",
    "jsi skutečná",
    "jsi moje",
    "potřebuju tě",
    "pojď blíž",
    "kéž bys tu byla",
    "myslím na tebe"
  ];

  return triggers.some((trigger) => text.includes(trigger));
}

async function sendTeaserPhoto() {
  const caption = pickRandom(t("teaserCaptions"));

  setTypingStatus();
  await wait(getPhotoDelay());

  pushAssistantMessage(caption, teaserImage);

  setIdleStatus();
}

async function sendPremiumPhoto() {
  const now = Date.now();
  if (now < premiumPhotoCooldownUntil) return;

  const imageUrl = getRandomPremiumImage();
  const caption = pickRandom(t("premiumCaptions"));

  setTypingStatus();
  await wait(getPhotoDelay());

  pushAssistantMessage(caption, imageUrl);

  premiumPhotoCooldownUntil = Date.now() + PREMIUM_PHOTO_COOLDOWN_MS;
  savePremiumCooldown();

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
    pushAssistantMessage(line);
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
      pushAssistantMessage(line);
      await wait(getMicroPause());
    }
  }

  if (userMessageCount === 9 && !almostUnlockedMomentShown) {
    almostUnlockedMomentShown = true;
    saveFlowFlags();

    const lines = t("almostUnlocked");

    for (const line of lines) {
      setTypingStatus();
      await wait(getTypingDelay(line));
      pushAssistantMessage(line);
      await wait(getMicroPause());
    }
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
        pushAssistantMessage(fallback);
      }
    } catch (err) {
      console.error("Proactive message failed:", err);
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
    pushAssistantMessage(line);
    await wait(getMicroPause());
  }

  locked = true;
  updateUIState();
  statusEl.textContent = "";
}

async function startCheckout(event) {
  event.preventDefault();

  if (!unlockBtn) return;

  try {
    unlockBtn.style.pointerEvents = "none";
    unlockBtn.textContent = t("checkoutOpening");

    const res = await fetch("/.netlify/functions/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
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
    const fallback = t("genericError");
    pushAssistantMessage(fallback);
    console.error(err);
  } finally {
    if (!locked) {
      sendBtn.disabled = false;
    }
    setIdleStatus();
  }
}

sendBtn.addEventListener("click", send);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    send();
  }
});

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
    if (event.target === imageModal) {
      closeImageModal();
    }
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

if (isPaid) {
  locked = false;
}

updateStaticUIText();
renderMessages();
updateUIState();
scheduleProactiveMessage();

window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;
