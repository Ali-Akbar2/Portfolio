// ===== PRELOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 1000);
});

// ===== PARTICLES BACKGROUND =====
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 80;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }

  draw() {
    ctx.fillStyle = 'rgba(0, 217, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', newTheme);
  themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
  localStorage.setItem('theme', newTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('active');
});

// Close menu when clicking a link
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
  });
});

// ===== HEADER SCROLL EFFECT =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ===== TYPING EFFECT =====
const typedText = document.getElementById('typed-text');
const texts = [
  'Senior Full-Stack Developer',
  'MERN Stack Expert',
  'Shopify Specialist',
  'WordPress Developer',
  'Ecommerce Solutions'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentText = texts[textIndex];
  
  if (isDeleting) {
    typedText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentText.length) {
    setTimeout(() => isDeleting = true, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
  }

  setTimeout(typeEffect, isDeleting ? 50 : 100);
}

typeEffect();

// ===== STATS COUNTER =====
const stats = document.querySelectorAll('.stat-number');
let animated = false;

function animateStats() {
  stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    let count = 0;
    const increment = target / 100;
    
    const updateCount = () => {
      if (count < target) {
        count += increment;
        stat.textContent = Math.ceil(count) + '+';
        setTimeout(updateCount, 20);
      } else {
        stat.textContent = target + '+';
      }
    };
    
    updateCount();
  });
}

// ===== SKILLS PROGRESS BARS =====
function animateSkills() {
  const skillBars = document.querySelectorAll('.skill-progress');
  skillBars.forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    bar.style.width = progress + '%';
  });
}

// ===== PROJECT FILTERS =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
        card.style.display = 'block';
        setTimeout(() => card.style.opacity = '1', 10);
      } else {
        card.style.opacity = '0';
        setTimeout(() => card.style.display = 'none', 300);
      }
    });
  });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Trigger stats animation when hero is visible
      if (entry.target.classList.contains('hero') && !animated) {
        animateStats();
        animated = true;
      }
      
      // Trigger skills animation when skills section is visible
      if (entry.target.classList.contains('skills-section')) {
        animateSkills();
      }
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
observer.observe(document.querySelector('.hero'));
observer.observe(document.querySelector('.skills-section'));

// ===== SCROLL TO TOP =====
const scrollTop = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollTop.classList.add('visible');
  } else {
    scrollTop.classList.remove('visible');
  }
});

scrollTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you for your message! I will get back to you soon.');
  contactForm.reset();
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});