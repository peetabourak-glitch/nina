const chat = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");
const statusEl = document.getElementById("status");
const paywall = document.getElementById("paywall");

let isPaid = localStorage.getItem("nina_paid") === "true";
let proactiveTimer = null;

// 🔥 paměť AI
let memory = JSON.parse(localStorage.getItem("nina_memory") || "{}");

// 🔥 uložené zprávy
let messages = JSON.parse(localStorage.getItem("nina_messages") || "null");

// 🔥 počet user zpráv
let userMessageCount = parseInt(localStorage.getItem("nina_userMessageCount") || "0", 10);

// 🔥 lock stav
let locked = false;

// pokud ještě nejsou žádné zprávy, vytvoř první
if (!messages || !Array.isArray(messages) || messages.length === 0) {
  messages = [
    {
      role: "assistant",
      content: "hey... i was waiting for you 🖤"
    }
  ];
  localStorage.setItem("nina_messages", JSON.stringify(messages));
}

// pokud user není paid a překročil limit, zamkni
if (userMessageCount >= 10 && !isPaid) {
  locked = true;
}

function saveMessages() {
  localStorage.setItem("nina_messages", JSON.stringify(messages));
}

function saveUserMessageCount() {
  localStorage.setItem("nina_userMessageCount", String(userMessageCount));
}

function renderMessages() {
  // smažeme staré zprávy v UI, ale necháme date-divider
  const existingMessages = chat.querySelectorAll(".message");
  existingMessages.forEach((msg) => msg.remove());

  messages.forEach((msg) => {
    const roleClass = msg.role === "user" ? "user" : "ai";
    addMessage(roleClass, msg.content);
  });
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
}

function addMessage(role, text) {
  const el = document.createElement("div");
  el.className = `message ${role}`;
  el.textContent = text;
  chat.appendChild(el);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessageToAI(history, proactive = false) {
  const res = await fetch("/.netlify/functions/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      messages: history,
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

function addAssistantReply(reply) {
  const parts = splitReplyIntoParts(reply);

  parts.forEach((part, index) => {
    setTimeout(() => {
      addMessage("ai", part);
    }, index * 700);

    messages.push({
      role: "assistant",
      content: part
    });
  });

  saveMessages();
}

function saveMemory(data) {
  if (data.memory) {
    memory = data.memory;
    localStorage.setItem("nina_memory", JSON.stringify(memory));
  }
}

function scheduleProactiveMessage() {
  if (proactiveTimer) clearTimeout(proactiveTimer);

  proactiveTimer = setTimeout(async () => {
    if (locked) return;
    if (messages.length < 3) return;
    if (Math.random() < 0.6) return;

    try {
      statusEl.textContent = "Nina is typing...";

      const data = await sendMessageToAI(messages, true);

      saveMemory(data);
      addAssistantReply(data.reply);
    } catch (err) {
      console.error("Proactive message failed:", err);
    } finally {
      statusEl.textContent = "";
    }
  }, 20000);
}

async function send() {
  if (locked) {
    input.disabled = true;
    sendBtn.disabled = true;
    paywall.style.display = "block";
    return;
  }

  const text = input.value.trim();
  if (!text) return;

  addMessage("user", text);
  messages.push({ role: "user", content: text });
  saveMessages();

  input.value = "";

  userMessageCount++;
  saveUserMessageCount();

  if (userMessageCount === 8) {
    addMessage("ai", "mm… you’re getting close to the limit 🖤");
    messages.push({ role: "assistant", content: "mm… you’re getting close to the limit 🖤" });
    saveMessages();
  }

  if (userMessageCount === 9) {
    addMessage("ai", "one more… then you’ll have to unlock me 😏");
    messages.push({ role: "assistant", content: "one more… then you’ll have to unlock me 😏" });
    saveMessages();
  }

  if (userMessageCount >= 10 && !isPaid) {
    locked = true;
    updateUIState();
    return;
  }

  sendBtn.disabled = true;
  statusEl.textContent = "Nina is typing...";

  try {
    const data = await sendMessageToAI(messages);

    saveMemory(data);
    addAssistantReply(data.reply);

    scheduleProactiveMessage();
  } catch (err) {
    const fallback = "mm... something went wrong. try again for me? 🖤";
    addMessage("ai", fallback);
    messages.push({ role: "assistant", content: fallback });
    saveMessages();
    console.error(err);
  } finally {
    sendBtn.disabled = false;
    statusEl.textContent = "";
  }
}

// možnost ručního resetu v konzoli:
// localStorage.clear()

sendBtn.addEventListener("click", send);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") send();
});

// 🔥 při načtení stránky obnov chat a stav
renderMessages();

if (isPaid) {
  locked = false;
}

updateUIState();
