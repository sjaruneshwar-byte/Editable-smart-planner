/* ============================================================
   SDE Roadmap Tracker — app.js
   Works in two modes:
   1. STANDALONE (default): uses localStorage only — just open index.html in a browser
   2. SERVER mode: set USE_API = true and run the backend (backend/server.js)
      then data is saved to the server's data/ folder instead
   ============================================================ */

const USE_API    = false;              // ← set true when running with the backend
const API_BASE   = 'http://localhost:3000/api';  // ← backend URL

// ── API helpers (used when USE_API = true) ──────────────────
async function apiGet(path) {
  const r = await fetch(API_BASE + path);
  return r.json();
}
async function apiPost(path, body) {
  await fetch(API_BASE + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
}

// ===== DATA =====
const PLAN = [
  {date:"2026-04-17",day:"Friday",week:"W1",phase:"Foundation",dsa:"Arrays (LeetCode)",dsaH:2,java:"Java Basics (syntax, variables, data types)",javaH:2,dev:"UI",devH:1.5,cyber:"TryHackMe",cyberH:1.5,cs:"CN",csH:1,total:8},
  {date:"2026-04-18",day:"Saturday",week:"W1",phase:"Foundation",dsa:"Strings (LeetCode)",dsaH:2,java:"Operators & Input/Output",javaH:2,dev:"Task App",devH:1.5,cyber:"SQLi",cyberH:1.5,cs:"OOP Concepts",csH:1,total:8},
  {date:"2026-04-19",day:"Sunday",week:"W1",phase:"Foundation",dsa:"Recursion (HackerRank)",dsaH:2,java:"Control Statements (if, switch, loops)",javaH:2,dev:"Backend",devH:1.5,cyber:"XSS",cyberH:1.5,cs:"SQL",csH:1,total:8},
  {date:"2026-04-20",day:"Monday",week:"W1",phase:"Foundation",dsa:"Sorting (CodeChef)",dsaH:2,java:"Functions & Methods",javaH:2,dev:"Upgrade",devH:1.5,cyber:"BurpSuite",cyberH:1.5,cs:"Threads",csH:1,total:8},
  {date:"2026-04-21",day:"Tuesday",week:"W1",phase:"Foundation",dsa:"Searching (LeetCode)",dsaH:2,java:"Arrays",javaH:2,dev:"Deploy",devH:1.5,cyber:"CTF",cyberH:1.5,cs:"Revision",csH:1,total:8},
  {date:"2026-04-22",day:"Wednesday",week:"W1",phase:"Foundation",dsa:"Linked List (LeetCode)",dsaH:2,java:"Strings",javaH:2,dev:"HTML/CSS",devH:1.5,cyber:"Networking",cyberH:1.5,cs:"OS",csH:1,total:8},
  {date:"2026-04-23",day:"Thursday",week:"W1",phase:"Foundation",dsa:"Stack (HackerRank)",dsaH:2,java:"OOP: Classes & Objects",javaH:2,dev:"JavaScript",devH:1.5,cyber:"Linux",cyberH:1.5,cs:"DBMS",csH:1,total:8},
  {date:"2026-04-24",day:"Friday",week:"W2",phase:"Foundation",dsa:"Queue (HackerRank)",dsaH:2,java:"OOP: Inheritance",javaH:2,dev:"UI",devH:1.5,cyber:"TryHackMe",cyberH:1.5,cs:"CN",csH:1,total:8},
  {date:"2026-04-25",day:"Saturday",week:"W2",phase:"Foundation",dsa:"Hashing (LeetCode)",dsaH:2,java:"OOP: Polymorphism",javaH:2,dev:"Task App",devH:1.5,cyber:"SQLi",cyberH:1.5,cs:"OOP Concepts",csH:1,total:8},
  {date:"2026-04-26",day:"Sunday",week:"W2",phase:"Foundation",dsa:"Two Pointers (LeetCode)",dsaH:2,java:"OOP: Encapsulation & Abstraction",javaH:2,dev:"Backend",devH:1.5,cyber:"XSS",cyberH:1.5,cs:"SQL",csH:1,total:8},
  {date:"2026-04-27",day:"Monday",week:"W2",phase:"Foundation",dsa:"Sliding Window (LeetCode)",dsaH:2,java:"Constructors",javaH:2,dev:"Upgrade",devH:1.5,cyber:"BurpSuite",cyberH:1.5,cs:"Threads",csH:1,total:8},
  {date:"2026-04-28",day:"Tuesday",week:"W2",phase:"Foundation",dsa:"Binary Search (CodeChef)",dsaH:2,java:"Exception Handling",javaH:2,dev:"Deploy",devH:1.5,cyber:"CTF",cyberH:1.5,cs:"Revision",csH:1,total:8},
  {date:"2026-04-29",day:"Wednesday",week:"W2",phase:"Foundation",dsa:"Trees Basics (LeetCode)",dsaH:2,java:"Collections Framework Basics",javaH:2,dev:"HTML/CSS",devH:1.5,cyber:"Networking",cyberH:1.5,cs:"OS",csH:1,total:8},
  {date:"2026-04-30",day:"Thursday",week:"W2",phase:"Foundation",dsa:"Binary Trees (LeetCode)",dsaH:2,java:"List, Set, Map Deep Dive",javaH:2,dev:"JavaScript",devH:1.5,cyber:"Linux",cyberH:1.5,cs:"DBMS",csH:1,total:8},
  {date:"2026-05-01",day:"Friday",week:"W3",phase:"Momentum",dsa:"BST (LeetCode)",dsaH:2,java:"Generics",javaH:2,dev:"UI",devH:1.5,cyber:"TryHackMe",cyberH:1.5,cs:"CN",csH:1,total:8},
  {date:"2026-05-02",day:"Saturday",week:"W3",phase:"Momentum",dsa:"Heaps (CodeChef)",dsaH:2,java:"File Handling",javaH:2,dev:"Task App",devH:1.5,cyber:"SQLi",cyberH:1.5,cs:"OOP Concepts",csH:1,total:8},
  {date:"2026-05-03",day:"Sunday",week:"W3",phase:"Momentum",dsa:"Graphs Basics (LeetCode)",dsaH:2,java:"Multithreading Basics",javaH:2,dev:"Backend",devH:1.5,cyber:"XSS",cyberH:1.5,cs:"SQL",csH:1,total:8},
  {date:"2026-05-04",day:"Monday",week:"W3",phase:"Momentum",dsa:"BFS/DFS (LeetCode)",dsaH:2,java:"Advanced Multithreading",javaH:2,dev:"Upgrade",devH:1.5,cyber:"BurpSuite",cyberH:1.5,cs:"Threads",csH:1,total:8},
  {date:"2026-05-05",day:"Tuesday",week:"W3",phase:"Momentum",dsa:"Dynamic Programming Basics (LeetCode)",dsaH:2,java:"Streams API",javaH:2,dev:"Deploy",devH:1.5,cyber:"CTF",cyberH:1.5,cs:"Revision",csH:1,total:8},
  {date:"2026-05-06",day:"Wednesday",week:"W3",phase:"Momentum",dsa:"Advanced DP (LeetCode)",dsaH:2,java:"Lambda Expressions",javaH:2,dev:"HTML/CSS",devH:1.5,cyber:"Networking",cyberH:1.5,cs:"OS",csH:1,total:8},
  {date:"2026-05-07",day:"Thursday",week:"W3",phase:"Momentum",dsa:"Backtracking (LeetCode)",dsaH:2,java:"JDBC Basics",javaH:2,dev:"JavaScript",devH:1.5,cyber:"Linux",cyberH:1.5,cs:"DBMS",csH:1,total:8},
  {date:"2026-05-08",day:"Friday",week:"W4",phase:"Momentum",dsa:"Mock Practice (Mixed Platforms)",dsaH:2,java:"Mini Project (Java App)",javaH:2,dev:"UI",devH:1.5,cyber:"TryHackMe",cyberH:1.5,cs:"CN",csH:1,total:8},
  {date:"2026-05-09",day:"Saturday",week:"W4",phase:"Momentum",dsa:"LinkedList",dsaH:2,java:"Polymorphism",javaH:2,dev:"Task App",devH:1.5,cyber:"SQLi",cyberH:1.5,cs:"OOP Concepts",csH:1,total:8},
  {date:"2026-05-10",day:"Sunday",week:"W4",phase:"Momentum",dsa:"Stack/Queue",dsaH:2,java:"Collections",javaH:2,dev:"Backend",devH:1.5,cyber:"XSS",cyberH:1.5,cs:"SQL",csH:1,total:8},
  {date:"2026-05-11",day:"Monday",week:"W4",phase:"Momentum",dsa:"Hashing",dsaH:2,java:"Exception",javaH:2,dev:"Upgrade",devH:1.5,cyber:"BurpSuite",cyberH:1.5,cs:"Threads",csH:1,total:8},
  {date:"2026-05-12",day:"Tuesday",week:"W4",phase:"Momentum",dsa:"Recursion",dsaH:2,java:"Streams",javaH:2,dev:"Deploy",devH:1.5,cyber:"CTF",cyberH:1.5,cs:"Revision",csH:1,total:8},
  {date:"2026-05-13",day:"Wednesday",week:"W4",phase:"Momentum",dsa:"Arrays",dsaH:2,java:"OOP",javaH:2,dev:"HTML/CSS",devH:1.5,cyber:"Networking",cyberH:1.5,cs:"OS",csH:1,total:8},
  {date:"2026-05-14",day:"Thursday",week:"W4",phase:"Momentum",dsa:"Strings",dsaH:2,java:"Classes",javaH:2,dev:"JavaScript",devH:1.5,cyber:"Linux",cyberH:1.5,cs:"DBMS",csH:1,total:8},
  {date:"2026-05-15",day:"Friday",week:"W4",phase:"Momentum",dsa:"Sorting",dsaH:2,java:"Inheritance",javaH:2,dev:"UI",devH:1.5,cyber:"TryHackMe",cyberH:1.5,cs:"CN",csH:1,total:8},
  {date:"2026-05-16",day:"Saturday",week:"W5",phase:"Skill Building",dsa:"LinkedList",dsaH:2,java:"Polymorphism",javaH:2,dev:"Task App",devH:1.5,cyber:"SQLi",cyberH:1.5,cs:"OOP Concepts",csH:1,total:8},
  {date:"2026-05-17",day:"Sunday",week:"W5",phase:"Skill Building",dsa:"Stack/Queue",dsaH:2,java:"Collections",javaH:2,dev:"Backend",devH:1.5,cyber:"XSS",cyberH:1.5,cs:"SQL",csH:1,total:8},
  {date:"2026-05-18",day:"Monday",week:"W5",phase:"Skill Building",dsa:"Hashing",dsaH:2,java:"Exception",javaH:2,dev:"Upgrade",devH:1.5,cyber:"BurpSuite",cyberH:1.5,cs:"Threads",csH:1,total:8},
  {date:"2026-05-19",day:"Tuesday",week:"W5",phase:"Skill Building",dsa:"Recursion",dsaH:2,java:"Streams",javaH:2,dev:"Deploy",devH:1.5,cyber:"CTF",cyberH:1.5,cs:"Revision",csH:1,total:8},
  {date:"2026-05-20",day:"Wednesday",week:"W5",phase:"Skill Building",dsa:"Arrays",dsaH:2,java:"OOP",javaH:2,dev:"HTML/CSS",devH:1.5,cyber:"Networking",cyberH:1.5,cs:"OS",csH:1,total:8},
  {date:"2026-05-21",day:"Thursday",week:"W5",phase:"Skill Building",dsa:"Strings",dsaH:2,java:"Classes",javaH:2,dev:"JavaScript",devH:1.5,cyber:"Linux",cyberH:1.5,cs:"DBMS",csH:1,total:8},
  {date:"2026-05-22",day:"Friday",week:"W6",phase:"Skill Building",dsa:"Sorting",dsaH:2,java:"Inheritance",javaH:2,dev:"UI",devH:1.5,cyber:"TryHackMe",cyberH:1.5,cs:"CN",csH:1,total:8},
  {date:"2026-05-23",day:"Saturday",week:"W6",phase:"Skill Building",dsa:"LinkedList",dsaH:2,java:"Polymorphism",javaH:2,dev:"Task App",devH:1.5,cyber:"SQLi",cyberH:1.5,cs:"OOP Concepts",csH:1,total:8},
  {date:"2026-05-24",day:"Sunday",week:"W6",phase:"Skill Building",dsa:"Stack/Queue",dsaH:2,java:"Collections",javaH:2,dev:"Backend",devH:1.5,cyber:"XSS",cyberH:1.5,cs:"SQL",csH:1,total:8},
  {date:"2026-05-25",day:"Monday",week:"W6",phase:"Skill Building",dsa:"Hashing",dsaH:2,java:"Exception",javaH:2,dev:"Upgrade",devH:1.5,cyber:"BurpSuite",cyberH:1.5,cs:"Threads",csH:1,total:8},
  {date:"2026-05-26",day:"Tuesday",week:"W6",phase:"Skill Building",dsa:"Recursion",dsaH:2,java:"Streams",javaH:2,dev:"Deploy",devH:1.5,cyber:"CTF",cyberH:1.5,cs:"Revision",csH:1,total:8},
  {date:"2026-05-27",day:"Wednesday",week:"W6",phase:"Skill Building",dsa:"Arrays",dsaH:2,java:"OOP",javaH:2,dev:"HTML/CSS",devH:1.5,cyber:"Networking",cyberH:1.5,cs:"OS",csH:1,total:8},
  {date:"2026-05-28",day:"Thursday",week:"W6",phase:"Skill Building",dsa:"Strings",dsaH:2,java:"Classes",javaH:2,dev:"JavaScript",devH:1.5,cyber:"Linux",cyberH:1.5,cs:"DBMS",csH:1,total:8},
  {date:"2026-06-08",day:"Monday",week:"W8",phase:"Polish",dsa:"Sorting",dsaH:2,java:"Inheritance",javaH:2,dev:"UI",devH:1.5,cyber:"TryHackMe",cyberH:1.5,cs:"CN",csH:1,total:8},
  {date:"2026-06-09",day:"Tuesday",week:"W8",phase:"Polish",dsa:"LinkedList",dsaH:2,java:"Polymorphism",javaH:2,dev:"Task App",devH:1.5,cyber:"SQLi",cyberH:1.5,cs:"OOP Concepts",csH:1,total:8},
  {date:"2026-06-10",day:"Wednesday",week:"W8",phase:"Polish",dsa:"Stack/Queue",dsaH:2,java:"Collections",javaH:2,dev:"Backend",devH:1.5,cyber:"XSS",cyberH:1.5,cs:"SQL",csH:1,total:8},
  {date:"2026-06-11",day:"Thursday",week:"W8",phase:"Polish",dsa:"Hashing",dsaH:2,java:"Exception",javaH:2,dev:"Upgrade",devH:1.5,cyber:"BurpSuite",cyberH:1.5,cs:"Threads",csH:1,total:8},
  {date:"2026-06-12",day:"Friday",week:"W9",phase:"Polish",dsa:"Recursion",dsaH:2,java:"Streams",javaH:2,dev:"Deploy",devH:1.5,cyber:"CTF",cyberH:1.5,cs:"Revision",csH:1,total:8},
  {date:"2026-06-13",day:"Saturday",week:"W9",phase:"Polish",dsa:"Arrays",dsaH:2,java:"OOP",javaH:2,dev:"HTML/CSS",devH:1.5,cyber:"Networking",cyberH:1.5,cs:"OS",csH:1,total:8},
  {date:"2026-06-14",day:"Sunday",week:"W9",phase:"Polish",dsa:"Strings",dsaH:2,java:"Classes",javaH:2,dev:"JavaScript",devH:1.5,cyber:"Linux",cyberH:1.5,cs:"DBMS",csH:1,total:8},
  {date:"2026-06-15",day:"Monday",week:"W9",phase:"Polish",dsa:"Sorting",dsaH:2,java:"Inheritance",javaH:2,dev:"UI",devH:1.5,cyber:"TryHackMe",cyberH:1.5,cs:"CN",csH:1,total:8},
  {date:"2026-06-16",day:"Tuesday",week:"W9",phase:"Polish",dsa:"LinkedList",dsaH:2,java:"Polymorphism",javaH:2,dev:"Task App",devH:1.5,cyber:"SQLi",cyberH:1.5,cs:"OOP Concepts",csH:1,total:8},
  {date:"2026-06-17",day:"Wednesday",week:"W9",phase:"Polish",dsa:"Stack/Queue",dsaH:2,java:"Collections",javaH:2,dev:"Backend",devH:1.5,cyber:"XSS",cyberH:1.5,cs:"SQL",csH:1,total:8},
  {date:"2026-06-18",day:"Thursday",week:"W9",phase:"Polish",dsa:"Hashing",dsaH:2,java:"Exception",javaH:2,dev:"Upgrade",devH:1.5,cyber:"BurpSuite",cyberH:1.5,cs:"Threads",csH:1,total:8},
  {date:"2026-06-19",day:"Friday",week:"W10",phase:"Polish",dsa:"Recursion",dsaH:2,java:"Streams",javaH:2,dev:"Deploy",devH:1.5,cyber:"CTF",cyberH:1.5,cs:"Revision",csH:1,total:8},
  {date:"2026-06-20",day:"Saturday",week:"W10",phase:"Polish",dsa:"Arrays",dsaH:2,java:"OOP",javaH:2,dev:"HTML/CSS",devH:1.5,cyber:"Networking",cyberH:1.5,cs:"OS",csH:1,total:8},
];

// ===== STATE =====
let state = JSON.parse(localStorage.getItem('sde_tracker') || '{}');
// state[date] = { done: bool, note: string }

const TODAY = new Date().toISOString().split('T')[0];
let currentFilter = 'all';

// ===== HELPERS =====
function fmtDate(d) {
  const dt = new Date(d + 'T00:00:00');
  return dt.toLocaleDateString('en-US', {month:'short', day:'numeric'});
}

function getStreak() {
  let streak = 0;
  const sorted = [...PLAN].sort((a,b) => new Date(b.date)-new Date(a.date));
  for (const d of sorted) {
    if (new Date(d.date) > new Date(TODAY)) continue;
    if (state[d.date]?.done) streak++;
    else break;
  }
  return streak;
}

function getDoneCount() {
  return PLAN.filter(d => state[d.date]?.done).length;
}

function getTotalHours() {
  return PLAN.filter(d => state[d.date]?.done).reduce((s,d) => s+d.total, 0);
}

function saveState() {
  localStorage.setItem('sde_tracker', JSON.stringify(state));
  if (USE_API) apiPost('/state', state).catch(console.error);
}

function showToast(msg, type='info') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast ${type} show`;
  setTimeout(() => t.className = 'toast', 2200);
}

// ===== TODAY PANEL =====
function renderToday() {
  const today = PLAN.find(d => d.date === TODAY);
  const hdr = document.getElementById('today-header');
  const cards = document.getElementById('today-cards');
  const markBtn = document.getElementById('today-mark-btn');

  if (!today) {
    hdr.innerHTML = `<div style="color:var(--muted);text-align:center;padding:40px">No task scheduled for today (${fmtDate(TODAY)})</div>`;
    cards.innerHTML = '';
    return;
  }

  const isDone = state[TODAY]?.done;
  hdr.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
      <div>
        <div style="font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:800">${today.day} · ${fmtDate(today.date)}</div>
      </div>
      <div style="margin-left:auto">
        <span class="status-badge ${isDone?'done':'today'}">${isDone?'✅ Completed':'🔥 Today'}</span>
      </div>
    </div>
  `;

  cards.innerHTML = `
    <div class="today-card dsa">
      <div class="card-label dsa">📊 DSA · ${today.dsaH}h</div>
      <div class="card-topic">${today.dsa}</div>
      <div class="card-hours">Data Structures & Algorithms</div>
    </div>
    <div class="today-card java">
      <div class="card-label java">☕ Java · ${today.javaH}h</div>
      <div class="card-topic">${today.java}</div>
      <div class="card-hours">Java Programming</div>
    </div>
    <div class="today-card cyber">
      <div class="card-label cyber">🛡 Dev · ${today.devH}h</div>
      <div class="card-topic">${today.dev}</div>
      <div class="card-hours">Development</div>
    </div>
    <div class="today-card cs">
      <div class="card-label cs">🔐 Cyber · ${today.cyberH}h</div>
      <div class="card-topic">${today.cyber}</div>
      <div class="card-hours">Cybersecurity</div>
    </div>
  `;

  if (isDone) {
    markBtn.textContent = '✅ Completed Today!';
    markBtn.className = 'btn btn-done active';
  } else {
    markBtn.textContent = '✅ Mark Today Complete';
    markBtn.className = 'btn btn-done';
  }
}

