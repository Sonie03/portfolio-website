// ===== CONFIGURATION =====
const CONFIG = {
  typingWords: [
    'Cloud DevOps Engineer',
    'AWS Infrastructure Specialist',
    'Application Support Engineer',
    'CI/CD Pipeline Architect',
    'Technology Professional'
  ],
  typingSpeed: 100,      // ms per character
  deletingSpeed: 50,     // ms per character deletion
  typingPause: 2000,     // ms pause between words
  scrollRevealThreshold: 0.15,
  counterDuration: 2000, // ms for counter animation
  testimonialAutoplay: 5000, // ms between auto-slides
};

// ===== DOM ELEMENTS =====
const elements = {
  body: document.body,
  loader: document.getElementById('loader'),
  navbar: document.getElementById('navbar'),
  hamburger: document.getElementById('hamburger'),
  navLinks: document.getElementById('nav-links'),
  navLinkItems: document.querySelectorAll('.nav-link'),
  themeToggle: document.getElementById('theme-toggle'),
  typedText: document.getElementById('typed-text'),
  backToTop: document.getElementById('back-to-top'),
  skillsFilterButtons: document.querySelectorAll('.skills-filter .filter-btn'),
  skillCards: document.querySelectorAll('.skill-card'),
  projectsFilterButtons: document.querySelectorAll('#projects-filter .filter-btn'),
  projectCards: document.querySelectorAll('.project-card'),
  projectModal: document.getElementById('project-modal'),
  modalClose: document.getElementById('modal-close'),
  modalOverlay: document.getElementById('modal-overlay'),
  contactForm: document.getElementById('contact-form'),
  formStatus: document.getElementById('form-status'),
  testimonialTrack: document.getElementById('testimonial-track'),
  testimonialCards: document.querySelectorAll('.testimonial-card'),
  prevBtn: document.getElementById('prev-btn'),
  nextBtn: document.getElementById('next-btn'),
  sliderDots: document.getElementById('slider-dots'),
};

// ===== LOADER =====
function initLoader() {
  window.addEventListener('load', () => {
    // Add a slight delay to ensure visual smoothness
    setTimeout(() => {
      if (elements.loader) {
        elements.loader.classList.add('hidden');
        elements.body.classList.remove('loading');
      }
    }, 600);
  });
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
  const currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  elements.themeToggle.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const icon = elements.themeToggle.querySelector('i');
  if (theme === 'light') {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

// ===== NAVBAR & SCROLL EFFECTS =====
function initNavbar() {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      elements.navbar.classList.add('scrolled');
    } else {
      elements.navbar.classList.remove('scrolled');
    }
  });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
  elements.hamburger.addEventListener('click', () => {
    elements.hamburger.classList.toggle('active');
    elements.navLinks.classList.toggle('active');
    elements.body.classList.toggle('loading'); // Prevent scrolling when open
  });

  // Close menu when a link is clicked
  elements.navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
      elements.hamburger.classList.remove('active');
      elements.navLinks.classList.remove('active');
      elements.body.classList.remove('loading');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (elements.navLinks.classList.contains('active') && 
        !elements.navLinks.contains(e.target) && 
        !elements.hamburger.contains(e.target)) {
      elements.hamburger.classList.remove('active');
      elements.navLinks.classList.remove('active');
      elements.body.classList.remove('loading');
    }
  });
}

// ===== SMOOTH SCROLLING =====
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Offset for the sticky navbar height
        const navbarHeight = elements.navbar.offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ===== TYPING EFFECT =====
class Typer {
  constructor(element, words, speed, deleteSpeed, pause) {
    this.element = element;
    this.words = words;
    this.speed = speed;
    this.deleteSpeed = deleteSpeed;
    this.pause = pause;
    this.wordIndex = 0;
    this.txt = '';
    this.isDeleting = false;
    this.type();
  }

  type() {
    const currentWordIndex = this.wordIndex % this.words.length;
    const fullTxt = this.words[currentWordIndex];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.element.innerHTML = `<span class="wrap">${this.txt}</span>`;

    let typeSpeed = this.speed;

    if (this.isDeleting) {
      typeSpeed = this.deleteSpeed;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.pause;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 300; // brief pause before next word
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

function initTyping() {
  if (elements.typedText) {
    new Typer(
      elements.typedText,
      CONFIG.typingWords,
      CONFIG.typingSpeed,
      CONFIG.deletingSpeed,
      CONFIG.typingPause
    );
  }
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  // Support prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      el.classList.add('revealed');
    });
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: CONFIG.scrollRevealThreshold
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });
}

