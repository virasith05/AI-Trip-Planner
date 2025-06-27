document.addEventListener("DOMContentLoaded", () => {
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const message = document.getElementById("password-message");
  
    function validatePasswords() {
      if (confirmPassword.value === "") {
        message.textContent = "";
        message.classList.remove("match");
      } else if (password.value === confirmPassword.value) {
        message.textContent = "✅ Passwords match";
        message.classList.add("match");
      } else {
        message.textContent = "❌ Passwords do not match";
        message.classList.remove("match");
      }
    }
  
    password.addEventListener("input", validatePasswords);
    confirmPassword.addEventListener("input", validatePasswords);
  
    document.getElementById("settings-form").addEventListener("submit", (e) => {
      e.preventDefault();
  
      if (password.value !== confirmPassword.value) {
        alert("Passwords do not match!");
        return;
      }
  
      alert("Changes saved successfully!");
    });
  
    document.querySelector(".logout-btn").addEventListener("click", () => {
      alert("Logout successful!");
      window.location.href = "index.html";
    });
  });
  