function toggleTodayDone() {
  if (!state[TODAY]) state[TODAY] = {};
  state[TODAY].done = !state[TODAY].done;
  saveState();
  renderAll();
  showToast(state[TODAY].done ? '🎉 Day marked complete!' : '↩ Marked incomplete', state[TODAY].done ? 'success' : 'info');
}

// ===== CALENDAR =====
function renderCalendar() {
  const container = document.getElementById('calendar-container');

  let filteredDays = PLAN;
  if (currentFilter === 'pending') filteredDays = PLAN.filter(d => !state[d.date]?.done);
  else if (currentFilter === 'done') filteredDays = PLAN.filter(d => state[d.date]?.done);

  if (filteredDays.length === 0) {
    container.innerHTML = `<div class="empty-state"><div class="emoji">🔍</div><div>No days found for this filter</div></div>`;
    return;
  }

  let html = '<div class="days-grid">';
  for (const d of filteredDays) {
    const isDone = state[d.date]?.done;
    const isToday = d.date === TODAY;
    html += `
      <div class="day-card ${isDone?'done':''} ${isToday?'today-highlight':''}" onclick="openDayModal('${d.date}')">
        <div class="day-date">
          <span>${fmtDate(d.date)}</span>
          <span class="status-badge ${isDone?'done':isToday?'today':'pending'}">${isDone?'✅':isToday?'🔥':'⏳'}</span>
        </div>
        <div class="day-name">${d.day}</div>
        <div class="day-topics">
          <div class="day-topic-row"><span class="topic-dot dsa"></span><span>${d.dsa}</span></div>
          <div class="day-topic-row"><span class="topic-dot java"></span><span>${d.java.length>30?d.java.substring(0,30)+'…':d.java}</span></div>
          <div class="day-topic-row"><span class="topic-dot cyber"></span><span>${d.dev}</span></div>
          <div class="day-topic-row"><span class="topic-dot cs"></span><span>${d.cyber}</span></div>
        </div>
      </div>`;
  }
  html += '</div>';
  container.innerHTML = html;
}