// ===== ACTIVE NAV HIGHLIGHTING =====
function initActiveNavHighlighting() {
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        elements.navLinkItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
}

// ===== STAT COUNTER ANIMATION =====
function initStatCounters() {
  const observerOptions = {
    root: null,
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.stat-number').forEach(stat => {
    observer.observe(stat);
  });
}

function animateCounter(element) {
  const target = parseFloat(element.getAttribute('data-target'));
  const suffix = element.getAttribute('data-suffix') || '';
  const start = 0;
  const stepTime = Math.abs(Math.floor(CONFIG.counterDuration / target));
  let current = start;
  
  const increment = target / (CONFIG.counterDuration / 16); // ~60fps
  
  function updateVal() {
    current += increment;
    if (current >= target) {
      element.innerText = target + suffix;
    } else {
      element.innerText = (suffix.includes('.') ? current.toFixed(2) : Math.floor(current)) + suffix;
      requestAnimationFrame(updateVal);
    }
  }
  
  requestAnimationFrame(updateVal);
}

// ===== SKILL PROGRESS BARS =====
function initSkillBars() {
  const observerOptions = {
    root: null,
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progressFill = entry.target.querySelector('.skill-progress-fill');
        if (progressFill) {
          const progress = progressFill.getAttribute('data-progress');
          progressFill.style.width = `${progress}%`;
        }
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elements.skillCards.forEach(card => {
    observer.observe(card);
  });
}

// ===== SKILL FILTERING =====
function initSkillFiltering() {
  elements.skillsFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.skillsFilterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      elements.skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
          // Add microanimation classes
          card.style.animation = 'slideInUp 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// ===== PROJECT FILTERING =====
function initProjectFiltering() {
  elements.projectsFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      elements.projectsFilterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      elements.projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.classList.remove('hidden');
          card.style.animation = 'slideInUp 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

// ===== PROJECT MODAL =====
function initProjectModal() {
  elements.projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const payload = card.querySelector('.project-details-payload');
      if (payload) {
        populateModal(payload);
        elements.projectModal.classList.add('active');
        elements.body.classList.add('loading'); // prevent scrolling
      }
    });
  });

  const closeModal = () => {
    elements.projectModal.classList.remove('active');
    elements.body.classList.remove('loading');
  };

  elements.modalClose.addEventListener('click', closeModal);
  elements.modalOverlay.addEventListener('click', closeModal);
}

function populateModal(payload) {
  const title = payload.querySelector('.data-title').innerText;
  const category = payload.querySelector('.data-category').innerText;
  const client = payload.querySelector('.data-client').innerText;
  const duration = payload.querySelector('.data-duration').innerText;
  const role = payload.querySelector('.data-role').innerText;
  const desc = payload.querySelector('.data-desc').innerText;
  const mainImgPath = payload.querySelector('.data-image-main').innerText;
  const thumbsPaths = payload.querySelector('.data-images-thumbs').innerText.split(',');
  const features = payload.querySelector('.data-features').innerText.split(',');
  const challenges = payload.querySelector('.data-challenges').innerText.split(',');
  const techStack = payload.querySelector('.data-tech').innerText.split(',');
  const githubLink = payload.querySelector('.data-github').innerText;
  const demoLink = payload.querySelector('.data-demo').innerText;

  // Title & Categorization
  document.getElementById('modal-title').innerText = title;
  document.getElementById('modal-category').innerText = category;
  
  // Meta details
  document.getElementById('modal-client').innerText = client;
  document.getElementById('modal-duration').innerText = duration;
  document.getElementById('modal-role').innerText = role;
  
  // Main Description
  document.getElementById('modal-description').innerText = desc;
  
  // Image swap logic
  const mainImg = document.getElementById('modal-main-img');
  mainImg.src = mainImgPath;
  mainImg.alt = `${title} Architecture Diagram`;
  
  // Thumbnails building
  const thumbsContainer = document.getElementById('modal-thumbs');
  thumbsContainer.innerHTML = '';
  
  // First thumb is the main architecture diagram itself
  const archThumb = document.createElement('img');
  archThumb.src = mainImgPath;
  archThumb.alt = 'Architecture';
  archThumb.className = 'gallery-thumb active';
  archThumb.addEventListener('click', () => {
    setActiveThumb(archThumb, mainImg, mainImgPath);
  });
  thumbsContainer.appendChild(archThumb);
  
  // Build remaining screenshots
  thumbsPaths.forEach((path, idx) => {
    if (path.trim()) {
      const thumb = document.createElement('img');
      thumb.src = path;
      thumb.alt = `Screenshot ${idx + 1}`;
      thumb.className = 'gallery-thumb';
      thumb.addEventListener('click', () => {
        setActiveThumb(thumb, mainImg, path);
      });
      thumbsContainer.appendChild(thumb);
    }
  });

  // Features list
  const featuresContainer = document.getElementById('modal-features');
  featuresContainer.innerHTML = '';
  features.forEach(feat => {
    if (feat.trim()) {
      const li = document.createElement('li');
      li.innerText = feat.trim();
      featuresContainer.appendChild(li);
    }
  });

  // Challenges list
  const challengesContainer = document.getElementById('modal-challenges');
  challengesContainer.innerHTML = '';
  challenges.forEach(chal => {
    if (chal.trim()) {
      const li = document.createElement('li');
      li.innerText = chal.trim();
      challengesContainer.appendChild(li);
    }
  });

  // Tech stack tags
  const techContainer = document.getElementById('modal-tech');
  techContainer.innerHTML = '';
  techStack.forEach(tech => {
    if (tech.trim()) {
      const span = document.createElement('span');
      span.className = 'tag';
      span.innerText = tech.trim();
      techContainer.appendChild(span);
    }
  });

  // Action links setup
  const githubBtn = document.getElementById('modal-link-github');
  if (githubLink && githubLink !== '#') {
    githubBtn.href = githubLink;
    githubBtn.style.display = 'inline-flex';
  } else {
    githubBtn.style.display = 'none';
  }

  const demoBtn = document.getElementById('modal-link-demo');
  if (demoLink && demoLink !== '#') {
    demoBtn.href = demoLink;
    demoBtn.style.display = 'inline-flex';
  } else {
    demoBtn.style.display = 'none';
  }
}

