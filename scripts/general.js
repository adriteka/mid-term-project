const menuOpen = document.getElementById("menu-open");
const menuClose = document.getElementById("menu-close");
const menuNav = document.querySelector(".menu-hamburger-nav");
const formNews = document.getElementById("form-news");

const toggleMenu = () => {
  menuOpen.classList.toggle("is-hidden");
  menuClose.classList.toggle("is-hidden");
  menuNav.classList.toggle("is-hidden");
};

menuOpen.addEventListener("click", () => {
  toggleMenu();
});

menuClose.addEventListener("click", () => {
  toggleMenu();
});

if (formNews) {
  formNews.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = formNews.querySelector("input").value.trim();
    console.log("email:", email);
    alert(`'${email}' submitted successfully!`);
    formNews.querySelector("input").value = "";
  });
}

if (sessionStorage.getItem("isDark") === "true")
  sessionStorage.setItem("isDark", document.body.classList.toggle("dark"));

for (elem of document.querySelectorAll(".toggle-dark")) {
  elem.addEventListener("click", () => {
    sessionStorage.setItem("isDark", document.body.classList.toggle("dark"));
  });
}
