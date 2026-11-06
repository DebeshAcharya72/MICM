export const programmesData = [
  {
    id: "mba",
    code: "MBA",
    title: "Master of Business Administration",
    badge: "Postgraduate Degree",
    level: "Postgraduate (PG)",
    affiliation: "Affiliated to BPUT, Rourkela & Approved by AICTE",
    duration: "2 Years",
    semesters: "4 Semesters",
    semesterDuration: "16 Weeks per Semester",
    eligibility: "Graduation in any discipline from a recognised university with valid OJEE Rank.",
    admissionProcess: "Admission through Odisha Joint Entrance Examination (OJEE) central counselling process.",
    internship: "7-Week Summer Internship Project (SIP) with leading corporate and cooperative organisations.",
    totalFee: "₹1,22,400",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "A comprehensive 2-year full-time post-graduate management degree designed to nurture managerial acumen, analytical problem-solving, and executive leadership skills.",
    highlights: [
      "AICTE approved and affiliated to BPUT, Rourkela",
      "7-week structured summer internship program",
      "Rigorous 4-semester curriculum (16 weeks/sem)",
      "Dedicated pre-placement and career preparation modules",
      "Full access to 17,000+ library volumes and computing center"
    ],
    feeStructure: {
      firstYear: [
        { component: "Tuition Fee", amount: 50000, formatted: "₹50,000" },
        { component: "Registration Fee", amount: 4500, formatted: "₹4,500" },
        { component: "Caution Deposit (Refundable)", amount: 2000, formatted: "₹2,000" },
        { component: "Seminar Fee", amount: 1500, formatted: "₹1,500" },
        { component: "Pre-placement Fee", amount: 8400, formatted: "₹8,400" },
      ],
      firstYearTotal: { component: "Total First Year", amount: 66400, formatted: "₹66,400" },
      secondYear: [
        { component: "Tuition Fee", amount: 50000, formatted: "₹50,000" },
        { component: "Registration Fee", amount: 4500, formatted: "₹4,500" },
        { component: "Seminar Fee", amount: 1500, formatted: "₹1,500" },
      ],
      secondYearTotal: { component: "Total Second Year", amount: 56000, formatted: "₹56,000" },
      grandTotal: { component: "Grand Total (2 Years)", amount: 122400, formatted: "₹1,22,400" }
    }
  },
  {
    id: "hdcm",
    code: "HDCM",
    title: "Higher Diploma in Co-operative Management",
    badge: "Professional Diploma",
    level: "Diploma / Professional Certification",
    affiliation: "National Council for Cooperative Training (NCCT), New Delhi",
    duration: "36 Weeks",
    mode: "Correspondence",
    batch: "2026-27",
    seats: 30,
    eligibility: "Graduate in any discipline from a recognised university.",
    admissionProcess: "Direct application to MICM, Bhubaneswar as per NCCT institutional guidelines.",
    totalFee: "₹22,500",
    feeNote: "The total fee of ₹22,500 includes boarding and lodging expenses during scheduled contact classes and examinations.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
    shortDescription: "A prestigious 36-week professional diploma conducted in correspondence mode tailored for working professionals, cooperative functionaries, and graduates seeking sectoral expertise.",
    highlights: [
      "Sanctioned intake strictly limited to 30 seats",
      "Flexible correspondence format tailored for working personnel",
      "Fee includes boarding and lodging during contact classes & exams",
      "Comprehensive training in cooperative legislation, finance, and management",
      "Conducted under the auspices of NCCT, Ministry of Co-operation"
    ],
    feeStructure: {
      singleFee: [
        { component: "Comprehensive Course Fee", amount: 22500, formatted: "₹22,500" }
      ],
      includes: "Includes tuition, study materials, boarding, and lodging during contact classes and examinations."
    }
  }
];
