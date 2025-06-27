// ✅ PROTECTED ROUTE CHECK
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  if (!token || !user) {
    alert("You must be logged in to access the dashboard.");
    window.location.href = "../pages/login.html";
    return;
  }

  // ✅ Set dynamic welcome message
  const welcomeMessage = document.getElementById("welcome-message");
  if (welcomeMessage && user.name) {
    welcomeMessage.textContent = `Welcome back ${user.name}`;
  }

  // ✅ OPTIONAL: Verify token with backend (if protected route exists)
  fetch("http://localhost:8086/api/protected-route", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then((res) => {
      if (res.status === 401) {
        alert("Unauthorized! Token invalid or expired.");
        localStorage.clear();
        window.location.href = "../pages/login.html";
      }
      return res.json();
    })
    .then((data) => {
      console.log("Protected data:", data);
    })
    .catch((err) => {
      console.error("Fetch error:", err);
    });

  // ✅ LOGOUT FUNCTIONALITY
  const logoutLink = document.getElementById("logout-link");
  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.clear();
      window.location.href = "../pages/login.html";
    });
  }
});


