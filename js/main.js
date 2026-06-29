// =============================================
// PUREGYM REBUILD — MAIN JS
// =============================================

// Mobile nav toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileNavClose = document.getElementById('mobileNavClose');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });
}
if (mobileNavClose) {
  mobileNavClose.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });
}

// Scroll animations
const animateEls = document.querySelectorAll('[data-animate]');
if (animateEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), (entry.target.dataset.delay || 0) * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  animateEls.forEach(el => observer.observe(el));
}

// Gym tabs (gym detail page)
const gymTabs = document.querySelectorAll('.gym-tab');
const gymSections = document.querySelectorAll('.gym-tab-section');
if (gymTabs.length) {
  gymTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      gymTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.tab;
      gymSections.forEach(s => {
        s.style.display = s.id === target ? '' : 'none';
      });
    });
  });
}

// Filter buttons (classes page)
const filterBtns = document.querySelectorAll('.filter-btn');
const classCards = document.querySelectorAll('.class-card[data-category]');
if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      classCards.forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.category === cat) ? '' : 'none';
      });
    });
  });
}

// Active nav link
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  if (link.getAttribute('href') === currentPage) link.classList.add('active');
});

// Smooth count-up for stats
function countUp(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1500;
  const start = performance.now();
  const animate = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      countUp(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => statObserver.observe(el));

// Plan card selection
document.querySelectorAll('.plan-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.plan-card').forEach(c => c.classList.remove('featured'));
    card.classList.add('featured');
  });
});

// Announcement banner dismiss
const banner = document.querySelector('.announcement-banner');
const bannerClose = document.getElementById('bannerClose');
if (bannerClose && banner) {
  bannerClose.addEventListener('click', () => {
    banner.style.transition = 'height 0.3s ease, opacity 0.3s ease';
    banner.style.height = banner.offsetHeight + 'px';
    banner.offsetHeight; // reflow
    banner.style.height = '0';
    banner.style.opacity = '0';
    banner.style.overflow = 'hidden';
    setTimeout(() => banner.remove(), 300);
  });
}
