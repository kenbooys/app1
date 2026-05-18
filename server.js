const express = require('express');
const app = express();
const PORT = parseInt(process.env.PORT, 10) || 3000;
const SLOT = process.env.SLOT || 'unknown';
const APP_NAME = process.env.APP_NAME || 'app';

app.get('/health', (_req, res) => res.type('text/plain').send('OK'));
app.get('/slot',   (_req, res) => res.type('text/plain').send(SLOT));
app.get('/', (_req, res) => {
  res.type('html').send(`<!DOCTYPE html>
<html><head><meta charset="utf-8"/><title>${APP_NAME} — ${SLOT}</title>
<style>body{font-family:system-ui,sans-serif;background:#0f0f0f;color:#e0e0e0;margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center}
.card{background:#1a1a1a;border:2px solid ${SLOT==='green'?'#2e7d32':'#1565c0'};border-radius:16px;padding:48px 56px;text-align:center;max-width:480px}
.slot{font-size:3.5rem;font-weight:900;letter-spacing:.05em;text-transform:uppercase;margin:24px 0;color:${SLOT==='green'?'#66bb6a':'#42a5f5'}}
p{color:#888}</style></head>
<body><div class="card"><h1>${APP_NAME}</h1><div class="slot">${SLOT}</div>
<p>Express on Node ${process.version}. Edit <code>disk/server.js</code>.</p></div></body></html>`);
});

app.listen(PORT, () => console.log(`[${APP_NAME}] express on ${PORT} (slot=${SLOT})`));