function filterCalendar(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderCalendar();
}

// ===== STATS =====
function renderStats() {
  const done = getDoneCount();
  const total = PLAN.length;
  const pct = Math.round(done/total*100);
  const hours = getTotalHours();
  const streak = getStreak();

  // Streak
  document.getElementById('streak-section').innerHTML = `
    <div class="streak-card">
      <div class="streak-fire">🔥</div>
      <div class="streak-info">
        <div class="streak-num">${streak}</div>
        <div class="streak-label">Day Streak</div>
      </div>
      <div style="margin-left:auto;text-align:right">
        <div style="font-size:1.4rem;font-weight:700">${hours}h</div>
        <div style="font-size:0.75rem;color:var(--muted)">Total Hours Logged</div>
      </div>
    </div>
  `;

  // Stats grid
  const remaining = total - done;
  const daysLeft = PLAN.filter(d => d.date >= TODAY && !state[d.date]?.done).length;
  document.getElementById('stats-grid').innerHTML = `
    <div class="stat-card">
      <div class="stat-num" style="color:var(--done)">${done}</div>
      <div class="stat-desc">Days Completed</div>
    </div>
    <div class="stat-card">
      <div class="stat-num" style="color:var(--dsa)">${pct}%</div>
      <div class="stat-desc">Overall Progress</div>
    </div>
    <div class="stat-card">
      <div class="stat-num" style="color:var(--java)">${daysLeft}</div>
      <div class="stat-desc">Days Remaining</div>
    </div>
    <div class="stat-card">
      <div class="stat-num" style="color:var(--cyber)">${hours.toFixed(1)}</div>
      <div class="stat-desc">Hours Studied</div>
    </div>
  `;

  // Heatmap
  let heatHtml = '';
  for (const d of PLAN) {
    const isDone = state[d.date]?.done;
    const isToday = d.date === TODAY;
    heatHtml += `<div class="heat-cell ${isDone?'done':''} ${isToday?'today':''}" 
      title="${fmtDate(d.date)} - ${isDone?'Done':'Pending'}"
      onclick="openDayModal('${d.date}')"></div>`;
  }
  document.getElementById('heatmap').innerHTML = heatHtml;

  // Breakdown
  const subjects = [
    {name:'DSA', color:'var(--dsa)', topics:[...new Set(PLAN.map(d=>d.dsa))], field:'dsa'},
    {name:'Java', color:'var(--java)', topics:[...new Set(PLAN.map(d=>d.java))], field:'java'},
    {name:'Development', color:'var(--cyber)', topics:[...new Set(PLAN.map(d=>d.dev))], field:'dev'},
    {name:'Cyber', color:'var(--cs)', topics:[...new Set(PLAN.map(d=>d.cyber))], field:'cyber'},
  ];

  let breakHtml = '';
  for (const s of subjects) {
    const doneDays = PLAN.filter(d => state[d.date]?.done).length;
    const fillPct = total > 0 ? Math.round(doneDays/total*100) : 0;
    breakHtml += `
      <div class="breakdown-card">
        <div class="breakdown-header">
          <div class="breakdown-name" style="color:${s.color}">${s.name}</div>
          <div class="breakdown-count">${s.topics.length} unique topics</div>
        </div>
        <div style="font-size:0.75rem;color:var(--muted);margin-bottom:8px">${s.topics.slice(0,3).join(', ')}${s.topics.length>3?'...':''}</div>
        <div class="mini-bar">
          <div class="mini-bar-fill" style="width:${fillPct}%;background:${s.color}"></div>
        </div>
      </div>`;
  }
  document.getElementById('breakdown-grid').innerHTML = breakHtml;
}

