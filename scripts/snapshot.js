const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const SITE_ROOT = path.resolve(__dirname, '..');
const SNAPSHOT_DIR = path.join(os.homedir(), 'snapshots', 'bpwcislo');
const PORT = 9222;
const VIEWPORT = { width: 1440, height: 900 };

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.webp': 'image/webp', '.woff2': 'font/woff2',
  '.woff': 'font/woff', '.ttf': 'font/ttf',
};

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let url = req.url.split('?')[0];
      if (url === '/') url = '/index.html';
      const filePath = path.join(SITE_ROOT, url);
      if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
        res.writeHead(404);
        return res.end();
      }
      const ext = path.extname(filePath).toLowerCase();
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
      fs.createReadStream(filePath).pipe(res);
    });
    server.listen(PORT, '127.0.0.1', () => resolve(server));
  });
}

(async () => {
  const hash = execSync('git rev-parse --short HEAD').toString().trim();
  const msg = execSync('git log -1 --format=%s').toString().trim();
  const date = new Date().toISOString().slice(0, 10);
  const filename = `${date}_${hash}.png`;
  const filepath = path.join(SNAPSHOT_DIR, filename);

  fs.mkdirSync(SNAPSHOT_DIR, { recursive: true });

  const server = await startServer();

  let browser;
  try {
    browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);
    await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'networkidle0', timeout: 30000 });

    // Let animations settle
    await new Promise((r) => setTimeout(r, 1500));

    await page.screenshot({ path: filepath, fullPage: true });
    console.log(`📸 Snapshot saved: ${filepath}`);
    console.log(`   Commit: ${hash} — ${msg}`);
  } catch (err) {
    console.error('Snapshot failed:', err.message);
    process.exitCode = 0; // never block the commit
  } finally {
    if (browser) await browser.close();
    server.close();
  }
})();
