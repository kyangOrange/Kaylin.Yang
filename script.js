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

    function smoothArray(values, passes = 3) {
        let arr = values.slice();
        for (let p = 0; p < passes; p++) {
            const next = arr.slice();
            for (let i = 0; i < arr.length; i++) {
                const prev = arr[Math.max(0, i - 1)];
                const cur = arr[i];
                const nxt = arr[Math.min(arr.length - 1, i + 1)];
                next[i] = (prev + cur + nxt) / 3;
            }
            arr = next;
        }
        return arr;
    }

    // SVG blob generator (all-curves, no straight edges).
    // We render an SVG <path> as the popup background and keep text inside a safe inset area.
    const SVG_NS = 'http://www.w3.org/2000/svg';

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function clamp(v, min, max) {
        return Math.max(min, Math.min(max, v));
    }

    function createBlobParams() {
        // Low-frequency waves -> long smooth curves, no sharp corners.
        // Values are fractions of the base radius.
        return {
            baseFrac: 0.46,
            a1Frac: 0.05 + Math.random() * 0.05,
            a2Frac: 0.03 + Math.random() * 0.04,
            a3Frac: 0.02 + Math.random() * 0.03,
            p1: Math.random() * Math.PI * 2,
            p2: Math.random() * Math.PI * 2,
            p3: Math.random() * Math.PI * 2
        };
    }

    function radiiFromParams(n, baseR, params) {
        const radii = new Array(n);
        for (let i = 0; i < n; i++) {
            const theta = (i / n) * Math.PI * 2;
            const r =
                baseR +
                baseR * params.a1Frac * Math.sin(theta + params.p1) +
                baseR * params.a2Frac * Math.sin(2 * theta + params.p2) +
                baseR * params.a3Frac * Math.sin(3 * theta + params.p3);
            radii[i] = clamp(r, baseR * 0.78, baseR * 1.12);
        }
        return radii;
    }

    function pointsFromRadii(radii, cx = 50, cy = 50) {
        const n = radii.length;
        const pts = new Array(n);
        for (let i = 0; i < n; i++) {
            const theta = (i / n) * Math.PI * 2;
            const r = radii[i];
            pts[i] = {
                x: cx + r * Math.cos(theta),
                y: cy + r * Math.sin(theta)
            };
        }
        return pts;
    }

    // Closed Catmull–Rom spline -> cubic Beziers (smooth corners).
    function pathFromPoints(points) {
        const n = points.length;
        const p = (i) => points[(i + n) % n];
        const start = points[0];
        let d = `M ${start.x.toFixed(2)} ${start.y.toFixed(2)}`;

        for (let i = 0; i < n; i++) {
            const p0 = p(i - 1);
            const p1 = p(i);
            const p2 = p(i + 1);
            const p3 = p(i + 2);

            const c1x = p1.x + (p2.x - p0.x) / 6;
            const c1y = p1.y + (p2.y - p0.y) / 6;
            const c2x = p2.x - (p3.x - p1.x) / 6;
            const c2y = p2.y - (p3.y - p1.y) / 6;

            d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
        }

        d += ' Z';
        return d;
    }

    function createBlobPathD(n, w, h, params) {
        const cx = w / 2;
        const cy = h / 2;
        const baseR = Math.min(w, h) * params.baseFrac;
        const radii = radiiFromParams(n, baseR, params);
        const pts = pointsFromRadii(radii, cx, cy);
        return pathFromPoints(pts);
    }

    function animateBlobPaths(pathEls, w, h, toParams, durationMs = 900) {
        const n = 64;
        const fromParams = { baseFrac: 0.46, a1Frac: 0, a2Frac: 0, a3Frac: 0, p1: 0, p2: 0, p3: 0 };
        const start = performance.now();

        function setAll(d) {
            for (const el of pathEls) el.setAttribute('d', d);
        }

        function frame(now) {
            const t = clamp((now - start) / durationMs, 0, 1);
            const e = easeOutCubic(t);
            const cur = {
                baseFrac: fromParams.baseFrac + (toParams.baseFrac - fromParams.baseFrac) * e,
                a1Frac: fromParams.a1Frac + (toParams.a1Frac - fromParams.a1Frac) * e,
                a2Frac: fromParams.a2Frac + (toParams.a2Frac - fromParams.a2Frac) * e,
                a3Frac: fromParams.a3Frac + (toParams.a3Frac - fromParams.a3Frac) * e,
                p1: toParams.p1,
                p2: toParams.p2,
                p3: toParams.p3
            };
            setAll(createBlobPathD(n, w, h, cur));
            if (t < 1) requestAnimationFrame(frame);
        }

        requestAnimationFrame(frame);
    }
    
    // Function to generate random irregular border-radius (curves everywhere, no vertical lines, not too big)
    // Function to generate smooth border-radius that creates smooth curves (not oval)
    function generateRandomBorderRadius() {
        const values = [];
        for (let i = 0; i < 4; i++) {
            // Range: 20-35% creates smooth curves that expand outward, not too large/oval
            values.push(Math.floor(Math.random() * 15) + 20 + '%'); // 20-35%
        }
        const values2 = [];
        for (let i = 0; i < 4; i++) {
            // Range: 20-35% creates smooth curves that expand outward, not too large/oval
            values2.push(Math.floor(Math.random() * 15) + 20 + '%'); // 20-35%
        }
        return `${values[0]} ${values[1]} ${values[2]} ${values[3]} / ${values2[0]} ${values2[1]} ${values2[2]} ${values2[3]}`;
    }
    
    // Function to close popup
    function closePopup() {
        if (currentPopup) {
            const popup = currentPopup;
            popupToDescription.delete(popup);
            // Restore body scrolling
            document.body.style.overflow = '';
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
            
            // Create new popup - simple rectangle
            const popup = document.createElement('div');
            popup.className = 'project-description-popup';
            popup.setAttribute('role', 'dialog');
            popup.setAttribute('aria-label', 'Project description');
            // Convert text to paragraphs with extra spacing
            // Handle HTML formatting (like <strong> tags)
            const paragraphs = fullDescription.split('\n\n').filter(p => p.trim());
            paragraphs.forEach((para, index) => {
                const p = document.createElement('p');
                let content = para.trim();
                // Add line break after <strong> tags that end with colon
                content = content.replace(/<strong>([^<]+):<\/strong>/g, '<strong>$1:</strong><br>');
                p.innerHTML = content; // Use innerHTML to preserve <strong> tags
                popup.appendChild(p);
            });
            
            // Create close button
            const closeBtn = document.createElement('button');
            closeBtn.className = 'project-description-popup__close';
            closeBtn.setAttribute('aria-label', 'Close');
            closeBtn.innerHTML = '×';
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                closePopup();
            });
            popup.appendChild(closeBtn);
            
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
            
            // Show popup with animation - dot expands to rectangle
            // Prevent background scrolling when popup is open
            document.body.style.overflow = 'hidden';
            popup.style.visibility = 'visible';
            popup.style.opacity = '1';
            requestAnimationFrame(() => {
                popup.classList.add('show');
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