// ===== MODAL =====
const SUBJECTS = [
  { key:'dsa',  label:'DSA',          color:'var(--dsa)',   plannedKey:'dsaH',  topicKey:'dsa'  },
  { key:'java', label:'Java',         color:'var(--java)',  plannedKey:'javaH', topicKey:'java' },
  { key:'dev',  label:'Development',  color:'var(--cyber)', plannedKey:'devH',  topicKey:'dev'  },
  { key:'cyber',label:'Cybersecurity',color:'var(--cs)',    plannedKey:'cyberH',topicKey:'cyber'},
];

function openDayModal(date) {
  const d = PLAN.find(p => p.date === date);
  if (!d) return;
  const isDone = state[date]?.done;
  const note   = state[date]?.note || '';
  const actual = state[date]?.actual || {};
  const reasons= state[date]?.reasons || {};
  const customTasks = state[date]?.customTasks || [];

  // build subject blocks (top half)
  const subjectBlocksHtml = SUBJECTS.map(s => `
    <div class="subject-block" style="border-left:3px solid ${s.color}">
      <div class="subject-label" style="color:${s.color}">${s.label}</div>
      <div class="subject-topic">${d[s.topicKey]}</div>
      <div class="subject-hrs">Planned: ${d[s.plannedKey]}h</div>
    </div>`).join('') + customTasks.map((t,i) => {
      const hex = getHex(t.color || 'accent');
      return `<div class="subject-block" style="border-left:3px solid ${hex}">
        <div class="subject-label" style="color:${hex}">${t.label}</div>
        <div class="subject-topic">${t.topic}</div>
        <div class="subject-hrs">Planned: ${t.hours}h</div>
      </div>`;
    }).join('');

  // build actual-hours input rows
  const hoursRowsHtml = SUBJECTS.map(s => {
    const planned = d[s.plannedKey];
    const act = actual[s.key] !== undefined ? actual[s.key] : '';
    const diff = act !== '' ? parseFloat(act) - planned : null;
    const cls  = diff === null ? '' : diff > 0 ? 'over' : diff < 0 ? 'under' : '';
    const sig  = diff === null ? '⬜' : diff > 0 ? '🔴' : diff < 0 ? '🟢' : '🟣';
    const diffLabel = diff === null ? '' : diff > 0
      ? `+${diff.toFixed(1)}h over`
      : diff < 0 ? `${diff.toFixed(1)}h early` : 'On time!';
    return `
    <div class="hours-row" id="hrow-${s.key}">
      <div class="hours-row-top">
        <span class="hours-subject-name" style="color:${s.color}">${s.label}</span>
        <span class="hours-planned">Plan: ${planned}h</span>
      </div>
      <div class="hours-input-wrap">
        <span class="signal" id="sig-${s.key}">${sig}</span>
        <input class="hours-input ${cls}" id="act-${s.key}" type="number" min="0" step="0.5"
          placeholder="0.0" value="${act}"
          oninput="onActualChange('${date}','${s.key}',${planned},this.value)">
        <span class="hours-diff ${cls}" id="diff-${s.key}">${diffLabel}</span>
      </div>
    </div>`;
  }).join('') + customTasks.map((t,i) => {
    const ckey = `custom_${i}`;
    const planned = parseFloat(t.hours) || 0;
    const act = actual[ckey] !== undefined ? actual[ckey] : '';
    const diff = act !== '' ? parseFloat(act) - planned : null;
    const cls  = diff === null ? '' : diff > 0 ? 'over' : diff < 0 ? 'under' : '';
    const sig  = diff === null ? '⬜' : diff > 0 ? '🔴' : diff < 0 ? '🟢' : '🟣';
    const diffLabel = diff === null ? '' : diff > 0 ? `+${diff.toFixed(1)}h over` : diff < 0 ? `${diff.toFixed(1)}h early` : 'On time!';
    const hex = getHex(t.color || 'accent');
    return `
    <div class="hours-row">
      <div class="hours-row-top">
        <span class="hours-subject-name" style="color:${hex}">${t.label}</span>
        <span class="hours-planned">Plan: ${planned}h</span>
      </div>
      <div class="hours-input-wrap">
        <span class="signal" id="sig-${ckey}">${sig}</span>
        <input class="hours-input ${cls}" id="act-${ckey}" type="number" min="0" step="0.5"
          placeholder="0.0" value="${act}"
          oninput="onActualChange('${date}','${ckey}',${planned},this.value)">
        <span class="hours-diff ${cls}" id="diff-${ckey}">${diffLabel}</span>
      </div>
    </div>`;
  }).join('');

  // build existing delay/appreciation banners
  const feedbackHtml = buildFeedbackHtml(date, d, actual, reasons);

  document.getElementById('modal-content').innerHTML = `
    <div class="modal-date">${d.day} · ${fmtDate(d.date)}</div>
    <div class="modal-title">${d.total}h Study Day</div>
    <div class="modal-subjects">${subjectBlocksHtml}</div>
    <hr class="modal-divider">
    <div class="modal-note-label">⏱ Actual Hours Spent</div>
    <div class="hours-section">
      <div class="hours-grid">${hoursRowsHtml}</div>
    </div>
    <div id="feedback-area">${feedbackHtml}</div>
    <hr class="modal-divider">
    <div class="modal-note-label">📝 Notes</div>
    <textarea class="modal-note-input" id="modal-note" placeholder="Add your notes, resources, or reflections for this day...">${note}</textarea>
    <div class="modal-actions">
      <button class="btn btn-done ${isDone?'active':''}" id="done-btn" onclick="toggleDayDone('${date}')">
        ${isDone?'✅ Completed':'⏳ Mark as Done'}
      </button>
      <button class="btn btn-primary" onclick="saveAll('${date}')">💾 Save</button>
      <button class="btn btn-outline" onclick="closeModalDirect()">Close</button>
    </div>
  `;

  document.getElementById('modal-overlay').classList.add('open');
}

