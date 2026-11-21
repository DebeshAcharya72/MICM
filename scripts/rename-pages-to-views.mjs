import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, '..', 'src');
const pagesDir = path.join(srcDir, 'pages');
const viewsDir = path.join(srcDir, 'views');

if (fs.existsSync(pagesDir)) {
  if (fs.existsSync(viewsDir)) {
    fs.rmSync(viewsDir, { recursive: true, force: true });
  }
  fs.renameSync(pagesDir, viewsDir);
  console.log('Renamed src/pages to src/views');
}

// Update imports in src/app/
const appDir = path.join(srcDir, 'app');

function updateImports(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      updateImports(fullPath);
    } else if (entry.name.endsWith('.jsx') || entry.name.endsWith('.js')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      if (content.includes('@/pages/')) {
        content = content.replace(/@\/pages\//g, '@/views/');
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log('Updated import in:', fullPath);
      }
    }
  }
}

updateImports(appDir);
