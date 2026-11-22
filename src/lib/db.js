import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'micm_portal.json');

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

const DEFAULT_DATA = {
  admin_users: [
    {
      id: 1,
      username: 'admin',
      password_hash: hashPassword('admin@micm2026'),
      full_name: 'MICM Portal Administrator',
      role: 'superadmin',
      created_at: new Date().toISOString()
    }
  ],
  notices: [
    {
      id: 1,
      title: "MBA 2026-28 Batch Prospectus & OJEE Counselling Guidelines Released",
      category: "Admissions",
      date: "12-Nov-2026",
      link: "/programmes",
      is_new: 1,
      is_active: 1,
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: "Prospectus (2026-2027) Higher Diploma in Co-operative Management (HDCM)",
      category: "Admissions",
      date: "10-Nov-2026",
      link: "/programmes",
      is_new: 1,
      is_active: 1,
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      title: "MICM received ISO 9001:2015 Certificate by STQC, MeitY, Govt. of India",
      category: "Compliance",
      date: "05-Nov-2026",
      link: "/about",
      is_new: 0,
      is_active: 1,
      created_at: new Date().toISOString()
    },
    {
      id: 4,
      title: "Recruitment for Post of Registrar, Finance Officer & Assistant Director 2026",
      category: "Careers",
      date: "01-Nov-2026",
      link: "/rti-careers",
      is_new: 1,
      is_active: 1,
      created_at: new Date().toISOString()
    },
    {
      id: 5,
      title: "National Workshop on Primary Agricultural Credit Societies (PACS) Computerization",
      category: "Events",
      date: "25-Oct-2026",
      link: "/about",
      is_new: 0,
      is_active: 1,
      created_at: new Date().toISOString()
    },
    {
      id: 6,
      title: "Procurement Tender: High-End Workstations for Computing Centre",
      category: "Tenders",
      date: "20-Oct-2026",
      link: "/downloads",
      is_new: 0,
      is_active: 1,
      created_at: new Date().toISOString()
    }
  ],
  enquiries: [
    {
      id: 1,
      full_name: "Amitav Patnaik",
      email: "amitav.patnaik@example.com",
      phone: "+91 9437012345",
      programme: "MBA (2-Year Full-Time)",
      message: "Inquiring about OJEE cutoff ranks and hostel availability for MBA 2026 batch.",
      status: "New",
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      full_name: "Sasmita Sahoo",
      email: "sasmita.s@example.com",
      phone: "+91 9861054321",
      programme: "HDCM (Correspondence)",
      message: "Please share fee structure and examination centre details for HDCM.",
      status: "Contacted",
      created_at: new Date().toISOString()
    }
  ],
  applications: [
    {
      id: 1,
      app_number: "MICM-2026-MBA-59273",
      programme: "MBA (2-Year Full-Time)",
      full_name: "Rahul Kumar Mohapatra",
      gender: "Male",
      dob: "2001-05-15",
      category: "General",
      father_name: "Ramesh Chandra Mohapatra",
      email: "rahul.mohapatra@example.com",
      phone: "+91 9876543210",
      address: "Plot 42, Saheed Nagar, Bhubaneswar, Odisha - 751007",
      qualification: "B.Sc. (Science / Agriculture)",
      grad_percentage: "74.5%",
      entrance_exam: "OJEE",
      entrance_roll: "OJEE26019482",
      entrance_score: "Rank 1420",
      documents_status: "Verified Online",
      status: "Submitted",
      created_at: new Date().toISOString()
    }
  ],
  faculty: [
    {
      id: 1,
      name: "Dr. P. Kannaiah",
      designation: "Director",
      department: "Executive Administration & Management",
      qualifications: "Ph.D., MBA, M.Com",
      expertise: "Cooperative Banking, Strategic Governance, Public Policy",
      email: "micmbbs@gmail.com",
      phone: "+91 674 2562826",
      image_url: null,
      order_seq: 1
    },
    {
      id: 2,
      name: "Dr. Sanjib Kumar Hota",
      designation: "Dy. Director",
      department: "Academic Administration & Research",
      qualifications: "Ph.D., MBA (HR & Mktg)",
      expertise: "Organizational Behavior, Rural Enterprise, Agri-Business",
      email: "micmbbs@gmail.com",
      phone: "+91 674 2562826",
      image_url: null,
      order_seq: 2
    },
    {
      id: 3,
      name: "Dr. P.K. Upadhyaya",
      designation: "Guest Lecturer",
      department: "Management Studies",
      qualifications: "Ph.D., M.Com, FICWA",
      expertise: "Financial Management, Cost Accounting, Project Finance",
      email: "micmbbs@gmail.com",
      phone: "+91 674 2562826",
      image_url: null,
      order_seq: 3
    },
    {
      id: 4,
      name: "Dr. Pranaba Nanda Das",
      designation: "Lecturer",
      department: "Co-operative Management & Economics",
      qualifications: "Ph.D., MA (Economics), HDCM",
      expertise: "Cooperative Law, Microfinance, Agricultural Credit",
      email: "micmbbs@gmail.com",
      phone: "+91 674 2562826",
      image_url: null,
      order_seq: 4
    },
    {
      id: 5,
      name: "Ms. Priyadarshini Dash",
      designation: "Lecturer",
      department: "Business Administration & Quantitative Methods",
      qualifications: "MBA, M.Phil",
      expertise: "Operations Research, Marketing Analytics, Business Stats",
      email: "micmbbs@gmail.com",
      phone: "+91 674 2562826",
      image_url: null,
      order_seq: 5
    },
    {
      id: 6,
      name: "Dr. Dilip Kumar Mahapatra",
      designation: "Lecturer",
      department: "Financial Management & Banking",
      qualifications: "Ph.D., MBA (Finance)",
      expertise: "Banking Technology, Risk Analysis, Cooperative Audit",
      email: "micmbbs@gmail.com",
      phone: "+91 674 2562826",
      image_url: null,
      order_seq: 6
    }
  ],
  news_events: [
    {
      id: 1,
      title: "Convocation Ceremony for MBA Batch 2023-25",
      category: "Academic Event",
      date: "14-Feb-2026",
      summary: "Annual convocation address delivered by Hon'ble Minister of State for Cooperation.",
      content: "",
      image_url: null,
      is_active: 1,
      created_at: new Date().toISOString()
    }
  ],
  banners: [
    {
      id: 1,
      title: "CONGRATULATIONS",
      subtitle: "FOR SECURING TOP HONOURS IN THE EASTERN REGION COOPERATIVE MANAGEMENT CONCLAVE",
      location: "AT NATIONAL COOPERATIVE SUMMIT",
      bg: "from-[#0c2a5c] via-[#103a7d] to-[#0c2a5c]",
      image_url: null,
      students: [
        { name: "ADARSH MOHANTY", batch: "MBA (2025-27)", rank: "First Rank" },
        { name: "GURU PRASAD DAS", batch: "MBA (2025-27)", rank: "Distinction" },
        { name: "SUBHASHREE NAYAK", batch: "HDCM (2025-26)", rank: "Top Merit" }
      ],
      is_active: 1,
      order_seq: 1,
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: "PIONEERING LEGACY",
      subtitle: "SERVING COOPERATIVE MANAGEMENT AND ADMINISTRATIVE CAPACITY BUILDING SINCE 1955-56",
      location: "MINISTRY OF CO-OPERATION, GOVT. OF INDIA",
      bg: "from-[#093a47] via-[#0288D1] to-[#093a47]",
      image_url: null,
      students: [
        { name: "AICTE APPROVED", batch: "2-Year MBA", rank: "BPUT Affiliated" },
        { name: "NCCT UNIT", batch: "New Delhi", rank: "Apex Body" },
        { name: "3.4 ACRES", batch: "Nayapalli, BBSR", rank: "Green Campus" }
      ],
      is_active: 1,
      order_seq: 2,
      created_at: new Date().toISOString()
    }
  ],
  grievances: [
    {
      id: 1,
      tracking_id: "MICM-GRV-2026-A92B1",
      grievant_type: "Student",
      full_name: "Subhashree Pradhan",
      email: "subhashree@example.com",
      phone: "+91 9938012345",
      category: "Academic & Teaching",
      subject: "BPUT Semester Marksheet Dispatch Clarification",
      description: "Requesting update on original degree marksheet receipt from affiliating university BPUT.",
      status: "Under Review",
      resolution_notes: "Forwarded to Examination Cell. University verification in progress.",
      created_at: new Date().toISOString()
    }
  ],
  downloads: [
    {
      id: 1,
      title: "MBA 2-Year Full-Time Course Curriculum & Syllabus (BPUT Regulations)",
      category: "Syllabi & Curriculum",
      file_size: "2.4 MB",
      upload_date: "10-Jan-2026",
      file_type: "PDF"
    },
    {
      id: 2,
      title: "Higher Diploma in Co-operative Management (HDCM) 36-Week Scheme of Study",
      category: "Syllabi & Curriculum",
      file_size: "1.8 MB",
      upload_date: "15-Dec-2025",
      file_type: "PDF"
    },
    {
      id: 3,
      title: "Academic Rules, Examination Guidelines & Attendance Regulations",
      category: "Rules & Regulations",
      file_size: "950 KB",
      upload_date: "04-Nov-2025",
      file_type: "PDF"
    },
    {
      id: 4,
      title: "MICM Offline Admission Application Form (MBA & HDCM 2026-27)",
      category: "Application Forms",
      file_size: "1.1 MB",
      upload_date: "02-Feb-2026",
      file_type: "PDF"
    },
    {
      id: 5,
      title: "Cooperative Training Nomination Form (For Sponsoring Organizations)",
      category: "Application Forms",
      file_size: "820 KB",
      upload_date: "20-Jan-2026",
      file_type: "PDF"
    },
    {
      id: 6,
      title: "Anti-Ragging Undertaking Format for Students & Guardians (UGC Regulations)",
      category: "Rules & Regulations",
      file_size: "640 KB",
      upload_date: "12-Sep-2025",
      file_type: "PDF"
    },
    {
      id: 7,
      title: "AICTE Mandatory Disclosure (Form A & B) 2025-26",
      category: "Institutional Circulars",
      file_size: "3.2 MB",
      upload_date: "28-Aug-2025",
      file_type: "PDF"
    },
    {
      id: 8,
      title: "Internal Complaints Committee (ICC) Policy & Guidelines on Workplace Safety",
      category: "Institutional Circulars",
      file_size: "780 KB",
      upload_date: "14-Jul-2025",
      file_type: "PDF"
    }
  ]
};

