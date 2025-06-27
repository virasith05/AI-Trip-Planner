import { LoginUser } from "./users.js";
document.getElementById("loginForm").addEventListener("submit", async function (event) {
  event.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }
  const values = { email, password };
  const response = await LoginUser(values);

  if (response && response.success) {
    localStorage.setItem("loggedInUser", JSON.stringify(response.user));
    localStorage.setItem("loggedInUser", JSON.stringify(response.user));
    localStorage.setItem("token", response.token);
    console.log(response.user);
    window.location.href = "../index.html";
  } else {
    alert(response?.message || "Login failed. Check your credentials.");
  }


});

// Password Visibility Toggle
const toggleBtn = document.querySelector('.toggle-password');
if (toggleBtn) {
  let isVisible = false;
  toggleBtn.addEventListener('click', function () {
    const input = this.parentElement.querySelector('input');
    isVisible = !isVisible;
    input.type = isVisible ? 'text' : 'password';
    // Toggle icon (always same size and position)
    this.innerHTML = isVisible
      ? `<svg class="eye-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#667eea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a21.81 21.81 0 0 1 5.06-6.06M1 1l22 22"/><path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5a3.5 3.5 0 0 0 2.47-5.97"/></svg>`
      : `<svg class="eye-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#667eea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>`;
  });
}
