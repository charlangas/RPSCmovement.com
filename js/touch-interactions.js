// touch-interactions.js

class TouchInteractions {
    constructor() {
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.swipeThreshold = 50; // minimum distance for a swipe
        this.initializeTouch();
    }

    initializeTouch() {
        // Add touch-device class to body
        if ('ontouchstart' in window) {
            document.body.classList.add('touch-device');
            this.setupTouchListeners();
            this.setupServiceTabs();
            this.setupGallerySwipe();
            this.enhanceButtons();
            this.setupAccordions();
        }
    }

    setupTouchListeners() {
        document.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });
    }

    handleSwipe() {
        const swipeDistance = this.touchEndX - this.touchStartX;
        
        if (Math.abs(swipeDistance) > this.swipeThreshold) {
            if (swipeDistance > 0) {
                this.handleRightSwipe();
            } else {
                this.handleLeftSwipe();
            }
        }
    }

    setupServiceTabs() {
        const tabsContainer = document.querySelector('.service-tabs');
        if (!tabsContainer) return;

        let currentTab = 0;
        const tabs = document.querySelectorAll('.tab-button');

        tabsContainer.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        tabsContainer.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            const swipeDistance = this.touchEndX - this.touchStartX;

            if (Math.abs(swipeDistance) > this.swipeThreshold) {
                if (swipeDistance > 0 && currentTab > 0) {
                    currentTab--;
                    tabs[currentTab].click();
                } else if (swipeDistance < 0 && currentTab < tabs.length - 1) {
                    currentTab++;
                    tabs[currentTab].click();
                }
            }
        }, { passive: true });
    }

    setupGallerySwipe() {
        const galleries = document.querySelectorAll('.gallery-container');
        
        galleries.forEach(gallery => {
            let startX;
            let scrollLeft;

            gallery.addEventListener('touchstart', (e) => {
                startX = e.touches[0].pageX - gallery.offsetLeft;
                scrollLeft = gallery.scrollLeft;
            }, { passive: true });

            gallery.addEventListener('touchmove', (e) => {
                if (!startX) return;
                const x = e.touches[0].pageX - gallery.offsetLeft;
                const walk = (x - startX) * 2;
                gallery.scrollLeft = scrollLeft - walk;
            }, { passive: true });
        });
    }

    enhanceButtons() {
        const buttons = document.querySelectorAll('button, .cta-button, .nav-links a');
        
        buttons.forEach(button => {
            // Add ripple effect
            button.addEventListener('touchstart', function(e) {
                const rect = this.getBoundingClientRect();
                const ripple = document.createElement('span');
                ripple.className = 'ripple';
                ripple.style.left = `${e.touches[0].clientX - rect.left}px`;
                ripple.style.top = `${e.touches[0].clientY - rect.top}px`;
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 1000);
            }, { passive: true });

            // Add active state
            button.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            }, { passive: true });

            button.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            }, { passive: true });
        });
    }

    setupAccordions() {
        const accordions = document.querySelectorAll('.accordion-header');
        
        accordions.forEach(accordion => {
            accordion.addEventListener('touchstart', function(e) {
                this.classList.add('touch-active');
            }, { passive: true });

            accordion.addEventListener('touchend', function(e) {
                this.classList.remove('touch-active');
                this.parentElement.classList.toggle('active');
            }, { passive: true });
        });
    }

    handleLeftSwipe() {
        // Handle left swipe actions
        const activeSection = this.getCurrentSection();
        if (activeSection) {
            const nextSection = activeSection.nextElementSibling;
            if (nextSection) {
                this.smoothScroll(nextSection);
            }
        }
    }

    handleRightSwipe() {
        // Handle right swipe actions
        const activeSection = this.getCurrentSection();
        if (activeSection) {
            const prevSection = activeSection.previousElementSibling;
            if (prevSection) {
                this.smoothScroll(prevSection);
            }
        }
    }

    getCurrentSection() {
        const sections = document.querySelectorAll('section');
        let current = null;
        let minDistance = Infinity;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const distance = Math.abs(rect.top);
            if (distance < minDistance) {
                minDistance = distance;
                current = section;
            }
        });

        return current;
    }

    smoothScroll(element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize touch interactions
document.addEventListener('DOMContentLoaded', () => {
    new TouchInteractions();
});