function readDb() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_DATA, null, 2), 'utf-8');
      return JSON.parse(JSON.stringify(DEFAULT_DATA));
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!parsed.banners) {
      parsed.banners = JSON.parse(JSON.stringify(DEFAULT_DATA.banners));
      writeDb(parsed);
    }
    return parsed;
  } catch (err) {
    console.error('Error reading database file:', err);
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

function writeDb(data) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing database file:', err);
  }
}

// =============================================================================
// PURE JAVASCRIPT DATABASE ENGINE & QUERY INTERFACE (Next.js Server-Side)
// All data queries, filters, mutations, transactions, and indexing in JavaScript.
// =============================================================================
export const db = {
  // Generic JavaScript Query Operations
  query: {
    find: (collection, filterFn = () => true, { sort, limit, skip = 0 } = {}) => {
      const data = readDb();
      let results = (data[collection] || []).filter(filterFn);
      if (typeof sort === 'function') {
        results = results.slice().sort(sort);
      }
      if (skip > 0 || limit !== undefined) {
        results = results.slice(skip, limit !== undefined ? skip + limit : undefined);
      }
      return results;
    },

    findOne: (collection, filterFn) => {
      const data = readDb();
      return (data[collection] || []).find(filterFn) || null;
    },

    findById: (collection, id) => {
      const data = readDb();
      return (data[collection] || []).find(item => item.id === Number(id)) || null;
    },

    insert: (collection, document) => {
      const data = readDb();
      if (!data[collection]) data[collection] = [];
      const newId = (data[collection].length > 0 ? Math.max(...data[collection].map(i => i.id || 0)) : 0) + 1;
      const record = {
        id: newId,
        ...document,
        created_at: new Date().toISOString()
      };
      data[collection].push(record);
      writeDb(data);
      return record;
    },

    update: (collection, id, updates) => {
      const data = readDb();
      if (!data[collection]) return null;
      const index = data[collection].findIndex(item => item.id === Number(id));
      if (index === -1) return null;
      data[collection][index] = {
        ...data[collection][index],
        ...updates,
        id: Number(id),
        updated_at: new Date().toISOString()
      };
      writeDb(data);
      return data[collection][index];
    },

    delete: (collection, id) => {
      const data = readDb();
      if (!data[collection]) return false;
      const prevLen = data[collection].length;
      data[collection] = data[collection].filter(item => item.id !== Number(id));
      if (data[collection].length !== prevLen) {
        writeDb(data);
        return true;
      }
      return false;
    },

    count: (collection, filterFn = () => true) => {
      const data = readDb();
      return (data[collection] || []).filter(filterFn).length;
    }
  },

  // Auth (Pure JS crypto & hash validation)
  authenticateAdmin: (username, password) => {
    const data = readDb();
    const hash = hashPassword(password);
    const user = data.admin_users.find(u => u.username === username && u.password_hash === hash);
    if (!user) return null;
    const token = `micm_admin_token_${user.id}_${Math.floor(100000 + Math.random() * 900000)}`;
    return {
      access_token: token,
      token_type: 'bearer',
      user: {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        role: user.role
      }
    };
  },

  verifyToken: (authHeader) => {
    if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
    const token = authHeader.split(' ')[1];
    return token.startsWith('micm_admin_token_');
  },

  // Notices
  getNotices: (activeOnly = true) => {
    const data = readDb();
    let list = data.notices || [];
    if (activeOnly) {
      list = list.filter(n => n.is_active !== 0);
    }
    return list.slice().reverse();
  },

  createNotice: (notice) => {
    const data = readDb();
    const newId = (data.notices.length > 0 ? Math.max(...data.notices.map(n => n.id)) : 0) + 1;
    const record = {
      id: newId,
      title: notice.title,
      category: notice.category || 'Admissions',
      date: notice.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-'),
      link: notice.link || '#',
      is_new: notice.is_new !== undefined ? notice.is_new : 1,
      is_active: 1,
      created_at: new Date().toISOString()
    };
    data.notices.push(record);
    writeDb(data);
    return record;
  },

  deleteNotice: (id) => {
    const data = readDb();
    data.notices = data.notices.filter(n => n.id !== Number(id));
    writeDb(data);
    return true;
  },

  // Applications
  getApplications: () => {
    const data = readDb();
    return (data.applications || []).slice().reverse();
  },

  getApplicationByNumber: (appNumber) => {
    const data = readDb();
    return data.applications.find(a => a.app_number === appNumber.trim());
  },

  createApplication: (app) => {
    const data = readDb();
    const newId = (data.applications.length > 0 ? Math.max(...data.applications.map(a => a.id)) : 0) + 1;
    const progCode = app.programme && app.programme.toUpperCase().includes('MBA') ? 'MBA' : 'HDCM';
    const year = new Date().getFullYear();
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const appNumber = `MICM-${year}-${progCode}-${randomDigits}`;

    const record = {
      id: newId,
      app_number: appNumber,
      programme: app.programme,
      full_name: app.full_name,
      gender: app.gender,
      dob: app.dob,
      category: app.category,
      father_name: app.father_name || '',
      email: app.email,
      phone: app.phone,
      address: app.address,
      qualification: app.qualification,
      grad_percentage: app.grad_percentage,
      entrance_exam: app.entrance_exam,
      entrance_roll: app.entrance_roll || '',
      entrance_score: app.entrance_score || '',
      documents_status: 'Verified Online',
      status: 'Submitted',
      created_at: new Date().toISOString()
    };

    data.applications.push(record);
    writeDb(data);
    return record;
  },

  // Enquiries
  getEnquiries: () => {
    const data = readDb();
    return (data.enquiries || []).slice().reverse();
  },

  createEnquiry: (enq) => {
    const data = readDb();
    const newId = (data.enquiries.length > 0 ? Math.max(...data.enquiries.map(e => e.id)) : 0) + 1;
    const record = {
      id: newId,
      full_name: enq.full_name,
      email: enq.email,
      phone: enq.phone,
      programme: enq.programme,
      message: enq.message || '',
      status: 'New',
      created_at: new Date().toISOString()
    };
    data.enquiries.push(record);
    writeDb(data);
    return record;
  },

  updateEnquiryStatus: (id, status) => {
    const data = readDb();
    const enq = data.enquiries.find(e => e.id === Number(id));
    if (enq) {
      enq.status = status;
      writeDb(data);
      return true;
    }
    return false;
  },

  // Grievances
  getGrievances: () => {
    const data = readDb();
    return (data.grievances || []).slice().reverse();
  },

  trackGrievance: (trackingId) => {
    const data = readDb();
    return data.grievances.find(g => g.tracking_id.toUpperCase() === trackingId.trim().toUpperCase());
  },

  createGrievance: (grv) => {
    const data = readDb();
    const newId = (data.grievances.length > 0 ? Math.max(...data.grievances.map(g => g.id)) : 0) + 1;
    const year = new Date().getFullYear();
    const randomChars = Math.random().toString(36).substring(2, 7).toUpperCase();
    const trackingId = `MICM-GRV-${year}-${randomChars}`;

    const record = {
      id: newId,
      tracking_id: trackingId,
      grievant_type: grv.grievant_type,
      full_name: grv.full_name,
      email: grv.email,
      phone: grv.phone,
      category: grv.category,
      subject: grv.subject,
      description: grv.description,
      status: 'Under Review',
      resolution_notes: 'Forwarded to Designated Grievance Officer',
      created_at: new Date().toISOString()
    };

    data.grievances.push(record);
    writeDb(data);
    return record;
  },

  // Faculty
  getFaculty: () => {
    const data = readDb();
    return (data.faculty || []).slice().sort((a, b) => (a.order_seq || 99) - (b.order_seq || 99));
  },

  createFaculty: (fac) => {
    const data = readDb();
    const newId = (data.faculty.length > 0 ? Math.max(...data.faculty.map(f => f.id)) : 0) + 1;
    const record = {
      id: newId,
      name: fac.name,
      designation: fac.designation,
      department: fac.department || 'Management Studies',
      qualifications: fac.qualifications,
      expertise: fac.expertise,
      email: fac.email || 'micmbbs@gmail.com',
      phone: fac.phone || '+91 674 2562826',
      image_url: fac.image_url || null,
      order_seq: fac.order_seq || 9
    };
    data.faculty.push(record);
    writeDb(data);
    return record;
  },

  deleteFaculty: (id) => {
    const data = readDb();
    data.faculty = data.faculty.filter(f => f.id !== Number(id));
    writeDb(data);
    return true;
  },

  // Banners
  getBanners: (activeOnly = true) => {
    const data = readDb();
    let list = data.banners || [];
    if (activeOnly) {
      list = list.filter(b => b.is_active !== 0);
    }
    return list.slice().sort((a, b) => (a.order_seq || 99) - (b.order_seq || 99));
  },

  createBanner: (bannerData) => {
    const data = readDb();
    if (!data.banners) data.banners = [];
    const newId = (data.banners.length > 0 ? Math.max(...data.banners.map(b => b.id)) : 0) + 1;
    const record = {
      id: newId,
      title: bannerData.title || "CONGRATULATIONS",
      subtitle: bannerData.subtitle || "",
      location: bannerData.location || "MADHUSUDAN INSTITUTE OF CO-OPERATIVE MANAGEMENT",
      bg: bannerData.bg || "from-[#0c2a5c] via-[#103a7d] to-[#0c2a5c]",
      image_url: bannerData.image_url || null,
      students: Array.isArray(bannerData.students) ? bannerData.students : [],
      is_active: bannerData.is_active !== undefined ? (bannerData.is_active ? 1 : 0) : 1,
      order_seq: bannerData.order_seq || data.banners.length + 1,
      created_at: new Date().toISOString()
    };
    data.banners.push(record);
    writeDb(data);
    return record;
  },

  updateBanner: (id, bannerData) => {
    const data = readDb();
    if (!data.banners) data.banners = [];
    const index = data.banners.findIndex(b => b.id === Number(id));
    if (index === -1) return null;
    data.banners[index] = {
      ...data.banners[index],
      ...bannerData,
      id: Number(id),
      updated_at: new Date().toISOString()
    };
    writeDb(data);
    return data.banners[index];
  },

  deleteBanner: (id) => {
    const data = readDb();
    if (!data.banners) data.banners = [];
    data.banners = data.banners.filter(b => b.id !== Number(id));
    writeDb(data);
    return true;
  },

  // Downloads
  getDownloads: () => {
    const data = readDb();
    return (data.downloads || []).slice().reverse();
  },

  // News
  getNews: () => {
    const data = readDb();
    return (data.news_events || []).filter(n => n.is_active !== 0).slice().reverse();
  },

  // Dashboard Stats
  getDashboardStats: () => {
    const data = readDb();
    return {
      enquiries_total: (data.enquiries || []).length,
      applications_total: (data.applications || []).length,
      active_notices: (data.notices || []).filter(n => n.is_active !== 0).length,
      grievances_total: (data.grievances || []).length,
      faculty_members: (data.faculty || []).length,
      banners_total: (data.banners || []).length,
      server_status: "Online (Next.js 14 Full-Stack)",
      last_backup: new Date().toLocaleString('en-GB')
    };
  }
};