import sqlite3
import os
import hashlib
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "micm_portal.db")

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    # 1. Admin Users
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS admin_users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        full_name TEXT NOT NULL,
        role TEXT DEFAULT 'admin',
        created_at TEXT NOT NULL
    )
    """)

    # 2. Notices / Announcements
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS notices (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        category TEXT DEFAULT 'Admissions',
        date TEXT NOT NULL,
        link TEXT DEFAULT '#',
        is_new INTEGER DEFAULT 1,
        is_active INTEGER DEFAULT 1,
        created_at TEXT NOT NULL
    )
    """)

    # 3. Admission Enquiries
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS enquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        programme TEXT NOT NULL,
        message TEXT,
        status TEXT DEFAULT 'New',
        created_at TEXT NOT NULL
    )
    """)

    # 4. Multi-step Online Applications
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        app_number TEXT UNIQUE NOT NULL,
        programme TEXT NOT NULL,
        full_name TEXT NOT NULL,
        gender TEXT NOT NULL,
        dob TEXT NOT NULL,
        category TEXT NOT NULL,
        father_name TEXT,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        address TEXT NOT NULL,
        qualification TEXT NOT NULL,
        grad_percentage TEXT NOT NULL,
        entrance_exam TEXT NOT NULL,
        entrance_roll TEXT,
        entrance_score TEXT,
        documents_status TEXT DEFAULT 'Uploaded Online',
        status TEXT DEFAULT 'Submitted',
        created_at TEXT NOT NULL
    )
    """)

    # 5. Faculty Directory
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS faculty (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        designation TEXT NOT NULL,
        department TEXT NOT NULL,
        qualifications TEXT NOT NULL,
        expertise TEXT NOT NULL,
        email TEXT DEFAULT 'micmbbs@gmail.com',
        phone TEXT DEFAULT '+91 674 2562826',
        image_url TEXT,
        order_seq INTEGER DEFAULT 1
    )
    """)

    # 6. News, Events & Gallery
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS news_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        category TEXT DEFAULT 'Academic Event',
        date TEXT NOT NULL,
        summary TEXT NOT NULL,
        content TEXT,
        image_url TEXT,
        is_active INTEGER DEFAULT 1,
        created_at TEXT NOT NULL
    )
    """)

    # 7. Online Grievances
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS grievances (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tracking_id TEXT UNIQUE NOT NULL,
        grievant_type TEXT NOT NULL,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        category TEXT NOT NULL,
        subject TEXT NOT NULL,
        description TEXT NOT NULL,
        status TEXT DEFAULT 'Pending Review',
        resolution_notes TEXT,
        created_at TEXT NOT NULL
    )
    """)

    # 8. Downloads Centre
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS downloads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        date TEXT NOT NULL,
        file_url TEXT NOT NULL,
        file_size TEXT DEFAULT '1.2 MB'
    )
    """)

    conn.commit()

    # Seed Default Admin (username: admin, password: admin@micm2026)
    cursor.execute("SELECT COUNT(*) FROM admin_users")
    if cursor.fetchone()[0] == 0:
        now = datetime.now().isoformat()
        cursor.execute("""
        INSERT INTO admin_users (username, password_hash, full_name, role, created_at)
        VALUES (?, ?, ?, ?, ?)
        """, ('admin', hash_password('admin@micm2026'), 'MICM Portal Administrator', 'superadmin', now))
        conn.commit()

    # Seed Notices if empty
    cursor.execute("SELECT COUNT(*) FROM notices")
    if cursor.fetchone()[0] == 0:
        sample_notices = [
            ("MBA 2026-28 Batch Prospectus & OJEE Counselling Guidelines Released", "Admissions", "12-Nov-2026", "/programmes", 1),
            ("Prospectus (2026-2027) Higher Diploma in Co-operative Management (HDCM)", "Admissions", "10-Nov-2026", "/programmes", 1),
            ("MICM received ISO 9001:2015 Certificate by STQC, MeitY, Govt. of India", "Compliance", "05-Nov-2026", "/about", 0),
            ("Recruitment for Post of Registrar, Finance Officer & Assistant Director 2026", "Careers", "01-Nov-2026", "/contact", 1),
            ("National Workshop on Primary Agricultural Credit Societies (PACS) Computerization", "Events", "25-Oct-2026", "/about", 0),
            ("Procurement Tender: High-End Workstations for Computing Centre", "Tenders", "20-Oct-2026", "/facilities", 0),
        ]
        now = datetime.now().isoformat()
        for title, cat, dt, link, is_new in sample_notices:
            cursor.execute("""
            INSERT INTO notices (title, category, date, link, is_new, is_active, created_at)
            VALUES (?, ?, ?, ?, ?, 1, ?)
            """, (title, cat, dt, link, is_new, now))
        conn.commit()

    # Seed Faculty if empty
    cursor.execute("SELECT COUNT(*) FROM faculty")
    if cursor.fetchone()[0] == 0:
        sample_faculty = [
            ("Dr. P. Kannaiah", "Director", "Executive Administration & Management", "Ph.D., MBA, M.Com", "Cooperative Banking, Strategic Governance, Public Policy", 1),
            ("Dr. Sanjib Kumar Hota", "Dy. Director", "Academic Administration & Research", "Ph.D., MBA (HR & Mktg)", "Organizational Behavior, Rural Enterprise, Agri-Business", 2),
            ("Dr. P.K. Upadhyaya", "Guest Lecturer", "Management Studies", "Ph.D., M.Com, FICWA", "Financial Management, Cost Accounting, Project Finance", 3),
            ("Dr. Pranaba Nanda Das", "Lecturer", "Co-operative Management & Economics", "Ph.D., MA (Economics), HDCM", "Cooperative Law, Microfinance, Agricultural Credit", 4),
            ("Ms. Priyadarshini Dash", "Lecturer", "Business Administration & Quantitative Methods", "MBA, M.Phil", "Operations Research, Marketing Analytics, Business Stats", 5),
            ("Dr. Dilip Kumar Mahapatra", "Lecturer", "Financial Management & Banking", "Ph.D., MBA (Finance)", "Banking Technology, Risk Analysis, Cooperative Audit", 6),
        ]
        for name, desig, dept, qual, exp, seq in sample_faculty:
            cursor.execute("""
            INSERT INTO faculty (name, designation, department, qualifications, expertise, order_seq)
            VALUES (?, ?, ?, ?, ?, ?)
            """, (name, desig, dept, qual, exp, seq))
        conn.commit()

    # Seed Downloads if empty
    cursor.execute("SELECT COUNT(*) FROM downloads")
    if cursor.fetchone()[0] == 0:
        sample_downloads = [
            ("MBA Syllabus & Academic Regulations (BPUT)", "Syllabus", "01-Aug-2026", "/programmes", "2.4 MB"),
            ("HDCM Course Structure & Study Module Guidelines", "Syllabus", "15-Jul-2026", "/programmes", "1.8 MB"),
            ("MICM Admission Brochure 2026-27 (Official)", "Brochure", "10-Nov-2026", "/programmes", "4.2 MB"),
            ("Student Code of Conduct & Anti-Ragging Affidavit Form", "Forms", "05-Aug-2026", "/about", "850 KB"),
            ("Hostel Accommodation Application & Rules Handbook", "Forms", "02-Aug-2026", "/facilities", "1.1 MB"),
            ("AICTE Extension of Approval (EOA) Letter 2026-27", "Compliance", "20-May-2026", "/about", "1.5 MB"),
            ("BPUT Affiliation Notification & Approved Seat Matrix", "Compliance", "28-May-2026", "/about", "920 KB"),
            ("Annual Report & Academic Audit 2025-26", "Reports", "15-Sep-2026", "/about", "5.6 MB"),
        ]
        for title, cat, dt, url, size in sample_downloads:
            cursor.execute("""
            INSERT INTO downloads (title, category, date, file_url, file_size)
            VALUES (?, ?, ?, ?, ?)
            """, (title, cat, dt, url, size))
        conn.commit()

    conn.close()

if __name__ == "__main__":
    init_db()
    print("Database initialized successfully!")