function buildFeedbackHtml(date, d, actual, reasons) {
  let html = '';
  const overSubjects = [];
  const underSubjects = [];
  SUBJECTS.forEach(s => {
    const act = actual[s.key];
    if (act === undefined || act === '') return;
    const diff = parseFloat(act) - d[s.plannedKey];
    if (diff > 0) overSubjects.push({ s, diff, act });
    else if (diff < 0) underSubjects.push({ s, diff, act });
  });

  if (overSubjects.length > 0) {
    const list = overSubjects.map(o => `<strong>${o.s.label}</strong> (+${o.diff.toFixed(1)}h)`).join(', ');
    const existingReason = reasons[overSubjects.map(o=>o.s.key).join('_')] || reasons['delay'] || '';
    html += `
      <div class="delay-box" id="delay-box">
        <div class="delay-box-title">🔴 Over budget on ${list}</div>
        <div style="font-size:0.78rem;color:#ff9a9a;margin-bottom:8px">What caused the delay? This helps you improve your planning.</div>
        <textarea class="delay-reason-input" id="delay-reason" placeholder="e.g. Topic was harder than expected, got distracted, needed extra practice...">${existingReason}</textarea>
      </div>`;
  }

  if (underSubjects.length > 0) {
    const msgs = [
      '🚀 Crushing it! You finished ahead of schedule!',
      '⚡ Super efficient today! You\'re on fire!',
      '🏆 Ahead of the curve — keep that momentum!',
      '✨ Look at you go! Finished early like a pro!',
      '🎯 Sharp focus today! You saved precious time!',
    ];
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    const list = underSubjects.map(u => `${u.s.label} (${Math.abs(u.diff).toFixed(1)}h saved)`).join(', ');
    html += `
      <div class="appreciation-box" id="appr-box">
        <div class="appreciation-emoji">🎉</div>
        <div class="appreciation-text">${msg}</div>
        <div style="font-size:0.72rem;color:var(--muted);margin-top:4px">Saved time on: ${list}</div>
      </div>`;
  }

  return html;
}

