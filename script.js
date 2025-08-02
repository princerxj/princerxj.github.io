const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

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

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            current = sectionId;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

const floatingElements = document.querySelectorAll('.float-element');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    floatingElements.forEach((element, index) => {
        const speed = (index + 1) * 0.3;
        element.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

const skillBoxes = document.querySelectorAll('.skill-box');

skillBoxes.forEach(box => {
    box.addEventListener('mouseenter', () => {
        const skill = box.getAttribute('data-skill');
        box.style.transform = 'translateY(-10px) scale(1.05)';
        
        box.style.boxShadow = '0 15px 35px rgba(0, 245, 255, 0.3)';
    });

    box.addEventListener('mouseleave', () => {
        box.style.transform = 'translateY(0) scale(1)';
        box.style.boxShadow = 'none';
    });
});

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

const animateElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .contact-item, .mini-project');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

const stats = document.querySelectorAll('.stat-number');

function animateStats() {
    stats.forEach(stat => {
        const originalText = stat.textContent;
        const target = parseFloat(originalText.replace(/[^0-9.]/g, ''));
        const increment = target / 100;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (originalText.includes('+')) {
                stat.textContent = Math.floor(current) + '+';
            } else if (originalText.includes('.')) {
                stat.textContent = current.toFixed(2);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 20);
    });
}

const aboutSection = document.querySelector('#about');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statsObserver.observe(aboutSection);

const contactForm = document.querySelector('#contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }

    const mailtoLink = `mailto:pr273582@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    window.location.href = mailtoLink;
    
    showNotification('Opening your email client...', 'success');
    contactForm.reset();
});

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

let mouseX = 0;
let mouseY = 0;
let trail = [];

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function createTrail() {
    trail.push({ x: mouseX, y: mouseY, life: 30 });
    
    if (trail.length > 10) {
        trail.shift();
    }
}

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

const projectImages = document.querySelectorAll('.project-image img');

projectCards.forEach((card, index) => {
    const img = card.querySelector('.project-image img');
    
    card.addEventListener('mousemove', (e) => {
        if (!img) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const moveX = (x - centerX) / 10;
        const moveY = (y - centerY) / 10;
        
        img.style.transform = `scale(1.1) translate(${moveX}px, ${moveY}px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        if (!img) return;
        img.style.transform = 'scale(1)';
    });
});

const profileImages = document.querySelectorAll('.profile-image, .about-profile-image');

