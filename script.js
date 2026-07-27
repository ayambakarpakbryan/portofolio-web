// ============ ALWAYS START AT TOP ON REFRESH ============
// Browsers restore the previous scroll position by default on reload,
// which makes it feel "stuck" mid-page. Force it back to the top instead.
if('scrollRestoration' in history){
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
window.addEventListener('load', ()=>{ window.scrollTo(0, 0); });

// ============ LOADER ============
(function loader(){
  const loaderEl = document.getElementById('loader');
  const bar = document.getElementById('loaderBar');
  const pct = document.getElementById('loaderPct');
  let progress = 0;
  const interval = setInterval(()=>{
    progress += Math.random()*18;
    if(progress >= 100){
      progress = 100;
      clearInterval(interval);
      setTimeout(()=>{
        loaderEl.classList.add('done');
        document.body.style.overflow = '';
      }, 300);
    }
    bar.style.width = progress + '%';
    pct.textContent = Math.floor(progress) + '%';
  }, 140);
  document.body.style.overflow = 'hidden';
  setTimeout(()=>{ document.body.style.overflow = ''; }, 2200);
})();

// ============ CUSTOM CURSOR ============
(function cursor(){
  if(window.matchMedia('(max-width:900px)').matches) return;
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx=0,my=0,rx=0,ry=0;
  window.addEventListener('mousemove', e=>{
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx+'px'; dot.style.top = my+'px';
  });
  function animate(){
    rx += (mx-rx)*0.18; ry += (my-ry)*0.18;
    ring.style.left = rx+'px'; ring.style.top = ry+'px';
    requestAnimationFrame(animate);
  }
  animate();
  const hoverTargets = 'a, button, .tilt-card, .magnetic, input, textarea, .project-card';
  document.addEventListener('mouseover', e=>{
    if(e.target.closest(hoverTargets)) ring.classList.add('hover');
  });
  document.addEventListener('mouseout', e=>{
    if(e.target.closest(hoverTargets)) ring.classList.remove('hover');
  });
  document.addEventListener('mousedown', ()=> dot.style.transform='translate(-50%,-50%) scale(0.6)');
  document.addEventListener('mouseup', ()=> dot.style.transform='translate(-50%,-50%) scale(1)');
})();

// ============ MAGNETIC BUTTONS ============
(function magnetic(){
  if(window.matchMedia('(max-width:900px)').matches) return;
  document.querySelectorAll('.magnetic').forEach(el=>{
    el.addEventListener('mousemove', e=>{
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width/2;
      const y = e.clientY - r.top - r.height/2;
      el.style.transform = `translate(${x*0.25}px, ${y*0.35}px)`;
    });
    el.addEventListener('mouseleave', ()=>{ el.style.transform = ''; });
  });
})();

// ============ RIPPLE ON BUTTONS ============
document.querySelectorAll('.btn').forEach(btn=>{
  btn.addEventListener('click', function(e){
    const r = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = (e.clientX - r.left) + 'px';
    ripple.style.top = (e.clientY - r.top) + 'px';
    ripple.style.width = ripple.style.height = Math.max(r.width,r.height) + 'px';
    ripple.style.marginLeft = ripple.style.marginTop = -(Math.max(r.width,r.height)/2) + 'px';
    this.style.position = 'relative';
    this.appendChild(ripple);
    setTimeout(()=>ripple.remove(), 650);
  });
});

// ============ PARTICLES ============
(function particles(){
  const container = document.getElementById('particles');
  const count = window.matchMedia('(max-width:700px)').matches ? 14 : 30;
  for(let i=0;i<count;i++){
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random()*100 + '%';
    p.style.bottom = '-10px';
    p.style.animationDuration = (8 + Math.random()*10) + 's';
    p.style.animationDelay = (Math.random()*10) + 's';
    p.style.opacity = (0.2 + Math.random()*0.5);
    container.appendChild(p);
  }
})();

// ============ SCROLL PROGRESS + NAV STATE ============
(function scrollHandlers(){
  const progress = document.getElementById('scrollProgress');
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', ()=>{
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progress.style.width = scrolled + '%';
    nav.classList.toggle('scrolled', h.scrollTop > 40);
  }, {passive:true});
})();

