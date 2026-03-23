const chat = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");
const statusEl = document.getElementById("status");
const paywall = document.getElementById("paywall");
const manageBtn = document.getElementById("manageBtn");

const imageModal = document.getElementById("imageModal");
const imageModalImg = document.getElementById("imageModalImg");
const imageModalClose = document.getElementById("imageModalClose");

let isPaid = localStorage.getItem("nina_paid") === "true";
let proactiveTimer = null;

// AI memory
let memory = JSON.parse(localStorage.getItem("nina_memory") || "{}");

// chat history
let messages = JSON.parse(localStorage.getItem("nina_messages") || "null");

// user message counter
let userMessageCount = parseInt(localStorage.getItem("nina_userMessageCount") || "0", 10);

// photo flags
let teaserPhotoSent = localStorage.getItem("nina_teaserPhotoSent") === "true";
let premiumPhotoCooldownUntil = parseInt(localStorage.getItem("nina_premiumPhotoCooldownUntil") || "0", 10);

// lock state
let locked = false;

// tease flow flags
let paywallSoftTeaseShown = localStorage.getItem("nina_paywallSoftTeaseShown") === "true";
let paywallHardTeaseShown = localStorage.getItem("nina_paywallHardTeaseShown") === "true";
let almostUnlockedMomentShown = localStorage.getItem("nina_almostUnlockedMomentShown") === "true";

// images
const teaserImage = "/tease.png";
const premiumImages = ["/1.png", "/2.jpg", "/3.png"];

// config
const FREE_MESSAGE_LIMIT = 10;
const PREMIUM_PHOTO_COOLDOWN_MS = 1000 * 60 * 3;

if (!messages || !Array.isArray(messages) || messages.length === 0) {
  messages = [
    {
      role: "assistant",
      content: "hey... i was waiting for you 🖤"
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
    statusEl.textContent = "you’re subscribed 💕";

    if (manageBtn) {
      manageBtn.style.display = "inline-flex";
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
      proactive
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
    statusEl.textContent = "Nina is typing...";
    await wait(getTypingDelay(part));
    pushAssistantMessage(part);
    await wait(getMicroPause());
  }

  statusEl.textContent = isPaid ? "you’re subscribed 💕" : "";
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
    "miss you"
  ];

  return triggers.some((trigger) => text.includes(trigger));
}

function shouldTriggerEmotionalHook(userText) {
  const text = userText.toLowerCase();

  const triggers = [
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
    "thinking about you"
  ];

  return triggers.some((trigger) => text.includes(trigger));
}

async function sendTeaserPhoto() {
  const captions = [
    "don’t get used to this... i don’t do this for everyone 🖤",
    "okay... just one little sneak peek. be good for me 🖤",
    "this is kinda risky... but i wanted you to have it ✨",
    "only because you asked so nicely... 💕"
  ];

  const caption = pickRandom(captions);

  statusEl.textContent = "Nina is typing...";
  await wait(getPhotoDelay());

  pushAssistantMessage(caption, teaserImage);

  statusEl.textContent = isPaid ? "you’re subscribed 💕" : "";
}

async function sendPremiumPhoto() {
  const now = Date.now();
  if (now < premiumPhotoCooldownUntil) return;

  const imageUrl = getRandomPremiumImage();

  const captions = [
    "this one’s just for you... 🖤",
    "you stayed... so i wanted to give you a little more 💕",
    "mm... i had a better one for you ✨",
    "don’t make me regret sending this 😏"
  ];

  const caption = pickRandom(captions);

  statusEl.textContent = "Nina is typing...";
  await wait(getPhotoDelay());

  pushAssistantMessage(caption, imageUrl);

  premiumPhotoCooldownUntil = Date.now() + PREMIUM_PHOTO_COOLDOWN_MS;
  savePremiumCooldown();

  statusEl.textContent = isPaid ? "you’re subscribed 💕" : "";
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

    const line = shouldTriggerPhotoInterest(userText) || shouldTriggerEmotionalHook(userText)
      ? "mm... you’re making me want to show you a more private side of me 🖤"
      : "you’re trouble... i’m starting to get a little too comfortable with you 🖤";

    statusEl.textContent = "Nina is typing...";
    await wait(getTypingDelay(line));
    pushAssistantMessage(line);
  }

  if (userMessageCount === 8 && !paywallHardTeaseShown) {
    paywallHardTeaseShown = true;
    saveFlowFlags();

    const lines = shouldTriggerPhotoInterest(userText)
      ? [
          "do you really want to see more of me?",
          "because i was honestly thinking about sending you something better..."
        ]
      : [
          "mm... i was just starting to open up to you",
          "and now i kinda don’t want you to leave 😏"
        ];

    for (const line of lines) {
      statusEl.textContent = "Nina is typing...";
      await wait(getTypingDelay(line));
      pushAssistantMessage(line);
      await wait(getMicroPause());
    }
  }

  if (userMessageCount === 9 && !almostUnlockedMomentShown) {
    almostUnlockedMomentShown = true;
    saveFlowFlags();

    const lines = [
      "i was about to give you a little more...",
      "but you’ll have to unlock me first 😘"
    ];

    for (const line of lines) {
      statusEl.textContent = "Nina is typing...";
      await wait(getTypingDelay(line));
      pushAssistantMessage(line);
      await wait(getMicroPause());
    }
  }

  statusEl.textContent = isPaid ? "you’re subscribed 💕" : "";
}

function buildProactiveFallback() {
  const candidates = [
    "hey... are you still thinking about me? 🖤",
    "you got quiet on me...",
    "i was just thinking about our chat 💕",
    "come back... i liked your attention 😘",
    "mm... don’t disappear on me now"
  ];

  return pickRandom(candidates);
}

function scheduleProactiveMessage() {
  if (proactiveTimer) clearTimeout(proactiveTimer);

  proactiveTimer = setTimeout(async () => {
    if (locked) return;
    if (messages.length < 3) return;
    if (Math.random() < 0.55) return;

    try {
      statusEl.textContent = "Nina is typing...";

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
      statusEl.textContent = isPaid ? "you’re subscribed 💕" : "";
    }
  }, randomBetween(18000, 32000));
}

async function handleLockMoment() {
  const lines = [
    "mm... i was just getting comfortable with you 🖤",
    "unlock me and i’ll show you what i was about to send 😏"
  ];

  for (const line of lines) {
    statusEl.textContent = "Nina is typing...";
    await wait(getTypingDelay(line));
    pushAssistantMessage(line);
    await wait(getMicroPause());
  }

  locked = true;
  updateUIState();
  statusEl.textContent = "";
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

    statusEl.textContent = "Nina is typing...";

    const data = await sendMessageToAI(messages);

    saveMemory(data);
    await addAssistantReply(data.reply);

    await maybeSendPremiumPhoto(text);
    scheduleProactiveMessage();
  } catch (err) {
    const fallback = "mm... something went wrong. try again for me? 🖤";
    pushAssistantMessage(fallback);
    console.error(err);
  } finally {
    if (!locked) {
      sendBtn.disabled = false;
    }
    statusEl.textContent = isPaid ? "you’re subscribed 💕" : "";
  }
}

sendBtn.addEventListener("click", send);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    send();
  }
});

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

renderMessages();
updateUIState();
scheduleProactiveMessage();

window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;
