// ===== ANIMATED GRID CANVAS =====
const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let time = 0;
function drawGrid() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const spacing = 60;
  const cols = Math.ceil(canvas.width / spacing) + 1;
  const rows = Math.ceil(canvas.height / spacing) + 1;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = i * spacing;
      const y = j * spacing;
      const dist = Math.sqrt(Math.pow(x - canvas.width / 2, 2) + Math.pow(y - canvas.height / 2, 2));
      const wave = Math.sin(dist * 0.005 - time * 0.02) * 0.5 + 0.5;
      const alpha = wave * 0.12;
      ctx.beginPath();
      ctx.arc(x, y, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 130, 255, ${alpha})`;
      ctx.fill();
    }
  }
  time++;
  requestAnimationFrame(drawGrid);
}
drawGrid();

// ===== FLOATING PARTICLES =====
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 30; i++) {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.left = Math.random() * 100 + '%';
  particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
  particle.style.animationDelay = (Math.random() * 10) + 's';
  particle.style.width = (Math.random() * 3 + 1) + 'px';
  particle.style.height = particle.style.width;
  const colors = ['#6382ff', '#a855f7', '#22d3ee', '#34d399'];
  particle.style.background = colors[Math.floor(Math.random() * colors.length)];
  particlesContainer.appendChild(particle);
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(updateCounter);
    }
    requestAnimationFrame(updateCounter);
  });
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = { threshold: 0.2 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      if (entry.target.classList.contains('stats')) animateCounters();
    }
  });
}, observerOptions);

document.querySelectorAll('.stat-card, .feature-card, .endpoint-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});

document.querySelectorAll('.stats').forEach(el => observer.observe(el));

// ===== TYPING EFFECT FOR TERMINAL =====
const codeLines = document.querySelectorAll('.code-line');
codeLines.forEach((line, i) => {
  line.style.opacity = '0';
  line.style.transform = 'translateX(-10px)';
  setTimeout(() => {
    line.style.transition = 'all 0.4s ease';
    line.style.opacity = '1';
    line.style.transform = 'translateX(0)';
  }, 1200 + i * 200);
});
