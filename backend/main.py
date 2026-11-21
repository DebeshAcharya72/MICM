import os
import random
import string
from datetime import datetime
from typing import Optional, List
from fastapi import FastAPI, HTTPException, Depends, Header, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from database import get_connection, hash_password, init_db

# Initialize SQLite tables and seed data
init_db()

app = FastAPI(
    title="MICM Bhubaneswar - Official Institutional Portal API",
    description="Backend API powering Admissions, Dynamic Notice Board, Online Applications, Grievance Redressal, Faculty Directory, and Admin CMS for Madhusudan Institute of Co-operative Management, Bhubaneswar.",
    version="2.0.0"
)

# Enable CORS for React frontend (ports 5173, 5174, 3000, 8000, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------------------
# PYDANTIC SCHEMAS
# -------------------------------------------------------------

class LoginRequest(BaseModel):
    username: str
    password: str

class NoticeCreate(BaseModel):
    title: str
    category: str = "Admissions"
    date: Optional[str] = None
    link: Optional[str] = "#"
    is_new: Optional[int] = 1

class EnquiryCreate(BaseModel):
    full_name: str
    email: str
    phone: str
    programme: str
    message: Optional[str] = ""

class ApplicationCreate(BaseModel):
    programme: str  # MBA or HDCM
    full_name: str
    gender: str
    dob: str
    category: str
    father_name: Optional[str] = ""
    email: str
    phone: str
    address: str
    qualification: str
    grad_percentage: str
    entrance_exam: str  # OJEE, CAT, MAT, CMAT, None
    entrance_roll: Optional[str] = ""
    entrance_score: Optional[str] = ""

class GrievanceCreate(BaseModel):
    grievant_type: str  # Student, Parent, Staff, Public
    full_name: str
    email: str
    phone: str
    category: str  # Academic, Examination, Hostel, Ragging, Administrative, Other
    subject: str
    description: str

class GrievanceUpdate(BaseModel):
    status: str
    resolution_notes: str

class FacultyCreate(BaseModel):
    name: str
    designation: str
    department: str
    qualifications: str
    expertise: str
    email: Optional[str] = "micmbbs@gmail.com"
    phone: Optional[str] = "+91 674 2562826"
    image_url: Optional[str] = None
    order_seq: Optional[int] = 1

class NewsCreate(BaseModel):
    title: str
    category: str = "Academic Event"
    date: Optional[str] = None
    summary: str
    content: Optional[str] = ""
    image_url: Optional[str] = None

# Helper authentication verification
def verify_admin_token(authorization: Optional[str] = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid authentication token")
    token = authorization.split(" ")[1]
    # Simple simulated token check for the admin session
    if not token.startswith("micm_admin_token_"):
        raise HTTPException(status_code=401, detail="Session expired or invalid token")
    return token

# -------------------------------------------------------------
# ROOT & HEALTH
# -------------------------------------------------------------

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "Madhusudan Institute of Co-operative Management (MICM) API",
        "timestamp": datetime.now().isoformat(),
        "database": "SQLite Initialized & Connected"
    }

# -------------------------------------------------------------
# AUTH & ADMIN LOGIN
# -------------------------------------------------------------

@app.post("/api/auth/login")
def login(creds: LoginRequest):
    conn = get_connection()
    cursor = conn.cursor()
    pwd_hash = hash_password(creds.password)
    
    cursor.execute("""
        SELECT id, username, full_name, role FROM admin_users 
        WHERE username = ? AND password_hash = ?
    """, (creds.username, pwd_hash))
    user = cursor.fetchone()
    conn.close()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid administrator credentials")

    token = f"micm_admin_token_{user['id']}_{random.randint(100000, 999999)}"
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user["id"],
            "username": user["username"],
            "full_name": user["full_name"],
            "role": user["role"]
        }
    }

@app.get("/api/auth/me")
def get_current_user(token: str = Depends(verify_admin_token)):
    return {
        "authenticated": True,
        "role": "admin",
        "institution": "Madhusudan Institute of Co-operative Management, Bhubaneswar"
    }

# -------------------------------------------------------------
# NOTICES & ANNOUNCEMENTS (CRUD)
# -------------------------------------------------------------

