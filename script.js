// Preloader
window.addEventListener('load', function() {
    document.getElementById('preloader').style.display = 'none';
});

// Mobile Menu
function showMenu() {
    document.querySelector(".nav-links").style.right = "0";
}

function hideMenu() {
    document.querySelector(".nav-links").style.right = "-200px";
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Enhanced Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .value-item, .service-card').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    observer.observe(el);
});

// Enhanced Navbar Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.padding = "0.5rem 5%";
        navbar.style.background = "linear-gradient(90deg, rgba(0,47,4,0.95) 0%, rgba(0,77,6,0.95) 100%)";
    } else {
        navbar.style.padding = "1rem 5%";
        navbar.style.background = "linear-gradient(90deg, var(--primary-color) 0%, var(--accent-color) 100%)";
    }
});

// Enhanced Form Handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('.submit-btn');
    const submitText = submitBtn.querySelector('span');
    const successAnimation = submitBtn.querySelector('.success-animation');
    
    // Disable form
    const formElements = this.elements;
    for (let element of formElements) {
        element.disabled = true;
    }
    
    // Show loading state
    submitText.textContent = 'Sending...';
    submitBtn.style.opacity = '0.7';
    
    try {
        // Replace with your form handling service (e.g., Formspree)
        const formData = new FormData(this);
        const response = await fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            // Show success state
            submitBtn.classList.add('success');
            submitText.style.opacity = '0';
            successAnimation.style.opacity = '1';
            
            // Reset form after delay
            setTimeout(() => {
                this.reset();
                submitBtn.classList.remove('success');
                submitText.style.opacity = '1';
                submitText.textContent = 'Send Message';
                successAnimation.style.opacity = '0';
                submitBtn.style.opacity = '1';
                
                // Re-enable form
                for (let element of formElements) {
                    element.disabled = false;
                }
            }, 3000);
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        // Show error state
        submitText.textContent = 'Error! Try Again';
        submitBtn.style.backgroundColor = '#dc3545';
        
        // Reset after delay
        setTimeout(() => {
            submitText.textContent = 'Send Message';
            submitBtn.style.backgroundColor = '';
            submitBtn.style.opacity = '1';
            
            // Re-enable form
            for (let element of formElements) {
                element.disabled = false;
            }
        }, 3000);
    }
});

// Form field animations
document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
    field.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    field.addEventListener('blur', function() {
        if (!this.value) {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Add CSS class for animation
document.styleSheets[0].insertRule(`
    .animate {
        animation: fadeIn 0.6s ease-out forwards;
    }
`, 0);

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Enhanced Service Card Interactions
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Counter Animation
function animateCounter(element, target) {
    let current = 0;
    const duration = 2000; // 2 seconds
    const stepTime = 50; // Update every 50ms
    const steps = duration / stepTime;
    const increment = target / steps;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// Intersection Observer for counters
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector('.counter');
            const target = parseInt(entry.target.dataset.value);
            animateCounter(counter, target);
            counterObserver.unobserve(entry.target);
            
            // Add animation class to the card
            entry.target.classList.add('animate-stat');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    counterObserver.observe(card);
});

// Vanilla-tilt.js for 3D hover effect
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2
});

// Smooth reveal animation for feature cards
const featureCards = document.querySelectorAll('.feature-card');
const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            featureObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

featureCards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(50px)';
    featureObserver.observe(card);
}); 