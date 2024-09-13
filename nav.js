document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector("#mobile-menu");
    const navList = document.querySelector(".nav-list");

    // Toggle the mobile menu visibility
    menuToggle.addEventListener("click", function () {
        navList.classList.toggle("active"); // Add/remove the 'active' class to show/hide the menu
    });

    // Optional: Close the mobile menu when a link is clicked (for mobile UX)
    navList.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function () {
            navList.classList.remove("active");
        });
    });
});