function setActiveThumb(selectedThumb, mainImgElement, mainImgPath) {
  document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
  selectedThumb.classList.add('active');
  mainImgElement.src = mainImgPath;
}

// ===== TESTIMONIAL SLIDER =====
function initTestimonials() {
  let currentIndex = 0;
  const slideCount = elements.testimonialCards.length;
  
  if (slideCount === 0) return;

  // Build slider navigation dots
  elements.sliderDots.innerHTML = '';
  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement('div');
    dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => {
      goToSlide(i);
    });
    elements.sliderDots.appendChild(dot);
  }

  const updateDots = () => {
    const dots = elements.sliderDots.querySelectorAll('.slider-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  };

  const goToSlide = (index) => {
    currentIndex = (index + slideCount) % slideCount;
    elements.testimonialTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
  };

  // Prev / Next button listeners
  elements.prevBtn.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
    resetAutoplay();
  });

  elements.nextBtn.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
    resetAutoplay();
  });

  // Autoplay functionality
  let autoplayTimer = setInterval(() => {
    goToSlide(currentIndex + 1);
  }, CONFIG.testimonialAutoplay);

  const resetAutoplay = () => {
    clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, CONFIG.testimonialAutoplay);
  };
}

// ===== CONTACT FORM VALIDATION & HANDLING =====
function initContactForm() {
  if (!elements.contactForm) return;

  elements.contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    let isValid = true;
    
    // Clear status
    elements.formStatus.style.display = 'none';
    elements.formStatus.className = 'form-status';
    
    // Form fields validation
    const inputs = elements.contactForm.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
      const parent = input.parentElement;
      if (!input.value.trim()) {
        parent.classList.add('error');
        isValid = false;
      } else if (input.type === 'email' && !validateEmail(input.value)) {
        parent.classList.add('error');
        isValid = false;
      } else {
        parent.classList.remove('error');
      }
    });

    if (!isValid) return;

    // Send data to Formspree
    const submitBtn = elements.contactForm.querySelector('button[type="submit"]');
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    const formData = new FormData(elements.contactForm);
    const formspreeUrl = elements.contactForm.getAttribute('action');

    // Fallback logic in case Formspree is not set up
    if (formspreeUrl.includes('YOUR_FORM_ID')) {
      // Formspree not configured yet, fallback to mailto
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
        
        // Open user mail app
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        const mailtoUrl = `mailto:sonieemmanuvel@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + message)}`;
        window.location.href = mailtoUrl;

        elements.formStatus.innerText = 'Redirecting to your email client... Please update your Formspree ID in index.html to submit directly.';
        elements.formStatus.classList.add('success');
      }, 1000);
      return;
    }

    try {
      const response = await fetch(formspreeUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        elements.formStatus.innerText = 'Thank you! Your message has been sent successfully.';
        elements.formStatus.classList.add('success');
        elements.contactForm.reset();
      } else {
        const responseData = await response.json();
        elements.formStatus.innerText = responseData.error || 'Oops! There was a problem submitting your form. Please try again.';
        elements.formStatus.classList.add('error');
      }
    } catch (error) {
      elements.formStatus.innerText = 'Oops! There was a network error. Please try sending a direct email instead.';
      elements.formStatus.classList.add('error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
    }
  });

  // Dynamic error removal on type
  elements.contactForm.querySelectorAll('.form-control').forEach(control => {
    control.addEventListener('input', function() {
      const parent = this.parentElement;
      if (this.value.trim()) {
        if (this.type === 'email') {
          if (validateEmail(this.value)) {
            parent.classList.remove('error');
          }
        } else {
          parent.classList.remove('error');
        }
      }
    });
  });
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// ===== BACK TO TOP =====
function initBackToTop() {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      elements.backToTop.classList.add('visible');
    } else {
      elements.backToTop.classList.remove('visible');
    }
  });

  elements.backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavbar();
  initMobileMenu();
  initSmoothScrolling();
  initTyping();
  initScrollReveal();
  initActiveNavHighlighting();
  initStatCounters();
  initSkillBars();
  initSkillFiltering();
  initProjectFiltering();
  initProjectModal();
  initTestimonials();
  initContactForm();
  initBackToTop();
});

