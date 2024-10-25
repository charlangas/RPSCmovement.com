document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab-button');
    
    // Hide all services except the first one on page load
    const allServices = document.querySelectorAll('.service-content');
    allServices.forEach((service, index) => {
        if (index === 0) {
            service.style.display = 'block'; // Show first service
        } else {
            service.style.display = 'none';  // Hide others
        }
    });
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content
            const serviceId = tab.getAttribute('data-tab');
            showServiceContent(serviceId);
        });
    });
});

function showServiceContent(serviceId) {
    // Hide all service content
    const allServices = document.querySelectorAll('.service-content');
    allServices.forEach(service => service.style.display = 'none');
    
    // Show selected service content
    const selectedService = document.querySelector(`#${serviceId}`);
    if (selectedService) {
        selectedService.style.display = 'block';
    }
}