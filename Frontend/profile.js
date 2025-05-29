document.addEventListener("DOMContentLoaded", () => {
    // Placeholder: load user data (can be dynamic in future)
    const userName = "Sai Virasith";
    const userEmail = "virasith1234@gmail.com";
    
    // Dynamically setting the user name and email
    document.getElementById("user-name").textContent = userName;
    document.getElementById("user-email").textContent = userEmail;
    
    // Handle Edit Profile button (this redirects to settings page)
    document.querySelector(".edit-btn").addEventListener("click", () => {
      window.location.href = "settings.html"; // Redirect to settings page for profile update
    });
  
    // Handle Logout functionality
    document.querySelector(".logout-btn").addEventListener("click", () => {
      alert("Logout successful!");
      window.location.href = "index.html"; // Redirect to the home or login page
    });
  });
  