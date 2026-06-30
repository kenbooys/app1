const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = parseInt(process.env.PORT, 10) || 3000;
const SLOT = process.env.SLOT || 'unknown';
const APP_NAME = process.env.APP_NAME || 'app';

const TEMPLATE_PATH = path.join(__dirname, 'index_ku.html');

app.get('/health', (_req, res) => res.type('text/plain').send('OK'));
app.get('/slot',   (_req, res) => res.type('text/plain').send(SLOT));
app.get('/', (_req, res) => {
  const html = fs.readFileSync(TEMPLATE_PATH, 'utf8')
    .replace(/{{APP_NAME}}/g, APP_NAME)
    .replace(/{{SLOT}}/g, SLOT)
    .replace(/{{BORDER_COLOR}}/g, SLOT === 'green' ? '#2e7d32' : '#1565c0')
    .replace(/{{SLOT_COLOR}}/g, SLOT === 'green' ? '#66bb6a' : '#42a5f5');
  res.type('html').send(html);
});

app.listen(PORT, () => console.log(`[${APP_NAME}] express on ${PORT} (slot=${SLOT})`));
