/* Basic interactive behaviour:
   - mobile hamburger toggle
   - simple scroll reveal for sections
   - smooth anchor focus
*/

document.addEventListener('DOMContentLoaded', () => {
  // Hamburger toggle
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');

  hamburger.addEventListener('click', () => {
    const opened = nav.style.display === 'flex';
    nav.style.display = opened ? '' : 'flex';
    nav.style.flexDirection = 'column';
    nav.style.gap = '12px';
    nav.style.padding = '12px';
    hamburger.classList.toggle('open');
  });

  // Smooth scrolling already via CSS scroll-behavior; enhance focus
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close navbar on mobile
        if (window.innerWidth <= 720 && nav.style.display === 'flex') {
          nav.style.display = '';
        }
      }
    });
  });

  // Simple intersection observer for reveal
  const items = document.querySelectorAll('.hero-left, .profile-wrap, .service, .about-text, .project-card, .contact-card, .contact-form');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        ent.target.style.transition = 'opacity .8s ease, transform .8s ease';
        ent.target.style.opacity = 1;
        ent.target.style.transform = 'translateY(0)';
        obs.unobserve(ent.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(it => {
    it.style.opacity = 0;
    it.style.transform = 'translateY(24px)';
    obs.observe(it);
  });

  // Replace with your own form handler / email integration
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thanks! Message sending not configured. Integrate email provider or backend.');
      form.reset();
    });
  }
});
