
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`;
});

// Rain animation
const canvas = document.getElementById('rain-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const drops = Array.from({ length: 80 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  len: Math.random() * 18 + 8,
  speed: Math.random() * 3 + 2,
  opacity: Math.random() * 0.5 + 0.1,
  width: Math.random() < 0.3 ? 1.5 : 0.8
}));

function drawRain() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drops.forEach(d => {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(201, 168, 76, ${d.opacity})`;
    ctx.lineWidth = d.width;
    ctx.moveTo(d.x, d.y);
    ctx.lineTo(d.x - 1, d.y + d.len);
    ctx.stroke();
    d.y += d.speed;
    if (d.y > canvas.height + 20) {
      d.y = -20;
      d.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(drawRain);
}
drawRain();

// ── Terminal ──
const termBody  = document.getElementById('termBody');
const termInput = document.getElementById('termInput');

const COMMANDS = {
  help: [
    '<span class="t-gold">Available commands:</span>',
    '  <span class="t-cyan">about</span>       — who I am',
    '  <span class="t-cyan">skills</span>      — tech stack',
    '  <span class="t-cyan">projects</span>    — what I\'ve built',
    '  <span class="t-cyan">experience</span>  — work history',
    '  <span class="t-cyan">achievements</span>— milestones',
    '  <span class="t-cyan">contact</span>     — reach me',
    '  <span class="t-cyan">github</span>      — open my github',
    '  <span class="t-cyan">clear</span>       — clear terminal',
  ],
  about: [
    '<span class="t-gold">Prince Raj</span> — Full Stack Developer',
    'ECE undergrad @ NIT Nagaland (2023–2027)',
    'I build scalable systems and conquer algorithmic arenas.',
    'Competitive programmer by habit, engineer by craft.',
  ],
  skills: [
    '<span class="t-gold">Frontend:</span>  React.js, HTML5, CSS3, Tailwind',
    '<span class="t-gold">Backend:</span>   Node.js, Express, FastAPI, Flask',
    '<span class="t-gold">Database:</span>  MongoDB, MySQL, SQLite',
    '<span class="t-gold">DevOps:</span>    Docker, Git, JWT, OAuth',
    '<span class="t-gold">AI/ML:</span>     Scikit-learn, Pandas, NumPy',
  ],
  projects: [
    '<span class="t-gold">1.</span> Smart Attendance App   — MERN + ML prediction',
    '<span class="t-gold">2.</span> Code Critic            — AI code review (Gemini)',
    '<span class="t-gold">3.</span> Checkmate Blitz        — Real-time chess (MERN)',
    '<span class="t-gold">4.</span> Career Copilot         — AI career guidance',
    '<span class="t-gold">5.</span> Shinobi Clash          — Anime game (Canvas)',
    '<span class="t-dim">→ Scroll to #projects for full details</span>',
  ],
  experience: [
    '<span class="t-gold">ISKCON Manipur</span>      Aug–Nov 2025 · Full Stack Intern',
    '<span class="t-gold">Besto Solutions</span>     Dec 2024–Feb 2025 · Full Stack Intern',
    '<span class="t-gold">Ekarikthin</span>          Nov 2024–Feb 2025 · Lead Web Dev',
  ],
  achievements: [
    '⚔️  <span class="t-gold">LeetCode Knight</span> — 1900 rating, top ~4% globally',
    '🎯  <span class="t-gold">Codeforces Specialist</span> — 1544 rating',
    '🧮  <span class="t-gold">800+ problems</span> solved across platforms',
    '🏆  <span class="t-gold">SIH 2025 — 1st Place</span> NIT Nagaland Hackathon',
  ],
  contact: [
    '📧  <span class="t-gold">Email:</span>    Pr273582@gmail.com',
    '🐙  <span class="t-gold">GitHub:</span>   github.com/princerxj',
    '💼  <span class="t-gold">LinkedIn:</span> linkedin.com/in/princerxj',
  ],
  github: ['<span class="t-green">Opening github.com/princerxj ...</span>'],
  whoami: ['<span class="t-gold">prince</span> — shinobi developer, NIT Nagaland'],
  ls:     ['about  skills  projects  experience  achievements  contact'],
  pwd:    ['<span class="t-gold">/home/prince/portfolio</span>'],
  date:   ['<span class="t-gold">' + new Date().toDateString() + '</span>'],
};

function addLine(html, cls = '') {
  const div = document.createElement('div');
  div.className = 'term-line' + (cls ? ' ' + cls : '');
  div.innerHTML = html;
  termBody.appendChild(div);
  termBody.scrollTop = termBody.scrollHeight;
}

