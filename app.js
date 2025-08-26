// Modern doerdTOOLS JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initScrollAnimations();
    initImageLoading();
    initCardInteractions();
    initSmoothScrolling();
    initParallaxEffects();
});

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const cards = document.querySelectorAll('.app-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    cards.forEach((card) => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });
}

// Enhanced image loading with fallback
function initImageLoading() {
    const images = document.querySelectorAll('.app-card__logo img');
    
    images.forEach((img) => {
        // Create a placeholder while loading
        const placeholder = createImagePlaceholder();
        img.parentNode.appendChild(placeholder);
        
        img.addEventListener('load', () => {
            img.style.opacity = '1';
            placeholder.remove();
        });
        
        img.addEventListener('error', () => {
            // Create fallback icon if image fails to load
            const fallback = createFallbackIcon(img.alt);
            img.parentNode.replaceChild(fallback, img);
            placeholder.remove();
        });
    });
}

// Create image placeholder
function createImagePlaceholder() {
    const placeholder = document.createElement('div');
    placeholder.className = 'image-placeholder';
    placeholder.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, #6366f1, #8b5cf6);
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: inherit;
    `;
    
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.style.cssText = `
        width: 24px;
        height: 24px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top: 2px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    
    placeholder.appendChild(spinner);
    
    // Add spinner animation
    if (!document.querySelector('#spinner-styles')) {
        const style = document.createElement('style');
        style.id = 'spinner-styles';
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    return placeholder;
}

// Create fallback icon
function createFallbackIcon(altText) {
    const fallback = document.createElement('div');
    fallback.className = 'fallback-icon';
    fallback.style.cssText = `
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #6366f1, #8b5cf6);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
        font-size: 1.5rem;
        border-radius: inherit;
    `;
    
    // Use first letter of app name or a default icon
    const firstLetter = altText ? altText.charAt(0).toUpperCase() : '🛠️';
    fallback.textContent = firstLetter;
    
    return fallback;
}

// Enhanced card interactions
function initCardInteractions() {
    const cards = document.querySelectorAll('.app-card');
    
    cards.forEach((card) => {
        // Add mouse move effect for subtle tilt
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
        
        // Add click ripple effect
        card.addEventListener('click', (e) => {
            createRippleEffect(e, card);
        });
    });
}

// Create ripple effect on card click
function createRippleEffect(e, element) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    // Add ripple animation if not exists
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                0% {
                    transform: scale(0);
                    opacity: 1;
                }
                100% {
                    transform: scale(1);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Smooth scrolling for internal links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Subtle parallax effects
function initParallaxEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (header) {
            header.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Button interaction enhancements
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.app-card__button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
    });
});

// Performance optimization: Debounce scroll events
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Any scroll-based animations can be added here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Add loading state management
document.addEventListener('DOMContentLoaded', function() {
    // Remove any loading states after everything is loaded
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Add a subtle entrance animation for the whole page
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(20px)';
        
        requestAnimationFrame(() => {
            document.body.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            document.body.style.opacity = '1';
            document.body.style.transform = 'translateY(0)';
        });
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Error handling for external resources
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.warn('Image failed to load:', e.target.src);
        // Handle image loading errors gracefully
    }
});

// Add focus management for accessibility
document.querySelectorAll('.app-card__button').forEach(button => {
    button.addEventListener('focus', function() {
        this.parentElement.parentElement.style.transform = 'translateY(-4px) scale(1.01)';
    });
    
    button.addEventListener('blur', function() {
        this.parentElement.parentElement.style.transform = '';
    });
});