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
        // Use a few low-frequency sine waves -> long smooth curves, no sharp corners.
        return {
            base: 44,
            a1: 3 + Math.random() * 3,
            a2: 2 + Math.random() * 2.5,
            a3: 1 + Math.random() * 2,
            p1: Math.random() * Math.PI * 2,
            p2: Math.random() * Math.PI * 2,
            p3: Math.random() * Math.PI * 2
        };
    }

    function radiiFromParams(n, params) {
        const radii = new Array(n);
        for (let i = 0; i < n; i++) {
            const theta = (i / n) * Math.PI * 2;
            const r =
                params.base +
                params.a1 * Math.sin(theta + params.p1) +
                params.a2 * Math.sin(2 * theta + params.p2) +
                params.a3 * Math.sin(3 * theta + params.p3);
            // Keep inside viewBox (0..100): center=50, so radius max must be <= 49.
            radii[i] = clamp(r, 35, 49);
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

    function createBlobPathD(n, params) {
        const radii = radiiFromParams(n, params);
        const pts = pointsFromRadii(radii);
        return pathFromPoints(pts);
    }

    function animateBlobPaths(pathEls, toParams, durationMs = 900) {
        const n = 64;
        const fromParams = { base: 44, a1: 0, a2: 0, a3: 0, p1: 0, p2: 0, p3: 0 };
        const start = performance.now();

        function setAll(d) {
            for (const el of pathEls) el.setAttribute('d', d);
        }

        function frame(now) {
            const t = clamp((now - start) / durationMs, 0, 1);
            const e = easeOutCubic(t);
            const cur = {
                base: fromParams.base + (toParams.base - fromParams.base) * e,
                a1: fromParams.a1 + (toParams.a1 - fromParams.a1) * e,
                a2: fromParams.a2 + (toParams.a2 - fromParams.a2) * e,
                a3: fromParams.a3 + (toParams.a3 - fromParams.a3) * e,
                p1: toParams.p1,
                p2: toParams.p2,
                p3: toParams.p3
            };
            setAll(createBlobPathD(n, cur));
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
            
            // Create new popup
            const popup = document.createElement('div');
            popup.className = 'project-description-popup';
            popup.setAttribute('role', 'dialog');
            popup.setAttribute('aria-label', 'Project description');

            // Build structure: SVG blob background + text clipped INSIDE the blob.
            const svg = document.createElementNS(SVG_NS, 'svg');
            svg.setAttribute('viewBox', '0 0 100 100');
            svg.setAttribute('preserveAspectRatio', 'none');
            svg.classList.add('project-description-popup__blob');

            const defs = document.createElementNS(SVG_NS, 'defs');
            const clipPath = document.createElementNS(SVG_NS, 'clipPath');
            const clipId = `popupBlobClip-${Math.random().toString(36).slice(2)}`;
            clipPath.setAttribute('id', clipId);
            clipPath.setAttribute('clipPathUnits', 'userSpaceOnUse');

            const clipPathPath = document.createElementNS(SVG_NS, 'path');
            clipPath.appendChild(clipPathPath);
            defs.appendChild(clipPath);
            svg.appendChild(defs);

            const fillPath = document.createElementNS(SVG_NS, 'path');
            fillPath.classList.add('project-description-popup__blob-path');
            svg.appendChild(fillPath);

            // Safe inset for text so it stays away from the wavy edges.
            // Also clipped by blob so it can never spill outside visually.
            const fo = document.createElementNS(SVG_NS, 'foreignObject');
            fo.classList.add('project-description-popup__fo');
            fo.setAttribute('x', '16');
            fo.setAttribute('y', '16');
            fo.setAttribute('width', '68');
            fo.setAttribute('height', '68');
            fo.setAttribute('clip-path', `url(#${clipId})`);

            const foDiv = document.createElement('div');
            foDiv.className = 'project-description-popup__content';
            foDiv.textContent = fullDescription;
            // Ensure font-size is applied directly - use very small pixels
            foDiv.style.fontSize = '6px';
            fo.appendChild(foDiv);
            svg.appendChild(fo);

            popup.appendChild(svg);
            
            // Set background color based on project card
            if (projectCard.classList.contains('project-1')) {
                popup.style.setProperty('--popup-fill', '#FFF8FA');
            } else if (projectCard.classList.contains('project-2')) {
                popup.style.setProperty('--popup-fill', '#FFFDF5');
            } else if (projectCard.classList.contains('project-3')) {
                popup.style.setProperty('--popup-fill', '#F5FCFA');
            } else if (projectCard.classList.contains('project-fill-in-blank')) {
                popup.style.setProperty('--popup-fill', '#F8FCFF');
            }
            
            // Store reference
            popupToDescription.set(popup, this);
            
            document.body.appendChild(popup);
            currentPopup = popup;
            
            // Initialize as a near-circle, then morph into a random blob while expanding.
            const startD = createBlobPathD(64, { base: 44, a1: 0, a2: 0, a3: 0, p1: 0, p2: 0, p3: 0 });
            const targetParams = createBlobParams();
            fillPath.setAttribute('d', startD);
            clipPathPath.setAttribute('d', startD);
            
            // Show popup with animation - dot expands to blob
            // Make visible first, then trigger size change
            popup.style.visibility = 'visible';
            popup.style.opacity = '1';
            requestAnimationFrame(() => {
                popup.classList.add('show');
                // Morph path (smooth curves) while it expands.
                animateBlobPaths([fillPath, clipPathPath], targetParams, 900);
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