// ============ MOBILE NAV ============
(function mobileNav(){
  const burger = document.getElementById('navBurger');
  const menu = document.getElementById('navMobile');
  burger.addEventListener('click', ()=>{
    menu.classList.toggle('open');
    burger.classList.toggle('open');
  });
  menu.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> menu.classList.remove('open')));
})();

// ============ REVEAL ON SCROLL ============
(function reveals(){
  const els = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.15, rootMargin:'0px 0px -60px 0px'});
  els.forEach(el=> io.observe(el));
})();

// ============ COUNTERS ============
(function counters(){
  const nums = document.querySelectorAll('[data-count]');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const decimals = parseInt(el.dataset.decimals || '0');
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();
      function tick(now){
        const p = Math.min((now-start)/duration, 1);
        const eased = 1 - Math.pow(1-p, 3);
        const val = target * eased;
        el.textContent = val.toFixed(decimals) + suffix;
        if(p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, {threshold:0.5});
  nums.forEach(el=> io.observe(el));
})();

// ============ SKILL BARS ============
(function skillBars(){
  const rows = document.querySelectorAll('.skill-row');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const fill = entry.target.querySelector('.skill-fill');
        fill.style.width = entry.target.dataset.pct + '%';
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.4});
  rows.forEach(r=> io.observe(r));
})();

// ============ TILT CARDS ============
(function tiltCards(){
  if(window.matchMedia('(max-width:900px)').matches) return;
  document.querySelectorAll('.tilt-card').forEach(card=>{
    card.addEventListener('mousemove', e=>{
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left)/r.width - 0.5;
      const y = (e.clientY - r.top)/r.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x*6}deg) rotateX(${-y*6}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', ()=>{ card.style.transform = ''; });
  });
})();

