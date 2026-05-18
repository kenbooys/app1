const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = parseInt(process.env.PORT, 10) || 3000;
const SLOT = process.env.SLOT || 'unknown';
const APP_NAME = process.env.APP_NAME || 'app';

const htmlTemplate = fs.readFileSync(path.join(__dirname, 'index_ku.html'), 'utf-8');

app.get('/health', (_req, res) => res.type('text/plain').send('OK'));
app.get('/slot',   (_req, res) => res.type('text/plain').send(SLOT));
app.get('/', (_req, res) => {
  const borderColor = SLOT === 'green' ? '#2e7d32' : '#1565c0';
  const slotColor = SLOT === 'green' ? '#66bb6a' : '#42a5f5';

  const html = htmlTemplate
    .replace('{{APP_NAME}}', APP_NAME)
    .replace('{{SLOT}}', SLOT)
    .replace('{{BORDER_COLOR}}', borderColor)
    .replace('{{SLOT_COLOR}}', slotColor)
    .replace('{{NODE_VERSION}}', process.version);

  res.type('html').send(html);
});

app.listen(PORT, () => console.log(`[${APP_NAME}] express on ${PORT} (slot=${SLOT})`));
