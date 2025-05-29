document.querySelector(".new-password-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const newPassword = document.getElementById("new-password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();
  
    if (!newPassword || !confirmPassword) {
      alert("Please fill in both fields.");
      return;
    }
  
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
  
    alert("Your password has been updated successfully (placeholder).");
    window.location.href = "login.html";
  });
  