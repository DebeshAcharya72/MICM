import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compDir = path.join(__dirname, '..', 'src', 'components');
const files = fs.readdirSync(compDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(compDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  if (content.includes('react-router-dom')) {
    content = content.replace(/import\s*\{\s*Link,\s*useLocation\s*\}\s*from\s*['"]react-router-dom['"];?/g, "import Link from 'next/link';");
    content = content.replace(/import\s*\{\s*NavLink,\s*Link,\s*useLocation\s*\}\s*from\s*['"]react-router-dom['"];?/g, "import Link from 'next/link';\nimport { usePathname } from 'next/navigation';");
    content = content.replace(/import\s*\{\s*Link\s*\}\s*from\s*['"]react-router-dom['"];?/g, "import Link from 'next/link';");
    content = content.replace(/import\s*\{\s*useLocation\s*\}\s*from\s*['"]react-router-dom['"];?/g, "import { usePathname } from 'next/navigation';");
    content = content.replace(/useLocation\(\)/g, "usePathname()");
    content = content.replace(/<Link\s+to=/g, "<Link href=");
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log('Migrated component:', file);
  }
});
