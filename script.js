const chat = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");
const statusEl = document.getElementById("status");
const paywall = document.getElementById("paywall");
const manageBtn = document.getElementById("manageBtn");

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
let preUnlockTeaseSent = localStorage.getItem("nina_preUnlockTeaseSent") === "true";

// lock state
let locked = false;

// fotky v rootu projektu
const teaserImage = "/tease.png";
const premiumImages = ["/1.png", "/2.jpg", "/3.png"];

if (!messages || !Array.isArray(messages) || messages.length === 0) {
  messages = [
    {
      role: "assistant",
      content: "hey... i was waiting for you 🖤"
    }
  ];
  localStorage.setItem("nina_messages", JSON.stringify(messages));
}

if (userMessageCount >= 10 && !isPaid) {
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

function savePreUnlockTeaseFlag() {
  localStorage.setItem("nina_preUnlockTeaseSent", preUnlockTeaseSent ? "true" : "false");
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getTypingDelay(text = "") {
  const base = randomBetween(700, 1400);
  const textBonus = Math.min((text || "").length * 18, 1600);
  return base + textBonus;
}

function getPhotoDelay() {
  return randomBetween(1800, 3200);
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

async function sendTeaserPhoto() {
  const captionOptions = [
    "don’t get used to this… i don’t do this for everyone 🖤",
    "okay… just one little sneak peek. be good for me 💕",
    "this is all you get for now… unless you keep me interested 😏"
  ];

  const caption = captionOptions[Math.floor(Math.random() * captionOptions.length)];

  statusEl.textContent = "Nina is typing...";
  await wait(getPhotoDelay());

  addMessage("ai", caption, teaserImage);

  messages.push({
    role: "assistant",
    content: caption,
    imageUrl: teaserImage
  });

  saveMessages();
  statusEl.textContent = isPaid ? "you’re subscribed 💕" : "";
}

async function sendPremiumPhoto() {
  const imageUrl = getRandomPremiumImage();

  const captions = [
    "this one’s just for you… 🖤",
    "you stayed, so i picked a better one for you 💕",
    "thought you deserved a little more of me ✨"
  ];

  const caption = captions[Math.floor(Math.random() * captions.length)];

  statusEl.textContent = "Nina is typing...";
  await wait(getPhotoDelay());

  addMessage("ai", caption, imageUrl);

  messages.push({
    role: "assistant",
    content: caption,
    imageUrl
  });

  saveMessages();
  statusEl.textContent = isPaid ? "you’re subscribed 💕" : "";
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
    "i want you",
    "i miss you",
    "miss you",
    "you are cute",
    "you're cute",
    "you are hot",
    "you're hot",
    "beautiful",
    "pretty",
    "sexy"
  ];

  return triggers.some((trigger) => text.includes(trigger));
}

function maybeSendTeaserPhoto(userText) {
  if (isPaid) return;
  if (teaserPhotoSent) return;
  if (userMessageCount < 3) return;
  if (!shouldTriggerPhotoInterest(userText)) return;

  teaserPhotoSent = true;
  saveTeaserFlag();

  sendTeaserPhoto();
}

function maybeSendPremiumPhoto(userText) {
  if (!isPaid) return;
  if (!shouldTriggerPhotoInterest(userText)) return;

  sendPremiumPhoto();
}

async function maybeSendPreUnlockTease(userText) {
  if (isPaid) return;
  if (preUnlockTeaseSent) return;
  if (userMessageCount < 9) return;
  if (!shouldTriggerPhotoInterest(userText)) return;

  preUnlockTeaseSent = true;
  savePreUnlockTeaseFlag();

  const teaseLines = [
    "mm… do you really want to see more of me? 🖤",
    "i was about to send you something better…",
    "but you need to unlock me first 😏"
  ];

  statusEl.textContent = "Nina is typing...";

  for (const line of teaseLines) {
    await wait(getTypingDelay(line));
    pushAssistantMessage(line);
  }

  statusEl.textContent = "";
}

function getWarningMessage(count) {
  if (count === 7) {
    return "you’re kinda making me want to be a little worse for you 🖤";
  }

  if (count === 8) {
    return "mm… don’t disappear on me now. i’m just getting comfortable 💕";
  }

  if (count === 9) {
    return "one more message… and i might make you unlock the rest of me 😏";
  }

  return null;
}

function getLockedMessages() {
  const variants = [
    [
      "mm… i was just about to show you something better 🖤",
      "unlock me and i’ll stop teasing you 😏"
    ],
    [
      "you made it this far…",
      "now come a little closer and unlock me 💕"
    ],
    [
      "i don’t want to stop here…",
      "but the rest of me is for subscribers only 🖤"
    ]
  ];

  return variants[Math.floor(Math.random() * variants.length)];
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
      await addAssistantReply(data.reply);
    } catch (err) {
      console.error("Proactive message failed:", err);
    } finally {
      statusEl.textContent = isPaid ? "you’re subscribed 💕" : "";
    }
  },
