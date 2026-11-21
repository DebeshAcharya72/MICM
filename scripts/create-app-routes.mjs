import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const appDir = path.join(__dirname, '..', 'src', 'app');

const routeMappings = [
  { route: '', component: '@/pages/Home', title: 'Home' },
  { route: 'about', component: '@/pages/About', title: 'About Us' },
  { route: 'collaboration', redirect: '/collaboration/mous' },
  { route: 'collaboration/mous', component: '@/pages/Mous', title: "MoU's & Collaborations" },
  { route: 'mous', component: '@/pages/Mous', title: "MoU's" },
  { route: 'programmes', component: '@/pages/Programmes', title: 'Academic Programmes' },
  { route: 'apply', component: '@/pages/ApplyOnline', title: 'Apply Online (2026-27)' },
  { route: 'apply-online', component: '@/pages/ApplyOnline', title: 'Apply Online' },
  { route: 'placements', component: '@/pages/Placements', title: 'Training & Placements' },
  { route: 'training-calendar', component: '@/pages/TrainingCalendar', title: 'Training Calendar' },
  { route: 'downloads', component: '@/pages/Downloads', title: 'Downloads Centre' },
  { route: 'compliance', component: '@/pages/Compliance', title: 'Statutory Compliance' },
  { route: 'committees', component: '@/pages/Committees', title: 'Statutory Committees' },
  { route: 'grievance', component: '@/pages/Grievance', title: 'Online Grievance Redressal' },
  { route: 'admission-faqs', component: '@/pages/AdmissionFaqs', title: 'Admission FAQs' },
  { route: 'faculty', component: '@/pages/Faculty', title: 'Faculty Directory' },
  { route: 'facilities', component: '@/pages/Facilities', title: 'Campus Facilities' },
  { route: 'library', component: '@/pages/Library', title: 'Library & E-Resources' },
  { route: 'newsletter', component: '@/pages/Newsletter', title: 'Newsletter (Sahakar Varta)' },
  { route: 'alumni', component: '@/pages/Alumni', title: 'Alumni Association' },
  { route: 'rti-careers', component: '@/pages/RtiCareers', title: 'Careers & RTI' },
  { route: 'contact', component: '@/pages/Contact', title: 'Contact Us' },
  { route: 'admin', component: '@/pages/Admin', title: 'Admin CMS' },
];

routeMappings.forEach(mapping => {
  const targetDir = path.join(appDir, mapping.route);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const pagePath = path.join(targetDir, 'page.jsx');

  if (mapping.redirect) {
    const content = `import { redirect } from 'next/navigation';

export default function RedirectPage() {
  redirect('${mapping.redirect}');
}
`;
    fs.writeFileSync(pagePath, content, 'utf-8');
  } else {
    const content = `import PageComponent from '${mapping.component}';

export const metadata = {
  title: '${mapping.title} | Madhusudan Institute of Co-operative Management (MICM)',
};

export default function Page() {
  return <PageComponent />;
}
`;
    fs.writeFileSync(pagePath, content, 'utf-8');
  }

  console.log('Created page for route:', mapping.route || '/');
});
