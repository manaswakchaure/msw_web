document.getElementById('year').textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  document.querySelectorAll('.tilt').forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -7;
      const rotateY = ((x / rect.width) - 0.5) * 7;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  const heroPanel = document.querySelector('.hero-panel');
  if (heroPanel) {
    heroPanel.addEventListener('mousemove', (event) => {
      const rect = heroPanel.getBoundingClientRect();
      const ratio = (event.clientX - rect.left) / rect.width;
      const rotate = (ratio - 0.5) * 16;
      heroPanel.style.setProperty('--panel-rotate', `${rotate}deg`);
    });

    heroPanel.addEventListener('mouseleave', () => {
      heroPanel.style.setProperty('--panel-rotate', '0deg');
    });
  }

  const statusText = document.querySelector('.status-text');
  if (statusText) {
    const statuses = [
      'PROFILE SIGNAL ONLINE',
      'ROBOTIC CORE STABLE',
      'SENSORS CALIBRATED',
      'AUTONOMY MODE READY'
    ];
    let index = 0;
    setInterval(() => {
      index = (index + 1) % statuses.length;
      statusText.textContent = statuses[index];
    }, 2400);
  }
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.animate(
        [
          { opacity: 0, transform: 'translateY(28px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ],
        { duration: 700, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'both' }
      );
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section, .hero-panel, .card').forEach((element) => observer.observe(element));