// Run loader separately to ensure it triggers early
initLoader();

/* ===== INTERACTIVE TERMINAL FEATURE ===== */
const bashSkill = document.getElementById('interactive-bash-skill');
const terminalModal = document.getElementById('terminal-modal');
const closeTerminal = document.getElementById('close-terminal');
const terminalOutput = document.getElementById('terminal-output');

if (bashSkill && terminalModal && closeTerminal && terminalOutput) {
  bashSkill.addEventListener('click', () => {
    terminalModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    runTerminalScript();
  });

  closeTerminal.addEventListener('click', () => {
    terminalModal.classList.remove('active');
    document.body.style.overflow = '';
  });
  
  terminalModal.addEventListener('click', (e) => {
    if(e.target === terminalModal) {
      terminalModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  function runTerminalScript() {
    terminalOutput.innerHTML = '';
    
    const lines = [
      { text: "root@devops:~# ", type: "prompt", delay: 600 },
      { text: "./welcome.sh", type: "command", delay: 800 },
      { text: "\n[✓] Authenticating user...", type: "output", delay: 600 },
      { text: "[✓] Establishing secure connection...", type: "output", delay: 600 },
      { text: "[✓] Environment loaded.", type: "output", delay: 400 },
      { text: "\n> Hello! Welcome to my DevOps & AI Portfolio.", type: "highlight", delay: 800 },
      { text: "> I specialize in automating pipelines, building scalable cloud architectures, and integrating AI.", type: "highlight", delay: 1200 },
      { text: "> Exploring my site? Feel free to reach out via the contact form!", type: "highlight", delay: 1000 },
      { text: "\nroot@devops:~# ", type: "prompt", delay: 500 }
    ];

    let currentLine = 0;
    
    function typeLine() {
      if (currentLine >= lines.length) return;
      
      const line = lines[currentLine];
      const span = document.createElement('span');
      
      if (line.type === 'prompt') span.className = 'terminal-prompt';
      else if (line.type === 'command') span.className = 'terminal-command';
      else if (line.type === 'output') span.className = 'terminal-text';
      else if (line.type === 'highlight') span.className = 'terminal-text';
      
      // Remove existing cursor if any
      const existingCursor = document.querySelector('.terminal-cursor');
      if (existingCursor) existingCursor.remove();
      
      if (line.type === 'command') {
        terminalOutput.appendChild(span);
        let charIdx = 0;
        const typingInterval = setInterval(() => {
          if (charIdx < line.text.length) {
            span.textContent += line.text.charAt(charIdx);
            charIdx++;
          } else {
            clearInterval(typingInterval);
            addCursor();
            currentLine++;
            setTimeout(typeLine, line.delay);
          }
        }, 60);
      } else {
        span.textContent = line.text;
        terminalOutput.appendChild(span);
        addCursor();
        currentLine++;
        setTimeout(typeLine, line.delay);
      }
    }
    
    function addCursor() {
      const cursor = document.createElement('span');
      cursor.className = 'terminal-cursor';
      terminalOutput.appendChild(cursor);
    }

    setTimeout(typeLine, 600);
  }
}
