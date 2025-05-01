document.querySelector(".login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
  
    if (email && password) {
      alert("Logged in successfully (placeholder). Redirecting...");
      // Here you would typically redirect or check credentials
      window.location.href = "index.html"; // Simulated redirect
    } else {
      alert("Please fill in all fields.");
    }
  });
  