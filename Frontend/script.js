// Trip Planner Output
document.getElementById("trip-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const dest = document.getElementById("destination").value;
  const days = document.getElementById("days").value;
  const interests = document.getElementById("interests").value;
  const output = document.getElementById("plan-output");

  output.innerHTML = `
    <h3>Trip Plan for ${dest}</h3>
    <p>📅 Duration: ${days} days</p>
    <p>🎯 Interests: ${interests}</p>
    <p>🧠 AI Suggests: Explore top spots, hidden gems, and local experiences in ${dest}. Your plan includes daily itineraries, dining, and transport tips based on your interests!</p>
  `;
});

// Email subscribe Handler
document.getElementById("subscribe-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const emailInput = document.getElementById("email-input");
  const message = document.getElementById("subscribe-message");

  if (emailInput.value.includes("@")) {
    message.textContent = "✅ Thanks for subscribing!";
    message.style.color = "#00ff99";
    emailInput.value = "";
  } else {
    message.textContent = "❌ Invalid email address.";
    message.style.color = "#ff5555";
  }
});

// Footer Year
document.getElementById("current-year").textContent = new Date().getFullYear();

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
