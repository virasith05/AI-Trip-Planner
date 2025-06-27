document.addEventListener("DOMContentLoaded", async () => {
  const userData = JSON.parse(localStorage.getItem("loggedInUser"));
  const token = localStorage.getItem("token");

  if (!userData || !token) {
    alert("You must be logged in.");
    window.location.href = "../pages/login.html";
    return;
  }

  // Pre-fill form fields
  document.getElementById("user-name").value = userData.name || "";
  document.getElementById("user-email").value = userData.email || "";

  // Load trip stats
  try {
    const response = await fetch("http://localhost:8086/api/trips/my-trips", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (data.success) {
      const trips = data.trips;
      document.getElementById("total-trips").textContent = trips.length;
      document.getElementById("last-trip").textContent = trips[0]?.itinerary?.title || "N/A";

      // Optionally, calculate most visited country:
      const destinations = trips.map(t => t.itinerary?.title?.split("-")[0].trim());
      const mostVisited = destinations.sort((a, b) =>
        destinations.filter(v => v === a).length - destinations.filter(v => v === b).length
      ).pop();
      document.getElementById("fav-country").textContent = mostVisited || "N/A";
    }
  } catch (err) {
    console.error("Failed to load trip stats", err);
  }

  // Update profile on form submit
  document.getElementById("profile-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const updatedName = document.getElementById("user-name").value;

    try {
      const res = await fetch("http://localhost:8086/api/users/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name: updatedName })
      });

      const result = await res.json();
      if (result.success) {
        userData.name = updatedName;
        localStorage.setItem("loggedInUser", JSON.stringify(userData));
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile: " + result.message);
      }
    } catch (err) {
      console.error("Update failed:", err);
      alert("Something went wrong.");
    }
  });

  // Logout
  document.querySelector(".logout-btn").addEventListener("click", () => {
    localStorage.clear();
    alert("Logged out!");
    window.location.href = "../pages/login.html";
  });
});
