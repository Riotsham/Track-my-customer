function login() {
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  let emailError = document.getElementById("emailError");
  let passError = document.getElementById("passError");

  emailError.style.display = "none";
  passError.style.display = "none";

  let valid = true;

  if (!email) {
    emailError.style.display = "block";
    valid = false;
  }

  if (!password) {
    passError.style.display = "block";
    valid = false;
  }

  if (!valid) return;

  fetch("login.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier: email, password })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data && data.ok) {
        window.location.href = "../Dashboard/index.html";
        return;
      }

      showModal(data && data.message ? data.message : "Invalid credentials");
    })
    .catch(() => {
      showModal("Server error. Please try again.");
    });
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function requestAccess() {
  alert("Access request sent to admin (simulate backend)");
}

function openCreateAccount() {
  document.getElementById("createAccountModal").style.display = "flex";
}

function closeCreateAccount() {
  document.getElementById("createAccountModal").style.display = "none";
}

function showModal(message) {
  const modal = document.getElementById("modal");
  const messageEl = document.getElementById("modalMessage");
  if (messageEl) {
    messageEl.textContent = message;
  }
  modal.style.display = "flex";
}
