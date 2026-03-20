const chat = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");
const statusEl = document.getElementById("status");
const paywall = document.getElementById("paywall");
const unlockBtn = document.getElementById("unlockBtn");

let isPaid = localStorage.getItem("nina_paid") === "true";

let userMessageCount = 0;
let locked = false;
let proactiveTimer = null;

// 🔥 paměť
let memory = JSON.parse(localStorage.getItem("nina_memory") || "{}");

const messages = [
  {
    role: "assistant",
    content: "hey... i was waiting for you 🖤"
  }
];

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
    return;
  }

  const text = input.value.trim();
  if (!text) return;

  addMessage("user", text);
  messages.push({ role: "user", content: text });
  input.value = "";

  userMessageCount++;

  if (userMessageCount === 8) {
    addMessage("ai", "mm… you’re getting close to the limit 🖤");
  }

  if (userMessageCount === 9) {
    addMessage("ai", "one more… then you’ll have to unlock me 😏");
  }

  if (userMessageCount >= 10 && !isPaid) {
    locked = true;
    paywall.style.display = "block";
    input.disabled = true;
    sendBtn.disabled = true;
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
    console.error(err);
  } finally {
    sendBtn.disabled = false;
    statusEl.textContent = "";
  }
}

// 🔥 EVENTS
sendBtn.addEventListener("click", send);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") send();
});
