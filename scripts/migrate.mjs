import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesDir = path.join(__dirname, '..', 'src', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Ensure "use client"
  if (!content.startsWith('"use client"') && !content.startsWith("'use client'")) {
    content = "'use client';\n\n" + content;
  }

  // Replace react-router-dom imports
  content = content.replace(/import\s*\{\s*Link,\s*useLocation\s*\}\s*from\s*['"]react-router-dom['"];?/g, "import Link from 'next/link';");
  content = content.replace(/import\s*\{\s*Link\s*\}\s*from\s*['"]react-router-dom['"];?/g, "import Link from 'next/link';");

  // Replace useLocation() calls if present
  content = content.replace(/const\s+location\s*=\s*useLocation\(\);?/g, "const hash = typeof window !== 'undefined' ? window.location.hash : '';");
  content = content.replace(/location\.hash/g, "hash");

  // Replace <Link to= with <Link href=
  content = content.replace(/<Link\s+to=/g, "<Link href=");

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Migrated:', file);
});
