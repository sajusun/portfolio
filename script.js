// SAKHAWAT HOSSAIN PORTFOLIO JAVASCRIPT

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Dark / Light)
  const themeToggleButtons = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('sakhawat_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcons(currentTheme);

  themeToggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('sakhawat_theme', newTheme);
      updateThemeIcons(newTheme);
    });
  });

  function updateThemeIcons(theme) {
    themeToggleButtons.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'fas fa-sun text-yellow-400';
        } else {
          icon.className = 'fas fa-moon text-indigo-600';
        }
      }
    });
  }

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu on link click
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 3. Toast Notifications
  window.showToast = function(message, isSuccess = true) {
    let toast = document.getElementById('toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fas ${isSuccess ? 'fa-check-circle' : 'fa-info-circle'}"></i> <span>${message}</span>`;
    toast.style.backgroundColor = isSuccess ? '#10b981' : '#6366f1';
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

  // 4. Copy to Clipboard Utility
  window.copyToClipboard = function(text, label = 'Copied to clipboard!') {
    navigator.clipboard.writeText(text).then(() => {
      window.showToast(label, true);
    }).catch(() => {
      window.showToast('Failed to copy', false);
    });
  };

  // 5. Project Filtering (for projects.html and home page if applicable)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const categories = (card.getAttribute('data-category') || '').split(' ');
          if (filterValue === 'all' || categories.includes(filterValue)) {
            card.style.display = 'block';
            card.style.opacity = '0';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transition = 'opacity 0.3s ease';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 6. Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.remove('opacity-0', 'invisible');
        backToTopBtn.classList.add('opacity-100', 'visible');
      } else {
        backToTopBtn.classList.add('opacity-0', 'invisible');
        backToTopBtn.classList.remove('opacity-100', 'visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 7. Contact Form Handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';

      // Submit via Formspree or Email mailto fallback
      const formData = new FormData(contactForm);
      const name = formData.get('name') || '';
      const email = formData.get('email') || '';
      const subject = formData.get('subject') || 'Portfolio Contact';
      const message = formData.get('message') || '';

      // Direct mailto trigger
      const mailtoUrl = `mailto:backend.sakhawat@gmail.com?subject=${encodeURIComponent(subject + ' - from ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;
      
      setTimeout(() => {
        window.location.href = mailtoUrl;
        window.showToast('Opening your email client to send message...', true);
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 600);
    });
  }
});
