# ⚡ SDE Roadmap Tracker

An interactive study plan tracker for your SDE preparation — with task editing, actual hours tracking, delay alerts, and progress analytics.

---

## 📁 Project Structure

```
sde_tracker/
├── frontend/
│   ├── index.html      ← Main HTML (open this directly for standalone mode)
│   ├── styles.css      ← All styles
│   └── app.js          ← All JavaScript logic + API bridge
├── backend/
│   ├── server.js       ← Express API server
│   ├── package.json    ← Node dependencies
│   └── data/           ← JSON files auto-created here on first save
│       ├── tracker_state.json     (done flags, notes, hours)
│       ├── plan_overrides.json    (edited/added days)
│       └── plan_deleted.json      (deleted day dates)
└── README.md
```

---

## 🚀 Mode 1 — Standalone (no server needed)

Just open `frontend/index.html` in any browser. All data is saved to `localStorage`.

No installation, no terminal, nothing else required.

---

## 🖥 Mode 2 — With Backend Server (data saved to files on disk)

### Prerequisites
- Node.js 16+

### Setup

```bash
cd backend
npm install
npm start
```

Server starts at **http://localhost:3000** and serves the frontend automatically.

### Enable API mode in the frontend

Open `frontend/app.js` and change line 10:

```js
const USE_API = true;   // ← was false
```

Now all saves go to `backend/data/` instead of (only) localStorage.
The app still falls back to localStorage if the server is unreachable.

### Dev mode (auto-restart on changes)

```bash
npm run dev
```

---

## ✨ Features

| Feature | Description |
|---|---|
| 📅 Today | See today's 4 subjects at a glance, mark complete |
| 🗓 Calendar | Browse all 55 days, filter by status |
| 📊 Stats | Streak, heatmap, hours studied, subject breakdown |
| ✏️ Edit Plan | Edit topics & hours, add/delete tasks, add/delete whole days |
| ⏱ Actual Hours | Log real time per subject — get 🔴 alerts or 🟢 appreciation |
| 📝 Notes | Per-day notes saved with each session |
| 💾 Persistence | localStorage (standalone) or JSON files (server mode) |

---

## 🔧 API Endpoints (server mode)

| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET/POST | `/api/state` | Tracker state (done, notes, hours, reasons) |
| GET/POST | `/api/plan/overrides` | Edited & newly added days |
| GET/POST | `/api/plan/deleted` | Deleted day date strings |

---

## 🛠 Tech Stack

- **Frontend**: Vanilla HTML + CSS + JavaScript (zero dependencies)
- **Backend**: Node.js + Express (2 packages: express, cors)
- **Storage**: localStorage (standalone) / JSON files on disk (server mode)
