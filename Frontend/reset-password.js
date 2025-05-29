document.querySelector(".reset-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("reset-email").value.trim();
  
    if (email) {
      alert("Reset link sent to your email (placeholder).");
      // Redirect to login or confirmation page
      window.location.href = "login.html";
    } else {
      alert("Please enter your email address.");
    }
  });
  