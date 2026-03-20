const chat = document.getElementById("chat");
const input = document.getElementById("input");
const sendBtn = document.getElementById("sendBtn");
const statusEl = document.getElementById("status");
const paywall = document.getElementById("paywall");
const unlockBtn = document.getElementById("unlockBtn");

let userMessageCount = 0;
let locked = false;

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

async function sendMessageToAI(history) {
  const res = await fetch("/.netlify/functions/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ messages: history })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data.reply;
}

async function send() {
  if (locked) return;

  const text = input.value.trim();
  if (!text) return;

  addMessage("user", text);
  messages.push({ role: "user", content: text });
  input.value = "";

  userMessageCount += 1;
  if (userMessageCount >= 4) {
    locked = true;
    paywall.style.display = "block";
  }

  sendBtn.disabled = true;
  statusEl.textContent = "Nina is typing...";

  try {
    const reply = await sendMessageToAI(messages);
    addMessage("ai", reply);
    messages.push({ role: "assistant", content: reply });
  } catch (err) {
    const fallback = "mm... something went wrong. try again for me? 🖤";
    addMessage("ai", fallback);
    console.error(err);
  } finally {
    sendBtn.disabled = false;
    statusEl.textContent = "";
  }
}

sendBtn.addEventListener("click", send);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    send();
  }
});

unlockBtn.addEventListener("click", () => {
  alert("payment system coming soon 😉");
});
