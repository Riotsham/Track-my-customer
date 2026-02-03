// ======================= Google Login =======================
function googleLogin() {
    alert("Google login demo.\nConnect Firebase here.");
    window.location.href = "dashboard.html";
}

// ======================= Email/Password Login =======================
const loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
    loginBtn.addEventListener("click", function () {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (email && password) {
            alert("Login successful (demo)");
            window.location.href = "dashboard.html";
        } else {
            alert("Please enter both email and password");
        }
    });
}

// ======================= Signup =======================
function signup() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    alert("Signup successful (demo)\nEmail: " + email);
    window.location.href = "signin.html";
}

// ======================= OTP Login =======================
let otp = null;

// Function to send OTP
function sendOTP() {
    const phoneInput = document.getElementById("phone");
    const phone = phoneInput.value.trim();

    if (phone.length !== 10 || isNaN(phone)) {
        alert("Please enter a valid 10-digit phone number");
        return;
    }

    otp = Math.floor(1000 + Math.random() * 9000); // Generate 4-digit OTP
    alert("Your OTP is: " + otp); // Demo: replace with real SMS in production

    document.getElementById("otpBox").style.display = "block";
}

// Function to verify OTP
function verifyOTP() {
    const enteredOtp = document.getElementById("otp").value.trim();

    if (!otp) {
        alert("Please generate OTP first");
        return;
    }

    if (enteredOtp === otp.toString()) {
        alert("Login success");
        window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
        alert("Wrong OTP");
    }
}
