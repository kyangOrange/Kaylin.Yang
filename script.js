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
    
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
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
        } else {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
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
        } else {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Observe text elements for fade-in
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.hero-subtitle, .hero-description, .contact-description, .project-content p, .skill-card li').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        textFadeObserver.observe(el);
    });
    
    // Observe about-content container for fade-in (special handling for about section)
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        aboutContent.style.opacity = '0';
        aboutContent.style.transform = 'translateY(20px)';
        aboutContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        textFadeObserver.observe(aboutContent);
    }
    
    // Project description popup functionality
    const projectDescriptions = document.querySelectorAll('.project-description');
    let currentPopup = null;
    const popupToDescription = new WeakMap();
    
    // Function to generate random irregular border-radius (rectangular bubble with random curves, no straight edges)
    function generateRandomBorderRadius() {
        const values = [];
        for (let i = 0; i < 4; i++) {
            // Range: 40-50% ensures all curves, no straight edges
            values.push(Math.floor(Math.random() * 10) + 40 + '%'); // 40-50%
        }
        const values2 = [];
        for (let i = 0; i < 4; i++) {
            // Range: 40-50% ensures all curves, no straight edges
            values2.push(Math.floor(Math.random() * 10) + 40 + '%'); // 40-50%
        }
        return `${values[0]} ${values[1]} ${values[2]} ${values[3]} / ${values2[0]} ${values2[1]} ${values2[2]} ${values2[3]}`;
    }
    
    // Function to close popup
    function closePopup() {
        if (currentPopup) {
            const popup = currentPopup;
            popupToDescription.delete(popup);
            // Lock border-radius and transform scale at current values to prevent any shrinking/morphing
            const currentBorderRadius = popup.style.borderRadius || window.getComputedStyle(popup).borderRadius;
            popup.style.borderRadius = currentBorderRadius; // Lock border-radius
            popup.style.transform = 'translate(-50%, -50%) scale(1)'; // Lock scale at 1 (full size)
            popup.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
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
            
            document.body.appendChild(popup);
            currentPopup = popup;
            
            // Show popup with animation - start as rectangle, then expand and morph to random irregular shape
            popup.classList.add('show');
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    popup.style.transition = 'opacity 0.3s ease, visibility 0.3s ease, border-radius 0.5s ease-out, transform 0.5s ease-out';
                    popup.style.borderRadius = randomBorderRadius;
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

// About section paragraph navigation
document.addEventListener('DOMContentLoaded', function() {
    const paragraphs = document.querySelectorAll('.about-paragraph');
    const nextBtn = document.getElementById('aboutNextBtn');
    let currentIndex = 0;
    
    // Function to generate random irregular border-radius (always curved, no straight sides)
    function generateRandomBorderRadius() {
        const values = [];
        for (let i = 0; i < 4; i++) {
            values.push(Math.floor(Math.random() * 20) + 40 + '%'); // 40-60%
        }
        const values2 = [];
        for (let i = 0; i < 4; i++) {
            values2.push(Math.floor(Math.random() * 20) + 40 + '%'); // 40-60%
        }
        return `${values[0]} ${values[1]} ${values[2]} ${values[3]} / ${values2[0]} ${values2[1]} ${values2[2]} ${values2[3]}`;
    }
    
    // Apply random border-radius to button
    if (nextBtn) {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                nextBtn.style.borderRadius = generateRandomBorderRadius();
            });
        });
    }
    
    // Function to show paragraph at index
    function showParagraph(index) {
        paragraphs.forEach((para, i) => {
            if (i === index) {
                para.classList.add('active');
            } else {
                para.classList.remove('active');
            }
        });
    }
    
    // Initialize: show first paragraph
    showParagraph(0);
    
    // Next button click handler
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            // Remove active from current paragraph first
            paragraphs[currentIndex].classList.remove('active');
            
            // Update index
            currentIndex = (currentIndex + 1) % paragraphs.length;
            
            // Wait for transition to complete (500ms) before showing next paragraph
            setTimeout(() => {
                paragraphs[currentIndex].classList.add('active');
            }, 500);
        });
    }
});
