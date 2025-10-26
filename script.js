// CloudCare Hospital Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initFormValidation();
    initAppointmentForm();
    initContactForm();
    initAnimations();
    initNavbarScroll();
});

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form validation
function initFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
}

// Appointment form functionality
function initAppointmentForm() {
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading"></span> Processing...';
            submitBtn.disabled = true;
            
            // Simulate form processing
            setTimeout(() => {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showAlert('success', 'Appointment request submitted successfully! We will contact you soon to confirm your appointment.');
                
                // Reset form
                appointmentForm.reset();
                appointmentForm.classList.remove('was-validated');
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 2000);
        });
        
        // Department change handler
        const departmentSelect = document.getElementById('department');
        const doctorSelect = document.getElementById('doctor');
        
        if (departmentSelect && doctorSelect) {
            departmentSelect.addEventListener('change', function() {
                updateDoctorOptions(this.value, doctorSelect);
            });
        }
        
        // Date validation
        const appointmentDate = document.getElementById('appointmentDate');
        if (appointmentDate) {
            const today = new Date().toISOString().split('T')[0];
            appointmentDate.setAttribute('min', today);
        }
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="loading"></span> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form processing
            setTimeout(() => {
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Show success message
                showAlert('success', 'Message sent successfully! We will get back to you within 24 hours.');
                
                // Reset form
                contactForm.reset();
                contactForm.classList.remove('was-validated');
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 2000);
        });
    }
}

// Update doctor options based on department
function updateDoctorOptions(department, doctorSelect) {
    const doctorOptions = {
        'cardiology': [
            { value: 'sarah-johnson', text: 'Dr. Sarah Johnson' },
            { value: 'michael-chen', text: 'Dr. Michael Chen' },
            { value: 'emily-rodriguez', text: 'Dr. Emily Rodriguez' }
        ],
        'pediatrics': [
            { value: 'jennifer-williams', text: 'Dr. Jennifer Williams' },
            { value: 'david-thompson', text: 'Dr. David Thompson' },
            { value: 'lisa-anderson', text: 'Dr. Lisa Anderson' }
        ],
        'neurology': [
            { value: 'robert-martinez', text: 'Dr. Robert Martinez' },
            { value: 'amanda-taylor', text: 'Dr. Amanda Taylor' },
            { value: 'james-wilson', text: 'Dr. James Wilson' }
        ]
    };
    
    // Clear existing options
    doctorSelect.innerHTML = '<option value="">Select Doctor (Optional)</option>';
    
    // Add department-specific doctors
    if (doctorOptions[department]) {
        doctorOptions[department].forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor.value;
            option.textContent = doctor.text;
            doctorSelect.appendChild(option);
        });
    }
}

// Show alert messages
function showAlert(type, message) {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.alert');
    existingAlerts.forEach(alert => alert.remove());
    
    // Create new alert
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Insert at the top of the form
    const form = document.querySelector('form');
    if (form) {
        form.parentNode.insertBefore(alertDiv, form);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
}

// Initialize animations
function initAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card, .service-card, .doctor-card, .department-card, .contact-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }
}

// Emergency contact functionality
function initEmergencyContact() {
    const emergencyBtn = document.getElementById('emergencyBtn');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', function() {
            if (confirm('This will call our emergency line. Continue?')) {
                window.location.href = 'tel:+1555911HELP';
            }
        });
    }
}

// Department filter functionality
function initDepartmentFilter() {
    const filterBtns = document.querySelectorAll('.department-filter');
    const departmentCards = document.querySelectorAll('.department-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cards
            departmentCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = 'block';
                    card.classList.add('fade-in-up');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const searchableElements = document.querySelectorAll('.card-title, .card-text, h1, h2, h3, h4, h5, h6');
            let results = [];
            
            searchableElements.forEach(element => {
                if (element.textContent.toLowerCase().includes(query)) {
                    results.push({
                        text: element.textContent,
                        element: element
                    });
                }
            });
            
            // Display results (implement as needed)
            console.log('Search results:', results);
        });
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initEmergencyContact();
    initDepartmentFilter();
    initSearch();
});

// Utility functions
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phoneNumber;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Add CSS for navbar scroll effect
const style = document.createElement('style');
style.textContent = `
    .navbar-scrolled {
        background-color: rgba(13, 110, 253, 0.95) !important;
        backdrop-filter: blur(10px);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    .fade-in-up {
        animation: fadeInUp 0.6s ease-out;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);


