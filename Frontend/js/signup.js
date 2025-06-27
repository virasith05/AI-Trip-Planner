import { RegisterUser } from "./users.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".signup-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const passwordMessage = document.getElementById("password-message");
  const passwordStrengthBar = document.getElementById("strength-bar");
  const strengthMessage = document.getElementById("strength-message");
  const mobileInput = document.getElementById("mobile");
  const dobInput = document.getElementById("dob");

  // Submit Handler
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const mobile = mobileInput.value.trim();
    const dob = dobInput.value;

    if (!name || !email || !password || !confirmPassword || !mobile || !dob) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!/^\d{10,15}$/.test(mobile)) {
      alert("Please enter a valid mobile number (10-15 digits).");
      return;
    }

    const values = { name, email, password, phone: mobile, dob };

    const response = await RegisterUser(values);
    if (response?.success) {
      // Show custom modal instead of alert
      document.getElementById("success-modal").style.display = "flex";
      document.getElementById("close-modal").onclick = function() {
        window.location.href = "login.html";
      };
      return;
    } else {
      alert(response?.message || "Signup failed. Try again.");
    }
  });

  // Password Match Checker
  confirmPasswordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (!confirmPassword) {
      passwordMessage.textContent = "";
      passwordMessage.className = "";
      return;
    }

    const match = password === confirmPassword;
    passwordMessage.textContent = match ? "Passwords match ✔" : "Passwords do not match ✖";
    passwordMessage.className = match ? "match" : "mismatch";
  });

  // Password Strength Checker
  passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;

    const checks = [
      password.length >= 8,
      /[0-9]/.test(password),
      /[a-z]/.test(password),
      /[A-Z]/.test(password),
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    ];

    const score = checks.filter(Boolean).length;

    let strength = "weak";
    let color = "#f44336";
    let message = "Weak Password";

    if (score >= 4) {
      strength = "strong";
      color = "#4caf50";
      message = "Strong Password";
    } else if (score >= 2) {
      strength = "medium";
      color = "#ff9800";
      message = "Medium Password";
    }

    passwordStrengthBar.className = strength;
    passwordStrengthBar.style.width = `${(score / 5) * 100}%`;
    strengthMessage.textContent = message;
    strengthMessage.style.color = color;
  });

  // Password Visibility Toggle
  document.querySelectorAll('.toggle-password').forEach((btn, idx) => {
    btn.addEventListener('click', function () {
      const input = this.parentElement.querySelector('input');
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      // Toggle icon
      this.innerHTML = isPassword
        ? `<svg class="eye-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#667eea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.81 21.81 0 0 1 5.06-6.06M1 1l22 22"/><path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5a3.5 3.5 0 0 0 2.47-5.97"/></svg>`
        : `<svg class="eye-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#667eea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>`;
    });
  });
});
