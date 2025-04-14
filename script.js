// Carousel Functionality
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
let currentSlide = 0;

function moveToSlide(index) {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${index * slideWidth}px)`;
    currentSlide = index;
    
    // Update active slide content
    slides.forEach((slide, i) => {
        const content = slide.querySelector('.slide-content');
        content.style.opacity = i === index ? '1' : '0';
        content.style.transform = i === index ? 'translateY(0)' : 'translateY(20px)';
    });
}

// Initialize first slide
window.addEventListener('load', () => {
    moveToSlide(0);
});

document.querySelector('.next')?.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    moveToSlide(currentSlide);
});

document.querySelector('.prev')?.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    moveToSlide(currentSlide);
});

setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    moveToSlide(currentSlide);
}, 5000);

// Modals
function showLoginModal() {
    document.getElementById('loginModal')?.classList.add('show');
}

function showSignupModal() {
    document.getElementById('signupModal')?.classList.add('show');
}

function closeModal(modalId) {
    document.getElementById(modalId)?.classList.remove('show');
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('show');
    }
});

// User Menu Toggle
document.getElementById('userMenuToggle')?.addEventListener('click', () => {
    document.getElementById('userDropdown')?.classList.toggle('show');
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-menu')) {
        document.getElementById('userDropdown')?.classList.remove('show');
    }
});

// Word Actions
document.getElementById('save-word')?.addEventListener('click', () => {
    alert('Word saved to your collection!');
});

document.getElementById('new-word')?.addEventListener('click', () => {
    alert('Loading new word...');
});

document.getElementById('pronunciation')?.addEventListener('click', () => {
    alert('Playing pronunciation...');
});

// Tabs
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelector('.tab.active')?.classList.remove('active');
        tab.classList.add('active');
    });
});

// Forms
document.querySelector('.contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent successfully!');
    e.target.reset();
});

document.querySelector('.newsletter-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Successfully subscribed to newsletter!');
    e.target.reset();
});

document.querySelectorAll('.auth-form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Authentication successful!');
        closeModal(e.target.closest('.modal-overlay')?.id);
    });
});

// Date
document.getElementById('date').textContent = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
});

// Theme
const themeButtons = document.querySelectorAll('.theme-btn');
const root = document.documentElement;
themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const theme = button.dataset.theme;
        root.setAttribute('data-theme', theme);
        localStorage.setItem('preferred-theme', theme);
    });
});
const savedTheme = localStorage.getItem('preferred-theme') || 'light';
root.setAttribute('data-theme', savedTheme);

// Header scroll effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    header?.classList.toggle('transparent', scroll > 50);
});

// Assignment Slider
const slider = document.querySelector('.assignment-slider');
let isDown = false, startX, scrollLeft;

if (slider) {
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.classList.remove('active');
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}

// Hamburger Menu
const hamburger = document.getElementById('hamburgerMenu');
const mobileNav = document.getElementById('mobileNav');
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileNav?.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

document.addEventListener('click', (e) => {
    if (!hamburger?.contains(e.target) && !mobileNav?.contains(e.target)) {
        hamburger?.classList.remove('active');
        mobileNav?.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
        mobileNav?.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Image paths configuration
const imagePaths = {
    logo: 'new_logo.png',
    background: 'bookimg.jpg',
    carousel: [
        'learn.png',
        'studying.png',
        'i_am_learning.png'
    ]
};

// Set background image
document.body.style.background = `url('${imagePaths.background}') no-repeat center center/cover`;

// Set logo image
const logoImg = document.querySelector('.left img');
if (logoImg) {
    logoImg.src = imagePaths.logo;
}

// Set carousel images
document.querySelectorAll('.carousel-track img').forEach((img, index) => {
    if (imagePaths.carousel[index]) {
        img.src = imagePaths.carousel[index];
    }
});

// Add scroll event listener for dashboard transparency
window.addEventListener('scroll', function() {
    const cards = document.querySelectorAll('.card:not(header)');
    const scrollPosition = window.scrollY;
    
    cards.forEach(card => {
        const cardPosition = card.offsetTop;
        const scrollPercentage = Math.min(
            (scrollPosition / cardPosition) * 0.8,
            0.9
        );
        
        card.style.backgroundColor = `rgba(255, 255, 255, ${1 - scrollPercentage})`;
        card.style.backdropFilter = `blur(${10 - (scrollPercentage * 5)}px)`;
    });
});

// Remove all other hamburger menu related code and keep only this one clean implementation
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const sideMenu = document.querySelector(".side-menu");
    const closeMenu = document.querySelector(".close-menu");

    // Toggle menu when hamburger is clicked
    hamburger?.addEventListener("click", function (e) {
        e.stopPropagation(); // Prevent event from bubbling
        sideMenu?.classList.toggle("active");
    });

    // Close menu when close button is clicked
    closeMenu?.addEventListener("click", function () {
        sideMenu?.classList.remove("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
        if (!hamburger?.contains(e.target) && !sideMenu?.contains(e.target)) {
            sideMenu?.classList.remove("active");
        }
    });
});

// Load dictionary data
async function loadDictionary() {
    try {
        const response = await fetch('dict.json');
        const data = await response.json();
        window.dictionary = data;
        updateWordOfDay();
    } catch (error) {
        console.error('Error loading dictionary:', error);
    }
}

// Update word of the day based on current date
// Remove the duplicate updateWordOfDay and related functions at the bottom
// Keep only this version of the function
function updateWordOfDay() {
    const today = new Date();
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const dayOfMonth = today.getDate();
    const letterIndex = (dayOfMonth - 1) % 26; // This will cycle through the alphabet
    const todayLetter = alphabet[letterIndex];

    // Update date display
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date').textContent = today.toLocaleDateString('en-US', options);

    // Update letter badges
    document.querySelectorAll('.letter-badge, .letter-highlight').forEach(element => {
        element.textContent = todayLetter;
    });

    // Get word data and update display
    if (window.dictionary && window.dictionary[todayLetter]) {
        const words = window.dictionary[todayLetter];
        const randomIndex = Math.floor(Math.random() * words.length);
        const wordData = words[randomIndex];
        
        document.querySelector('.word').textContent = wordData.word;
        document.querySelector('.phonetic').textContent = wordData.phonetic;
        document.querySelector('.definition').textContent = wordData.definition;
        document.querySelector('.example').textContent = wordData.example;
    }
}

// Remove the duplicate DOMContentLoaded event listener at the bottom
// Keep only this initialization
document.addEventListener('DOMContentLoaded', () => {
    loadDictionary();
});

// Handle next word button with immediate update
document.getElementById('new-word')?.addEventListener('click', () => {
    if (window.dictionary) {
        updateWordOfDay();
    } else {
        loadDictionary(); // Reload dictionary if not available
    }
});

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    loadDictionary();
    updateWordOfDay(); // Update word immediately
});

function getRandomWord(words) {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

document.addEventListener('DOMContentLoaded', function() {
    const date = new Date();
    const letterIndex = (date.getDate()-1) % 26;
    const letter = String.fromCharCode(65 + letterIndex);

    // Update date display
    document.getElementById('date').textContent = date.toLocaleDateString();
    
    // Display letter badge
    const letterBadge = document.querySelector('.letter-badge');
    letterBadge.textContent = letter;

    // Fetch dictionary data
    fetch('dictionary.json')
        .then(response => response.json())
        .then(data => {
            const words = data[letter];
            if (!words) {
                console.error('No words found for letter:', letter);
                return;
            }
            
            // Get and display random word
            displayWord(getRandomWord(words));

            // Next word button handler - get another random word
            document.getElementById('new-word').addEventListener('click', () => {
                displayWord(getRandomWord(words));
            });

            // Pronunciation button handler
            document.getElementById('pronunciation').addEventListener('click', () => {
                const currentWord = document.querySelector('.word').textContent;
                const utterance = new SpeechSynthesisUtterance(currentWord);
                window.speechSynthesis.speak(utterance);
            });
        })
        .catch(error => console.error('Error loading dictionary:', error));
});

function displayWord(wordData) {
    document.querySelector('.word').textContent = wordData.word;
    document.querySelector('.phonetic').textContent = wordData.phonetic;
    document.querySelector('.definition').textContent = wordData.definition;
    document.querySelector('.example').textContent = wordData.example;
}