// ============ PROJECT CAROUSEL, DRAG TO SCROLL ============
(function carousel(){
  const track = document.getElementById('carouselTrack');
  const dotsWrap = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const cards = track.querySelectorAll('.project-card');

  cards.forEach((_, i)=>{
    const dot = document.createElement('span');
    if(i===0) dot.classList.add('active');
    dot.addEventListener('click', ()=>{
      cards[i].scrollIntoView({behavior:'smooth', inline:'start', block:'nearest'});
    });
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap.querySelectorAll('span');

  function cardStep(){
    return cards[0].offsetWidth + 24; // card width + gap
  }

  function updateNavState(){
    const maxScroll = track.scrollWidth - track.clientWidth - 4;
    prevBtn.classList.toggle('is-disabled', track.scrollLeft <= 4);
    nextBtn.classList.toggle('is-disabled', track.scrollLeft >= maxScroll);
  }

  prevBtn.addEventListener('click', ()=>{
    track.scrollBy({left: -cardStep(), behavior:'smooth'});
  });
  nextBtn.addEventListener('click', ()=>{
    track.scrollBy({left: cardStep(), behavior:'smooth'});
  });

  let isDown = false, startX, scrollLeft, moved = false;

  track.addEventListener('mousedown', e=>{
    isDown = true; moved = false;
    track.classList.add('grabbing');
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  });
  window.addEventListener('mouseup', ()=>{
    isDown = false;
    track.classList.remove('grabbing');
  });
  track.addEventListener('mouseleave', ()=>{
    isDown = false;
    track.classList.remove('grabbing');
  });
  track.addEventListener('mousemove', e=>{
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 1.4;
    if(Math.abs(walk) > 5) moved = true;
    track.scrollLeft = scrollLeft - walk;
  });
  // prevent click-through after a drag
  track.addEventListener('click', e=>{
    if(moved){ e.preventDefault(); e.stopPropagation(); }
  }, true);

  // touch handled natively via -webkit-overflow-scrolling / scroll-snap

  track.addEventListener('scroll', ()=>{
    const idx = Math.round(track.scrollLeft / cardStep());
    dots.forEach((d,i)=> d.classList.toggle('active', i===idx));
    updateNavState();
  }, {passive:true});

  window.addEventListener('resize', updateNavState);
  updateNavState();
})();

// ============ PROJECT MODAL ============
(function modal(){
  const overlay = document.getElementById('modalOverlay');
  const body = document.getElementById('modalBody');
  const closeBtn = document.getElementById('modalClose');

  const data = {
    "2": {
      title: "MJ Salon AIS System",
      role: "Full-Stack Developer",
      problem: "The salon was running its finances through manual spreadsheets, with no unified way to track daily service income, operational expenses, customer visits, or overall profitability.",
      solution: "Built a full web-based accounting information system with a real-time dashboard (daily & monthly revenue, expenses, net profit), a general ledger, categorized expense tracking with filters, and a customer database with visit and transaction history.",
      stack: ["PHP","MySQL","Chart.js","Accounting","Dashboard"],
      stats: [["Real-time","Dashboard"],["Expense","Categorization"],["Customer","Database"]]
    },
    "3": {
      title: "DVD Rental Dashboard",
      role: "Business Reporting",
      problem: "Raw rental transaction data sat in MySQL with no easy way for stakeholders to see rental trends or business performance.",
      solution: "Built an interactive Streamlit dashboard connected directly to the MySQL rental database, surfacing rental trends and key business metrics in real time.",
      stack: ["Streamlit","Python","MySQL","Dashboard"],
      stats: [["Real-time","Data"],["Trend","Analysis"],["Business","Metrics"]]
    },
    "4": {
      title: "Mattel Supply Chain: Dockerized Analytics",
      role: "Data Engineering Case Study",
      problem: "A Mattel-inspired supply chain case study needed an analytics stack that could run identically on any machine, without \"works on my laptop\" issues between ingestion, database and reporting layers.",
      solution: "Containerized every layer (ingestion script, MySQL database, and reporting app) with Docker, so the entire analytics pipeline spins up with a single command and stays fully reproducible.",
      stack: ["Docker","Docker Compose","Python","MySQL","Case Study"],
      stats: [["3","Containers"],["1-command","Deploy"],["100%","Reproducible"]]
    },
    "5": {
      title: "CyberAware: Cybercrime Education Platform",
      role: "Full-Stack Developer",
      problem: "Everyday internet users often can't recognize phishing, scams or social-engineering attempts until it's too late, and most existing resources are too technical to be useful.",
      solution: "Built a public education website with plain-language articles, interactive quizzes and breakdowns of real scam patterns, backed by a PHP/MySQL CMS so content stays easy to update.",
      stack: ["PHP","MySQL","Content CMS","Security Awareness"],
      stats: [["Quiz","Modules"],["Real-case","Breakdowns"],["CMS","Backed"]]
    },
    "6": {
      title: "SwipeJob",
      role: "Product & Backend Concept",
      problem: "Traditional job platforms feel like a chore to browse: long lists, heavy filters, low engagement, closer to a spreadsheet than an experience people actually enjoy using.",
      solution: "Reimagined job hunting as a swipe interface: swipe right to apply, left to pass, backed by a matching engine and database schema that pairs candidates with roles based on fit.",
      stack: ["Mobile UX","Database Design","Matching Engine","API"],
      stats: [["Swipe","Interface"],["Match","Engine"],["Candidate–Role","Pairing"]]
    }
  };

  document.querySelectorAll('.project-expand').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const d = data[btn.dataset.open];
      if(!d) return;
      body.innerHTML = `
        <h3>${d.title}</h3>
        <div class="modal-role">${d.role}</div>
        <div class="modal-stats">
          ${d.stats.map(s=>`<div class="modal-stat"><div class="num">${s[0]}</div><div class="label">${s[1]}</div></div>`).join('')}
        </div>
        <div class="modal-section"><h4>Problem</h4><p>${d.problem}</p></div>
        <div class="modal-section"><h4>Solution</h4><p>${d.solution}</p></div>
        <div class="modal-badges">${d.stack.map(s=>`<span class="badge">${s}</span>`).join('')}</div>
        <div class="modal-links">
          <a href="https://github.com/ayambakarpakbryan" target="_blank" rel="noopener" class="btn btn-sm btn-ghost magnetic"><span>GitHub</span></a>
        </div>
      `;
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function close(){
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e=>{ if(e.target === overlay) close(); });
  document.addEventListener('keydown', e=>{ if(e.key === 'Escape') close(); });
})();

// ============ SCREENSHOT LIGHTBOX ============
(function lightbox(){
  const overlay = document.getElementById('lightboxOverlay');
  const track = document.getElementById('lightboxTrack');
  const dotsWrap = document.getElementById('lightboxDots');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  const stage = document.getElementById('lightboxStage');

  // Placeholder "screenshot" slides per project, swap these for real screenshots later.
  const shots = {
    "2": [
      {label:"Dashboard overview", html:`<div class="mock-window mock-window-wide"><div class="mock-dots"><span></span><span></span><span></span></div><div class="mock-dash"><div class="mock-kpi"></div><div class="mock-kpi"></div><div class="mock-bars"><span style="height:45%"></span><span style="height:75%"></span><span style="height:30%"></span><span style="height:60%"></span></div></div></div>`},
      {label:"Operational expenses", html:`<div class="mock-window mock-window-wide"><div class="mock-dots"><span></span><span></span><span></span></div><div class="mock-table"><div class="mock-row"></div><div class="mock-row"></div><div class="mock-row"></div><div class="mock-row"></div></div></div>`},
      {label:"Customer database", html:`<div class="mock-window mock-window-wide"><div class="mock-dots"><span></span><span></span><span></span></div><div class="mock-lines"><div class="mock-line w80"></div><div class="mock-line w60"></div><div class="mock-line w80"></div></div></div>`}
    ],
    "3": [
      {label:"Rental trends overview", html:`<div class="mock-window mock-window-wide"><div class="mock-dots"><span></span><span></span><span></span></div><div class="mock-dash"><div class="mock-kpi"></div><div class="mock-bars"><span style="height:40%"></span><span style="height:70%"></span><span style="height:55%"></span><span style="height:90%"></span></div></div></div>`},
      {label:"Streamlit filters", html:`<div class="mock-window mock-window-wide"><div class="mock-dots"><span></span><span></span><span></span></div><div class="mock-lines"><div class="mock-line w60"></div><div class="mock-line w80"></div></div></div>`}
    ],
    "4": [
      {label:"Docker container stack", html:`<div class="mock-window mock-window-wide"><div class="mock-dots"><span></span><span></span><span></span></div><div class="mock-docker"><div class="docker-stack"><div class="docker-box">app</div><div class="docker-box">api</div><div class="docker-box">db</div></div><div class="docker-arrow">→</div><div class="docker-whale">🐳</div></div></div>`},
      {label:"docker-compose pipeline", html:`<div class="mock-window mock-window-wide"><div class="mock-dots"><span></span><span></span><span></span></div><div class="mock-lines"><div class="mock-line w80"></div><div class="mock-line w60"></div><div class="mock-line w80"></div></div></div>`},
      {label:"Mattel case study report", html:`<div class="mock-window mock-window-wide"><div class="mock-dots"><span></span><span></span><span></span></div><div class="mock-dash"><div class="mock-kpi"></div><div class="mock-bars"><span style="height:60%"></span><span style="height:45%"></span><span style="height:85%"></span></div></div></div>`}
    ],
    "5": [
      {label:"Homepage & articles", html:`<div class="mock-window mock-window-wide"><div class="mock-dots"><span></span><span></span><span></span></div><div class="mock-shield"><div class="shield-icon">🛡</div><div class="mock-line w80"></div><div class="mock-line w60"></div></div></div>`},
      {label:"Scam-recognition quiz", html:`<div class="mock-window mock-window-wide"><div class="mock-dots"><span></span><span></span><span></span></div><div class="mock-shield"><div class="shield-tags"><span></span><span></span><span></span></div><div class="mock-line w80"></div></div></div>`},
      {label:"Admin CMS panel", html:`<div class="mock-window mock-window-wide"><div class="mock-dots"><span></span><span></span><span></span></div><div class="mock-table"><div class="mock-row"></div><div class="mock-row"></div></div></div>`}
    ],
    "6": [
      {label:"Swipe-to-apply cards", html:`<div class="mock-phone"><div class="mock-swipe-card sc-back"></div><div class="mock-swipe-card sc-front"><div class="sc-avatar"></div><div class="mock-line w60" style="margin:10px auto 0;"></div><div class="mock-line w80" style="margin:6px auto 0;"></div></div></div>`},
      {label:"Match notification", html:`<div class="mock-window"><div class="mock-dots"><span></span><span></span><span></span></div><div class="mock-lines"><div class="mock-line w60"></div><div class="mock-line w80"></div></div></div>`},
      {label:"Candidate–role matching engine", html:`<div class="mock-window mock-window-wide"><div class="mock-dots"><span></span><span></span><span></span></div><div class="mock-dash"><div class="mock-kpi"></div><div class="mock-bars"><span style="height:70%"></span><span style="height:50%"></span><span style="height:85%"></span></div></div></div>`}
    ]
  };

  let current = [];
  let index = 0;

  function render(id){
    current = shots[id] || [];
    index = 0;
    track.innerHTML = current.map(s => `<div class="lightbox-slide">${s.html}<span class="slide-label">${s.label}</span></div>`).join('');
    dotsWrap.innerHTML = '';
    current.forEach((_, i)=>{
      const d = document.createElement('span');
      if(i===0) d.classList.add('active');
      d.addEventListener('click', ()=> goTo(i));
      dotsWrap.appendChild(d);
    });
    update();
  }

  function update(){
    track.style.transform = `translateX(-${index*100}%)`;
    dotsWrap.querySelectorAll('span').forEach((d,i)=> d.classList.toggle('active', i===index));
  }
  function goTo(i){
    index = Math.max(0, Math.min(current.length-1, i));
    update();
  }

  document.querySelectorAll('.project-media').forEach(media=>{
    media.addEventListener('click', ()=>{
      const id = media.dataset.shots;
      if(!id || !shots[id]) return;
      render(id);
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function close(){
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e=>{ if(e.target === overlay) close(); });
  prevBtn.addEventListener('click', ()=> goTo(index-1));
  nextBtn.addEventListener('click', ()=> goTo(index+1));
  document.addEventListener('keydown', e=>{
    if(!overlay.classList.contains('open')) return;
    if(e.key === 'Escape') close();
    if(e.key === 'ArrowRight') goTo(index+1);
    if(e.key === 'ArrowLeft') goTo(index-1);
  });

  // drag / swipe within lightbox
  let isDown=false, startX=0, dragged=false;
  stage.addEventListener('mousedown', e=>{
    isDown = true; dragged=false; startX = e.clientX;
    track.classList.add('grabbing');
  });
  window.addEventListener('mouseup', e=>{
    if(!isDown) return;
    isDown = false;
    track.classList.remove('grabbing');
    if(dragged){
      const dx = e.clientX - startX;
      if(dx < -50) goTo(index+1);
      else if(dx > 50) goTo(index-1);
      else update();
    }
  });
  stage.addEventListener('mousemove', e=>{
    if(!isDown) return;
    if(Math.abs(e.clientX - startX) > 5) dragged = true;
  });
  // touch swipe
  let touchStartX = 0;
  stage.addEventListener('touchstart', e=>{ touchStartX = e.touches[0].clientX; }, {passive:true});
  stage.addEventListener('touchend', e=>{
    const dx = e.changedTouches[0].clientX - touchStartX;
    if(dx < -50) goTo(index+1);
    else if(dx > 50) goTo(index-1);
  }, {passive:true});
})();

// ============ NOW PLAYING AUDIO ============
(function nowPlaying(){
  const audio = document.getElementById('npAudio');
  const btn = document.getElementById('npPlayBtn');
  const icon = document.getElementById('npPlayIcon');
  const bars = document.getElementById('npBars');
  if(!audio || !btn) return;

  audio.loop = true;
  audio.volume = 0.3;
  audio.preload = 'auto';

  btn.addEventListener('click', ()=>{
    if(audio.paused){
      audio.play().catch(()=>{});
    } else {
      audio.pause();
    }
  });

  audio.addEventListener('play', ()=>{
    icon.textContent = '❚❚';
    btn.classList.add('playing');
    bars.classList.add('playing');
  });
  audio.addEventListener('pause', ()=>{
    icon.textContent = '▶';
    btn.classList.remove('playing');
    bars.classList.remove('playing');
  });
})();

// ============ FOOTER YEAR ============
document.getElementById('footerYear').textContent = new Date().getFullYear();
