// SHOW PASSWORD
document.addEventListener("DOMContentLoaded", () => {
  const showPass = document.getElementById("showPass");
  const password = document.getElementById("password");

  if (showPass) {
    showPass.addEventListener("change", function () {
      password.type = this.checked ? "text" : "password";
    });
  }

  // CAROUSEL
  const carousel = new bootstrap.Carousel('#featureCarousel', {
    interval: 2500,
    ride: 'carousel'
  });
});

// PAGE TRANSITION TO SIGNUP
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


  // ROLE TOGGLE
  const role = document.getElementById("role");
  const studentField = document.getElementById("studentField");
  const emailField = document.getElementById("emailField");

  role.addEventListener("change", function () {
    if (this.value === "adviser") {
      studentField.style.display = "none";
      emailField.style.display = "block";
    } else {
      studentField.style.display = "block";
      emailField.style.display = "none";
    }
  });
/* LOGINN USERRR------------------------*/  
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

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const role = document.getElementById("role").value;
  const birthdate = document.getElementById("birthdate").value;
  const password = document.getElementById("password").value;

  let foundUser = null;

  // =====================
  // STUDENT LOGIN
  // =====================
  if (role === "student") {
    const studentNumber = document.getElementById("studentNumber").value;

    foundUser = users.find(u =>
      u.role === "student" &&
      u.studentNumber === studentNumber &&
      u.birthdate === birthdate &&
      u.password === password
    );

    if (foundUser) {
      alert("Login successful as Student");
      window.location.href = "student.html"; // ✅ redirect
      return;
    }
  }

  // =====================
  // ADVISER LOGIN
  // =====================
  if (role === "adviser") {
    const email = document.getElementById("email").value;

    foundUser = users.find(u =>
      u.role === "adviser" &&
      u.email === email &&
      u.birthdate === birthdate &&
      u.password === password
    );

    if (foundUser) {
      alert("Login successful as Adviser");
      window.location.href = "adviser.html"; // ✅ redirect
      return;
    }
  }

  // =====================
  // ERROR
  // =====================
  alert("Invalid credentials!");
});


function openAdmin() {
  window.location.href = "admin.html";
}