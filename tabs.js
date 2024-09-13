document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".tab");
    const tabContents = document.querySelectorAll(".tab-content");

    // Initialize: Automatically trigger the first tab as active on page load
    tabs[0].classList.add("active");
    tabContents[0].style.display = "grid";

    // Function to reset borders of tab 2
    function resetBorders() {
        document.querySelector('.tab[data-tab="tab-2"]').style.borderLeft = "none";
        document.querySelector('.tab[data-tab="tab-2"]').style.borderRight = "none";
        document.querySelector('.tab[data-tab="tab-2"]').style.borderTop = "none";
        document.querySelector('.tab[data-tab="tab-2"]').style.borderBottom = "none";
    }

    // Add event listener to each tab
    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove("active"));

            // Add active class to the clicked tab
            tab.classList.add("active");

            // Hide all tab content sections
            tabContents.forEach(content => {
                content.style.display = "none";
            });

            // Show the content corresponding to the clicked tab
            const target = tab.getAttribute("data-tab");
            document.getElementById(target).style.display = "grid";  // Ensure the display is grid for proper layout

            // Reset borders of tab 2
            resetBorders();

            // Apply specific borders based on which tab is active
            const isMobile = window.innerWidth <= 768;  // Detect mobile view

            if (target === "tab-1") {
                if (isMobile) {
                    document.querySelector('.tab[data-tab="tab-2"]').style.borderBottom = "5px solid #F6F3ED";
                } else {
                    document.querySelector('.tab[data-tab="tab-2"]').style.borderRight = "5px solid #F6F3ED";
                }
            } else if (target === "tab-3") {
                if (isMobile) {
                    document.querySelector('.tab[data-tab="tab-2"]').style.borderTop = "5px solid #F6F3ED";
                } else {
                    document.querySelector('.tab[data-tab="tab-2"]').style.borderLeft = "5px solid #F6F3ED";
                }
            }
        });
    });
});