function runCommand(raw) {
  const cmd = raw.trim().toLowerCase();
  addLine('<span class="t-gold">prince@portfolio:~$</span> ' + raw);
  if (!cmd) return;

  if (cmd === 'clear') {
    termBody.innerHTML = '';
    return;
  }
  if (cmd === 'github') {
    window.open('https://github.com/princerxj', '_blank');
  }
  const lines = COMMANDS[cmd];
  if (lines) {
    lines.forEach(l => addLine(l));
  } else {
    addLine('<span class="t-red">command not found: ' + cmd + '</span> — try <span class="t-gold">help</span>');
  }
  addLine('&nbsp;');
}

// Typewriter boot sequence
const bootLines = [
  { text: '$ initializing shinobi.os ...', cls: 't-dim', delay: 0 },
  { text: '$ loading jutsu modules ......', cls: 't-dim', delay: 400 },
  { text: '✓ <span class="t-green">system ready</span>', delay: 900 },
  { text: '&nbsp;', delay: 1100 },
  { text: 'Type <span class="t-gold">help</span> to begin.', delay: 1200 },
  { text: '&nbsp;', delay: 1300 },
];

termBody.innerHTML = '';
bootLines.forEach(({ text, cls, delay }) => {
  setTimeout(() => addLine(text, cls || ''), delay);
});

termInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const val = termInput.value;
    termInput.value = '';
    runCommand(val);
  }
});

// Click anywhere on terminal to focus input
document.querySelector('.anime-terminal').addEventListener('click', () => termInput.focus());

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 100 * (entry.target.dataset.delay || 0));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.timeline-item, .project-card, .ach-item').forEach((el, i) => {
  el.dataset.delay = i % 3;
  observer.observe(el);
});

// Smooth nav active states
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 200) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current
      ? 'var(--paper)' : '';
  });
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinksMenu.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinksMenu.classList.remove('active');
  });
});

/*
      Robot eyes script
      - pupils follow the cursor position
      - pointer-events for overlay set to none so it doesn't prevent clicks
      - smooth movement using requestAnimationFrame and linear interpolation
    */

    (function(){
      const eyes = [
        { eye: document.getElementById('eye-left'), pupil: document.getElementById('pupil-left') },
        { eye: document.getElementById('eye-right'), pupil: document.getElementById('pupil-right') }
      ];

      let mouseX = window.innerWidth / 2;
      let mouseY = window.innerHeight / 2;

      const smooth = 0.18;

      const state = eyes.map(()=>({x:0,y:0}));

      function getCenterRect(rect){
        return { cx: rect.left + rect.width / 2, cy: rect.top + rect.height / 2 };
      }
      function handleMove(e){
        mouseX = e.clientX ?? (e.touches && e.touches[0].clientX) ?? mouseX;
        mouseY = e.clientY ?? (e.touches && e.touches[0].clientY) ?? mouseY;
      }

      window.addEventListener('mousemove', handleMove, {passive:true});
      window.addEventListener('touchmove', handleMove, {passive:true});
      window.addEventListener('mouseleave', ()=>{
        mouseX = window.innerWidth / 2;
        mouseY = window.innerHeight / 2;
      });

      function animate(){
        eyes.forEach((item, idx) => {
          const eyeRect = item.eye.getBoundingClientRect();
          const center = getCenterRect(eyeRect);
          let dx = mouseX - center.cx;
          let dy = mouseY - center.cy;
          const dist = Math.hypot(dx, dy) || 1;

          const eyeRadius = Math.min(eyeRect.width, eyeRect.height) / 2;
          const pupilRadius = parseFloat(getComputedStyle(item.pupil).width) / 2 || (eyeRadius * 0.25);
          const maxOffset = Math.max(eyeRadius - pupilRadius - 6, 6);

          const nx = dx / dist;
          const ny = dy / dist;

          const targetX = nx * Math.min(dist, maxOffset);
          const targetY = ny * Math.min(dist, maxOffset);

          state[idx].x += (targetX - state[idx].x) * smooth;
          state[idx].y += (targetY - state[idx].y) * smooth;

          item.pupil.style.transform = `translate3d(${state[idx].x}px, ${state[idx].y}px, 0)`;
        });

        requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
      window.robotEyes = {
        setSize(px){ document.documentElement.style.setProperty('--eye-size', px + 'px'); },
        setPupil(px){ document.documentElement.style.setProperty('--pupil-size', px + 'px'); }
      };

    })();