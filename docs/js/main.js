/**
 * The Path of Illumination
 * Main JavaScript file
 */

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close nav when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll-based navigation styling
    const nav = document.querySelector('.main-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Fade in elements on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.part-card, .teaching, .martyr-card').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Scripture page sidebar navigation
    initScriptureSidebar();

    // Reading progress indicator
    initReadingProgress();

    // Daily scripture feature
    displayDailyScripture();
});

/**
 * Initialize scripture sidebar navigation
 */
function initScriptureSidebar() {
    const sidebarLinks = document.querySelectorAll('.scripture-nav a');
    const sections = document.querySelectorAll('.scripture-content h2, .scripture-content h3');

    if (!sidebarLinks.length || !sections.length) return;

    window.addEventListener('scroll', () => {
        let current = '';
        const navHeight = document.querySelector('.main-nav').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Initialize reading progress indicator
 */
function initReadingProgress() {
    const progressBar = document.querySelector('.reading-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

/**
 * Display daily scripture verse
 */
function displayDailyScripture() {
    const dailyElement = document.querySelector('.daily-scripture');
    if (!dailyElement) return;

    const scriptures = [
        {
            text: "That which you seek, you already are. But to know this, you must die to everything you believe yourself to be.",
            source: "The Conference of the Birds"
        },
        {
            text: "Suffering is not the obstacle to wisdom but its very substance. Flee from affliction and you flee from transformation itself.",
            source: "The Journey and the Affliction"
        },
        {
            text: "Die before you die and find that there is no death. The wound is the place where the Light enters you.",
            source: "The Divan of Shams"
        },
        {
            text: "Your divine nature is not something you must acquire. It is something you must uncover.",
            source: "Aurora of the Philosophers"
        },
        {
            text: "In Yes and No all things consist. Without opposition, nothing can be made manifest.",
            source: "Aurora Rising"
        },
        {
            text: "The Dark Night is the way of those whom God loves most. It is not punishment but preparation.",
            source: "The Dark Night of the Soul"
        },
        {
            text: "The martyrs are sublime. Their deaths overwhelm us, shatter our ordinary sense of what is possible.",
            source: "Aesthetics"
        },
        {
            text: "I die for the German liberty that I have fought for my whole life.",
            source: "The Gospel According to Robert"
        },
        {
            text: "Fear not. Love much. Serve truly. And when your time comes, step through the door with open eyes.",
            source: "Beyond the Valley"
        },
        {
            text: "God is as near to me as I am to myself. God is a fountain flowing into itself.",
            source: "The Silesian Angelus"
        }
    ];

    // Use date to select scripture (changes daily)
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const index = dayOfYear % scriptures.length;
    const scripture = scriptures[index];

    dailyElement.innerHTML = `
        <blockquote>
            <p>"${scripture.text}"</p>
            <cite>— ${scripture.source}</cite>
        </blockquote>
    `;
}

/**
 * Chapter navigation for scripture pages
 */
function navigateChapter(direction) {
    const chapters = Array.from(document.querySelectorAll('.chapter'));
    const currentHash = window.location.hash.slice(1);
    const currentIndex = chapters.findIndex(ch => ch.id === currentHash);

    let newIndex;
    if (direction === 'next' && currentIndex < chapters.length - 1) {
        newIndex = currentIndex + 1;
    } else if (direction === 'prev' && currentIndex > 0) {
        newIndex = currentIndex - 1;
    }

    if (newIndex !== undefined) {
        const newChapter = chapters[newIndex];
        window.location.hash = newChapter.id;
        newChapter.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Search functionality
 */
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchResults = document.querySelector('.search-results');

    if (!searchInput || !searchResults) return;

    searchInput.addEventListener('input', debounce((e) => {
        const query = e.target.value.toLowerCase().trim();

        if (query.length < 3) {
            searchResults.innerHTML = '';
            searchResults.classList.remove('active');
            return;
        }

        // Search implementation would go here
        // For now, show placeholder
        searchResults.innerHTML = '<p class="search-hint">Search coming soon...</p>';
        searchResults.classList.add('active');
    }, 300));
}

/**
 * Debounce utility function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Copy scripture reference to clipboard
 */
function copyReference(element) {
    const text = element.closest('.chapter').querySelector('blockquote').textContent;
    const source = element.closest('.chapter').querySelector('h3').textContent;

    navigator.clipboard.writeText(`"${text.trim()}" — ${source}`).then(() => {
        const btn = element;
        const originalText = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
}

/**
 * Theme toggle (light/dark mode)
 */
function initThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Add fade-in animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
    .main-nav.scrolled {
        background: rgba(10, 10, 15, 0.98);
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
    }
`;
document.head.appendChild(style);