profileImages.forEach(profileImg => {
    profileImg.addEventListener('mouseenter', () => {
        profileImg.style.transform = 'scale(1.05) rotate(5deg)';
        
        if (profileImg.classList.contains('profile-image')) {
            profileImg.style.boxShadow = '0 0 50px rgba(0, 245, 255, 0.8)';
        } else {
            profileImg.style.boxShadow = '0 0 40px rgba(0, 245, 255, 0.8)';
        }
    });

    profileImg.addEventListener('mouseleave', () => {
        profileImg.style.transform = 'scale(1) rotate(0deg)';
        
        if (profileImg.classList.contains('profile-image')) {
            profileImg.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.3)';
        } else {
            profileImg.style.boxShadow = '0 0 30px rgba(0, 245, 255, 0.4)';
        }
    });

    profileImg.addEventListener('click', () => {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(0, 245, 255, 0.3);
            transform: translate(-50%, -50%);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 10;
        `;
        
        profileImg.style.position = 'relative';
        profileImg.appendChild(ripple);
        
        setTimeout(() => {
            profileImg.removeChild(ripple);
        }, 600);
    });
});

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            width: 0;
            height: 0;
            opacity: 1;
        }
        100% {
            width: 200px;
            height: 200px;
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

let colorIndex = 0;
const colors = [
    { primary: '#00f5ff', secondary: '#0066ff' },
    { primary: '#ff0080', secondary: '#8000ff' },
    { primary: '#00ff80', secondary: '#0080ff' }
];

function cycleColors() {
    const root = document.documentElement;
    const currentColors = colors[colorIndex];
    
    colorIndex = (colorIndex + 1) % colors.length;
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
    
    const criticalElements = document.querySelectorAll('.glitch, .nav-logo');
    criticalElements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
    });
    
    // Initialize typing effect
    initTypingEffect();
    
    // Initialize code scrolling background
    initCodeBackground();
});

// Code Scrolling Background
function initCodeBackground() {
    const codeLines = document.querySelector('.code-lines');
    if (!codeLines) return;
    
    const codeSnippets = [
        'const express = require("express");',
        'app.get("/api/users", async (req, res) => {',
        '  try {',
        '    const users = await User.find();',
        '    res.json(users);',
        '  } catch (error) {',
        '    res.status(500).json({ error: error.message });',
        '  }',
        '});',
        '',
        'function fibonacci(n) {',
        '  if (n <= 1) return n;',
        '  return fibonacci(n - 1) + fibonacci(n - 2);',
        '}',
        '',
        'class Node {',
        '  constructor(data) {',
        '    this.data = data;',
        '    this.next = null;',
        '  }',
        '}',
        '',
        '// Binary Search Implementation',
        'function binarySearch(arr, target) {',
        '  let left = 0, right = arr.length - 1;',
        '  while (left <= right) {',
        '    const mid = Math.floor((left + right) / 2);',
        '    if (arr[mid] === target) return mid;',
        '    if (arr[mid] < target) left = mid + 1;',
        '    else right = mid - 1;',
        '  }',
        '  return -1;',
        '}',
        '',
        'const mongoose = require("mongoose");',
        'mongoose.connect("mongodb://localhost:27017/db");',
        '',
        'app.use(express.json());',
        'app.use(cors());',
        'app.use("/api", routes);',
        '',
        'const jwt = require("jsonwebtoken");',
        'const token = jwt.sign(payload, secret, { expiresIn: "1h" });',
        '',
        '// React Component',
        'const UserProfile = ({ user }) => {',
        '  const [isEditing, setIsEditing] = useState(false);',
        '  useEffect(() => {',
        '    fetchUserData();',
        '  }, []);',
        '  return (',
        '    <div className="profile">',
        '      <h2>{user.name}</h2>',
        '    </div>',
        '  );',
        '};',
        '',
        'async function hashPassword(password) {',
        '  const salt = await bcrypt.genSalt(10);',
        '  return await bcrypt.hash(password, salt);',
        '}',
        '',
        'const leetcodeProblems = [',
        '  "Two Sum", "Add Two Numbers",',
        '  "Longest Substring", "Median Arrays",',
        '  "Palindromic Substring", "Zigzag Conversion"',
        '];',
        '',
        'git add .',
        'git commit -m "feat: add new feature"',
        'git push origin main',
        '',
        'docker build -t myapp .',
        'docker run -p 3000:3000 myapp',
        '',
        'SELECT * FROM users WHERE active = 1;',
        'UPDATE users SET last_login = NOW();',
        'DELETE FROM sessions WHERE expires < NOW();',
        '',
        'def quick_sort(arr):',
        '    if len(arr) <= 1:',
        '        return arr',
        '    pivot = arr[len(arr) // 2]',
        '    left = [x for x in arr if x < pivot]',
        '    middle = [x for x in arr if x == pivot]',
        '    right = [x for x in arr if x > pivot]',
        '    return quick_sort(left) + middle + quick_sort(right)',
        '',
        'import { useState, useEffect } from "react";',
        'import axios from "axios";',
        '',
        'const API_BASE_URL = process.env.REACT_APP_API_URL;',
        'const authToken = localStorage.getItem("token");',
        ''
    ];
    
    // Generate multiple columns of code
    let codeContent = '';
    const columns = 8;
    const rowsPerColumn = 100;
    
    for (let col = 0; col < columns; col++) {
        for (let row = 0; row < rowsPerColumn; row++) {
            const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
            codeContent += ' '.repeat(col * 25) + snippet + '\n';
        }
        codeContent += '\n\n';
    }
    
    codeLines.textContent = codeContent;
}

function throttle(func, wait) {
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

window.addEventListener('scroll', throttle(() => {
    updateActiveLink();
}, 100));

window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.filter = 'hue-rotate(180deg)';
        showNotification('🎉 Easter egg activated! Matrix mode enabled!', 'success');
        
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 5000);
        
        konamiCode = [];
    }
});

function initTypingEffect() {
    
    const texts = [
        'Full Stack Dev',
        'Backend Nerd', 
        'LeetCode Enthusiast',
        'Terminal Tinkerer'
    ];
    
    const typedTextElement = document.querySelector('.typed-text');
    
    if (!typedTextElement) {
        console.error('typed-text element not found!');
        const subtitleElement = document.querySelector('.subtitle');
        if (subtitleElement) {
            subtitleElement.innerHTML = 'Full Stack Developer <span class="typing-cursor">&nbsp;</span>';
        }
        return;
    }
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                setTimeout(typeText, 500);
                return;
            }
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(typeText, 2000);
                return;
            }
        }
        const typingSpeed = isDeleting ? 50 : 100;
        setTimeout(typeText, typingSpeed);
    }
    typeText();
}