@app.get("/api/notices")
def get_notices(active_only: bool = True):
    conn = get_connection()
    cursor = conn.cursor()
    if active_only:
        cursor.execute("SELECT * FROM notices WHERE is_active = 1 ORDER BY id DESC")
    else:
        cursor.execute("SELECT * FROM notices ORDER BY id DESC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

@app.post("/api/notices")
def create_notice(item: NoticeCreate, token: str = Depends(verify_admin_token)):
    conn = get_connection()
    cursor = conn.cursor()
    now_date = item.date or datetime.now().strftime("%d-%b-%Y")
    now_iso = datetime.now().isoformat()
    cursor.execute("""
        INSERT INTO notices (title, category, date, link, is_new, is_active, created_at)
        VALUES (?, ?, ?, ?, ?, 1, ?)
    """, (item.title, item.category, now_date, item.link, item.is_new, now_iso))
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    return {"id": new_id, "message": "Notice published successfully"}

@app.put("/api/notices/{notice_id}")
def update_notice(notice_id: int, item: NoticeCreate, token: str = Depends(verify_admin_token)):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE notices 
        SET title = ?, category = ?, link = ?, is_new = ?
        WHERE id = ?
    """, (item.title, item.category, item.link, item.is_new, notice_id))
    conn.commit()
    conn.close()
    return {"message": "Notice updated successfully"}

@app.delete("/api/notices/{notice_id}")
def delete_notice(notice_id: int, token: str = Depends(verify_admin_token)):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM notices WHERE id = ?", (notice_id,))
    conn.commit()
    conn.close()
    return {"message": "Notice removed"}

# -------------------------------------------------------------
# ADMISSION ENQUIRIES
# -------------------------------------------------------------

@app.post("/api/enquiries")
def submit_enquiry(item: EnquiryCreate):
    conn = get_connection()
    cursor = conn.cursor()
    now_iso = datetime.now().isoformat()
    cursor.execute("""
        INSERT INTO enquiries (full_name, email, phone, programme, message, status, created_at)
        VALUES (?, ?, ?, ?, ?, 'New', ?)
    """, (item.full_name, item.email, item.phone, item.programme, item.message, now_iso))
    conn.commit()
    enquiry_id = cursor.lastrowid
    conn.close()
    return {
        "id": enquiry_id,
        "message": f"Thank you {item.full_name}. Your enquiry for {item.programme} has been received. Our admission desk will connect with you shortly.",
        "email_alert_status": "Simulated dispatch sent to applicant & admissions desk"
    }

@app.get("/api/enquiries")
def get_enquiries(token: str = Depends(verify_admin_token)):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM enquiries ORDER BY id DESC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

@app.put("/api/enquiries/{enquiry_id}/status")
def update_enquiry_status(enquiry_id: int, status: str, token: str = Depends(verify_admin_token)):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE enquiries SET status = ? WHERE id = ?", (status, enquiry_id))
    conn.commit()
    conn.close()
    return {"message": "Enquiry status updated"}

# -------------------------------------------------------------
# MULTI-STEP ONLINE APPLICATIONS
# -------------------------------------------------------------

@app.post("/api/applications")
def submit_application(item: ApplicationCreate):
    conn = get_connection()
    cursor = conn.cursor()
    
    # Auto-generate distinctive application number: e.g. MICM-2026-MBA-49210
    prog_code = "MBA" if "MBA" in item.programme.upper() else "HDCM"
    year = datetime.now().year
    random_digits = "".join(random.choices(string.digits, k=5))
    app_number = f"MICM-{year}-{prog_code}-{random_digits}"
    
    now_iso = datetime.now().isoformat()
    cursor.execute("""
        INSERT INTO applications (
            app_number, programme, full_name, gender, dob, category, father_name,
            email, phone, address, qualification, grad_percentage, entrance_exam,
            entrance_roll, entrance_score, documents_status, status, created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Verified Online', 'Submitted', ?)
    """, (
        app_number, item.programme, item.full_name, item.gender, item.dob, item.category,
        item.father_name, item.email, item.phone, item.address, item.qualification,
        item.grad_percentage, item.entrance_exam, item.entrance_roll, item.entrance_score, now_iso
    ))
    conn.commit()
    app_id = cursor.lastrowid
    conn.close()

    return {
        "success": True,
        "application_id": app_id,
        "application_number": app_number,
        "programme": item.programme,
        "applicant_name": item.full_name,
        "submission_time": now_iso,
        "message": f"Application successfully registered! Your Application Number is {app_number}. A confirmation email alert has been generated."
    }

@app.get("/api/applications")
def get_applications(token: str = Depends(verify_admin_token)):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM applications ORDER BY id DESC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

@app.get("/api/applications/{app_number}")
def get_application_by_number(app_number: str):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM applications WHERE app_number = ?", (app_number.strip(),))
    row = cursor.fetchone()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="Application Number not found")
    return dict(row)

# -------------------------------------------------------------
# ONLINE GRIEVANCE REDRESSAL
# -------------------------------------------------------------

@app.post("/api/grievances")
def submit_grievance(item: GrievanceCreate):
    conn = get_connection()
    cursor = conn.cursor()
    
    # Auto-generate tracking ID: MICM-GRV-2026-XXXXX
    year = datetime.now().year
    rand_chars = "".join(random.choices(string.ascii_uppercase + string.digits, k=5))
    tracking_id = f"MICM-GRV-{year}-{rand_chars}"
    
    now_iso = datetime.now().isoformat()
    cursor.execute("""
        INSERT INTO grievances (
            tracking_id, grievant_type, full_name, email, phone, category,
            subject, description, status, resolution_notes, created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Under Review', 'Forwarded to Designated Grievance Officer', ?)
    """, (
        tracking_id, item.grievant_type, item.full_name, item.email, item.phone,
        item.category, item.subject, item.description, now_iso
    ))
    conn.commit()
    conn.close()

    return {
        "success": True,
        "tracking_id": tracking_id,
        "message": f"Your grievance has been submitted under tracking ID {tracking_id}. It has been forwarded to the Designated Grievance Officer."
    }

@app.get("/api/grievances/track/{tracking_id}")
def track_grievance(tracking_id: str):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM grievances WHERE tracking_id = ?", (tracking_id.strip(),))
    row = cursor.fetchone()
    conn.close()
    if not row:
        raise HTTPException(status_code=404, detail="Grievance Tracking ID not found")
    return dict(row)

@app.get("/api/grievances")
def list_grievances(token: str = Depends(verify_admin_token)):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM grievances ORDER BY id DESC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

@app.put("/api/grievances/{grievance_id}")
def update_grievance(grievance_id: int, update_data: GrievanceUpdate, token: str = Depends(verify_admin_token)):
    conn = get_connection()
    cursor = conn.cursor()
    
    # Check if it exists
    cursor.execute("SELECT id FROM grievances WHERE id = ?", (grievance_id,))
    if not cursor.fetchone():
        conn.close()
        raise HTTPException(status_code=404, detail="Grievance not found")
        
    # Update it
    cursor.execute("""
        UPDATE grievances 
        SET status = ?, resolution_notes = ?
        WHERE id = ?
    """, (update_data.status, update_data.resolution_notes, grievance_id))
    
    conn.commit()
    conn.close()
    
    return {"success": True, "message": "Grievance status updated successfully"}

# -------------------------------------------------------------
# FACULTY DIRECTORY (CRUD)
# -------------------------------------------------------------

@app.get("/api/faculty")
def get_faculty():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM faculty ORDER BY order_seq ASC, id ASC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

@app.post("/api/faculty")
def create_faculty(item: FacultyCreate, token: str = Depends(verify_admin_token)):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO faculty (name, designation, department, qualifications, expertise, email, phone, image_url, order_seq)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (item.name, item.designation, item.department, item.qualifications, item.expertise, item.email, item.phone, item.image_url, item.order_seq))
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    return {"id": new_id, "message": "Faculty member added successfully"}

@app.delete("/api/faculty/{faculty_id}")
def delete_faculty(faculty_id: int, token: str = Depends(verify_admin_token)):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM faculty WHERE id = ?", (faculty_id,))
    conn.commit()
    conn.close()
    return {"message": "Faculty member removed"}

# -------------------------------------------------------------
# NEWS, EVENTS & GALLERY (CRUD)
# -------------------------------------------------------------

@app.get("/api/news")
def get_news():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM news_events WHERE is_active = 1 ORDER BY id DESC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

@app.post("/api/news")
def create_news(item: NewsCreate, token: str = Depends(verify_admin_token)):
    conn = get_connection()
    cursor = conn.cursor()
    now_date = item.date or datetime.now().strftime("%d-%b-%Y")
    now_iso = datetime.now().isoformat()
    cursor.execute("""
        INSERT INTO news_events (title, category, date, summary, content, image_url, is_active, created_at)
        VALUES (?, ?, ?, ?, ?, ?, 1, ?)
    """, (item.title, item.category, now_date, item.summary, item.content, item.image_url, now_iso))
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    return {"id": new_id, "message": "News event published"}

# -------------------------------------------------------------
# DOWNLOADS CENTRE
# -------------------------------------------------------------

@app.get("/api/downloads")
def get_downloads():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM downloads ORDER BY id DESC")
    rows = cursor.fetchall()
    conn.close()
    return [dict(row) for row in rows]

# -------------------------------------------------------------
# ADMIN DASHBOARD STATS
# -------------------------------------------------------------

@app.get("/api/stats/dashboard")
def get_dashboard_stats(token: str = Depends(verify_admin_token)):
    conn = get_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT COUNT(*) FROM enquiries")
    enquiries_count = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM applications")
    apps_count = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM notices WHERE is_active = 1")
    notices_count = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM grievances")
    grievances_count = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM faculty")
    faculty_count = cursor.fetchone()[0]

    conn.close()

    return {
        "enquiries_total": enquiries_count,
        "applications_total": apps_count,
        "active_notices": notices_count,
        "grievances_total": grievances_count,
        "faculty_members": faculty_count,
        "server_status": "Online (FastAPI Python 3.10)",
        "last_backup": datetime.now().strftime("%d-%b-%Y %H:%M")
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
