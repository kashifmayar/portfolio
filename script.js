// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Apply theme with transition
function applyTheme(theme) {
    // Prevent transition on initial load
    if (!body.classList.contains('theme-transition')) {
        body.classList.add('theme-transition');
    }
    
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
    } else {
        body.classList.remove('dark-mode');
        themeToggle.checked = false;
    }
    
    localStorage.setItem('theme', theme);
}

themeToggle.addEventListener('change', () => {
    const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
    applyTheme(newTheme);
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

// Project Carousel
const track = document.querySelector('.project-track');
const cards = document.querySelectorAll('.project-card');
const carouselPrevBtn = document.querySelector('.prev-btn');
const carouselNextBtn = document.querySelector('.next-btn');

let currentIndex = 0;
const cardWidth = 300 + 32; // card width + margin

function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

carouselNextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
});

carouselPrevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
});

// Skill Progress Rings
document.querySelectorAll('.skill-item').forEach(item => {
    const progress = item.dataset.progress;
    item.style.setProperty('--progress', `${progress}%`);
});

// Skills hover effect
document.querySelectorAll('.skill-circle').forEach(circle => {
    const skillItem = circle.closest('.skill-item');
    const progress = skillItem.dataset.progress;
    const progressText = circle.querySelector('.progress-text');
    progressText.textContent = `${progress}%`;
});

// Lottie Animations
const aiAnimation = lottie.loadAnimation({
    container: document.getElementById('ai-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://assets2.lottiefiles.com/packages/lf20_M9p23l.json'
});

const robotAssistant = lottie.loadAnimation({
    container: document.getElementById('robot-assistant'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'https://assets7.lottiefiles.com/packages/lf20_xh83pj0n.json'
});

// Floating Icons Animation
const icons = document.querySelectorAll('.tech-icon');
icons.forEach((icon, index) => {
    lottie.loadAnimation({
        container: icon,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: [
            'https://assets8.lottiefiles.com/packages/lf20_python.json',
            'https://assets8.lottiefiles.com/packages/lf20_ai-brain.json',
            'https://assets8.lottiefiles.com/packages/lf20_data-analysis.json'
        ][index]
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'var(--background)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.backdropFilter = 'none';
    }
});

// Enhanced scroll animations for skills
const skillsSection = document.querySelector('.skills');
const skillItems = document.querySelectorAll('.group');

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, { threshold: 0.2 });

skillItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.5s ease-out';
});

skillsObserver.observe(skillsSection);

// Smooth hover transitions for skill items
skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const overlay = item.querySelector('.skill-overlay');
        const percentage = item.querySelector('.skill-percentage');
        
        overlay.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        percentage.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking a link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Image Slider
const sliderContainer = document.querySelector('.slider-container');
const sliderDots = document.querySelector('.slider-dots');
const sliderPrevBtn = document.querySelector('.slider-btn.prev');
const sliderNextBtn = document.querySelector('.slider-btn.next');

let currentImageIndex = 0;
let isTransitioning = false;
let images = [
    'kashif.jpeg',
    'kashif1.jpeg'
];

// Function to load images
function loadImages() {
    try {
        // Clear existing content
        sliderContainer.innerHTML = '';
        sliderDots.innerHTML = '';
        
        // Add each image to the slider
        images.forEach((image, index) => {
            // Create and add image
            const img = document.createElement('img');
            img.src = `images/${image}`;
            img.alt = 'Kashif';
            img.className = 'slider-image';
            if (index === 0) img.classList.add('active');
            
            // Add load event listener to check if image loads successfully
            img.addEventListener('load', () => {
                console.log(`Image loaded successfully: ${image}`);
            });
            
            // Add error event listener to handle loading failures
            img.addEventListener('error', () => {
                console.error(`Failed to load image: ${image}`);
            });
            
            sliderContainer.appendChild(img);
            
            // Create and add dot
            const dot = document.createElement('div');
            dot.className = 'slider-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                if (!isTransitioning) {
                    goToSlide(index);
                }
            });
            sliderDots.appendChild(dot);
        });
    } catch (error) {
        console.error('Error in loadImages:', error);
    }
}

// Function to go to a specific slide
function goToSlide(index) {
    if (isTransitioning || index === currentImageIndex) return;
    
    isTransitioning = true;
    const sliderImages = document.querySelectorAll('.slider-image');
    const dots = document.querySelectorAll('.slider-dot');
    
    if (!sliderImages.length || !dots.length) {
        console.error('No images or dots found');
        return;
    }
    
    // Remove active class from current image and dot
    const currentImage = sliderImages[currentImageIndex];
    currentImage.classList.remove('active');
    currentImage.classList.add('prev');
    dots[currentImageIndex].classList.remove('active');
    
    // Update current index
    currentImageIndex = index;
    
    // Add active class to new image and dot
    const newImage = sliderImages[currentImageIndex];
    newImage.classList.add('active');
    dots[currentImageIndex].classList.add('active');
    
    // Reset transition state after animation
    setTimeout(() => {
        currentImage.classList.remove('prev');
        isTransitioning = false;
    }, 800); // Match this with the CSS transition duration
}

// Function to go to next slide
function nextSlide() {
    if (!isTransitioning) {
        const nextIndex = (currentImageIndex + 1) % images.length;
        goToSlide(nextIndex);
    }
}

// Function to go to previous slide
function prevSlide() {
    if (!isTransitioning) {
        const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
        goToSlide(prevIndex);
    }
}

// Add click event listeners to buttons
if (sliderPrevBtn && sliderNextBtn) {
    sliderPrevBtn.addEventListener('click', () => {
        if (!isTransitioning) {
            prevSlide();
        }
    });
    sliderNextBtn.addEventListener('click', () => {
        if (!isTransitioning) {
            nextSlide();
        }
    });
} else {
    console.error('Slider buttons not found');
}

// Auto advance slides
let slideInterval;

function startAutoSlide() {
    slideInterval = setInterval(() => {
        if (!isTransitioning) {
            nextSlide();
        }
    }, 5000); // Change slide every 5 seconds
}

function stopAutoSlide() {
    clearInterval(slideInterval);
}

// Initialize auto-slide
startAutoSlide();

// Pause auto-advance on hover
if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
} else {
    console.error('Slider container not found');
}

// Load images when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing slider...');
    loadImages();
}); 