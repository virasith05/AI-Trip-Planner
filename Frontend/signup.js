const form = document.querySelector(".signup-form");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const passwordMessage = document.getElementById("password-message");
const passwordStrengthBar = document.getElementById("strength-bar");
const strengthMessage = document.getElementById("strength-message");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (!name || !email || !password || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match. Please try again.");
    return;
  }

  alert("Account created successfully! (This is a placeholder)");
  window.location.href = "login.html";
});

confirmPasswordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  if (confirmPassword === "") {
    passwordMessage.textContent = "";
    passwordMessage.className = "";
    return;
  }

  if (password === confirmPassword) {
    passwordMessage.textContent = "Passwords match ✔";
    passwordMessage.className = "match";
  } else {
    passwordMessage.textContent = "Passwords do not match ✖";
    passwordMessage.className = "mismatch";
  }
});

// Password Strength Function
passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  let strength = "weak";
  let strengthColor = "#f44336";
  let message = "Weak Password";

  // Check for password strength based on regex patterns
  const lengthCondition = password.length >= 8;
  const numberCondition = /[0-9]/.test(password);
  const lowercaseCondition = /[a-z]/.test(password);
  const uppercaseCondition = /[A-Z]/.test(password);
  const specialCharCondition = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const conditionsMet = [lengthCondition, numberCondition, lowercaseCondition, uppercaseCondition, specialCharCondition].filter(Boolean).length;

  if (conditionsMet === 1) {
    strength = "weak";
    strengthColor = "#f44336";
    message = "Weak Password";
  } else if (conditionsMet === 2 || conditionsMet === 3) {
    strength = "medium";
    strengthColor = "#ff9800";
    message = "Medium Password";
  } else if (conditionsMet === 4 || conditionsMet === 5) {
    strength = "strong";
    strengthColor = "#4caf50";
    message = "Strong Password";
  }

  passwordStrengthBar.className = strength;
  passwordStrengthBar.style.width = `${(conditionsMet / 5) * 100}%`;
  strengthMessage.textContent = message;
  strengthMessage.style.color = strengthColor;
});