function onActualChange(date, subjectKey, planned, val) {
  if (!state[date]) state[date] = {};
  if (!state[date].actual) state[date].actual = {};

  const num = parseFloat(val);
  if (!val || isNaN(num)) {
    delete state[date].actual[subjectKey];
  } else {
    state[date].actual[subjectKey] = num;
  }

  // Update signal + diff label live
  const input = document.getElementById(`act-${subjectKey}`);
  const sig   = document.getElementById(`sig-${subjectKey}`);
  const diff  = document.getElementById(`diff-${subjectKey}`);
  const act   = state[date].actual[subjectKey];

  if (act === undefined) {
    input.className = 'hours-input';
    sig.textContent = '⬜';
    diff.textContent = '';
    diff.className = 'hours-diff';
  } else {
    const delta = act - planned;
    if (delta > 0) {
      input.className = 'hours-input over';
      sig.textContent = '🔴';
      diff.textContent = `+${delta.toFixed(1)}h over`;
      diff.className = 'hours-diff over';
    } else if (delta < 0) {
      input.className = 'hours-input under';
      sig.textContent = '🟢';
      diff.textContent = `${delta.toFixed(1)}h early`;
      diff.className = 'hours-diff under';
    } else {
      input.className = 'hours-input';
      sig.textContent = '🟣';
      diff.textContent = 'On time!';
      diff.className = 'hours-diff exact';
    }
  }

  // Re-render feedback area
  const d = PLAN.find(p => p.date === date);
  const reasons = state[date].reasons || {};
  document.getElementById('feedback-area').innerHTML = buildFeedbackHtml(date, d, state[date].actual || {}, reasons);
  saveState();
}

function toggleDayDone(date) {
  if (!state[date]) state[date] = {};
  state[date].done = !state[date].done;
  saveState();
  renderAll();
  const isDone = state[date].done;
  const btn = document.getElementById('done-btn');
  if (btn) {
    btn.textContent = isDone ? '✅ Completed' : '⏳ Mark as Done';
    btn.className = `btn btn-done ${isDone?'active':''}`;
  }
  showToast(isDone ? '🎉 Day completed!' : '↩ Marked incomplete', isDone ? 'success' : 'info');
}

function saveAll(date) {
  if (!state[date]) state[date] = {};
  state[date].note = document.getElementById('modal-note')?.value || '';
  const reasonEl = document.getElementById('delay-reason');
  if (reasonEl) {
    if (!state[date].reasons) state[date].reasons = {};
    state[date].reasons['delay'] = reasonEl.value;
  }
  saveState();
  showToast('💾 Saved!', 'success');
  renderAll();
}

function closeModal(e) {
  if (e.target.id === 'modal-overlay') closeModalDirect();
}

function closeModalDirect() {
  document.getElementById('modal-overlay').classList.remove('open');
}

// ===== HEADER & PROGRESS =====
function renderHeader() {
  const done = getDoneCount();
  const total = PLAN.length;
  const pct = total > 0 ? Math.round(done/total*100) : 0;

  document.getElementById('hd-done').textContent = done;
  document.getElementById('hd-total').textContent = total;

  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-pct').textContent = pct + '%';
}

// ===== TABS =====
function switchTab(tab) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`panel-${tab}`).classList.add('active');
  event.currentTarget.classList.add('active');
}

// ===== PLAN PERSISTENCE =====
// PLAN is the live array - we load overrides from localStorage
async function loadPlanOverrides() {
  let overrides, deleted;
  if (USE_API) {
    try {
      [state, overrides, deleted] = await Promise.all([
        apiGet('/state'),
        apiGet('/plan/overrides'),
        apiGet('/plan/deleted'),
      ]);
      // Sync back to localStorage as cache
      localStorage.setItem('sde_tracker', JSON.stringify(state));
      localStorage.setItem('sde_plan_overrides', JSON.stringify(overrides));
      localStorage.setItem('sde_plan_deleted', JSON.stringify(deleted));
    } catch (e) {
      console.warn('API unavailable, falling back to localStorage', e.message);
      overrides = JSON.parse(localStorage.getItem('sde_plan_overrides') || '[]');
      deleted   = JSON.parse(localStorage.getItem('sde_plan_deleted') || '[]');
    }
  } else {
    overrides = JSON.parse(localStorage.getItem('sde_plan_overrides') || '[]');
    deleted   = JSON.parse(localStorage.getItem('sde_plan_deleted') || '[]');
  }

  overrides.forEach(o => {
    const idx = PLAN.findIndex(p => p.date === o.date);
    if (idx >= 0) PLAN[idx] = o;
    else PLAN.push(o);
  });
  deleted.forEach(d => {
    const idx = PLAN.findIndex(p => p.date === d);
    if (idx >= 0) PLAN.splice(idx, 1);
  });
  PLAN.sort((a, b) => a.date.localeCompare(b.date));
}

function savePlanOverride(dayObj) {
  const overrides = JSON.parse(localStorage.getItem('sde_plan_overrides') || '[]');
  const idx = overrides.findIndex(o => o.date === dayObj.date);
  if (idx >= 0) overrides[idx] = dayObj;
  else overrides.push(dayObj);
  localStorage.setItem('sde_plan_overrides', JSON.stringify(overrides));
  if (USE_API) apiPost('/plan/overrides', overrides).catch(console.error);
}

function deletePlanDay(date) {
  const deleted = JSON.parse(localStorage.getItem('sde_plan_deleted') || '[]');
  if (!deleted.includes(date)) deleted.push(date);
  localStorage.setItem('sde_plan_deleted', JSON.stringify(deleted));
  if (USE_API) apiPost('/plan/deleted', deleted).catch(console.error);
  // Also remove from overrides if present
  const overrides = JSON.parse(localStorage.getItem('sde_plan_overrides') || '[]');
  const filtered = overrides.filter(o => o.date !== date);
  localStorage.setItem('sde_plan_overrides', JSON.stringify(filtered));
  if (USE_API) apiPost('/plan/overrides', filtered).catch(console.error);
}

// ===== EDIT PANEL =====
const SUBJECT_COLORS = {
  dsa: '#ff6b6b', java: '#4ecdc4', dev: '#a78bfa', cyber: '#ffd93d',
  done: '#6bcb77', accent: '#7c3aed', orange: '#ff9a3c', blue: '#60a5fa',
  pink: '#f472b6', lime: '#a3e635'
};

const COLOR_OPTIONS = [
  {val:'dsa', label:'Red', hex:'#ff6b6b'},
  {val:'java', label:'Teal', hex:'#4ecdc4'},
  {val:'dev', label:'Purple', hex:'#a78bfa'},
  {val:'cyber', label:'Yellow', hex:'#ffd93d'},
  {val:'done', label:'Green', hex:'#6bcb77'},
  {val:'orange', label:'Orange', hex:'#ff9a3c'},
  {val:'blue', label:'Blue', hex:'#60a5fa'},
  {val:'pink', label:'Pink', hex:'#f472b6'},
];

