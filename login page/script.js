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

  // 🚫 Fake auth logic (replace with backend)
  let authorizedUsers = ["admin@test.com"];

  if (authorizedUsers.includes(email)) {
    alert("Login successful → Redirect to dashboard");
  } else {
    document.getElementById("modal").style.display = "flex";
  }
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
