// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    const scrollThreshold = 100;

    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonial slider initialization
    const swiper = new Swiper('.testimonial-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        }
    });

    // Read more toggle for expandable text
    document.querySelectorAll('.read-more').forEach(button => {
        button.addEventListener('click', function() {
            const textContainer = this.parentElement;
            const shortText = textContainer.querySelector('.short-text');
            const fullText = textContainer.querySelector('.full-text');
            
            if (shortText.style.display !== 'none') {
                shortText.style.display = 'none';
                fullText.style.display = 'inline';
                this.textContent = 'Show less';
            } else {
                shortText.style.display = 'inline';
                fullText.style.display = 'none';
                this.textContent = 'Show more';
            }
        });
    });

    // Appointment form submission
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            const formData = new FormData(appointmentForm);
            let formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // Simple validation
            if (!formValues.name || !formValues.phone || !formValues.email || !formValues.doctor || !formValues.date || !formValues.time) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Success message (in a real application, this would happen after server confirmation)
            alert('Thank you! Your appointment has been scheduled. We will contact you shortly to confirm.');
            appointmentForm.reset();
        });
    }

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.service-card, .doctor-card, .testimonial-card, .contact-item');
    
    const animateOnScroll = function() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
    
    // Current date for appointment form
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        
        const formattedToday = yyyy + '-' + mm + '-' + dd;
        dateInput.setAttribute('min', formattedToday);
    }
});