function getHex(colorKey) {
  const found = COLOR_OPTIONS.find(c => c.val === colorKey);
  return found ? found.hex : '#a78bfa';
}

function renderEdit() {
  const container = document.getElementById('edit-container');
  if (!container) return;

  let html = '';
  for (const d of PLAN) {
    const customTasks = (state[d.date]?.customTasks) || [];
    html += `
    <div class="edit-day-card" id="edc-${d.date}">
      <div class="edit-day-header" onclick="toggleEditDay('${d.date}')">
        <span class="edit-chevron" id="chev-${d.date}">▶</span>
        <span class="edit-day-title">${d.day}, ${fmtDate(d.date)}</span>
        <span class="edit-day-meta">${d.total}h · ${PLAN.indexOf(d)+1} of ${PLAN.length}</span>
      </div>
      <div class="edit-day-body" id="edb-${d.date}">
        <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--muted);margin-bottom:10px">Core Subjects</div>
        ${renderEditSubjectRow(d.date, 'dsa',  'DSA',          d.dsa,  d.dsaH,  'dsa')}
        ${renderEditSubjectRow(d.date, 'java', 'Java',         d.java, d.javaH, 'java')}
        ${renderEditSubjectRow(d.date, 'dev',  'Development',  d.dev,  d.devH,  'dev')}
        ${renderEditSubjectRow(d.date, 'cyber','Cybersecurity',d.cyber,d.cyberH,'cyber')}
        ${customTasks.map((t,i) => renderEditCustomRow(d.date, i, t)).join('')}
        <div class="edit-add-task-row">
          <button class="btn btn-outline" style="font-size:0.8rem;padding:7px 14px" onclick="addCustomTask('${d.date}')">＋ Add Task</button>
        </div>
        <div class="edit-delete-day-row">
          <button class="btn btn-primary" style="font-size:0.82rem;padding:8px 16px" onclick="saveEditDay('${d.date}')">💾 Save Changes</button>
          <button class="btn-danger" onclick="confirmDeleteDay('${d.date}')">🗑 Delete This Day</button>
        </div>
      </div>
    </div>`;
  }

  container.innerHTML = html || `<div class="empty-state"><div class="emoji">📭</div><div>No days in your plan yet. Add one!</div></div>`;
}

function renderEditSubjectRow(date, key, label, topic, hours, colorKey) {
  const hex = getHex(colorKey);
  return `
  <div class="edit-subject-row" id="esr-${date}-${key}">
    <div class="edit-subject-color">
      <span class="edit-color-dot" style="background:${hex}"></span>
      ${label}
    </div>
    <input class="edit-input" id="etopic-${date}-${key}" value="${topic}" placeholder="Topic name">
    <input class="edit-hours-input" id="ehours-${date}-${key}" type="number" min="0" step="0.5" value="${hours}" placeholder="h">
    <div style="width:36px"></div>
  </div>`;
}

function renderEditCustomRow(date, idx, task) {
  const hex = getHex(task.color || 'accent');
  return `
  <div class="edit-subject-row" id="esr-${date}-custom-${idx}">
    <div style="display:flex;flex-direction:column;gap:4px">
      <input class="edit-label-input" id="elabel-${date}-${idx}" value="${task.label}" placeholder="Subject name">
      <select class="color-select" id="ecolor-${date}-${idx}">
        ${COLOR_OPTIONS.map(c=>`<option value="${c.val}" ${c.val===task.color?'selected':''}>${c.label}</option>`).join('')}
      </select>
    </div>
    <input class="edit-input" id="ectopic-${date}-${idx}" value="${task.topic}" placeholder="Topic / task">
    <input class="edit-hours-input" id="echours-${date}-${idx}" type="number" min="0" step="0.5" value="${task.hours}" placeholder="h">
    <button class="btn-delete" onclick="deleteCustomTask('${date}', ${idx})">✕</button>
  </div>`;
}

function toggleEditDay(date) {
  const body = document.getElementById(`edb-${date}`);
  const chev = document.getElementById(`chev-${date}`);
  body.classList.toggle('open');
  chev.textContent = body.classList.contains('open') ? '▼' : '▶';
}

function saveEditDay(date) {
  const d = PLAN.find(p => p.date === date);
  if (!d) return;

  // Read core subjects
  ['dsa','java','dev','cyber'].forEach(key => {
    const topicEl = document.getElementById(`etopic-${date}-${key}`);
    const hoursEl = document.getElementById(`ehours-${date}-${key}`);
    if (topicEl) d[key === 'dsa' ? 'dsa' : key === 'java' ? 'java' : key === 'dev' ? 'dev' : 'cyber'] = topicEl.value;
    if (hoursEl) d[key + 'H'] = parseFloat(hoursEl.value) || 0;
  });

  // Recalculate total
  d.total = (d.dsaH || 0) + (d.javaH || 0) + (d.devH || 0) + (d.cyberH || 0);
  const customTasks = (state[date]?.customTasks || []);
  customTasks.forEach(t => { d.total += (parseFloat(t.hours) || 0); });

  // Read custom tasks
  if (!state[date]) state[date] = {};
  const updatedCustom = [];
  customTasks.forEach((t, i) => {
    const labelEl = document.getElementById(`elabel-${date}-${i}`);
    const colorEl = document.getElementById(`ecolor-${date}-${i}`);
    const topicEl = document.getElementById(`ectopic-${date}-${i}`);
    const hoursEl = document.getElementById(`echours-${date}-${i}`);
    if (topicEl) {
      updatedCustom.push({
        label: labelEl?.value || t.label,
        color: colorEl?.value || t.color,
        topic: topicEl.value,
        hours: parseFloat(hoursEl?.value) || 0,
      });
    }
  });
  state[date].customTasks = updatedCustom;

  savePlanOverride(d);
  saveState();
  renderAll();
  showToast('✅ Day saved!', 'success');
}

function addCustomTask(date) {
  if (!state[date]) state[date] = {};
  if (!state[date].customTasks) state[date].customTasks = [];
  // Read existing custom task inputs first before adding
  saveCurrentCustomInputs(date);
  state[date].customTasks.push({ label: 'New Task', color: 'accent', topic: '', hours: 1 });
  saveState();
  renderEdit();
  // Re-open the day
  const body = document.getElementById(`edb-${date}`);
  const chev = document.getElementById(`chev-${date}`);
  if (body) { body.classList.add('open'); chev.textContent = '▼'; }
  showToast('➕ Task added!', 'info');
}

function saveCurrentCustomInputs(date) {
  const tasks = state[date]?.customTasks || [];
  tasks.forEach((t, i) => {
    const labelEl = document.getElementById(`elabel-${date}-${i}`);
    const colorEl = document.getElementById(`ecolor-${date}-${i}`);
    const topicEl = document.getElementById(`ectopic-${date}-${i}`);
    const hoursEl = document.getElementById(`echours-${date}-${i}`);
    if (topicEl) {
      t.label = labelEl?.value || t.label;
      t.color = colorEl?.value || t.color;
      t.topic = topicEl.value;
      t.hours = parseFloat(hoursEl?.value) || 0;
    }
  });
}

