const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.style.borderBottom = "1px solid #1e293b";
    } else {
        navbar.style.borderBottom = "none";
    }
});
