// ================= MOBILE MENU =================
const menuToggle = document.getElementById("mobile-menu");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    // close mobile menu
    if (navLinks && navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
    }
  });
});

// ================= CONTACT FORM =================
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = this.querySelector('input[name="name"]').value.trim();
    const email = this.querySelector('input[name="email"]').value.trim();
    const message = this.querySelector('textarea[name="message"]').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all fields');
      return;
    }

    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    fetch("https://formspree.io/f/mdklpoeg", {
      method: "POST",
      headers: { "Accept": "application/json" },
      body: new FormData(this)
    })
    .then(response => {
      if (response.ok) {
        alert("✅ Thank you! Your message has been sent.");
        this.reset();
      } else {
        alert("❌ Sorry, your message could not be sent.");
      }
    })
    .catch(() => {
      alert("❌ Error sending message. Please try again later.");
    })
    .finally(() => {
      // Reset button state
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
  });
}
// Select all tab buttons and panels
const forumTabs = document.querySelectorAll('.forum-tab');
const forumPanels = document.querySelectorAll('.forum-panel');

forumTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const targetId = tab.dataset.target;

    // Remove active class from all tabs
    forumTabs.forEach(t => t.classList.remove('active'));
    // Add active class to clicked tab
    tab.classList.add('active');

    // Hide all panels
    forumPanels.forEach(panel => panel.classList.remove('active'));
    // Show the target panel
    const targetPanel = document.getElementById(targetId);
    if(targetPanel) targetPanel.classList.add('active');
  });
});

// ================= HERO TYPING EFFECT =================
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
  setTimeout(typeWriter, 1000);
}
// JavaScript for Scroll-to-Top Button
const scrollBtn = document.getElementById('scrollToTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) { // Show after scrolling 300px
    scrollBtn.classList.add('visible');
  } else {
    scrollBtn.classList.remove('visible');
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});
const header = document.querySelector('header');
let lastScrollY = window.scrollY;
let ticking = false;
const TOP_REVEAL_THRESHOLD = 10;

function handleScroll() {
  const currentY = window.scrollY;

  if (currentY <= TOP_REVEAL_THRESHOLD) {
    header.style.top = '0';   // show when at top
  } else if (currentY > lastScrollY) {
    header.style.top = '0';   // scrolling down → keep visible
  } else {
    header.style.top = `-${header.offsetHeight}px`; // scrolling up → hide
  }

  lastScrollY = currentY;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(handleScroll);
    ticking = true;
  }
});



// ================= NO PARALLAX =================
// Removed parallax effect so hero background stays fixed in place
