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