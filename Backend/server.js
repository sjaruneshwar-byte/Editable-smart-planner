/**
 * SDE Roadmap Tracker — Backend Server
 * Stack: Node.js + Express
 * Data is persisted to data/tracker_state.json and data/plan_overrides.json
 *
 * Endpoints:
 *   GET  /api/state              → load tracker state (done, notes, actual hours)
 *   POST /api/state              → save tracker state
 *   GET  /api/plan/overrides     → load plan overrides (edited/added days)
 *   POST /api/plan/overrides     → save plan overrides
 *   GET  /api/plan/deleted       → load deleted day dates
 *   POST /api/plan/deleted       → save deleted day dates
 *   GET  /api/health             → health check
 */

const express = require('express');
const cors    = require('cors');
const fs      = require('fs');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json({ limit: '2mb' }));

// Serve frontend from ../frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// ── Data directory ────────────────────────────────────────────────────────────
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);

function dataFile(name) {
  return path.join(DATA_DIR, name);
}

function readJSON(file, fallback = {}) {
  try {
    if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    console.error('Error reading', file, e.message);
  }
  return fallback;
}

function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}

// ── Routes ────────────────────────────────────────────────────────────────────

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Tracker state (done flags, notes, actual hours, reasons, custom tasks)
app.get('/api/state', (req, res) => {
  const state = readJSON(dataFile('tracker_state.json'), {});
  res.json(state);
});

app.post('/api/state', (req, res) => {
  const state = req.body;
  if (typeof state !== 'object') return res.status(400).json({ error: 'Invalid state' });
  writeJSON(dataFile('tracker_state.json'), state);
  res.json({ ok: true });
});

// Plan overrides (edited + newly added days)
app.get('/api/plan/overrides', (req, res) => {
  const overrides = readJSON(dataFile('plan_overrides.json'), []);
  res.json(overrides);
});

app.post('/api/plan/overrides', (req, res) => {
  const overrides = req.body;
  if (!Array.isArray(overrides)) return res.status(400).json({ error: 'Expected array' });
  writeJSON(dataFile('plan_overrides.json'), overrides);
  res.json({ ok: true });
});

// Deleted day dates
app.get('/api/plan/deleted', (req, res) => {
  const deleted = readJSON(dataFile('plan_deleted.json'), []);
  res.json(deleted);
});

app.post('/api/plan/deleted', (req, res) => {
  const deleted = req.body;
  if (!Array.isArray(deleted)) return res.status(400).json({ error: 'Expected array' });
  writeJSON(dataFile('plan_deleted.json'), deleted);
  res.json({ ok: true });
});

// Catch-all → serve index.html (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ SDE Tracker server running at http://localhost:${PORT}`);
});
