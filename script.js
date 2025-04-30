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

