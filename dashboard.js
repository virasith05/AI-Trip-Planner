// Chatbot toggle
const toggleBtn = document.getElementById("chatbot-toggle");
const chatbotBox = document.getElementById("chatbot-box");
const closeBtn = document.getElementById("chatbot-close");
const chatbotForm = document.getElementById("chatbot-form");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotMessages = document.getElementById("chatbot-messages");

toggleBtn.addEventListener("click", () => {
  chatbotBox.classList.toggle("hidden");
});

closeBtn.addEventListener("click", () => {
  chatbotBox.classList.add("hidden");
});

chatbotForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const userMsg = chatbotInput.value;
  if (!userMsg) return;

  const userBubble = document.createElement("div");
  userBubble.textContent = "You: " + userMsg;
  chatbotMessages.appendChild(userBubble);

  const aiBubble = document.createElement("div");
  aiBubble.textContent = "AI: Working on it... 🤖";
  chatbotMessages.appendChild(aiBubble);

  chatbotInput.value = "";
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

  // Simulate AI reply
  setTimeout(() => {
    aiBubble.textContent = `AI: Great question! I’ll help with "${userMsg}". (This is a placeholder response.)`;
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }, 1000);
});