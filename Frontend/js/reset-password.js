document.querySelector(".reset-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("reset-email").value.trim();
  
    if (email) {
      // Show success message
      const successMessage = document.getElementById("success-message");
      successMessage.classList.add("show");
      
      // Reset form and hide success message after delay
      setTimeout(() => {
        this.reset();
        successMessage.classList.remove("show");
        window.location.href = "login.html";
      }, 3000);
    } else {
      alert("Please enter your email address.");
    }
  });
  