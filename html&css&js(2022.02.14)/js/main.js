const mainNav = document.querySelector(".main-nav");
const navToggleBtn = document.querySelector(".nav-toggle-btn");

navToggleBtn.addEventListener("click", () => {
  mainNav.classList.toggle("active");
});
