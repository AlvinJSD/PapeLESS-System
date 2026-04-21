
// ===============================
//  RUN AFTER PAGE LOAD
// ===============================
document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  //  SHOW PASSWORD
  // ===============================
  const showPass = document.getElementById("showPass");
  const password = document.getElementById("password");

  if (showPass && password) {
    showPass.addEventListener("change", function () {
      password.type = this.checked ? "text" : "password";
    });
  }

  // ===============================
  // 🎞 CAROUSEL
  // ===============================
  const carouselElement = document.querySelector('#featureCarousel');
  if (carouselElement) {
    new bootstrap.Carousel(carouselElement, {
      interval: 2500,
      ride: 'carousel'
    });
  }

  // ===============================
  //  ROLE TOGGLE (Student / Adviser)
  // ===============================
  const role = document.getElementById("role");
  const studentField = document.getElementById("studentField");
  const emailField = document.getElementById("emailField");

  if (role && studentField && emailField) {
    role.addEventListener("change", function () {
      if (this.value === "adviser") {
        studentField.style.display = "none";
        emailField.style.display = "block";
      } else {
        studentField.style.display = "block";
        emailField.style.display = "none";
      }
    });
  }

  // ===============================
  //  BIRTHDATE FORMAT DISPLAY
  // ===============================
  const birthInput = document.getElementById("birthdate");
  const birthText = document.getElementById("birthdateText");

  if (birthInput && birthText) {
    birthInput.addEventListener("change", function () {
      const date = new Date(this.value);

      if (!this.value) {
        birthText.textContent = "";
        return;
      }

      const formatted = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });

      birthText.textContent = "Selected: " + formatted;
    });
  }

  // ===============================
  //  SAMPLE USERS (EMBEDDED)
  // ===============================
  const users = [
    {
      role: "student",
      studentNumber: "2024001",
      birthdate: "2003-05-10",
      password: "student123"
    },
    {
      role: "adviser",
      email: "adviser@papele.com",
      birthdate: "1985-01-20",
      password: "adviser123"
    }
  ];

  // ===============================
  //  LOGIN SYSTEM
  // ===============================
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const roleValue = document.getElementById("role").value;
      const birthdate = document.getElementById("birthdate").value;
      const passwordValue = document.getElementById("password").value;

      let foundUser = null;

      // ===== STUDENT LOGIN =====
      if (roleValue === "student") {
        const studentNumber = document.getElementById("studentNumber").value;

        foundUser = users.find(u =>
          u.role === "student" &&
          u.studentNumber === studentNumber &&
          u.birthdate === birthdate &&
          u.password === passwordValue
        );

        if (foundUser) {
          alert("Login successful as Student");
          window.location.href = "student.html";
          return;
        }
      }

      // ===== ADVISER LOGIN =====
      if (roleValue === "adviser") {
        const email = document.getElementById("email").value;

        foundUser = users.find(u =>
          u.role === "adviser" &&
          u.email === email &&
          u.birthdate === birthdate &&
          u.password === passwordValue
        );

        if (foundUser) {
          alert("Login successful as Adviser");
          window.location.href = "adviser.html";
          return;
        }
      }

      // ===== ERROR =====
      alert("Invalid credentials!");
    });
  }

});

// ===============================
//  PAGE TRANSITIONS
// ===============================
function goSignup(event) {
  event.preventDefault();

  document.body.classList.add('page-out');

  setTimeout(() => {
    window.location.href = "signup.html";
  }, 450);
}

function goLogin(event) {
  event.preventDefault();

  document.body.classList.add("page-out");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 450);
}

// ===============================
//  ADMIN ACCESS
// ===============================
function openAdmin() {
  window.location.href = "admin.html";
}


// =======================
// FORGOT PASSWORD MODAL
// =======================
function openForgot() {
  document.getElementById("forgotModal").style.display = "flex";
}

function closeForgot() {
  document.getElementById("forgotModal").style.display = "none";
}

// =======================
// HANDLE REQUEST
// =======================
document.addEventListener("DOMContentLoaded", () => {

  const forgotForm = document.getElementById("forgotForm");

  if (forgotForm) {
    forgotForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("fpEmail").value;
      const studentNumber = document.getElementById("fpStudentNumber").value;
      const birthdate = document.getElementById("fpBirthdate").value;

      //  simulate verification
      const user = users.find(u =>
        u.role === "student" &&
        u.studentNumber === studentNumber &&
        u.birthdate === birthdate
      );

      if (user) {
        alert("Request sent to admin for verification.\n(Next step: email system)");
        closeForgot();
      } else {
        alert("User not found or incorrect details.");
      }
    });
  }

});