function deleteCustomTask(date, idx) {
  if (!state[date]?.customTasks) return;
  saveCurrentCustomInputs(date);
  state[date].customTasks.splice(idx, 1);
  saveState();

  // Recalculate total
  const d = PLAN.find(p => p.date === date);
  if (d) {
    d.total = (d.dsaH||0) + (d.javaH||0) + (d.devH||0) + (d.cyberH||0);
    state[date].customTasks.forEach(t => { d.total += (parseFloat(t.hours)||0); });
    savePlanOverride(d);
  }

  renderEdit();
  const body = document.getElementById(`edb-${date}`);
  const chev = document.getElementById(`chev-${date}`);
  if (body) { body.classList.add('open'); chev.textContent = '▼'; }
  showToast('🗑 Task removed', 'info');
}

function confirmDeleteDay(date) {
  const d = PLAN.find(p => p.date === date);
  if (!d) return;
  if (!confirm(`Delete "${d.day}, ${fmtDate(date)}" from your plan? This cannot be undone.`)) return;
  deletePlanDay(date);
  const idx = PLAN.findIndex(p => p.date === date);
  if (idx >= 0) PLAN.splice(idx, 1);
  saveState();
  renderAll();
  showToast('🗑 Day deleted', 'info');
}

// ===== ADD DAY MODAL =====
function openAddDayModal() {
  document.getElementById('add-day-content').innerHTML = `
    <div class="modal-title" style="margin-bottom:20px">➕ Add New Day</div>
    <div class="add-day-form">
      <div class="field">
        <label>Date</label>
        <input type="date" id="new-date" value="${TODAY}">
      </div>
      <div class="field">
        <label>Day of Week</label>
        <select id="new-day">
          ${['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(d=>`<option>${d}</option>`).join('')}
        </select>
      </div>
      <div class="add-day-subjects">
        <div style="font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--muted);margin-bottom:10px">Tasks</div>
        <div id="new-tasks-list">
          ${renderNewTaskRow(0,'DSA','dsa','')}
          ${renderNewTaskRow(1,'Java','java','')}
          ${renderNewTaskRow(2,'Development','dev','')}
          ${renderNewTaskRow(3,'Cybersecurity','cyber','')}
        </div>
        <button class="btn btn-outline" style="font-size:0.8rem;padding:7px 14px;margin-top:8px" onclick="addNewTaskRow()">＋ Add Task</button>
      </div>
    </div>
    <div class="modal-actions" style="margin-top:20px">
      <button class="btn btn-primary" onclick="saveNewDay()">💾 Add to Plan</button>
      <button class="btn btn-outline" onclick="closeAddDayModalDirect()">Cancel</button>
    </div>
  `;
  document.getElementById('add-day-overlay').classList.add('open');
}

let newTaskRowCount = 4;
function renderNewTaskRow(idx, label, color, topic) {
  return `
  <div class="add-day-subject-row" id="ntr-${idx}">
    <div style="display:flex;gap:6px">
      <input class="edit-label-input" id="nlabel-${idx}" value="${label}" placeholder="Subject">
      <select class="color-select" id="ncolor-${idx}">
        ${COLOR_OPTIONS.map(c=>`<option value="${c.val}" ${c.val===color?'selected':''}>${c.label}</option>`).join('')}
      </select>
    </div>
    <input class="edit-input" id="ntopic-${idx}" value="${topic}" placeholder="Topic / task description">
    <input class="edit-hours-input" id="nhours-${idx}" type="number" min="0" step="0.5" value="2" placeholder="h" style="width:70px">
    <button class="btn-delete" onclick="removeNewTaskRow(${idx})">✕</button>
  </div>`;
}

function addNewTaskRow() {
  const list = document.getElementById('new-tasks-list');
  const div = document.createElement('div');
  div.innerHTML = renderNewTaskRow(newTaskRowCount, 'Task', 'accent', '');
  list.appendChild(div.firstElementChild);
  newTaskRowCount++;
}

function removeNewTaskRow(idx) {
  const el = document.getElementById(`ntr-${idx}`);
  if (el) el.remove();
}

function saveNewDay() {
  const dateVal = document.getElementById('new-date').value;
  const dayVal  = document.getElementById('new-day').value;
  if (!dateVal) { showToast('⚠️ Pick a date!', 'info'); return; }
  if (PLAN.find(p => p.date === dateVal)) { showToast('⚠️ This date already exists!', 'info'); return; }

  const tasks = [];
  document.querySelectorAll('[id^="nlabel-"]').forEach(el => {
    const idx = el.id.replace('nlabel-','');
    const topic = document.getElementById(`ntopic-${idx}`)?.value || '';
    const hours = parseFloat(document.getElementById(`nhours-${idx}`)?.value) || 0;
    const label = el.value || 'Task';
    const color = document.getElementById(`ncolor-${idx}`)?.value || 'accent';
    if (topic) tasks.push({ label, color, topic, hours });
  });

  // Build day object — use first 4 tasks as core if they exist, rest as custom
  const coreKeys = ['dsa','java','dev','cyber'];
  const coreLabels = ['DSA','Java','Development','Cybersecurity'];
  const newDay = {
    date: dateVal,
    day: dayVal,
    week: 'Custom',
    phase: 'Custom',
    dsa: tasks[0]?.topic || '-', dsaH: tasks[0]?.hours || 0,
    java: tasks[1]?.topic || '-', javaH: tasks[1]?.hours || 0,
    dev: tasks[2]?.topic || '-', devH: tasks[2]?.hours || 0,
    cyber: tasks[3]?.topic || '-', cyberH: tasks[3]?.hours || 0,
    cs: '-', csH: 0,
    total: tasks.reduce((s,t)=>s+t.hours, 0),
  };

  const customTasks = tasks.slice(4);
  if (customTasks.length > 0) {
    if (!state[dateVal]) state[dateVal] = {};
    state[dateVal].customTasks = customTasks;
  }

  PLAN.push(newDay);
  PLAN.sort((a,b) => a.date.localeCompare(b.date));
  savePlanOverride(newDay);
  saveState();
  renderAll();
  closeAddDayModalDirect();
  showToast('🎉 Day added to plan!', 'success');
}

function closeAddDayModal(e) {
  if (e.target.id === 'add-day-overlay') closeAddDayModalDirect();
}

function closeAddDayModalDirect() {
  document.getElementById('add-day-overlay').classList.remove('open');
  newTaskRowCount = 4;
}

// ===== RENDER ALL =====
function renderAll() {
  renderHeader();
  renderToday();
  renderCalendar();
  renderStats();
  renderEdit();
}

// ===== INIT =====
(async () => {
  await loadPlanOverrides();
  renderAll();
})();
