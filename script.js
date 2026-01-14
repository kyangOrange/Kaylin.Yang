// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }
    
    lastScroll = currentScroll;
});

// Active section highlighting in navigation
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.skill-card, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add active class styles via JavaScript (since CSS doesn't have :has() support everywhere)
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
        document.querySelectorAll('.nav-menu a').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Typewriter effect function - simple and clean
function typeWriter(element, text, speed = 75, callback) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent = text.substring(0, i + 1);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    
    type();
}

// Typewriter effect for hero title (repeats when scrolling back up)
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSection = document.querySelector('#home');
    const beforeHighlight = "Hello, I'm ";
    const highlightText = "Kaylin Yang";
    
    function animateHeroTitle() {
        if (heroTitle) {
            // Clear the title
            heroTitle.innerHTML = '';
            
            // Create text node for "Hello, I'm "
            const beforeNode = document.createTextNode('');
            heroTitle.appendChild(beforeNode);
            
            // Create span for "Kaylin Yang"
            const highlightSpan = document.createElement('span');
            highlightSpan.className = 'highlight';
            heroTitle.appendChild(highlightSpan);
            
            // Type out "Hello, I'm " first
            typeWriter(beforeNode, beforeHighlight, 75, function() {
                // Then type out "Kaylin Yang" in the highlight span
                typeWriter(highlightSpan, highlightText, 75);
            });
        }
    }
    
    // Run on page load
    animateHeroTitle();
    
    // Also run when scrolling back to hero section
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateHeroTitle();
                }
            });
        }, { threshold: 0.5 });
        
        heroObserver.observe(heroSection);
    }
    
    // Typewriter effect for section titles on scroll (repeats when scrolling back up)
    const sectionTitles = document.querySelectorAll('.section-title');
    const titleTexts = new Map();
    
    // Store original text for each title
    sectionTitles.forEach(title => {
        titleTexts.set(title, title.textContent);
    });
    
    const sectionTitleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const originalText = titleTexts.get(entry.target);
                if (originalText) {
                    entry.target.textContent = '';
                    typeWriter(entry.target, originalText, 75);
                }
            }
        });
    }, { threshold: 0.5 });

    // Observe all section titles
    sectionTitles.forEach(title => {
        title.textContent = ''; // Clear initially
        sectionTitleObserver.observe(title);
    });
});


// Enhanced fade-in for all text elements
const textFadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Observe text elements for fade-in
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.about-text p, .hero-subtitle, .hero-description, .contact-description, .project-content p, .skill-card li').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        textFadeObserver.observe(el);
    });
    
    // Project description popup functionality
    const projectDescriptions = document.querySelectorAll('.project-description');
    let currentPopup = null;
    const popupToDescription = new WeakMap();
    
    // Function to generate random irregular border-radius (always curved, no straight sides)
    function generateRandomBorderRadius() {
        const values = [];
        for (let i = 0; i < 4; i++) {
            // Keep values between 40-60% to ensure curves (never too extreme)
            values.push(Math.floor(Math.random() * 20) + 40 + '%'); // 40-60%
        }
        const values2 = [];
        for (let i = 0; i < 4; i++) {
            // Keep values between 40-60% to ensure curves (never too extreme)
            values2.push(Math.floor(Math.random() * 20) + 40 + '%'); // 40-60%
        }
        return `${values[0]} ${values[1]} ${values[2]} ${values[3]} / ${values2[0]} ${values2[1]} ${values2[2]} ${values2[3]}`;
    }
    
    // Function to close popup
    function closePopup() {
        if (currentPopup) {
            const popup = currentPopup;
            popupToDescription.delete(popup);
            popup.classList.remove('show');
            // Match CSS transition duration (0.3s = 300ms)
            setTimeout(() => {
                if (popup.parentNode) {
                    popup.remove();
                }
                if (currentPopup === popup) {
                    currentPopup = null;
                }
            }, 300);
        }
    }
    
    projectDescriptions.forEach(description => {
        description.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const fullDescription = this.getAttribute('data-full-description');
            const projectCard = this.closest('.project-card');
            
            // Close existing popup if clicking on the same description
            if (currentPopup && popupToDescription.get(currentPopup) === this) {
                closePopup();
                return;
            }
            
            // Remove existing popup
            if (currentPopup) {
                closePopup();
            }
            
            // Create new popup
            const popup = document.createElement('div');
            popup.className = 'project-description-popup';
            popup.textContent = fullDescription;
            
            // Generate random irregular border-radius (will be applied after initial render)
            const randomBorderRadius = generateRandomBorderRadius();
            
            // Set background color based on project card
            if (projectCard.classList.contains('project-1')) {
                popup.style.background = '#FFF8FA';
            } else if (projectCard.classList.contains('project-2')) {
                popup.style.background = '#FFFDF5';
            } else if (projectCard.classList.contains('project-3')) {
                popup.style.background = '#F5FCFA';
            } else if (projectCard.classList.contains('project-fill-in-blank')) {
                popup.style.background = '#F8FCFF';
            }
            
            // Store reference
            popupToDescription.set(popup, this);
            
            // Position popup next to the project card
            const cardRect = projectCard.getBoundingClientRect();
            const descriptionRect = this.getBoundingClientRect();
            const scrollY = window.scrollY;
            const scrollX = window.scrollX;
            
            // Position to the right of the card, or left if there's not enough space
            const spaceRight = window.innerWidth - cardRect.right;
            const spaceLeft = cardRect.left;
            
            if (spaceRight >= 320 || spaceRight > spaceLeft) {
                popup.style.left = (cardRect.right + scrollX + 20) + 'px';
                popup.style.top = (descriptionRect.top + scrollY - 10) + 'px';
            } else {
                popup.style.left = (cardRect.left + scrollX - 20) + 'px';
                popup.style.top = (descriptionRect.top + scrollY - 10) + 'px';
                popup.style.right = 'auto';
            }
            
            document.body.appendChild(popup);
            currentPopup = popup;
            
            // Show popup with animation - start circular, then morph to random shape
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    popup.style.borderRadius = randomBorderRadius;
                    popup.classList.add('show');
                });
            });
        });
    });
    
    // Close popup when clicking outside (but not on the bubble itself)
    // Use setTimeout to defer check so description handler runs first
    document.addEventListener('click', function(e) {
        setTimeout(function() {
            if (!currentPopup) return;
            
            // Don't close if clicking on a description
            if (e.target.closest('.project-description')) {
                return;
            }
            
            // Don't close if clicking on the popup itself
            if (e.target.closest('.project-description-popup')) {
                return;
            }
            
            // Close if clicking outside
            closePopup();
        }, 0);
    });
});
