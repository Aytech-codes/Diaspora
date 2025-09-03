// Mobile menu toggle
const menuToggle = document.getElementById("mobile-menu");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Custom navigation handling to prevent section movement
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('data-section');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Get the element's position relative to the viewport
      const rect = targetElement.getBoundingClientRect();
      // Calculate the absolute position
      const absoluteTop = rect.top + window.pageYOffset;
      
      // Scroll to the element without smooth behavior
      window.scrollTo({
        top: absoluteTop,
        behavior: 'smooth'
      });
    }
  });
});

// Scroll animations - excluding About Us section
const faders = document.querySelectorAll(".fade-in, .slide-up");

const appearOptions = {
  threshold: 0.2,
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    // Skip animation for About Us section
    if (entry.target.closest('#about')) return;
    
    if (!entry.isIntersecting) return;
    entry.target.classList.add("show");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  // Don't observe elements in the About Us section
  if (!fader.closest('#about')) {
    appearOnScroll.observe(fader);
  }
});

// ------------------------------
// Navbar auto-hide on scroll - modified to prevent About Us section movement
let lastScrollTop = 0;
const header = document.querySelector('header');
const aboutSection = document.getElementById('about');

window.addEventListener('scroll', function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Get the About Us section position
  const aboutRect = aboutSection ? aboutSection.getBoundingClientRect() : null;
  
  // Only apply navbar hide/show if we're not in the About Us section
  if (!aboutRect || (aboutRect.top < -100 || aboutRect.bottom > window.innerHeight + 100)) {
    if (scrollTop > lastScrollTop) {
      // scrolling down → hide navbar
      header.style.top = "-100px";
    } else {
      // scrolling up → show navbar
      header.style.top = "0";
    }
  }

  lastScrollTop = scrollTop;
});

// Fix for About Us section position
function fixAboutSectionPosition() {
  const aboutSection = document.getElementById('about');
  if (!aboutSection) return;
  
  // Set fixed position for About Us section
  aboutSection.style.position = 'relative';
  aboutSection.style.transform = 'none';
  
  // Ensure the section doesn't move when scrolling
  const sectionWrapper = aboutSection.closest('.section-wrapper');
  if (sectionWrapper) {
    sectionWrapper.style.position = 'relative';
    sectionWrapper.style.zIndex = '100';
    sectionWrapper.style.transform = 'none';
  }
}

// Run the fix on page load and scroll
window.addEventListener('load', fixAboutSectionPosition);
window.addEventListener('scroll', fixAboutSectionPosition);

// ========== ENHANCED INTERACTIVE FEATURES ==========

// Loading Screen
window.addEventListener('load', function() {
  const loading = document.querySelector('.loading');
  if (loading) {
    setTimeout(() => {
      loading.classList.add('hidden');
      setTimeout(() => {
        loading.style.display = 'none';
      }, 500);
    }, 1000);
  }
});

// Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'auto' // Changed from smooth to auto to prevent section movement
  });
});

// Show/Hide Scroll to Top Button - modified to prevent About Us section movement
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  const aboutSection = document.getElementById('about');
  const aboutRect = aboutSection ? aboutSection.getBoundingClientRect() : null;
  
  // Check if we're currently viewing the About Us section
  const isInAboutSection = aboutRect && aboutRect.top <= 0 && aboutRect.bottom >= 0;
  
  // Add scrolled class to header only if not in About section
  if (window.pageYOffset > 100) {
    header.classList.add('scrolled');
    scrollToTopBtn.classList.add('visible');
  } else {
    header.classList.remove('scrolled');
    scrollToTopBtn.classList.remove('visible');
  }
  
  // If we're in the About section, ensure it stays in place
  if (isInAboutSection) {
    // Prevent any movement of the About section
    aboutSection.style.transform = 'none';
  }
});

// Contact Form Handling for Formspree
contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const name = this.querySelector('input[name="name"]').value.trim();
  const email = this.querySelector('input[name="email"]').value.trim();
  const message = this.querySelector('textarea[name="message"]').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields');
    return;
  }

  // Send form data to Formspree
  fetch("https://formspree.io/f/mdklpoeg", {
    method: "POST",
    headers: { "Accept": "application/json" },
    body: new FormData(contactForm)
  })
  .then(response => {
    if (response.ok) {
      alert("✅ Thank you! Your message has been sent.");
      contactForm.reset();
    } else {
      alert("❌ Sorry, your message could not be sent.");
    }
  })
  .catch(() => {
    alert("❌ Error sending message. Please try again later.");
  });
});


// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()">×</button>
  `;
  
  // Add notification styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 1rem;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile menu if open
      const navLinks = document.getElementById('nav-links');
      if (navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
      }
    }
  });
});

// Enhanced scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      
      // Add staggered animation for child elements
      const children = entry.target.querySelectorAll('.forum, .offer, .guidelines li, .involved li');
      children.forEach((child, index) => {
        setTimeout(() => {
          child.style.animation = `fadeInUp 0.6s ease-out forwards`;
        }, index * 100);
      });
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.section, .forum, .offer').forEach(el => {
  observer.observe(el);
});

// Add typing effect to hero text
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
  const text = heroTitle.textContent;
  heroTitle.textContent = '';
  
  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  };
  
  // Start typing effect after page load
  setTimeout(typeWriter, 1500);
}

// FAQ Functionality (if you add FAQ section)
function initFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const icon = question.querySelector('.faq-icon');
      
      // Close other open FAQs
      faqQuestions.forEach(otherQuestion => {
        if (otherQuestion !== question) {
          otherQuestion.classList.remove('active');
          otherQuestion.nextElementSibling.classList.remove('active');
        }
      });
      
      // Toggle current FAQ
      question.classList.toggle('active');
      answer.classList.toggle('active');
    });
  });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Add hover effects to navigation
const navItems = document.querySelectorAll('.nav-links li a');
navItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transform = 'translateY(-2px)';
  });
  
  item.addEventListener('mouseleave', () => {
    item.style.transform = 'translateY(0)';
  });
});

// Initialize features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initFAQ();
  
  // Add entrance animations
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
  
  // Forum tabs functionality
  const forumTabs = document.querySelectorAll('.forum-tab');
  const forumPanels = document.querySelectorAll('.forum-panel');
  
  forumTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      forumTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Hide all panels
      forumPanels.forEach(panel => panel.classList.remove('active'));
      
      // Show the corresponding panel
      const targetPanel = document.getElementById(tab.getAttribute('data-target'));
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
});

// Add performance monitoring
window.addEventListener('load', () => {
  const loadTime = performance.now();
  console.log(`Page loaded in ${Math.round(loadTime)}ms`);
});
