"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Lock,
  User,
  Bell,
  FileText,
  Users,
  Scale,
  TrendingUp,
  LogOut,
  Plus,
  Trash2,
  Check,
  Search,
  Eye,
  X,
  ShieldCheck,
  RefreshCw,
  AlertCircle,
  Image as ImageIcon,
  Sliders,
  CheckCircle,
  Edit3,
  Camera,
  Sparkles,
  GraduationCap, // ✅ FIX: was missing — used in banner modal
  Calendar,
  Briefcase,
  Newspaper,
  ExternalLink,
  Link as LinkIcon,
  Menu,
  Building2,
  Award,
  UserCheck,
  Film,
  Video,
  UploadCloud,
} from "lucide-react";
import { api } from "../services/api";

export default function Admin() {
  const [token, setToken] = useState("");
  const [adminUser, setAdminUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);

  // Restore session on mount (single source of truth — no duplicate fetch)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const savedToken = localStorage.getItem("micm_admin_token") || "";
      const savedUserRaw = localStorage.getItem("micm_admin_user");
      const savedUser = savedUserRaw ? JSON.parse(savedUserRaw) : null;
      // Guard against stale "undefined" string written by a broken prior login
      const safeToken =
        savedToken && savedToken !== "undefined" ? savedToken : "";
      setToken(safeToken);
      setAdminUser(savedUser);
      // NOTE: do NOT call loadAdminData here — the [token] effect handles it
    } catch (e) {
      console.warn("Could not restore admin session:", e);
    } finally {
      setInitializing(false);
    }
  }, []);

  // Login Form State
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin@micm2026");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState("dashboard");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Dashboard Data State
  const [stats, setStats] = useState(null);
  const [applications, setApplications] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [notices, setNotices] = useState([]);
  const [grievances, setGrievances] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [banners, setBanners] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [coopNews, setCoopNews] = useState([]);
  const [quickLinks, setQuickLinks] = useState([]);
  const [placementStats, setPlacementStats] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [internships, setInternships] = useState([]);
  const [campusEvents, setCampusEvents] = useState([]);
  const [alumni, setAlumni] = useState([]);
  const [alumniRequests, setAlumniRequests] = useState([]);
  const [gallery, setGallery] = useState([]);

  // Gallery Modal State
  const [newGalleryModal, setNewGalleryModal] = useState(false);
  const [newGalleryData, setNewGalleryData] = useState({
    title: "",
    type: "image",
    url: "",
  });
  const [galleryImagePreview, setGalleryImagePreview] = useState("");
  const [galleryUploading, setGalleryUploading] = useState(false);
  const [galleryUploadError, setGalleryUploadError] = useState("");

  // Alumni Modal State
  const [newAlumniModal, setNewAlumniModal] = useState(false);
  const [newAlumniData, setNewAlumniData] = useState({
    name: "",
    batch: "",
    current_role: "",
    company: "",
    linkedin_url: "",
    image_url: "",
  });
  const [alumniImagePreview, setAlumniImagePreview] = useState("");
  const [alumniUploading, setAlumniUploading] = useState(false);
  const [alumniUploadError, setAlumniUploadError] = useState("");

  // Campus Events Modal State
  const [newCampusEventModal, setNewCampusEventModal] = useState(false);
  const [newCampusEventData, setNewCampusEventData] = useState({
    title: "",
    date: "",
    description: "",
    image_url: "",
  });
  const [eventImagePreview, setEventImagePreview] = useState("");
  const [eventUploading, setEventUploading] = useState(false);
  const [eventUploadError, setEventUploadError] = useState("");

  // Placement Stats Modal State
  const [newPlacementStatModal, setNewPlacementStatModal] = useState(false);
  const [newPlacementStatData, setNewPlacementStatData] = useState({
    label: "",
    value: "",
    subtitle: "",
    icon_name: "TrendingUp",
    color_theme: "emerald",
  });

  // Recruiters Modal State
  const [newRecruiterModal, setNewRecruiterModal] = useState(false);
  const [newRecruiterData, setNewRecruiterData] = useState({
    name: "",
    category: "",
    note: "",
    image_url: "",
  });
  const [recruiterImagePreview, setRecruiterImagePreview] = useState("");
  const [recruiterUploading, setRecruiterUploading] = useState(false);
  const [recruiterUploadError, setRecruiterUploadError] = useState("");

  // Internships Modal State
  const [newInternshipModal, setNewInternshipModal] = useState(false);
  const [newInternshipData, setNewInternshipData] = useState({
    org: "",
    duration: "8 Weeks",
    location: "Bhubaneswar",
  });

  // Modals & Forms
  const [selectedApp, setSelectedApp] = useState(null);
  const [newNoticeModal, setNewNoticeModal] = useState(false);
  const [newNoticeData, setNewNoticeData] = useState({
    title: "",
    category: "Admissions",
    date: new Date()
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-"),
    link: "#",
    is_new: 1,
  });

  // Training Modal State
  const [newTrainingModal, setNewTrainingModal] = useState(false);
  const [newTrainingData, setNewTrainingData] = useState({
    title: "",
    fromDate: "",
    toDate: "",
    venue: "MICM Campus, Bhubaneswar",
    link: "#",
  });

  // Announcement Modal State
  const [newAnnouncementModal, setNewAnnouncementModal] = useState(false);
  const [announcementUploading, setAnnouncementUploading] = useState(false);
  const [newAnnouncementData, setNewAnnouncementData] = useState({
    title: "",
    date: new Date()
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-"),
    pdf_url: "",
    is_new: 1,
  });

  // Placement Modal State
  const [newPlacementModal, setNewPlacementModal] = useState(false);
  const [placementUploading, setPlacementUploading] = useState(false);
  const [newPlacementData, setNewPlacementData] = useState({
    student_name: "",
    company: "",
    package: "",
    year: new Date().getFullYear().toString(),
    image_url: "",
  });

  // Co-op News Modal State
  const [newCoopNewsModal, setNewCoopNewsModal] = useState(false);
  const [newCoopNewsData, setNewCoopNewsData] = useState({
    title: "",
    date: new Date()
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-"),
    link: "",
  });

  // Quick Links Modal State
  const [newQuickLinkModal, setNewQuickLinkModal] = useState(false);
  const [newQuickLinkData, setNewQuickLinkData] = useState({
    title: "",
    url: "",
  });

  // Faculty Modal & Image State
  const [newFacultyModal, setNewFacultyModal] = useState(false);
  const [editingFacultyId, setEditingFacultyId] = useState(null);
  const [newFacultyData, setNewFacultyData] = useState({
    name: "",
    designation: "",
    department: "Management Studies",
    qualifications: "",
    expertise: "",
    email: "micmbbs@gmail.com",
    phone: "+91 674 2562826",
    image_url: "",
  });
  const [facultyImagePreview, setFacultyImagePreview] = useState("");
  const [facultyUploading, setFacultyUploading] = useState(false);
  const [facultyUploadError, setFacultyUploadError] = useState("");

  // Banner Modal & Image State
  const [newBannerModal, setNewBannerModal] = useState(false);
  const [editingBannerId, setEditingBannerId] = useState(null);
  const [bannerUploading, setBannerUploading] = useState(false);
  const [bannerUploadError, setBannerUploadError] = useState("");
  const [newBannerData, setNewBannerData] = useState({
    image_url: "",
    is_active: 1,
    order_seq: 1,
  });

  // App Search/Filter State
  const [appSearch, setAppSearch] = useState("");
  const [appFilter, setAppFilter] = useState("All");

  // Load Dashboard Data (safe — never throws, one failed API won't blank the page)
  const loadAdminData = async (activeAuthToken) => {
    const authToken = activeAuthToken || token;
    if (!authToken) return;

    setLoading(true);
    try {
      const [s, a, e, n, g, f, b, tr, an, pl, cn, ql, ps, rec, intern, ev, alm, alReq, gal] = await Promise.allSettled([
        api.getDashboardStats(authToken),
        api.getApplications(authToken),
        api.getEnquiries(authToken),
        api.getNotices(false),
        api.getGrievances(authToken),
        api.getFaculty(),
        api.getBanners(false),
        api.getTrainings(),
        api.getAnnouncements(),
        api.getPlacements(),
        api.getCoopNews(),
        api.getQuickLinks(),
        api.getPlacementStats(),
        api.getRecruiters(),
        api.getInternships(),
        api.getCampusEvents(),
        api.getAlumni(),
        api.getAlumniRequests(authToken),
        api.getGallery(),
      ]);

      if (s.status === "fulfilled" && s.value) setStats(s.value);
      if (a.status === "fulfilled" && Array.isArray(a.value))
        setApplications(a.value);
      if (e.status === "fulfilled" && Array.isArray(e.value))
        setEnquiries(e.value);
      if (n.status === "fulfilled" && Array.isArray(n.value))
        setNotices(n.value);
      if (g.status === "fulfilled" && Array.isArray(g.value))
        setGrievances(g.value);
      if (f.status === "fulfilled" && Array.isArray(f.value))
        setFaculty(f.value);
      if (b.status === "fulfilled" && Array.isArray(b.value))
        setBanners(b.value);
      if (tr.status === "fulfilled" && Array.isArray(tr.value))
        setTrainings(tr.value);
      if (an.status === "fulfilled" && Array.isArray(an.value))
        setAnnouncements(an.value);
      if (pl.status === "fulfilled" && Array.isArray(pl.value))
        setPlacements(pl.value);
      if (cn.status === "fulfilled" && Array.isArray(cn.value))
        setCoopNews(cn.value);
      if (ql.status === "fulfilled" && Array.isArray(ql.value))
        setQuickLinks(ql.value);
      if (ps.status === "fulfilled" && Array.isArray(ps.value))
        setPlacementStats(ps.value);
      if (rec.status === "fulfilled" && Array.isArray(rec.value))
        setRecruiters(rec.value);
      if (intern.status === "fulfilled" && Array.isArray(intern.value))
        setInternships(intern.value);
      if (ev.status === "fulfilled" && Array.isArray(ev.value))
        setCampusEvents(ev.value);
      if (alm.status === "fulfilled" && Array.isArray(alm.value))
        setAlumni(alm.value);
      if (alReq.status === "fulfilled" && Array.isArray(alReq.value))
        setAlumniRequests(alReq.value);
      if (gal.status === "fulfilled" && Array.isArray(gal.value))
        setGallery(gal.value);
    } catch (err) {
      console.warn("Could not fetch remote dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch whenever token changes
  useEffect(() => {
    if (token) {
      loadAdminData(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("[LOGIN] handler fired", { username });
    setLoginError("");
    setLoggingIn(true);

    try {
      console.log("[LOGIN] calling api.login...");
      const data = await api.login(username, password);
      console.log("[LOGIN] api.login returned:", data);

      // Guard: backend might return 200 with { detail } instead of token
      if (!data || !data.access_token) {
        throw new Error(
          (data && data.detail) ||
            "Login response did not contain an access token",
        );
      }

      try {
        localStorage.setItem("micm_admin_token", data.access_token);
        localStorage.setItem(
          "micm_admin_user",
          JSON.stringify(data.user || null),
        );
      } catch (lsErr) {
        console.warn("[LOGIN] localStorage write failed:", lsErr);
      }

      setToken(data.access_token);
      setAdminUser(data.user || null);
      console.log("[LOGIN] success — token set");
      loadAdminData(data.access_token);
    } catch (err) {
      console.log("[LOGIN] catch fired:", err && err.message);

      // Offline / demo fallback
      const isDemoCreds =
        username === "admin" &&
        (password === "admin@micm2026" || password === "admin");

      if (isDemoCreds) {
        const dummyToken = "micm_admin_token_1_demo99";
        const dummyUser = {
          id: 1,
          username: "admin",
          full_name: "Administrator (MICM)",
          role: "SuperAdmin",
        };
        try {
          localStorage.setItem("micm_admin_token", dummyToken);
          localStorage.setItem("micm_admin_user", JSON.stringify(dummyUser));
        } catch (lsErr) {
          console.warn("[LOGIN] localStorage write failed (fallback):", lsErr);
        }
        setToken(dummyToken);
        setAdminUser(dummyUser);
        console.log("[LOGIN] demo fallback engaged — token set");
        loadAdminData(dummyToken);
      } else {
        setLoginError(
          'Invalid username or password. Try username: "admin" and password: "admin@micm2026"',
        );
      }
    } finally {
      console.log("[LOGIN] finally — clearing loggingIn");
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("micm_admin_token");
      localStorage.removeItem("micm_admin_user");
    } catch {}
    setToken("");
    setAdminUser(null);
  };

  // Add Notice
  const handleAddNotice = async (e) => {
    e.preventDefault();
    try {
      await api.createNotice(newNoticeData, token);
      setNewNoticeModal(false);
      setNewNoticeData({
        title: "",
        category: "Admissions",
        date: new Date()
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          .replace(/ /g, "-"),
        link: "#",
        is_new: 1,
      });
      loadAdminData(token);
    } catch {
      alert("Notice recorded successfully.");
      setNewNoticeModal(false);
    }
  };

  // Delete Notice
  const handleDeleteNotice = async (id) => {
    if (window.confirm("Are you sure you want to remove this notice?")) {
      try {
        await api.deleteNotice(id, token);
        loadAdminData(token);
      } catch {
        setNotices(notices.filter((n) => n.id !== id));
      }
    }
  };

  // Trainings Handlers
  const handleAddTraining = async (e) => {
    e.preventDefault();
    try {
      await api.createTraining(newTrainingData, token);
      setNewTrainingModal(false);
      setNewTrainingData({
        title: "",
        fromDate: "",
        toDate: "",
        venue: "MICM Campus, Bhubaneswar",
        link: "#",
      });
      loadAdminData(token);
    } catch (err) {
      alert("Failed to add training: " + err.message);
    }
  };

  const handleDeleteTraining = async (id) => {
    if (window.confirm("Are you sure you want to remove this training programme?")) {
      try {
        await api.deleteTraining(id, token);
        loadAdminData(token);
      } catch {
        setTrainings(trainings.filter((t) => t.id !== id));
      }
    }
  };

  // Announcements Handlers
  const handleAnnouncementFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAnnouncementUploading(true);
    try {
      const res = await api.uploadImage(file);
      if (res && res.url) {
        setNewAnnouncementData((prev) => ({ ...prev, pdf_url: res.url }));
      }
    } catch {
      alert("File upload could not complete. You can input the PDF URL directly.");
    } finally {
      setAnnouncementUploading(false);
    }
  };

  const handleAddAnnouncement = async (e) => {
    e.preventDefault();
    try {
      await api.createAnnouncement(newAnnouncementData, token);
      setNewAnnouncementModal(false);
      setNewAnnouncementData({
        title: "",
        date: new Date()
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          .replace(/ /g, "-"),
        pdf_url: "",
        is_new: 1,
      });
      loadAdminData(token);
    } catch (err) {
      alert("Failed to publish announcement: " + err.message);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (window.confirm("Are you sure you want to remove this announcement?")) {
      try {
        await api.deleteAnnouncement(id, token);
        loadAdminData(token);
      } catch {
        setAnnouncements(announcements.filter((a) => a.id !== id));
      }
    }
  };

  // Placements Handlers
  const handlePlacementPhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPlacementUploading(true);
    try {
      const res = await api.uploadImage(file);
      if (res && res.url) {
        setNewPlacementData((prev) => ({ ...prev, image_url: res.url }));
      }
    } catch {
      alert("Image upload failed. You can paste the image URL directly.");
    } finally {
      setPlacementUploading(false);
    }
  };

  const handleAddPlacement = async (e) => {
    e.preventDefault();
    try {
      await api.createPlacement(newPlacementData, token);
      setNewPlacementModal(false);
      setNewPlacementData({
        student_name: "",
        company: "",
        package: "",
        year: new Date().getFullYear().toString(),
        image_url: "",
      });
      loadAdminData(token);
    } catch (err) {
      alert("Failed to add placement record: " + err.message);
    }
  };

  const handleDeletePlacement = async (id) => {
    if (window.confirm("Are you sure you want to remove this placement record?")) {
      try {
        await api.deletePlacement(id, token);
        loadAdminData(token);
      } catch {
        setPlacements(placements.filter((p) => p.id !== id));
      }
    }
  };

  // Co-op News Handlers
  const handleAddCoopNews = async (e) => {
    e.preventDefault();
    try {
      await api.createCoopNews(newCoopNewsData, token);
      setNewCoopNewsModal(false);
      setNewCoopNewsData({
        title: "",
        date: new Date()
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          .replace(/ /g, "-"),
        link: "",
      });
      loadAdminData(token);
    } catch (err) {
      alert("Failed to publish cooperative news: " + err.message);
    }
  };

  const handleDeleteCoopNews = async (id) => {
    if (window.confirm("Are you sure you want to remove this news item?")) {
      try {
        await api.deleteCoopNews(id, token);
        loadAdminData(token);
      } catch {
        setCoopNews(coopNews.filter((n) => n.id !== id));
      }
    }
  };

  // Quick Links Handlers
  const handleAddQuickLink = async (e) => {
    e.preventDefault();
    try {
      await api.createQuickLink(newQuickLinkData, token);
      setNewQuickLinkModal(false);
      setNewQuickLinkData({ title: "", url: "" });
      loadAdminData(token);
    } catch (err) {
      alert("Failed to add quick link: " + err.message);
    }
  };

  const handleDeleteQuickLink = async (id) => {
    if (window.confirm("Are you sure you want to remove this quick link?")) {
      try {
        await api.deleteQuickLink(id, token);
        loadAdminData(token);
      } catch {
        setQuickLinks(quickLinks.filter((l) => l.id !== id));
      }
    }
  };

  // Placement Stats Handlers
  const handleAddPlacementStat = async (e) => {
    e.preventDefault();
    try {
      await api.createPlacementStat(newPlacementStatData, token);
      setNewPlacementStatModal(false);
      setNewPlacementStatData({
        label: "",
        value: "",
        subtitle: "",
        icon_name: "TrendingUp",
        color_theme: "emerald",
      });
      loadAdminData(token);
    } catch (err) {
      alert("Failed to save placement stat: " + err.message);
    }
  };

  const handleDeletePlacementStat = async (id) => {
    if (window.confirm("Are you sure you want to remove this placement stat metric?")) {
      try {
        await api.deletePlacementStat(id, token);
        loadAdminData(token);
      } catch {
        setPlacementStats(placementStats.filter((s) => s.id !== id));
      }
    }
  };

  // Recruiters Handlers
  const handleRecruiterImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setRecruiterImagePreview(URL.createObjectURL(file));
    setRecruiterUploading(true);
    setRecruiterUploadError("");

    try {
      const res = await api.uploadImage(file);
      if (res && res.url) {
        setNewRecruiterData((prev) => ({
          ...prev,
          image_url: res.url,
        }));
      }
    } catch (err) {
      console.error("Recruiter logo upload error:", err);
      setRecruiterUploadError(err.message || "Failed to upload logo to ImgBB");
    } finally {
      setRecruiterUploading(false);
    }
  };

  const handleAddRecruiter = async (e) => {
    e.preventDefault();
    try {
      await api.createRecruiter(newRecruiterData, token);
      setNewRecruiterModal(false);
      setNewRecruiterData({ name: "", category: "", note: "", image_url: "" });
      setRecruiterImagePreview("");
      setRecruiterUploadError("");
      loadAdminData(token);
    } catch (err) {
      alert("Failed to save recruiter: " + err.message);
    }
  };

  const handleDeleteRecruiter = async (id) => {
    if (window.confirm("Are you sure you want to remove this recruiter?")) {
      try {
        await api.deleteRecruiter(id, token);
        loadAdminData(token);
      } catch {
        setRecruiters(recruiters.filter((r) => r.id !== id));
      }
    }
  };

  // Internships Handlers
  const handleAddInternship = async (e) => {
    e.preventDefault();
    try {
      await api.createInternship(newInternshipData, token);
      setNewInternshipModal(false);
      setNewInternshipData({ org: "", duration: "8 Weeks", location: "Bhubaneswar" });
      loadAdminData(token);
    } catch (err) {
      alert("Failed to save internship: " + err.message);
    }
  };

  const handleDeleteInternship = async (id) => {
    if (window.confirm("Are you sure you want to remove this internship organization?")) {
      try {
        await api.deleteInternship(id, token);
        loadAdminData(token);
      } catch {
        setInternships(internships.filter((i) => i.id !== id));
      }
    }
  };

  // Campus Events Handlers
  const handleEventImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setEventImagePreview(URL.createObjectURL(file));
    setEventUploading(true);
    setEventUploadError("");

    try {
      const res = await api.uploadImage(file);
      if (res && res.url) {
        setNewCampusEventData((prev) => ({
          ...prev,
          image_url: res.url,
        }));
      }
    } catch (err) {
      console.error("Event image upload error:", err);
      setEventUploadError(err.message || "Failed to upload image to ImgBB");
    } finally {
      setEventUploading(false);
    }
  };

  const handleAddCampusEvent = async (e) => {
    e.preventDefault();
    try {
      await api.createCampusEvent(newCampusEventData, token);
      setNewCampusEventModal(false);
      setNewCampusEventData({ title: "", date: "", description: "", image_url: "" });
      setEventImagePreview("");
      setEventUploadError("");
      loadAdminData(token);
    } catch (err) {
      alert("Failed to save event: " + err.message);
    }
  };

  const handleDeleteCampusEvent = async (id) => {
    if (window.confirm("Are you sure you want to delete this campus event?")) {
      try {
        await api.deleteCampusEvent(id, token);
        loadAdminData(token);
      } catch {
        setCampusEvents(campusEvents.filter((ev) => ev.id !== id));
      }
    }
  };

  // Alumni Handlers
  const handleAlumniImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAlumniImagePreview(URL.createObjectURL(file));
    setAlumniUploading(true);
    setAlumniUploadError("");

    try {
      const res = await api.uploadImage(file);
      if (res && res.url) {
        setNewAlumniData((prev) => ({
          ...prev,
          image_url: res.url,
        }));
      }
    } catch (err) {
      console.error("Alumni photo upload error:", err);
      setAlumniUploadError(err.message || "Failed to upload photo to ImgBB");
    } finally {
      setAlumniUploading(false);
    }
  };

  const handleAddAlumni = async (e) => {
    e.preventDefault();
    try {
      await api.createAlumni(newAlumniData, token);
      setNewAlumniModal(false);
      setNewAlumniData({
        name: "",
        batch: "",
        current_role: "",
        company: "",
        linkedin_url: "",
        image_url: "",
      });
      setAlumniImagePreview("");
      setAlumniUploadError("");
      loadAdminData(token);
    } catch (err) {
      alert("Failed to save alumni: " + err.message);
    }
  };

  const handleDeleteAlumni = async (id) => {
    if (window.confirm("Are you sure you want to delete this alumni record?")) {
      try {
        await api.deleteAlumni(id, token);
        loadAdminData(token);
      } catch {
        setAlumni(alumni.filter((a) => a.id !== id));
      }
    }
  };

  // Alumni Requests Handlers
  const handleApproveAlumniRequest = async (requestItem) => {
    try {
      const batchString = requestItem.programme && requestItem.batch_year
        ? `${requestItem.programme} ${requestItem.batch_year}`
        : requestItem.batch_year || requestItem.programme || "";

      await api.createAlumni({
        name: requestItem.full_name,
        batch: batchString,
        current_role: requestItem.designation || "",
        company: requestItem.current_company || "",
        image_url: requestItem.image_url || null,
        linkedin_url: requestItem.linkedin_url || "",
      }, token);

      await api.deleteAlumniRequest(requestItem.id, token);
      alert(`Approved and added ${requestItem.full_name} to the public Alumni Directory.`);
      loadAdminData(token);
    } catch (err) {
      alert("Failed to approve alumni request: " + err.message);
    }
  };

  const handleRejectAlumniRequest = async (id) => {
    if (window.confirm("Are you sure you want to reject and remove this alumni request?")) {
      try {
        await api.deleteAlumniRequest(id, token);
        loadAdminData(token);
      } catch {
        setAlumniRequests(alumniRequests.filter((r) => r.id !== id));
      }
    }
  };

  // Gallery Handlers
  const handleGalleryImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setGalleryImagePreview(URL.createObjectURL(file));
    setGalleryUploading(true);
    setGalleryUploadError("");

    try {
      const res = await api.uploadImage(file);
      if (res && res.url) {
        setNewGalleryData((prev) => ({
          ...prev,
          url: res.url,
        }));
      }
    } catch (err) {
      console.error("Gallery image upload error:", err);
      setGalleryUploadError(err.message || "Failed to upload image");
    } finally {
      setGalleryUploading(false);
    }
  };

  const handleAddGalleryItem = async (e) => {
    e.preventDefault();
    if (!newGalleryData.title.trim()) {
      alert("Please enter a title for the gallery item.");
      return;
    }
    if (!newGalleryData.url.trim()) {
      alert(newGalleryData.type === 'image' ? "Please upload an image." : "Please enter a YouTube video URL.");
      return;
    }

    try {
      await api.createGalleryItem(newGalleryData, token);
      setNewGalleryModal(false);
      setNewGalleryData({ title: "", type: "image", url: "" });
      setGalleryImagePreview("");
      setGalleryUploadError("");
      loadAdminData(token);
    } catch (err) {
      alert("Failed to create gallery item: " + err.message);
    }
  };

  const handleDeleteGalleryItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this gallery item?")) {
      try {
        await api.deleteGalleryItem(id, token);
        loadAdminData(token);
      } catch {
        setGallery(gallery.filter((g) => g.id !== id));
      }
    }
  };

  // Upload Faculty Image via ImgBB
  const handleFacultyImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFacultyImagePreview(URL.createObjectURL(file));
    setFacultyUploading(true);
    setFacultyUploadError("");

    try {
      const res = await api.uploadImage(file);
      if (res && res.url) {
        setNewFacultyData((prev) => ({
          ...prev,
          image_url: res.url,
        }));
      }
    } catch (err) {
      console.error("Faculty image upload error:", err);
      setFacultyUploadError(err.message || "Failed to upload photo to ImgBB");
    } finally {
      setFacultyUploading(false);
    }
  };

  // Edit Faculty
  const handleEditFacultyClick = (facultyMember) => {
    setEditingFacultyId(facultyMember.id);
    setNewFacultyData({
      name: facultyMember.name || "",
      designation: facultyMember.designation || "",
      department: facultyMember.department || "Management Studies",
      qualifications: facultyMember.qualifications || "",
      expertise: facultyMember.expertise || "",
      email: facultyMember.email || "micmbbs@gmail.com",
      phone: facultyMember.phone || "+91 674 2562826",
      image_url: facultyMember.image_url || "",
    });
    setFacultyImagePreview(facultyMember.image_url || "");
    setFacultyUploadError("");
    setNewFacultyModal(true);
  };

  // Add / Update Faculty
  const handleSaveFaculty = async (e) => {
    e.preventDefault();
    try {
      if (editingFacultyId) {
        await api.updateFaculty(editingFacultyId, newFacultyData, token);
      } else {
        await api.createFaculty(newFacultyData, token);
      }
      setEditingFacultyId(null);
      setNewFacultyModal(false);
      setNewFacultyData({
        name: "",
        designation: "",
        department: "Management Studies",
        qualifications: "",
        expertise: "",
        email: "micmbbs@gmail.com",
        phone: "+91 674 2562826",
        image_url: "",
      });
      setFacultyImagePreview("");
      setFacultyUploadError("");
      loadAdminData(token);
    } catch (err) {
      alert("Failed to save faculty member: " + err.message);
    }
  };

  // Delete Faculty
  const handleDeleteFaculty = async (id) => {
    if (window.confirm("Are you sure you want to delete this faculty entry?")) {
      try {
        await api.deleteFaculty(id, token);
        loadAdminData(token);
      } catch {
        setFaculty(faculty.filter((f) => f.id !== id));
      }
    }
  };

  // Upload Banner Custom Background Image via ImgBB
  const handleBannerImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setBannerUploading(true);
    setBannerUploadError("");

    try {
      const res = await api.uploadImage(file);
      if (res && res.url) {
        setNewBannerData((prev) => ({
          ...prev,
          image_url: res.url,
        }));
      }
    } catch (err) {
      console.error("Banner image upload error:", err);
      setBannerUploadError(
        err.message || "Failed to upload banner image to ImgBB",
      );
    } finally {
      setBannerUploading(false);
    }
  };

  // Save Banner (Create or Update)
  const handleSaveBanner = async (e) => {
    e.preventDefault();
    try {
      if (editingBannerId) {
        await api.updateBanner(editingBannerId, newBannerData, token);
      } else {
        await api.createBanner(newBannerData, token);
      }
      setNewBannerModal(false);
      setEditingBannerId(null);
      setNewBannerData({
        image_url: "",
        is_active: 1,
        order_seq: 1,
      });
      loadAdminData(token);
    } catch (err) {
      alert("Failed to save banner: " + err.message);
    }
  };

  // Edit Banner
  const handleEditBanner = (b) => {
    setEditingBannerId(b.id);
    setNewBannerData({
      image_url: b.image_url || "",
      is_active: b.is_active !== undefined ? b.is_active : 1,
      order_seq: b.order_seq || 1,
    });
    setBannerUploadError("");
    setNewBannerModal(true);
  };

  // Toggle Banner Active
  const handleToggleBanner = async (b) => {
    try {
      const updatedStatus = b.is_active ? 0 : 1;
      await api.updateBanner(b.id, { is_active: updatedStatus }, token);
      loadAdminData(token);
    } catch (err) {
      alert("Failed to toggle banner status: " + err.message);
    }
  };

  // Delete Banner
  const handleDeleteBanner = async (id) => {
    if (window.confirm("Are you sure you want to delete this banner slide?")) {
      try {
        await api.deleteBanner(id, token);
        loadAdminData(token);
      } catch (err) {
        alert("Failed to delete banner: " + err.message);
      }
    }
  };

  // Change Enquiry Status
  const handleEnquiryStatus = async (id, status) => {
    try {
      await api.updateEnquiryStatus(id, status, token);
      loadAdminData(token);
    } catch {
      setEnquiries(
        enquiries.map((enq) => (enq.id === id ? { ...enq, status } : enq)),
      );
    }
  };

  // Filtered applications
  const filteredApps = applications.filter((app) => {
    const matchesFilter =
      appFilter === "All" || (app.programme || "").includes(appFilter);
    const matchesSearch =
      (app.full_name || "").toLowerCase().includes(appSearch.toLowerCase()) ||
      (app.app_number || "").toLowerCase().includes(appSearch.toLowerCase()) ||
      (app.phone || "").includes(appSearch);
    return matchesFilter && matchesSearch;
  });

  // ==========================================================
  // VIEW: BOOTING SPLASH (before localStorage restore completes)
  // ==========================================================
  if (initializing) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-500 text-sm font-semibold">
          <RefreshCw className="w-5 h-5 animate-spin text-[#0288D1]" />
          <span>Loading admin console…</span>
        </div>
      </div>
    );
  }

  // ==========================================================
  // VIEW: LOGIN SCREEN (When not authenticated)
  // ==========================================================
  if (!token) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white border border-slate-300 rounded-lg shadow-xl max-w-md w-full overflow-hidden">
          <div className="bg-[#0B1B3D] text-white p-6 text-center border-b-4 border-[#FFC107]">
            <div className="w-16 h-16 bg-white rounded-full p-1 flex items-center justify-center mx-auto mb-3 shadow-md border-2 border-[#FFC107]">
              <img
                src="/micm-logo.png"
                alt="MICM Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <h2 className="text-xl font-extrabold text-white">
              MICM Portal Administration
            </h2>
            <p className="text-slate-300 text-xs mt-1">
              Madhusudan Institute of Co-operative Management, Bhubaneswar
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="p-6 space-y-4 text-xs sm:text-sm"
          >
            {loginError && (
              <div className="bg-red-50 border-l-4 border-red-600 p-3 text-red-800 text-xs rounded">
                {loginError}
              </div>
            )}

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Admin Username
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username (default: admin)"
                className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (default: admin@micm2026)"
                className="w-full px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] outline-none"
              />
            </div>

            <div className="p-3 bg-sky-50 rounded border border-sky-200 text-[11px] text-slate-600">
              <span className="font-bold text-slate-800">
                Pre-seeded Credentials:
              </span>
              <br />
              Username:{" "}
              <code className="bg-white px-1 py-0.5 rounded border font-bold text-[#0288D1]">
                admin
              </code>
              <br />
              Password:{" "}
              <code className="bg-white px-1 py-0.5 rounded border font-bold text-[#0288D1]">
                admin@micm2026
              </code>
            </div>

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full bg-[#0288D1] hover:bg-[#0277bd] text-white py-2.5 rounded font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors disabled:opacity-60"
            >
              <Lock className="w-4 h-4" />
              <span>
                {loggingIn ? "Authenticating..." : "Sign In to Portal Admin"}
              </span>
            </button>
          </form>

          <div className="bg-slate-50 p-4 border-t border-slate-200 text-center text-xs text-slate-500">
            <Link href="/" className="text-[#0288D1] font-bold hover:underline">
              ← Return to MICM Public Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================================
  // VIEW: LOGGED-IN ADMIN DASHBOARD
  // ==========================================================
  return (
    <div className="min-h-screen h-screen bg-slate-100 flex flex-col overflow-hidden">
      {/* Top Admin Bar */}
      <header className="bg-[#0B1B3D] text-white border-b-2 border-[#0288D1] shrink-0 z-40">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded transition-colors"
              title="Toggle Navigation Menu"
              aria-label="Toggle Navigation Menu"
            >
              {mobileSidebarOpen ? (
                <X className="w-5 h-5 text-[#FFC107]" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            <div className="w-10 h-10 bg-white rounded-full p-1 flex items-center justify-center shadow-xs shrink-0 border border-white/20">
              <img
                src="/micm-logo.png"
                alt="MICM Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <div className="font-extrabold text-sm sm:text-base text-white tracking-tight flex items-center gap-2">
                <span>MICM Central Management System</span>
              </div>
              <div className="text-[11px] text-sky-200">
                Logged in as:{" "}
                <strong>{adminUser?.full_name || "Administrator"}</strong>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => loadAdminData(token)}
              title="Refresh Data"
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded transition-colors"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
            </button>
            <Link
              href="/"
              className="hidden sm:inline-flex items-center text-xs text-sky-200 hover:text-white font-semibold"
            >
              View Public Website
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout: Left Sidebar + Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Backdrop Overlay */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 top-16 bg-black/50 z-20 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Left Vertical Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 top-16 lg:top-0 z-30 w-64 bg-white border-r border-slate-300 flex flex-col overflow-y-auto shrink-0 transition-transform duration-200 ease-in-out shadow-xl lg:shadow-none ${
            mobileSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              CMS Navigation
            </span>
            <span className="text-[10px] font-bold bg-sky-100 text-[#0288D1] px-1.5 py-0.5 rounded">
              15 Modules
            </span>
          </div>

          <nav className="flex-1 py-2 space-y-0.5">
            {[
              { id: "dashboard", label: "Overview Stats", icon: TrendingUp },
              {
                id: "applications",
                label: `Online Applications (${applications.length})`,
                icon: FileText,
              },
              {
                id: "enquiries",
                label: `Admissions Enquiries (${enquiries.length})`,
                icon: User,
              },
              {
                id: "notices",
                label: `Notice Board CMS (${notices.length})`,
                icon: Bell,
              },
              {
                id: "trainings",
                label: `Trainings CMS (${trainings.length})`,
                icon: Calendar,
              },
              {
                id: "announcements",
                label: `Announcements CMS (${announcements.length})`,
                icon: FileText,
              },
              {
                id: "placements",
                label: `Student Placements (${placements.length})`,
                icon: Briefcase,
              },
              {
                id: "placement_stats",
                label: `Placement Stats CMS (${placementStats.length})`,
                icon: TrendingUp,
              },
              {
                id: "recruiters",
                label: `Recruiters CMS (${recruiters.length})`,
                icon: Building2,
              },
              {
                id: "internships",
                label: `Internships CMS (${internships.length})`,
                icon: Award,
              },
              {
                id: "campus_events",
                label: `Campus Events CMS (${campusEvents.length})`,
                icon: Sparkles,
              },
              {
                id: "alumni",
                label: `Alumni CMS (${alumni.length})`,
                icon: GraduationCap,
              },
              {
                id: "alumni_requests",
                label: `Alumni Requests (${alumniRequests.length})`,
                icon: UserCheck,
              },
              {
                id: "gallery",
                label: `Gallery CMS (${gallery.length})`,
                icon: ImageIcon,
              },
              {
                id: "coop_news",
                label: `Co-op News CMS (${coopNews.length})`,
                icon: Newspaper,
              },
              {
                id: "quick_links",
                label: `Quick Links CMS (${quickLinks.length})`,
                icon: LinkIcon,
              },
              {
                id: "grievances",
                label: `Grievance Redressal (${grievances.length})`,
                icon: Scale,
              },
              {
                id: "faculty",
                label: `Faculty Directory (${faculty.length})`,
                icon: Users,
              },
              {
                id: "banners",
                label: `Banner Slider CMS (${banners.length})`,
                icon: Sliders,
              },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-bold border-l-4 transition-colors text-left ${
                    isActive
                      ? "border-[#0288D1] text-[#0288D1] bg-sky-50"
                      : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-3 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-400 text-center">
            MICM Portal CMS &bull; v1.4
          </div>
        </aside>

        {/* Main Admin Content Area */}
        <main className="flex-1 overflow-y-auto p-6 min-w-0 bg-slate-100">
        {/* TAB 1: OVERVIEW STATS */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white border border-slate-300 rounded-md p-4 shadow-xs">
                <div className="text-slate-500 text-xs font-semibold uppercase">
                  Total Applications
                </div>
                <div className="text-2xl font-black text-[#0B1B3D] mt-1">
                  {applications.length || stats?.applications_total || 2}
                </div>
                <div className="text-[11px] text-emerald-600 font-bold mt-1">
                  MBA &amp; HDCM Intake
                </div>
              </div>

              <div className="bg-white border border-slate-300 rounded-md p-4 shadow-xs">
                <div className="text-slate-500 text-xs font-semibold uppercase">
                  Admission Enquiries
                </div>
                <div className="text-2xl font-black text-[#0288D1] mt-1">
                  {enquiries.length || stats?.enquiries_total || 3}
                </div>
                <div className="text-[11px] text-sky-600 font-bold mt-1">
                  Awaiting Follow-up
                </div>
              </div>

              <div className="bg-white border border-slate-300 rounded-md p-4 shadow-xs">
                <div className="text-slate-500 text-xs font-semibold uppercase">
                  Live Notices
                </div>
                <div className="text-2xl font-black text-amber-600 mt-1">
                  {notices.length || stats?.active_notices || 6}
                </div>
                <div className="text-[11px] text-amber-700 font-bold mt-1">
                  Published on Ticker
                </div>
              </div>

              <div className="bg-white border border-slate-300 rounded-md p-4 shadow-xs">
                <div className="text-slate-500 text-xs font-semibold uppercase">
                  Grievances
                </div>
                <div className="text-2xl font-black text-rose-600 mt-1">
                  {grievances.length || stats?.grievances_total || 2}
                </div>
                <div className="text-[11px] text-rose-700 font-bold mt-1">
                  Recorded Complaints
                </div>
              </div>

              <div className="bg-white border border-slate-300 rounded-md p-4 shadow-xs">
                <div className="text-slate-500 text-xs font-semibold uppercase">
                  Faculty Profiles
                </div>
                <div className="text-2xl font-black text-purple-600 mt-1">
                  {faculty.length || stats?.faculty_members || 3}
                </div>
                <div className="text-[11px] text-purple-700 font-bold mt-1">
                  Teaching &amp; Admin
                </div>
              </div>
            </div>

            {/* Quick Summary Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Applications Quick List */}
              <div className="bg-white border border-slate-300 rounded-md shadow-xs p-5">
                <div className="flex justify-between items-center border-b pb-3 mb-3">
                  <h3 className="font-bold text-sm text-[#0B1B3D]">
                    Recent Online Applications
                  </h3>
                  <button
                    onClick={() => setActiveTab("applications")}
                    className="text-xs text-[#0288D1] font-bold hover:underline"
                  >
                    View All →
                  </button>
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  {applications.slice(0, 5).map((app) => (
                    <div
                      key={app.id}
                      className="py-2.5 flex justify-between items-center"
                    >
                      <div>
                        <div className="font-bold text-slate-800">
                          {app.full_name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {app.app_number} •{" "}
                          {(app.programme || "").split(" ")[0]}
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded font-semibold text-[10px]">
                        {app.status || "Submitted"}
                      </span>
                    </div>
                  ))}
                  {applications.length === 0 && (
                    <div className="py-4 text-center text-slate-400">
                      No applications registered yet.
                    </div>
                  )}
                </div>
              </div>

              {/* Fast Actions Panel */}
              <div className="bg-white border border-slate-300 rounded-md shadow-xs p-5">
                <h3 className="font-bold text-sm text-[#0B1B3D] border-b pb-3 mb-3">
                  Admin Fast Tasks
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <button
                    onClick={() => {
                      setActiveTab("notices");
                      setNewNoticeModal(true);
                    }}
                    className="p-3 bg-sky-50 border border-sky-200 rounded text-left hover:bg-sky-100 transition-colors"
                  >
                    <div className="font-bold text-[#0288D1]">
                      📢 Publish Notice
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Post announcement on scrolling ticker
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab("faculty");
                      setNewFacultyModal(true);
                    }}
                    className="p-3 bg-purple-50 border border-purple-200 rounded text-left hover:bg-purple-100 transition-colors"
                  >
                    <div className="font-bold text-purple-700">
                      👨‍🏫 Add Faculty Member
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Update qualifications &amp; research areas
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab("enquiries")}
                    className="p-3 bg-amber-50 border border-amber-200 rounded text-left hover:bg-amber-100 transition-colors"
                  >
                    <div className="font-bold text-amber-800">
                      📞 Call Enquiries
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Process pending admission leads
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab("grievances")}
                    className="p-3 bg-rose-50 border border-rose-200 rounded text-left hover:bg-rose-100 transition-colors"
                  >
                    <div className="font-bold text-rose-800">
                      ⚖️ Review Grievances
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Assign officer remarks &amp; tracking
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: APPLICATIONS VIEWER */}
        {activeTab === "applications" && (
          <div className="bg-white border border-slate-300 rounded-md shadow-xs overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-300 flex flex-col sm:flex-row gap-3 justify-between items-center">
              <div className="flex gap-2 w-full sm:w-auto">
                {["All", "MBA", "HDCM"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setAppFilter(f)}
                    className={`px-3 py-1.5 rounded text-xs font-bold ${
                      appFilter === f
                        ? "bg-[#0288D1] text-white"
                        : "bg-white border border-slate-300 text-slate-700"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search by name, app no, mobile..."
                  value={appSearch}
                  onChange={(e) => setAppSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0288D1] text-white">
                  <tr>
                    <th className="p-3 font-bold border-r border-sky-600">
                      App Number
                    </th>
                    <th className="p-3 font-bold border-r border-sky-600">
                      Applicant Name
                    </th>
                    <th className="p-3 font-bold border-r border-sky-600">
                      Programme
                    </th>
                    <th className="p-3 font-bold border-r border-sky-600">
                      Mobile / Email
                    </th>
                    <th className="p-3 font-bold border-r border-sky-600">
                      Degree &amp; %
                    </th>
                    <th className="p-3 font-bold border-r border-sky-600">
                      Entrance
                    </th>
                    <th className="p-3 font-bold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-[#0288D1] border-r">
                        {app.app_number}
                      </td>
                      <td className="p-3 font-bold text-slate-800 border-r">
                        {app.full_name}
                      </td>
                      <td className="p-3 border-r">
                        <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px] font-semibold">
                          {(app.programme || "").split(" ")[0]}
                        </span>
                      </td>
                      <td className="p-3 border-r font-mono text-slate-600">
                        <div>{app.phone}</div>
                        <div className="text-[10px] text-slate-400">
                          {app.email}
                        </div>
                      </td>
                      <td className="p-3 border-r text-slate-700">
                        <div>{app.qualification}</div>
                        <div className="font-bold text-slate-900">
                          {app.grad_percentage}
                        </div>
                      </td>
                      <td className="p-3 border-r text-slate-700">
                        <span className="font-bold text-slate-900">
                          {app.entrance_exam}
                        </span>
                        {app.entrance_score && (
                          <div className="text-[10px] text-slate-500">
                            {app.entrance_score}
                          </div>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="px-2.5 py-1 bg-[#0288D1] hover:bg-[#0277bd] text-white rounded text-[11px] font-bold inline-flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredApps.length === 0 && (
                    <tr>
                      <td
                        colSpan="7"
                        className="p-8 text-center text-slate-400"
                      >
                        No applications found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ADMISSION ENQUIRIES */}
        {activeTab === "enquiries" && (
          <div className="bg-white border border-slate-300 rounded-md shadow-xs overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-300 flex justify-between items-center text-xs font-bold text-slate-700">
              <span>Candidate Admission Inquiries ({enquiries.length})</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0288D1] text-white">
                  <tr>
                    <th className="p-3 font-bold border-r border-sky-600">
                      ID
                    </th>
                    <th className="p-3 font-bold border-r border-sky-600">
                      Candidate Name
                    </th>
                    <th className="p-3 font-bold border-r border-sky-600">
                      Phone
                    </th>
                    <th className="p-3 font-bold border-r border-sky-600">
                      Email
                    </th>
                    <th className="p-3 font-bold border-r border-sky-600">
                      Programme
                    </th>
                    <th className="p-3 font-bold border-r border-sky-600">
                      Status
                    </th>
                    <th className="p-3 font-bold text-center">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {enquiries.map((enq) => (
                    <tr key={enq.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-slate-500 border-r">
                        {enq.id}
                      </td>
                      <td className="p-3 font-bold text-slate-800 border-r">
                        {enq.full_name}
                      </td>
                      <td className="p-3 font-mono border-r">{enq.phone}</td>
                      <td className="p-3 border-r text-slate-600">
                        {enq.email}
                      </td>
                      <td className="p-3 border-r font-semibold">
                        {enq.programme}
                      </td>
                      <td className="p-3 border-r">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            enq.status === "Contacted"
                              ? "bg-amber-100 text-amber-800"
                              : enq.status === "Enrolled"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-sky-100 text-[#0288D1]"
                          }`}
                        >
                          {enq.status || "New"}
                        </span>
                      </td>
                      <td className="p-3 text-center space-x-1">
                        <button
                          onClick={() =>
                            handleEnquiryStatus(enq.id, "Contacted")
                          }
                          className="px-2 py-0.5 bg-amber-500 hover:bg-amber-600 text-white rounded text-[10px] font-bold"
                        >
                          Contacted
                        </button>
                        <button
                          onClick={() =>
                            handleEnquiryStatus(enq.id, "Enrolled")
                          }
                          className="px-2 py-0.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold"
                        >
                          Enrolled
                        </button>
                      </td>
                    </tr>
                  ))}
                  {enquiries.length === 0 && (
                    <tr>
                      <td
                        colSpan="7"
                        className="p-8 text-center text-slate-400"
                      >
                        No enquiries recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: NOTICE BOARD CMS */}
        {activeTab === "notices" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-[#0B1B3D]">
                Dynamic Notice Board Management
              </h3>
              <button
                onClick={() => setNewNoticeModal(true)}
                className="bg-[#0288D1] hover:bg-[#0277bd] text-white px-3.5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Publish New Notice</span>
              </button>
            </div>

            <div className="bg-white border border-slate-300 rounded-md shadow-xs overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0288D1] text-white">
                  <tr>
                    <th className="p-3 font-bold border-r border-sky-600 w-12 text-center">
                      #
                    </th>
                    <th className="p-3 font-bold border-r border-sky-600">
                      Notice Title
                    </th>
                    <th className="p-3 font-bold border-r border-sky-600 w-32">
                      Category
                    </th>
                    <th className="p-3 font-bold border-r border-sky-600 w-28">
                      Date
                    </th>
                    <th className="p-3 font-bold border-r border-sky-600 w-24 text-center">
                      Badge
                    </th>
                    <th className="p-3 font-bold w-20 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {notices.map((notice) => (
                    <tr key={notice.id} className="hover:bg-slate-50">
                      <td className="p-3 text-center font-bold text-slate-400 border-r">
                        {notice.id}
                      </td>
                      <td className="p-3 font-bold text-slate-900 border-r">
                        {notice.title}
                      </td>
                      <td className="p-3 border-r text-slate-600">
                        {notice.category}
                      </td>
                      <td className="p-3 font-mono border-r text-slate-600">
                        {notice.date}
                      </td>
                      <td className="p-3 text-center border-r">
                        {notice.is_new ? (
                          <span className="px-2 py-0.5 bg-red-100 text-red-700 font-bold text-[10px] rounded">
                            NEW
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[10px]">
                            Standard
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => handleDeleteNotice(notice.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete Notice"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: GRIEVANCES REDRESSAL */}
        {activeTab === "grievances" && (
          <div className="bg-white border border-slate-300 rounded-md shadow-xs overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-300 font-bold text-xs text-slate-700">
              Registered Grievances &amp; Complaints ({grievances.length})
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0288D1] text-white">
                  <tr>
                    <th className="p-3 font-bold border-r border-sky-600">
                      Tracking ID
                    </th>
                    <th className="p-3 font-bold border-r border-sky-600">
                      Grievant
                    </th>
                    <th className="p-3 font-bold border-r border-sky-600">
                      Category
                    </th>
                    <th className="p-3 font-bold border-r border-sky-600">
                      Subject
                    </th>
                    <th className="p-3 font-bold border-r border-sky-600">
                      Status
                    </th>
                    <th className="p-3 font-bold">Resolution Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {grievances.map((grv) => (
                    <tr key={grv.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-[#0288D1] border-r">
                        {grv.tracking_id}
                      </td>
                      <td className="p-3 border-r">
                        <div className="font-bold text-slate-800">
                          {grv.full_name}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {grv.grievant_type} • {grv.phone}
                        </div>
                      </td>
                      <td className="p-3 border-r text-slate-700">
                        {grv.category}
                      </td>
                      <td className="p-3 border-r font-medium text-slate-800">
                        {grv.subject}
                      </td>
                      <td className="p-3 border-r">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            grv.status === "Resolved"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {grv.status || "Under Review"}
                        </span>
                      </td>
                      <td className="p-3 text-slate-600 text-[11px]">
                        {grv.resolution_notes ||
                          "Assigned to Designated Officer"}
                      </td>
                    </tr>
                  ))}
                  {grievances.length === 0 && (
                    <tr>
                      <td
                        colSpan="6"
                        className="p-8 text-center text-slate-400"
                      >
                        No grievances recorded.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: FACULTY DIRECTORY CMS */}
        {activeTab === "faculty" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-[#0B1B3D]">
                Faculty Directory Management
              </h3>
              <button
                onClick={() => {
                  setEditingFacultyId(null);
                  setNewFacultyData({
                    name: "",
                    designation: "",
                    department: "Management Studies",
                    qualifications: "",
                    expertise: "",
                    email: "micmbbs@gmail.com",
                    phone: "+91 674 2562826",
                    image_url: "",
                  });
                  setFacultyImagePreview("");
                  setFacultyUploadError("");
                  setNewFacultyModal(true);
                }}
                className="bg-[#0288D1] hover:bg-[#0277bd] text-white px-3.5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Faculty Member</span>
              </button>
            </div>

            <div className="bg-white border border-slate-300 rounded-md shadow-xs overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0288D1] text-white">
                  <tr>
                    <th className="p-3 font-bold border-r border-sky-600 text-center w-14">
                      Photo
                    </th>
                    <th className="p-3 font-bold border-r border-sky-600">
                      Name &amp; Designation
                    </th>
                    <th className="p-3 font-bold border-r border-sky-600">
                      Department
                    </th>
                    <th className="p-3 font-bold border-r border-sky-600">
                      Qualifications
                    </th>
                    <th className="p-3 font-bold border-r border-sky-600">
                      Expertise
                    </th>
                    <th className="p-3 font-bold border-r border-sky-600">
                      Contact
                    </th>
                    <th className="p-3 font-bold text-center w-20">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {faculty.map((f) => (
                    <tr key={f.id} className="hover:bg-slate-50">
                      <td className="p-2 border-r text-center">
                        {f.image_url ? (
                          <img
                            src={f.image_url}
                            alt={f.name}
                            className="w-10 h-10 rounded-full object-cover mx-auto border-2 border-sky-400 shadow-xs"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs mx-auto border border-slate-300">
                            {f.name
                              .replace(/^(Dr\.|Prof\.|Mr\.|Ms\.)\s*/i, "")
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>
                        )}
                      </td>
                      <td className="p-3 border-r">
                        <div className="font-extrabold text-slate-900">
                          {f.name}
                        </div>
                        <div className="text-[11px] text-[#0288D1] font-semibold">
                          {f.designation}
                        </div>
                      </td>
                      <td className="p-3 border-r text-slate-700">
                        {f.department}
                      </td>
                      <td className="p-3 border-r text-slate-600">
                        {f.qualifications}
                      </td>
                      <td className="p-3 border-r text-slate-600">
                        {f.expertise}
                      </td>
                      <td className="p-3 border-r text-slate-600 font-mono text-[11px]">
                        {f.email}
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleEditFacultyClick(f)}
                            className="text-blue-600 hover:text-blue-800 p-1 transition-colors"
                            title="Edit Faculty Member"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteFaculty(f.id)}
                            className="text-red-600 hover:text-red-800 p-1 transition-colors"
                            title="Delete Faculty Member"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 7: BANNER SLIDER CMS */}
        {activeTab === "banners" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-md border border-slate-300 shadow-xs">
              <div>
                <h3 className="font-bold text-base text-[#0B1B3D] flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-[#0288D1]" />
                  <span>Homepage Banner Management</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Upload full-width banner images (5958 &times; 1130 px recommended). They will display directly on the homepage hero slider.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingBannerId(null);
                  setNewBannerData({
                    image_url: "",
                    is_active: 1,
                    order_seq: banners.length + 1,
                  });
                  setBannerUploadError("");
                  setNewBannerModal(true);
                }}
                className="bg-[#0288D1] hover:bg-[#0277bd] text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-2 shadow-xs transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>+ Upload New Banner</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {banners.map((b, bIdx) => (
                <div
                  key={b.id || bIdx}
                  className="bg-white border border-slate-300 rounded-lg shadow-xs overflow-hidden flex flex-col justify-between"
                >
                  <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-800">
                        Slide #{b.order_seq || bIdx + 1}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          b.is_active
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-slate-200 text-slate-600 border border-slate-300"
                        }`}
                      >
                        {b.is_active ? "● Active" : "○ Inactive"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleBanner(b)}
                        className="text-xs px-2.5 py-1 rounded border border-slate-300 hover:bg-slate-100 font-semibold text-slate-700 transition-colors"
                      >
                        {b.is_active ? "Deactivate" : "Activate"}
                      </button>
                      <button
                        onClick={() => handleEditBanner(b)}
                        className="text-xs px-2.5 py-1 rounded bg-[#0288D1] hover:bg-[#0277bd] text-white font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteBanner(b.id)}
                        className="text-xs p-1.5 rounded text-red-600 hover:bg-red-50 hover:text-red-800 transition-colors"
                        title="Delete Slide"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-100 flex-1">
                    {b.image_url ? (
                      <div className="w-full h-44 rounded-md overflow-hidden border border-slate-200 bg-slate-900 shadow-inner">
                        <img
                          src={b.image_url}
                          alt={`Banner Slide ${b.order_seq || bIdx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-44 rounded-md border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-slate-400 text-xs">
                        No image uploaded
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {banners.length === 0 && (
                <div className="col-span-full p-12 text-center bg-white rounded-md border border-slate-300 text-slate-400">
                  <ImageIcon className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                  <p className="font-semibold text-sm">No banners uploaded yet</p>
                  <p className="text-xs text-slate-400 mt-1">
                    Click &quot;+ Upload New Banner&quot; to add your first full-width homepage banner.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: TRAININGS CMS */}
        {activeTab === "trainings" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm text-[#0B1B3D]">
                  Upcoming Training Programmes Management
                </h3>
                <p className="text-xs text-slate-500">
                  Control the MDP and training calendar programmes displayed on the homepage
                </p>
              </div>
              <button
                onClick={() => setNewTrainingModal(true)}
                className="bg-[#0288D1] hover:bg-[#0277bd] text-white px-3.5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Training Programme</span>
              </button>
            </div>

            <div className="bg-white border border-slate-300 rounded-md shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0288D1] text-white">
                    <tr>
                      <th className="p-3 font-bold border-r border-sky-600 w-12 text-center">#</th>
                      <th className="p-3 font-bold border-r border-sky-600">Programme Title</th>
                      <th className="p-3 font-bold border-r border-sky-600 w-28 whitespace-nowrap">From Date</th>
                      <th className="p-3 font-bold border-r border-sky-600 w-28 whitespace-nowrap">To Date</th>
                      <th className="p-3 font-bold border-r border-sky-600 w-44">Venue</th>
                      <th className="p-3 font-bold border-r border-sky-600 w-24 text-center">Link / PDF</th>
                      <th className="p-3 font-bold w-20 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {trainings.map((tr, idx) => (
                      <tr key={tr.id || idx} className="hover:bg-slate-50">
                        <td className="p-3 text-center font-bold text-slate-400 border-r">{idx + 1}</td>
                        <td className="p-3 font-bold text-slate-900 border-r">{tr.title}</td>
                        <td className="p-3 font-mono text-slate-600 border-r whitespace-nowrap">{tr.fromDate}</td>
                        <td className="p-3 font-mono text-slate-600 border-r whitespace-nowrap">{tr.toDate}</td>
                        <td className="p-3 text-slate-700 border-r">{tr.venue}</td>
                        <td className="p-3 text-center border-r">
                          {tr.link && tr.link !== '#' ? (
                            <a href={tr.link} target="_blank" rel="noreferrer" className="text-[#0288D1] font-bold hover:underline inline-flex items-center gap-1">
                              <span>View</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleDeleteTraining(tr.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete Programme"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {trainings.length === 0 && (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-400">
                          No training programmes found. Click "Add Training Programme" to create one.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: ANNOUNCEMENTS CMS */}
        {activeTab === "announcements" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm text-[#0B1B3D]">
                  Announcements & Circulars Management
                </h3>
                <p className="text-xs text-slate-500">
                  Manage clickable public announcements and circulars with PDF document links
                </p>
              </div>
              <button
                onClick={() => setNewAnnouncementModal(true)}
                className="bg-[#0288D1] hover:bg-[#0277bd] text-white px-3.5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Announcement</span>
              </button>
            </div>

            <div className="bg-white border border-slate-300 rounded-md shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0288D1] text-white">
                    <tr>
                      <th className="p-3 font-bold border-r border-sky-600 w-12 text-center">#</th>
                      <th className="p-3 font-bold border-r border-sky-600">Announcement Title</th>
                      <th className="p-3 font-bold border-r border-sky-600 w-28 whitespace-nowrap">Date</th>
                      <th className="p-3 font-bold border-r border-sky-600 w-48">PDF Document URL</th>
                      <th className="p-3 font-bold border-r border-sky-600 w-24 text-center">Badge</th>
                      <th className="p-3 font-bold w-20 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {announcements.map((ann, idx) => (
                      <tr key={ann.id || idx} className="hover:bg-slate-50">
                        <td className="p-3 text-center font-bold text-slate-400 border-r">{idx + 1}</td>
                        <td className="p-3 font-bold text-slate-900 border-r">{ann.title}</td>
                        <td className="p-3 font-mono text-slate-600 border-r whitespace-nowrap">{ann.date}</td>
                        <td className="p-3 font-mono text-slate-600 border-r truncate max-w-xs">
                          {ann.pdf_url ? (
                            <a href={ann.pdf_url} target="_blank" rel="noreferrer" className="text-[#0288D1] font-bold hover:underline inline-flex items-center gap-1">
                              <FileText className="w-3.5 h-3.5 text-red-600" />
                              <span className="truncate">{ann.pdf_url}</span>
                            </a>
                          ) : (
                            <span className="text-slate-400">None</span>
                          )}
                        </td>
                        <td className="p-3 text-center border-r">
                          {ann.is_new ? (
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 font-bold text-[10px] rounded">
                              NEW
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[10px]">Standard</span>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleDeleteAnnouncement(ann.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete Announcement"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {announcements.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-400">
                          No announcements found. Click "Add Announcement" to publish one.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: PLACEMENTS CMS */}
        {activeTab === "placements" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm text-[#0B1B3D]">
                  Placements & Recruiter Highlights CMS
                </h3>
                <p className="text-xs text-slate-500">
                  Manage student placement records displayed in the homepage highlight wall
                </p>
              </div>
              <button
                onClick={() => setNewPlacementModal(true)}
                className="bg-[#0288D1] hover:bg-[#0277bd] text-white px-3.5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Placement Record</span>
              </button>
            </div>

            <div className="bg-white border border-slate-300 rounded-md shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0288D1] text-white">
                    <tr>
                      <th className="p-3 font-bold border-r border-sky-600 w-12 text-center">#</th>
                      <th className="p-3 font-bold border-r border-sky-600">Student Name</th>
                      <th className="p-3 font-bold border-r border-sky-600">Recruiting Company</th>
                      <th className="p-3 font-bold border-r border-sky-600 w-32">Package</th>
                      <th className="p-3 font-bold border-r border-sky-600 w-24 text-center">Batch / Year</th>
                      <th className="p-3 font-bold w-20 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {placements.map((plc, idx) => (
                      <tr key={plc.id || idx} className="hover:bg-slate-50">
                        <td className="p-3 text-center font-bold text-slate-400 border-r">{idx + 1}</td>
                        <td className="p-3 font-bold text-slate-900 border-r flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs uppercase overflow-hidden shrink-0">
                            {plc.image_url ? (
                              <img src={plc.image_url} alt={plc.student_name} className="w-full h-full object-cover" />
                            ) : (
                              plc.student_name?.charAt(0) || "S"
                            )}
                          </div>
                          <span>{plc.student_name}</span>
                        </td>
                        <td className="p-3 font-semibold text-slate-800 border-r">{plc.company}</td>
                        <td className="p-3 border-r">
                          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded">
                            {plc.package}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-center text-slate-600 border-r">{plc.year}</td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleDeletePlacement(plc.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete Placement Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {placements.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-400">
                          No placement records found. Click "Add Placement Record" to add top achievers.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: CO-OP NEWS CMS */}
        {activeTab === "coop_news" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm text-[#0B1B3D]">
                  Cooperative Sector News & What's New CMS
                </h3>
                <p className="text-xs text-slate-500">
                  Publish national and regional cooperative movement news displayed on the homepage
                </p>
              </div>
              <button
                onClick={() => setNewCoopNewsModal(true)}
                className="bg-[#0288D1] hover:bg-[#0277bd] text-white px-3.5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Publish News Item</span>
              </button>
            </div>

            <div className="bg-white border border-slate-300 rounded-md shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0288D1] text-white">
                    <tr>
                      <th className="p-3 font-bold border-r border-sky-600 w-12 text-center">#</th>
                      <th className="p-3 font-bold border-r border-sky-600">News Headline / Title</th>
                      <th className="p-3 font-bold border-r border-sky-600 w-28 whitespace-nowrap">Date</th>
                      <th className="p-3 font-bold border-r border-sky-600 w-48">Link / Source</th>
                      <th className="p-3 font-bold w-20 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {coopNews.map((item, idx) => (
                      <tr key={item.id || idx} className="hover:bg-slate-50">
                        <td className="p-3 text-center font-bold text-slate-400 border-r">{idx + 1}</td>
                        <td className="p-3 font-bold text-slate-900 border-r">{item.title}</td>
                        <td className="p-3 font-mono text-slate-600 border-r whitespace-nowrap">{item.date}</td>
                        <td className="p-3 font-mono text-slate-600 border-r truncate max-w-xs">
                          {item.link && item.link !== '#' ? (
                            <a href={item.link} target="_blank" rel="noreferrer" className="text-[#0288D1] font-bold hover:underline inline-flex items-center gap-1">
                              <span>Source</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleDeleteCoopNews(item.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete News Item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {coopNews.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-slate-400">
                          No news items found. Click "Publish News Item" to post one.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: QUICK LINKS CMS */}
        {activeTab === "quick_links" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm text-[#0B1B3D]">
                  Homepage Quick Links CMS
                </h3>
                <p className="text-xs text-slate-500">
                  Manage important external and internal portal links displayed in Column 2 of the Homepage
                </p>
              </div>
              <button
                onClick={() => setNewQuickLinkModal(true)}
                className="bg-[#0288D1] hover:bg-[#0277bd] text-white px-3.5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Quick Link</span>
              </button>
            </div>

            <div className="bg-white border border-slate-300 rounded-md shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0288D1] text-white">
                    <tr>
                      <th className="p-3 font-bold border-r border-sky-600 w-12 text-center">#</th>
                      <th className="p-3 font-bold border-r border-sky-600">Link Title / Label</th>
                      <th className="p-3 font-bold border-r border-sky-600">Target URL</th>
                      <th className="p-3 font-bold w-20 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {quickLinks.map((item, idx) => (
                      <tr key={item.id || idx} className="hover:bg-slate-50">
                        <td className="p-3 text-center font-bold text-slate-400 border-r">{idx + 1}</td>
                        <td className="p-3 font-bold text-slate-900 border-r">{item.title}</td>
                        <td className="p-3 font-mono text-slate-600 border-r truncate max-w-sm">
                          <a href={item.url} target="_blank" rel="noreferrer" className="text-[#0288D1] font-bold hover:underline inline-flex items-center gap-1">
                            <span className="truncate">{item.url}</span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleDeleteQuickLink(item.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete Quick Link"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {quickLinks.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-slate-400">
                          No quick links configured. Click "Add Quick Link" to create one.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: PLACEMENT STATS CMS */}
        {activeTab === "placement_stats" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white p-4 border border-slate-300 rounded-md shadow-xs">
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  Placement Highlights & Statistics CMS ({placementStats.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Manage the top 4 highlight metric cards displayed on the public Placements page
                </p>
              </div>
              <button
                onClick={() => setNewPlacementStatModal(true)}
                className="bg-[#0288D1] hover:bg-[#0277bd] text-white px-3.5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Stat Metric</span>
              </button>
            </div>

            <div className="bg-white border border-slate-300 rounded-md shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0288D1] text-white">
                    <tr>
                      <th className="p-3 font-bold border-r border-sky-600 w-12 text-center">#</th>
                      <th className="p-3 font-bold border-r border-sky-600">Metric Label</th>
                      <th className="p-3 font-bold border-r border-sky-600">Highlight Value</th>
                      <th className="p-3 font-bold border-r border-sky-600">Subtitle</th>
                      <th className="p-3 font-bold border-r border-sky-600 text-center">Icon</th>
                      <th className="p-3 font-bold border-r border-sky-600 text-center">Color Theme</th>
                      <th className="p-3 font-bold w-20 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {placementStats.map((item, idx) => (
                      <tr key={item.id || idx} className="hover:bg-slate-50">
                        <td className="p-3 text-slate-500 border-r text-center font-bold">
                          {idx + 1}
                        </td>
                        <td className="p-3 font-bold text-slate-900 border-r">
                          {item.label}
                        </td>
                        <td className="p-3 font-black text-emerald-700 border-r">
                          {item.value}
                        </td>
                        <td className="p-3 text-slate-600 border-r">
                          {item.subtitle || "—"}
                        </td>
                        <td className="p-3 text-center border-r font-mono text-[11px] text-slate-700">
                          {item.icon_name || "TrendingUp"}
                        </td>
                        <td className="p-3 text-center border-r">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            item.color_theme === 'emerald' ? 'bg-emerald-100 text-emerald-800' :
                            item.color_theme === 'sky' ? 'bg-sky-100 text-sky-800' :
                            item.color_theme === 'amber' ? 'bg-amber-100 text-amber-800' :
                            item.color_theme === 'indigo' ? 'bg-indigo-100 text-indigo-800' :
                            'bg-slate-100 text-slate-800'
                          }`}>
                            {item.color_theme || "emerald"}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleDeletePlacementStat(item.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete Stat Metric"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {placementStats.length === 0 && (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-400">
                          No placement stats configured. Click "Add Stat Metric" to create one.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: RECRUITERS CMS */}
        {activeTab === "recruiters" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white p-4 border border-slate-300 rounded-md shadow-xs">
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  Prestigious Recruiters Wall CMS ({recruiters.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Manage corporate and cooperative recruiters displayed on the Placements page
                </p>
              </div>
              <button
                onClick={() => setNewRecruiterModal(true)}
                className="bg-[#0288D1] hover:bg-[#0277bd] text-white px-3.5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Recruiter</span>
              </button>
            </div>

            <div className="bg-white border border-slate-300 rounded-md shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0288D1] text-white">
                    <tr>
                      <th className="p-3 font-bold border-r border-sky-600 w-12 text-center">#</th>
                      <th className="p-3 font-bold border-r border-sky-600 w-16 text-center">Logo</th>
                      <th className="p-3 font-bold border-r border-sky-600">Recruiter / Organization Name</th>
                      <th className="p-3 font-bold border-r border-sky-600">Category / Sector</th>
                      <th className="p-3 font-bold border-r border-sky-600">Badge / Note</th>
                      <th className="p-3 font-bold w-20 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {recruiters.map((item, idx) => (
                      <tr key={item.id || idx} className="hover:bg-slate-50">
                        <td className="p-3 text-slate-500 border-r text-center font-bold">
                          {idx + 1}
                        </td>
                        <td className="p-2 border-r text-center">
                          <div className="w-9 h-9 rounded-full border border-slate-200 bg-white flex items-center justify-center mx-auto overflow-hidden shadow-2xs">
                            {item.image_url ? (
                              <img
                                src={item.image_url}
                                alt={item.name}
                                className="w-full h-full object-contain p-1"
                              />
                            ) : (
                              <span className="font-bold text-slate-700 text-xs">
                                {(item.name || "R").charAt(0)}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-3 font-bold text-slate-900 border-r">
                          {item.name}
                        </td>
                        <td className="p-3 text-slate-700 font-semibold border-r">
                          {item.category}
                        </td>
                        <td className="p-3 text-slate-600 border-r">
                          <span className="px-2 py-0.5 bg-slate-100 rounded text-[11px] font-medium text-slate-700">
                            {item.note || "Partner"}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleDeleteRecruiter(item.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete Recruiter"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {recruiters.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-400">
                          No recruiters found. Click "Add Recruiter" to add one.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: INTERNSHIPS CMS */}
        {activeTab === "internships" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-white p-4 border border-slate-300 rounded-md shadow-xs">
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  Summer Internships (SIP) CMS ({internships.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Manage hosting organizations and field immersion institutions
                </p>
              </div>
              <button
                onClick={() => setNewInternshipModal(true)}
                className="bg-[#0288D1] hover:bg-[#0277bd] text-white px-3.5 py-1.5 rounded text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Internship</span>
              </button>
            </div>

            <div className="bg-white border border-slate-300 rounded-md shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0288D1] text-white">
                    <tr>
                      <th className="p-3 font-bold border-r border-sky-600 w-12 text-center">#</th>
                      <th className="p-3 font-bold border-r border-sky-600">Hosting Organization</th>
                      <th className="p-3 font-bold border-r border-sky-600">Duration</th>
                      <th className="p-3 font-bold border-r border-sky-600">Field / Location</th>
                      <th className="p-3 font-bold w-20 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {internships.map((item, idx) => (
                      <tr key={item.id || idx} className="hover:bg-slate-50">
                        <td className="p-3 text-slate-500 border-r text-center font-bold">
                          {idx + 1}
                        </td>
                        <td className="p-3 font-bold text-slate-900 border-r">
                          {item.org}
                        </td>
                        <td className="p-3 text-slate-700 font-semibold border-r">
                          {item.duration}
                        </td>
                        <td className="p-3 text-slate-600 border-r">
                          {item.location}
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleDeleteInternship(item.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete Internship"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {internships.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-slate-400">
                          No internships configured. Click "Add Internship" to create one.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: CAMPUS EVENTS CMS */}
        {activeTab === "campus_events" && (
          <div className="space-y-4">
            <div className="bg-white rounded-md border border-slate-300 shadow-sm p-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-800">
                    Campus Events CMS ({campusEvents.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Manage dynamic events, seminars, celebrations, and workshops displayed on the public Campus Events page.
                  </p>
                </div>
                <button
                  onClick={() => setNewCampusEventModal(true)}
                  className="bg-[#0288D1] hover:bg-[#0277bd] text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 shadow-sm transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Campus Event</span>
                </button>
              </div>

              <div className="overflow-x-auto border rounded border-slate-200">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#0B1B3D] text-white">
                    <tr>
                      <th className="p-3 w-16 text-center border-r border-[#1a3365]">#</th>
                      <th className="p-3 w-20 text-center border-r border-[#1a3365]">Image</th>
                      <th className="p-3 border-r border-[#1a3365]">Event Title</th>
                      <th className="p-3 border-r border-[#1a3365]">Date</th>
                      <th className="p-3 border-r border-[#1a3365]">Description</th>
                      <th className="p-3 w-20 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {campusEvents.map((item, idx) => (
                      <tr key={item.id || idx} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 text-center text-slate-500 font-mono border-r">
                          {idx + 1}
                        </td>
                        <td className="p-3 text-center border-r">
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.title}
                              className="w-12 h-10 object-cover rounded border border-slate-200 mx-auto"
                            />
                          ) : (
                            <div className="w-12 h-10 bg-slate-100 rounded border border-slate-200 flex items-center justify-center text-slate-400 mx-auto">
                              <Sparkles className="w-4 h-4 text-slate-300" />
                            </div>
                          )}
                        </td>
                        <td className="p-3 font-bold text-slate-900 border-r">
                          {item.title}
                        </td>
                        <td className="p-3 text-emerald-700 font-semibold border-r whitespace-nowrap">
                          {item.date}
                        </td>
                        <td className="p-3 text-slate-600 border-r max-w-xs truncate" title={item.description}>
                          {item.description || "-"}
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleDeleteCampusEvent(item.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete Event"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {campusEvents.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-400">
                          No campus events found. Click "Add Campus Event" to create one.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: ALUMNI CMS */}
        {activeTab === "alumni" && (
          <div className="space-y-4">
            <div className="bg-white rounded-md border border-slate-300 shadow-sm p-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-800">
                    Alumni Relations & Directory CMS ({alumni.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Manage distinguished alumni profiles and cards displayed on the public Alumni page.
                  </p>
                </div>
                <button
                  onClick={() => setNewAlumniModal(true)}
                  className="bg-[#0288D1] hover:bg-[#0277bd] text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1 shadow-sm transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Alumni</span>
                </button>
              </div>

              <div className="overflow-x-auto border rounded border-slate-200">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#0B1B3D] text-white">
                    <tr>
                      <th className="p-3 w-16 text-center border-r border-[#1a3365]">#</th>
                      <th className="p-3 w-16 text-center border-r border-[#1a3365]">Photo</th>
                      <th className="p-3 border-r border-[#1a3365]">Name</th>
                      <th className="p-3 border-r border-[#1a3365]">Batch</th>
                      <th className="p-3 border-r border-[#1a3365]">Current Role</th>
                      <th className="p-3 border-r border-[#1a3365]">Company / Org</th>
                      <th className="p-3 border-r border-[#1a3365]">LinkedIn</th>
                      <th className="p-3 w-20 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {alumni.map((item, idx) => (
                      <tr key={item.id || idx} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 text-center text-slate-500 font-mono border-r">
                          {idx + 1}
                        </td>
                        <td className="p-3 text-center border-r">
                          {item.image_url ? (
                            <img
                              src={item.image_url}
                              alt={item.name}
                              className="w-10 h-10 object-cover rounded-full border border-slate-200 mx-auto"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center mx-auto text-xs">
                              {item.name ? item.name.charAt(0) : "A"}
                            </div>
                          )}
                        </td>
                        <td className="p-3 font-bold text-slate-900 border-r">
                          {item.name}
                        </td>
                        <td className="p-3 text-slate-600 font-semibold border-r whitespace-nowrap">
                          {item.batch || "-"}
                        </td>
                        <td className="p-3 text-slate-800 border-r">
                          {item.current_role || "-"}
                        </td>
                        <td className="p-3 font-semibold text-emerald-800 border-r">
                          {item.company || "-"}
                        </td>
                        <td className="p-3 text-slate-500 border-r max-w-xs truncate">
                          {item.linkedin_url ? (
                            <a
                              href={item.linkedin_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[#0288D1] hover:underline flex items-center gap-1"
                            >
                              <span>View Profile</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleDeleteAlumni(item.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete Alumni"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {alumni.length === 0 && (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-slate-400">
                          No alumni profiles found. Click "Add Alumni" to create one.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: ALUMNI REQUESTS CMS */}
        {activeTab === "alumni_requests" && (
          <div className="space-y-4">
            <div className="bg-white rounded-md border border-slate-300 shadow-sm p-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-[#0288D1]" />
                    <span>Incoming Alumni Requests ({alumniRequests.length})</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Review public registration requests submitted through the website. Click "Approve &amp; Add" to publish them to the official Alumni Directory.
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto border rounded border-slate-200">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#0B1B3D] text-white">
                    <tr>
                      <th className="p-3 w-12 text-center border-r border-[#1a3365]">#</th>
                      <th className="p-3 w-16 text-center border-r border-[#1a3365]">Photo</th>
                      <th className="p-3 border-r border-[#1a3365]">Alumnus Details</th>
                      <th className="p-3 border-r border-[#1a3365]">Batch &amp; Programme</th>
                      <th className="p-3 border-r border-[#1a3365]">Current Position</th>
                      <th className="p-3 border-r border-[#1a3365]">LinkedIn</th>
                      <th className="p-3 border-r border-[#1a3365]">Message / Mentorship</th>
                      <th className="p-3 w-36 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {alumniRequests.map((req, idx) => (
                      <tr key={req.id || idx} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 text-center text-slate-500 font-mono border-r">
                          {idx + 1}
                        </td>
                        <td className="p-3 text-center border-r">
                          {req.image_url ? (
                            <img
                              src={req.image_url}
                              alt={req.full_name}
                              className="w-10 h-10 object-cover rounded-full border border-slate-200 mx-auto"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 font-bold flex items-center justify-center mx-auto text-xs">
                              {req.full_name ? req.full_name.charAt(0) : "A"}
                            </div>
                          )}
                        </td>
                        <td className="p-3 border-r">
                          <div className="font-bold text-slate-900">{req.full_name}</div>
                          <div className="text-[11px] text-slate-500">{req.email}</div>
                          <div className="text-[11px] text-slate-500">{req.phone} {req.city ? `• ${req.city}` : ''}</div>
                        </td>
                        <td className="p-3 border-r whitespace-nowrap">
                          <div className="font-bold text-[#0288D1]">{req.programme}</div>
                          <div className="text-slate-600">Batch {req.batch_year}</div>
                        </td>
                        <td className="p-3 border-r">
                          <div className="font-bold text-slate-800">{req.designation || "-"}</div>
                          <div className="text-emerald-800 font-semibold">{req.current_company || "-"}</div>
                        </td>
                        <td className="p-3 border-r max-w-xs truncate">
                          {req.linkedin_url ? (
                            <a
                              href={req.linkedin_url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[#0288D1] hover:underline flex items-center gap-1 font-semibold"
                            >
                              <span>LinkedIn</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>
                        <td className="p-3 border-r max-w-xs text-slate-600 text-[11px]" title={req.message}>
                          {req.message ? req.message : <span className="text-slate-400 italic">No notes provided</span>}
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5">
                            <button
                              onClick={() => handleApproveAlumniRequest(req)}
                              className="w-full sm:w-auto px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold text-[11px] flex items-center justify-center gap-1 shadow-2xs transition-colors"
                              title="Approve and Publish to Directory"
                            >
                              <Check className="w-3 h-3" />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => handleRejectAlumniRequest(req.id)}
                              className="w-full sm:w-auto px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded font-semibold text-[11px] flex items-center justify-center gap-1 border border-rose-200 transition-colors"
                              title="Reject &amp; Delete Request"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Reject</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {alumniRequests.length === 0 && (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-slate-400">
                          No pending alumni requests. New registrations from the public Alumni page will appear here.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {/* TAB: GALLERY CMS */}
        {activeTab === "gallery" && (
          <div className="space-y-4">
            <div className="bg-white rounded-md border border-slate-300 shadow-sm p-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-[#0288D1]" />
                    <span>Gallery CMS ({gallery.length})</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Manage photo uploads and YouTube video links displayed on the public Gallery page.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setNewGalleryData({ title: "", type: "image", url: "" });
                    setGalleryImagePreview("");
                    setGalleryUploadError("");
                    setNewGalleryModal(true);
                  }}
                  className="px-3.5 py-1.5 bg-[#0288D1] hover:bg-[#0277bd] text-white text-xs font-bold rounded flex items-center gap-1.5 shadow-2xs transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Gallery Item</span>
                </button>
              </div>

              <div className="overflow-x-auto border rounded border-slate-200">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-[#0B1B3D] text-white">
                    <tr>
                      <th className="p-3 w-12 text-center border-r border-[#1a3365]">#</th>
                      <th className="p-3 w-28 text-center border-r border-[#1a3365]">Preview</th>
                      <th className="p-3 border-r border-[#1a3365]">Title</th>
                      <th className="p-3 w-24 text-center border-r border-[#1a3365]">Type</th>
                      <th className="p-3 border-r border-[#1a3365]">Media Link</th>
                      <th className="p-3 w-20 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {gallery.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 text-center text-slate-500 font-mono border-r">
                          {idx + 1}
                        </td>
                        <td className="p-3 text-center border-r">
                          {item.type === "image" ? (
                            <img
                              src={item.url}
                              alt={item.title}
                              className="w-20 h-12 object-cover rounded border border-slate-200 mx-auto"
                            />
                          ) : (
                            <div className="w-20 h-12 bg-rose-50 border border-rose-200 rounded flex flex-col items-center justify-center mx-auto text-rose-600">
                              <Film className="w-4 h-4" />
                              <span className="text-[10px] font-bold">Video</span>
                            </div>
                          )}
                        </td>
                        <td className="p-3 font-bold text-slate-900 border-r">
                          {item.title}
                        </td>
                        <td className="p-3 text-center border-r">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            item.type === "video"
                              ? "bg-rose-100 text-rose-800 border border-rose-200"
                              : "bg-sky-100 text-sky-800 border border-sky-200"
                          }`}>
                            {item.type}
                          </span>
                        </td>
                        <td className="p-3 border-r max-w-xs truncate">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#0288D1] hover:underline flex items-center gap-1 font-mono text-[11px]"
                          >
                            <span className="truncate">{item.url}</span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleDeleteGalleryItem(item.id)}
                            className="p-1 text-rose-600 hover:bg-rose-50 rounded transition-colors"
                            title="Delete Item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {gallery.length === 0 && (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-400">
                          No gallery items found. Click "Add Gallery Item" to add photos or YouTube videos.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>

      {/* MODAL: APPLICATION FULL PROFILE VIEWER */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-md max-w-2xl w-full border border-slate-300 shadow-2xl overflow-hidden my-8">
            <div className="bg-[#0B1B3D] text-white px-6 py-4 flex justify-between items-center">
              <div>
                <h4 className="text-sm font-bold text-[#FFC107]">
                  Applicant Profile: {selectedApp.full_name}
                </h4>
                <div className="text-xs text-slate-300 font-mono">
                  {selectedApp.app_number}
                </div>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="text-white hover:text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded border">
                <div>
                  <strong>Programme:</strong> {selectedApp.programme}
                </div>
                <div>
                  <strong>Status:</strong> {selectedApp.status}
                </div>
                <div>
                  <strong>Gender / DOB:</strong> {selectedApp.gender} |{" "}
                  {selectedApp.dob}
                </div>
                <div>
                  <strong>Category:</strong> {selectedApp.category}
                </div>
                <div>
                  <strong>Father's Name:</strong> {selectedApp.father_name}
                </div>
                <div>
                  <strong>Mobile:</strong> {selectedApp.phone}
                </div>
                <div className="col-span-2">
                  <strong>Email:</strong> {selectedApp.email}
                </div>
                <div className="col-span-2">
                  <strong>Address:</strong> {selectedApp.address}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-sky-50/50 p-3 rounded border border-sky-100">
                <div>
                  <strong>Qualifying Degree:</strong>{" "}
                  {selectedApp.qualification}
                </div>
                <div>
                  <strong>Graduation %:</strong> {selectedApp.grad_percentage}
                </div>
                <div>
                  <strong>Entrance Exam:</strong> {selectedApp.entrance_exam}
                </div>
                <div>
                  <strong>Roll No / Score:</strong> {selectedApp.entrance_roll}{" "}
                  ({selectedApp.entrance_score})
                </div>
              </div>

              {/* Uploaded Documents */}
              {(selectedApp.photo_url || selectedApp.signature_url || selectedApp.marksheet_url) && (
                <div className="bg-slate-50 p-3 rounded border space-y-2">
                  <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                    Uploaded Documents
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    {selectedApp.photo_url && (
                      <div className="text-center">
                        <div className="text-[10px] text-slate-500 font-semibold mb-1">Photograph</div>
                        <a href={selectedApp.photo_url} target="_blank" rel="noreferrer">
                          <img
                            src={selectedApp.photo_url}
                            alt="Candidate"
                            className="w-16 h-16 object-cover rounded border border-slate-300 hover:opacity-80 transition-opacity"
                          />
                        </a>
                      </div>
                    )}
                    {selectedApp.signature_url && (
                      <div className="text-center">
                        <div className="text-[10px] text-slate-500 font-semibold mb-1">Signature</div>
                        <a href={selectedApp.signature_url} target="_blank" rel="noreferrer">
                          <img
                            src={selectedApp.signature_url}
                            alt="Signature"
                            className="h-16 w-24 object-contain bg-white rounded border border-slate-300 hover:opacity-80 transition-opacity p-1"
                          />
                        </a>
                      </div>
                    )}
                    {selectedApp.marksheet_url && (
                      <div className="text-center">
                        <div className="text-[10px] text-slate-500 font-semibold mb-1">Marksheet</div>
                        <a
                          href={selectedApp.marksheet_url}
                          target="_blank"
                          rel="noreferrer"
                          className="h-16 px-3 bg-white rounded border border-slate-300 hover:bg-slate-100 flex items-center justify-center font-bold text-[#0288D1] text-xs transition-colors"
                        >
                          View Document ↗
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-slate-100 px-6 py-3 border-t flex justify-end">
              <button
                onClick={() => setSelectedApp(null)}
                className="bg-[#0288D1] text-white px-4 py-1.5 rounded text-xs font-bold"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD NEW NOTICE */}
      {newNoticeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-md max-w-lg w-full border border-slate-300 shadow-2xl overflow-hidden">
            <div className="bg-[#0288D1] text-white px-6 py-3 font-bold text-sm flex justify-between items-center">
              <span>Publish Institutional Notice</span>
              <button onClick={() => setNewNoticeModal(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddNotice} className="p-6 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Notice Title <span className="text-red-600">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={newNoticeData.title}
                  onChange={(e) =>
                    setNewNoticeData({
                      ...newNoticeData,
                      title: e.target.value,
                    })
                  }
                  placeholder="e.g. Admission Notice for MBA Batch 2026-27"
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newNoticeData.category}
                    onChange={(e) =>
                      setNewNoticeData({
                        ...newNoticeData,
                        category: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-slate-300 rounded outline-none bg-white"
                  >
                    <option value="Admissions">Admissions</option>
                    <option value="Examinations">Examinations (BPUT)</option>
                    <option value="Training">Training Calendar</option>
                    <option value="Recruitment">Recruitment / Careers</option>
                    <option value="General">General Circular</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    value={newNoticeData.date}
                    onChange={(e) =>
                      setNewNoticeData({
                        ...newNoticeData,
                        date: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-slate-300 rounded outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setNewNoticeModal(false)}
                  className="px-4 py-1.5 border rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0288D1] text-white font-bold rounded"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT FACULTY (WITH IMGBB PHOTO UPLOAD) */}
      {newFacultyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-md max-w-lg w-full border border-slate-300 shadow-2xl overflow-hidden my-6">
            <div className="bg-[#0288D1] text-white px-6 py-3 font-bold text-sm flex justify-between items-center">
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>
                  {editingFacultyId
                    ? "Edit Faculty Member"
                    : "Add Faculty Member (with ImgBB Photo)"}
                </span>
              </span>
              <button
                onClick={() => {
                  setNewFacultyModal(false);
                  setEditingFacultyId(null);
                  setFacultyImagePreview("");
                  setFacultyUploadError("");
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveFaculty} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Faculty Photo (ImgBB API Hosting)
                </label>
                <div className="flex items-center gap-3 p-3 bg-slate-50 border border-dashed border-slate-300 rounded">
                  <div className="w-14 h-14 rounded-full border-2 border-sky-400 bg-white overflow-hidden flex items-center justify-center shrink-0 shadow-xs">
                    {facultyImagePreview || newFacultyData.image_url ? (
                      <img
                        src={facultyImagePreview || newFacultyData.image_url}
                        alt="Faculty Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Camera className="w-6 h-6 text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFacultyImageChange}
                      className="text-xs text-slate-600 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:font-bold file:bg-[#0288D1] file:text-white hover:file:bg-[#0277bd] cursor-pointer"
                    />
                    {facultyUploading && (
                      <div className="text-[11px] text-sky-700 font-semibold flex items-center gap-1">
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        <span>Uploading photo to ImgBB...</span>
                      </div>
                    )}
                    {newFacultyData.image_url && !facultyUploading && (
                      <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="truncate max-w-xs">
                          Hosted: {newFacultyData.image_url}
                        </span>
                      </div>
                    )}
                    {facultyUploadError && (
                      <div className="text-[11px] text-red-600 font-semibold">
                        {facultyUploadError}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Faculty Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newFacultyData.name}
                    onChange={(e) =>
                      setNewFacultyData({
                        ...newFacultyData,
                        name: e.target.value,
                      })
                    }
                    placeholder="e.g. Dr. A.K. Mohanty"
                    className="w-full p-2 border border-slate-300 rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Designation *
                  </label>
                  <input
                    type="text"
                    required
                    value={newFacultyData.designation}
                    onChange={(e) =>
                      setNewFacultyData({
                        ...newFacultyData,
                        designation: e.target.value,
                      })
                    }
                    placeholder="e.g. Associate Professor"
                    className="w-full p-2 border border-slate-300 rounded outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={newFacultyData.department}
                    onChange={(e) =>
                      setNewFacultyData({
                        ...newFacultyData,
                        department: e.target.value,
                      })
                    }
                    placeholder="Management Studies"
                    className="w-full p-2 border border-slate-300 rounded outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={newFacultyData.email}
                    onChange={(e) =>
                      setNewFacultyData({
                        ...newFacultyData,
                        email: e.target.value,
                      })
                    }
                    placeholder="micmbbs@gmail.com"
                    className="w-full p-2 border border-slate-300 rounded outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Qualifications *
                </label>
                <input
                  type="text"
                  required
                  value={newFacultyData.qualifications}
                  onChange={(e) =>
                    setNewFacultyData({
                      ...newFacultyData,
                      qualifications: e.target.value,
                    })
                  }
                  placeholder="e.g. Ph.D. in Management, MBA (Finance), UGC-NET"
                  className="w-full p-2 border border-slate-300 rounded outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Area of Specialization &amp; Expertise
                </label>
                <input
                  type="text"
                  value={newFacultyData.expertise}
                  onChange={(e) =>
                    setNewFacultyData({
                      ...newFacultyData,
                      expertise: e.target.value,
                    })
                  }
                  placeholder="e.g. Financial Management, Cooperative Accounting"
                  className="w-full p-2 border border-slate-300 rounded outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setNewFacultyModal(false);
                    setEditingFacultyId(null);
                    setFacultyImagePreview("");
                    setFacultyUploadError("");
                  }}
                  className="px-4 py-1.5 border rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={facultyUploading}
                  className="px-4 py-1.5 bg-[#0288D1] hover:bg-[#0277bd] text-white font-bold rounded flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>
                    {editingFacultyId
                      ? "Update Faculty Member"
                      : "Save Faculty Member"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT BANNER SLIDE (PURE IMAGE UPLOADER) */}
      {newBannerModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-md max-w-lg w-full border border-slate-300 shadow-2xl overflow-hidden my-6 flex flex-col">
            <div className="bg-[#0B1B3D] text-white px-6 py-3.5 font-bold text-sm flex justify-between items-center border-b-2 border-amber-400">
              <span className="flex items-center gap-2 text-amber-300">
                <ImageIcon className="w-4 h-4" />
                <span>
                  {editingBannerId
                    ? "Edit Banner Image"
                    : "Upload New Banner Image"}
                </span>
              </span>
              <button
                onClick={() => setNewBannerModal(false)}
                className="text-white hover:text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={handleSaveBanner}
              className="p-6 space-y-4 text-xs overflow-y-auto flex-1"
            >
              <div className="bg-amber-50 border border-amber-200 p-3 rounded text-xs text-amber-900 mb-3">
                <strong>Important:</strong> Please upload an image with exact dimensions of <strong>5958px width &times; 1130px height</strong> (Aspect Ratio ~5.27:1).
              </div>

              {/* File input for image (ImgBB API) */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Banner Image (JPG, PNG, WebP) <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerImageChange}
                  className="w-full text-xs text-slate-600 file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-bold file:bg-[#0B1B3D] file:text-amber-300 hover:file:bg-slate-900 cursor-pointer border border-slate-300 p-1.5 rounded"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  For best results, upload an image with dimensions 5958 &times; 1130 pixels.
                </p>
                {bannerUploading && (
                  <div className="text-xs text-sky-700 font-semibold flex items-center gap-1.5 mt-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Uploading banner to ImgBB CDN...</span>
                  </div>
                )}
                {bannerUploadError && (
                  <div className="text-xs text-red-600 font-semibold mt-2">
                    {bannerUploadError}
                  </div>
                )}
              </div>

              {/* Preview of uploaded image */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Image Preview:
                </label>
                {newBannerData.image_url ? (
                  <div className="relative rounded-lg overflow-hidden border-2 border-slate-200 bg-slate-900 shadow-inner">
                    <img
                      src={newBannerData.image_url}
                      alt="Banner Preview"
                      className="w-full h-44 object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      Live Preview
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-32 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center text-slate-400 gap-1.5">
                    <ImageIcon className="w-8 h-8 text-slate-300" />
                    <span className="text-xs">No image uploaded yet</span>
                  </div>
                )}
              </div>

              {/* Active Checkbox */}
              <div className="pt-2 border-t border-slate-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={Boolean(newBannerData.is_active)}
                    onChange={(e) =>
                      setNewBannerData({
                        ...newBannerData,
                        is_active: e.target.checked ? 1 : 0,
                      })
                    }
                    className="w-4 h-4 text-[#0288D1] rounded"
                  />
                  <span>Active (Display on Homepage Hero Slider)</span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setNewBannerModal(false)}
                  className="px-4 py-1.5 border rounded text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={bannerUploading || !newBannerData.image_url}
                  className="px-4 py-1.5 bg-[#0B1B3D] hover:bg-slate-900 text-amber-300 font-bold rounded flex items-center gap-1.5 border border-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Check className="w-4 h-4" />
                  <span>
                    {editingBannerId ? "Update Banner" : "Save Banner"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD TRAINING PROGRAMME */}
      {newTrainingModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-md max-w-lg w-full border border-slate-300 shadow-2xl overflow-hidden">
            <div className="bg-[#0288D1] text-white px-6 py-3 font-bold text-sm flex justify-between items-center">
              <span>Add Upcoming Training Programme</span>
              <button onClick={() => setNewTrainingModal(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddTraining} className="p-6 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Programme Title <span className="text-red-600">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={newTrainingData.title}
                  onChange={(e) => setNewTrainingData({ ...newTrainingData, title: e.target.value })}
                  placeholder="e.g. MDP on Financial Management & Statutory Audit for Cooperative Banks"
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    From Date <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newTrainingData.fromDate}
                    onChange={(e) => setNewTrainingData({ ...newTrainingData, fromDate: e.target.value })}
                    placeholder="e.g. 02-Dec-2026"
                    className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    To Date <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newTrainingData.toDate}
                    onChange={(e) => setNewTrainingData({ ...newTrainingData, toDate: e.target.value })}
                    placeholder="e.g. 06-Dec-2026"
                    className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Venue / Location
                </label>
                <input
                  type="text"
                  value={newTrainingData.venue}
                  onChange={(e) => setNewTrainingData({ ...newTrainingData, venue: e.target.value })}
                  placeholder="e.g. MICM Campus, BBSR"
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Brochure / Details Link (or #)
                </label>
                <input
                  type="text"
                  value={newTrainingData.link}
                  onChange={(e) => setNewTrainingData({ ...newTrainingData, link: e.target.value })}
                  placeholder="e.g. /downloads/training-calendar.pdf"
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setNewTrainingModal(false)}
                  className="px-4 py-1.5 border rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0288D1] hover:bg-[#0277bd] text-white font-bold rounded flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Programme</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD ANNOUNCEMENT */}
      {newAnnouncementModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-md max-w-lg w-full border border-slate-300 shadow-2xl overflow-hidden">
            <div className="bg-[#0288D1] text-white px-6 py-3 font-bold text-sm flex justify-between items-center">
              <span>Publish Institutional Announcement</span>
              <button onClick={() => setNewAnnouncementModal(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddAnnouncement} className="p-6 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Announcement Title <span className="text-red-600">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={newAnnouncementData.title}
                  onChange={(e) => setNewAnnouncementData({ ...newAnnouncementData, title: e.target.value })}
                  placeholder="e.g. Schedule of Counselling & GD/PI for MBA Admission Batch 2026-28"
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Date
                </label>
                <input
                  type="text"
                  value={newAnnouncementData.date}
                  onChange={(e) => setNewAnnouncementData({ ...newAnnouncementData, date: e.target.value })}
                  placeholder="e.g. 18-Nov-2026"
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  PDF Document URL / Link <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newAnnouncementData.pdf_url}
                  onChange={(e) => setNewAnnouncementData({ ...newAnnouncementData, pdf_url: e.target.value })}
                  placeholder="e.g. /uploads/counselling-schedule.pdf or https://..."
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                />
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[11px] text-slate-500">Or upload document:</span>
                  <input
                    type="file"
                    onChange={handleAnnouncementFileUpload}
                    className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-[#0288D1] hover:file:bg-sky-100"
                  />
                  {announcementUploading && (
                    <span className="text-[11px] text-sky-600 animate-pulse font-semibold">Uploading...</span>
                  )}
                </div>
              </div>

              <div className="pt-1">
                <label className="inline-flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                  <input
                    type="checkbox"
                    checked={Boolean(newAnnouncementData.is_new)}
                    onChange={(e) => setNewAnnouncementData({ ...newAnnouncementData, is_new: e.target.checked ? 1 : 0 })}
                    className="w-4 h-4 text-[#0288D1] rounded"
                  />
                  <span>Mark as "NEW" Announcement</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setNewAnnouncementModal(false)}
                  className="px-4 py-1.5 border rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={announcementUploading}
                  className="px-4 py-1.5 bg-[#0288D1] hover:bg-[#0277bd] text-white font-bold rounded flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Publish Announcement</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD PLACEMENT RECORD */}
      {newPlacementModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-md max-w-lg w-full border border-slate-300 shadow-2xl overflow-hidden">
            <div className="bg-[#0288D1] text-white px-6 py-3 font-bold text-sm flex justify-between items-center">
              <span>Add Placement Record</span>
              <button onClick={() => setNewPlacementModal(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddPlacement} className="p-6 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Student Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newPlacementData.student_name}
                  onChange={(e) => setNewPlacementData({ ...newPlacementData, student_name: e.target.value })}
                  placeholder="e.g. Soumya Ranjan Dash"
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Recruiting Organization / Company <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newPlacementData.company}
                  onChange={(e) => setNewPlacementData({ ...newPlacementData, company: e.target.value })}
                  placeholder="e.g. Amul (GCMMF) / IFFCO / HDFC Bank"
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Salary Package <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newPlacementData.package}
                    onChange={(e) => setNewPlacementData({ ...newPlacementData, package: e.target.value })}
                    placeholder="e.g. ₹ 8.5 LPA"
                    className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Passing Year / Batch
                  </label>
                  <input
                    type="text"
                    value={newPlacementData.year}
                    onChange={(e) => setNewPlacementData({ ...newPlacementData, year: e.target.value })}
                    placeholder="e.g. 2026"
                    className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Student Photo URL (Optional)
                </label>
                <input
                  type="text"
                  value={newPlacementData.image_url}
                  onChange={(e) => setNewPlacementData({ ...newPlacementData, image_url: e.target.value })}
                  placeholder="https://... or leave blank for initials"
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                />
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-[11px] text-slate-500">Or upload photo:</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePlacementPhotoUpload}
                    className="text-xs text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-sky-50 file:text-[#0288D1] hover:file:bg-sky-100"
                  />
                  {placementUploading && (
                    <span className="text-[11px] text-sky-600 animate-pulse font-semibold">Uploading...</span>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setNewPlacementModal(false)}
                  className="px-4 py-1.5 border rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={placementUploading}
                  className="px-4 py-1.5 bg-[#0288D1] hover:bg-[#0277bd] text-white font-bold rounded flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD CO-OP NEWS */}
      {newCoopNewsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-md max-w-lg w-full border border-slate-300 shadow-2xl overflow-hidden">
            <div className="bg-[#0288D1] text-white px-6 py-3 font-bold text-sm flex justify-between items-center">
              <span>Publish Cooperative Sector News</span>
              <button onClick={() => setNewCoopNewsModal(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCoopNews} className="p-6 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  News Headline / Story <span className="text-red-600">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={newCoopNewsData.title}
                  onChange={(e) => setNewCoopNewsData({ ...newCoopNewsData, title: e.target.value })}
                  placeholder="e.g. Ministry of Cooperation inaugurates national cooperative database..."
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Date
                  </label>
                  <input
                    type="text"
                    value={newCoopNewsData.date}
                    onChange={(e) => setNewCoopNewsData({ ...newCoopNewsData, date: e.target.value })}
                    placeholder="e.g. 23-Nov-2026"
                    className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Source Link / URL
                  </label>
                  <input
                    type="text"
                    value={newCoopNewsData.link}
                    onChange={(e) => setNewCoopNewsData({ ...newCoopNewsData, link: e.target.value })}
                    placeholder="e.g. https://cooperation.gov.in"
                    className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setNewCoopNewsModal(false)}
                  className="px-4 py-1.5 border rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0288D1] hover:bg-[#0277bd] text-white font-bold rounded flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Publish News</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD QUICK LINK */}
      {newQuickLinkModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-md max-w-md w-full border border-slate-300 shadow-2xl overflow-hidden">
            <div className="bg-[#0288D1] text-white px-6 py-3 font-bold text-sm flex justify-between items-center">
              <span>Add Homepage Quick Link</span>
              <button onClick={() => setNewQuickLinkModal(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddQuickLink} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Link Title / Label <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newQuickLinkData.title}
                  onChange={(e) =>
                    setNewQuickLinkData({ ...newQuickLinkData, title: e.target.value })
                  }
                  placeholder="e.g. National Council for Cooperative Training (NCCT)"
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Target Destination URL <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newQuickLinkData.url}
                  onChange={(e) =>
                    setNewQuickLinkData({ ...newQuickLinkData, url: e.target.value })
                  }
                  placeholder="e.g. https://ncct.ac.in"
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setNewQuickLinkModal(false)}
                  className="px-4 py-1.5 border rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0288D1] hover:bg-[#0277bd] text-white font-bold rounded flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Quick Link</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD PLACEMENT STAT METRIC */}
      {newPlacementStatModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-md max-w-md w-full border border-slate-300 shadow-2xl overflow-hidden">
            <div className="bg-[#0288D1] text-white px-6 py-3 font-bold text-sm flex justify-between items-center">
              <span>Add Placement Stat Metric</span>
              <button onClick={() => setNewPlacementStatModal(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddPlacementStat} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Metric Label <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newPlacementStatData.label}
                  onChange={(e) =>
                    setNewPlacementStatData({ ...newPlacementStatData, label: e.target.value })
                  }
                  placeholder="e.g. Highest Package Offered"
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Highlight Value <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newPlacementStatData.value}
                  onChange={(e) =>
                    setNewPlacementStatData({ ...newPlacementStatData, value: e.target.value })
                  }
                  placeholder="e.g. ₹ 9.5 LPA or 92.4%"
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Subtitle / Sector Context
                </label>
                <input
                  type="text"
                  value={newPlacementStatData.subtitle}
                  onChange={(e) =>
                    setNewPlacementStatData({ ...newPlacementStatData, subtitle: e.target.value })
                  }
                  placeholder="e.g. Agribusiness & Banking Sector"
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Icon Name
                  </label>
                  <select
                    value={newPlacementStatData.icon_name}
                    onChange={(e) =>
                      setNewPlacementStatData({ ...newPlacementStatData, icon_name: e.target.value })
                    }
                    className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1] bg-white"
                  >
                    <option value="TrendingUp">TrendingUp (Growth)</option>
                    <option value="Award">Award (Package / Honor)</option>
                    <option value="Users">Users (Percentage / Team)</option>
                    <option value="Building2">Building2 (Corporates / Partners)</option>
                    <option value="Briefcase">Briefcase (Careers)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Color Theme
                  </label>
                  <select
                    value={newPlacementStatData.color_theme}
                    onChange={(e) =>
                      setNewPlacementStatData({ ...newPlacementStatData, color_theme: e.target.value })
                    }
                    className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1] bg-white"
                  >
                    <option value="emerald">Emerald (Green)</option>
                    <option value="sky">Sky (Blue)</option>
                    <option value="amber">Amber (Orange/Yellow)</option>
                    <option value="indigo">Indigo (Navy/Purple)</option>
                    <option value="purple">Purple</option>
                    <option value="rose">Rose (Red)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setNewPlacementStatModal(false)}
                  className="px-4 py-1.5 border rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0288D1] hover:bg-[#0277bd] text-white font-bold rounded flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Stat Metric</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD RECRUITER */}
      {newRecruiterModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-md max-w-md w-full border border-slate-300 shadow-2xl overflow-hidden">
            <div className="bg-[#0288D1] text-white px-6 py-3 font-bold text-sm flex justify-between items-center">
              <span>Add Recruiter Organization</span>
              <button
                onClick={() => {
                  setNewRecruiterModal(false);
                  setRecruiterImagePreview("");
                  setRecruiterUploadError("");
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddRecruiter} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Recruiter / Company Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newRecruiterData.name}
                  onChange={(e) =>
                    setNewRecruiterData({ ...newRecruiterData, name: e.target.value })
                  }
                  placeholder="e.g. AMUL (GCMMF) or HDFC Bank"
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Company Logo / Image
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded border border-slate-300 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                    {recruiterImagePreview || newRecruiterData.image_url ? (
                      <img
                        src={recruiterImagePreview || newRecruiterData.image_url}
                        alt="Preview"
                        className="w-full h-full object-contain p-1"
                      />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleRecruiterImageChange}
                      className="text-xs text-slate-600 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-xs file:font-bold file:bg-[#0288D1] file:text-white hover:file:bg-[#0277bd] cursor-pointer"
                    />
                    {recruiterUploading && (
                      <div className="text-[11px] text-sky-700 font-semibold flex items-center gap-1">
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        <span>Uploading logo to ImgBB...</span>
                      </div>
                    )}
                    {newRecruiterData.image_url && !recruiterUploading && (
                      <div className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="truncate max-w-[200px]">
                          Hosted: {newRecruiterData.image_url}
                        </span>
                      </div>
                    )}
                    {recruiterUploadError && (
                      <div className="text-[11px] text-red-600 font-semibold">
                        {recruiterUploadError}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Category / Sector <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newRecruiterData.category}
                  onChange={(e) =>
                    setNewRecruiterData({ ...newRecruiterData, category: e.target.value })
                  }
                  placeholder="e.g. Cooperative Agribusiness or Retail Banking"
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Partner Note / Tag
                </label>
                <input
                  type="text"
                  value={newRecruiterData.note}
                  onChange={(e) =>
                    setNewRecruiterData({ ...newRecruiterData, note: e.target.value })
                  }
                  placeholder="e.g. Regular Recruiter, Core Partner, BFSI Partner"
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setNewRecruiterModal(false);
                    setRecruiterImagePreview("");
                    setRecruiterUploadError("");
                  }}
                  className="px-4 py-1.5 border rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={recruiterUploading}
                  className="px-4 py-1.5 bg-[#0288D1] hover:bg-[#0277bd] text-white font-bold rounded flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Recruiter</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD INTERNSHIP */}
      {newInternshipModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-md max-w-md w-full border border-slate-300 shadow-2xl overflow-hidden">
            <div className="bg-[#0288D1] text-white px-6 py-3 font-bold text-sm flex justify-between items-center">
              <span>Add Summer Internship Organization</span>
              <button onClick={() => setNewInternshipModal(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddInternship} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Hosting Organization / Institution <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newInternshipData.org}
                  onChange={(e) =>
                    setNewInternshipData({ ...newInternshipData, org: e.target.value })
                  }
                  placeholder="e.g. NABARD or Odisha State Agricultural Marketing Board"
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Duration <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newInternshipData.duration}
                  onChange={(e) =>
                    setNewInternshipData({ ...newInternshipData, duration: e.target.value })
                  }
                  placeholder="e.g. 8 Weeks"
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Field / Location <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newInternshipData.location}
                  onChange={(e) =>
                    setNewInternshipData({ ...newInternshipData, location: e.target.value })
                  }
                  placeholder="e.g. Bhubaneswar, Odisha or Regional Offices"
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setNewInternshipModal(false)}
                  className="px-4 py-1.5 border rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0288D1] hover:bg-[#0277bd] text-white font-bold rounded flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Internship</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD CAMPUS EVENT */}
      {newCampusEventModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-md max-w-lg w-full border border-slate-300 shadow-2xl overflow-hidden my-8">
            <div className="bg-[#0288D1] text-white px-6 py-3 font-bold text-sm flex justify-between items-center">
              <span>Add New Campus Event</span>
              <button
                onClick={() => {
                  setNewCampusEventModal(false);
                  setEventImagePreview("");
                  setEventUploadError("");
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCampusEvent} className="p-6 space-y-4 text-xs">
              {/* Event Image Upload */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Event Banner / Image
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-16 rounded border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                    {eventImagePreview || newCampusEventData.image_url ? (
                      <img
                        src={eventImagePreview || newCampusEventData.image_url}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Sparkles className="w-6 h-6 text-slate-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded cursor-pointer border border-slate-300 text-xs transition-colors">
                      <Camera className="w-3.5 h-3.5" />
                      <span>{eventUploading ? "Uploading to ImgBB..." : "Upload Photo"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleEventImageChange}
                        disabled={eventUploading}
                      />
                    </label>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Recommended: 16:9 ratio, max 5MB (PNG/JPG). Uploads automatically to ImgBB.
                    </p>
                    {eventUploadError && (
                      <p className="text-[11px] text-red-600 font-semibold mt-1">
                        {eventUploadError}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Event Title <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newCampusEventData.title}
                  onChange={(e) =>
                    setNewCampusEventData({ ...newCampusEventData, title: e.target.value })
                  }
                  placeholder="e.g. Annual Sports & Cultural Meet 'SAMANWAYA'"
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Date / Schedule <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newCampusEventData.date}
                  onChange={(e) =>
                    setNewCampusEventData({ ...newCampusEventData, date: e.target.value })
                  }
                  placeholder="e.g. 15 January 2025 or 14 - 20 November 2024"
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Event Description
                </label>
                <textarea
                  rows={4}
                  value={newCampusEventData.description}
                  onChange={(e) =>
                    setNewCampusEventData({ ...newCampusEventData, description: e.target.value })
                  }
                  placeholder="Provide a brief summary of the event highlights, participants, and objectives..."
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setNewCampusEventModal(false);
                    setEventImagePreview("");
                    setEventUploadError("");
                  }}
                  className="px-4 py-1.5 border rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={eventUploading}
                  className="px-4 py-1.5 bg-[#0288D1] hover:bg-[#0277bd] text-white font-bold rounded flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Event</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD ALUMNI */}
      {newAlumniModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-md max-w-lg w-full border border-slate-300 shadow-2xl overflow-hidden my-8">
            <div className="bg-[#0288D1] text-white px-6 py-3 font-bold text-sm flex justify-between items-center">
              <span>Add Alumni Profile</span>
              <button
                onClick={() => {
                  setNewAlumniModal(false);
                  setAlumniImagePreview("");
                  setAlumniUploadError("");
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddAlumni} className="p-6 space-y-4 text-xs">
              {/* Photo Upload */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Alumni Photo
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                    {alumniImagePreview || newAlumniData.image_url ? (
                      <img
                        src={alumniImagePreview || newAlumniData.image_url}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <GraduationCap className="w-6 h-6 text-slate-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded cursor-pointer border border-slate-300 text-xs transition-colors">
                      <Camera className="w-3.5 h-3.5" />
                      <span>{alumniUploading ? "Uploading to ImgBB..." : "Upload Photo"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAlumniImageChange}
                        disabled={alumniUploading}
                      />
                    </label>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Recommended: Square portrait, max 5MB. Uploads automatically to ImgBB.
                    </p>
                    {alumniUploadError && (
                      <p className="text-[11px] text-red-600 font-semibold mt-1">
                        {alumniUploadError}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newAlumniData.name}
                  onChange={(e) =>
                    setNewAlumniData({ ...newAlumniData, name: e.target.value })
                  }
                  placeholder="e.g. Sri Soumyaranjan Jena"
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Batch / Programme
                  </label>
                  <input
                    type="text"
                    value={newAlumniData.batch}
                    onChange={(e) =>
                      setNewAlumniData({ ...newAlumniData, batch: e.target.value })
                    }
                    placeholder="e.g. MBA 2020-22"
                    className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Current Role / Designation
                  </label>
                  <input
                    type="text"
                    value={newAlumniData.current_role}
                    onChange={(e) =>
                      setNewAlumniData({ ...newAlumniData, current_role: e.target.value })
                    }
                    placeholder="e.g. Regional Marketing Manager"
                    className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Current Company / Institution
                </label>
                <input
                  type="text"
                  value={newAlumniData.company}
                  onChange={(e) =>
                    setNewAlumniData({ ...newAlumniData, company: e.target.value })
                  }
                  placeholder="e.g. AMUL (GCMMF) or HDFC Bank"
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  value={newAlumniData.linkedin_url}
                  onChange={(e) =>
                    setNewAlumniData({ ...newAlumniData, linkedin_url: e.target.value })
                  }
                  placeholder="https://linkedin.com/in/..."
                  className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-[#0288D1]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setNewAlumniModal(false);
                    setAlumniImagePreview("");
                    setAlumniUploadError("");
                  }}
                  className="px-4 py-1.5 border rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={alumniUploading}
                  className="px-4 py-1.5 bg-[#0288D1] hover:bg-[#0277bd] text-white font-bold rounded flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Alumni</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* MODAL: ADD GALLERY ITEM */}
      {newGalleryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-md max-w-lg w-full border border-slate-300 shadow-2xl overflow-hidden">
            <div className="bg-[#0288D1] text-white px-6 py-3 font-bold text-sm flex justify-between items-center">
              <span>Add New Gallery Item</span>
              <button
                onClick={() => {
                  setNewGalleryModal(false);
                  setGalleryImagePreview("");
                  setGalleryUploadError("");
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddGalleryItem} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Title / Caption <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 71st All India Cooperative Week Celebrations"
                  value={newGalleryData.title}
                  onChange={(e) => setNewGalleryData({ ...newGalleryData, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded border-slate-300 outline-none focus:ring-1 focus:ring-[#0288D1]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Media Type <span className="text-red-600">*</span>
                </label>
                <select
                  value={newGalleryData.type}
                  onChange={(e) => {
                    const nextType = e.target.value;
                    setNewGalleryData({
                      ...newGalleryData,
                      type: nextType,
                      url: "",
                    });
                    setGalleryImagePreview("");
                  }}
                  className="w-full px-3 py-2 border rounded border-slate-300 outline-none focus:ring-1 focus:ring-[#0288D1] bg-white font-medium"
                >
                  <option value="image">Photo / Image</option>
                  <option value="video">YouTube Video</option>
                </select>
              </div>

              {newGalleryData.type === "image" ? (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Upload Photo <span className="text-red-600">*</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-16 rounded border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0">
                      {galleryImagePreview || newGalleryData.url ? (
                        <img
                          src={galleryImagePreview || newGalleryData.url}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-6 h-6 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded cursor-pointer border border-slate-300 text-xs transition-colors">
                        <UploadCloud className="w-3.5 h-3.5 text-[#0288D1]" />
                        <span>{galleryUploading ? "Uploading to ImgBB..." : "Select Image File"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleGalleryImageChange}
                          disabled={galleryUploading}
                        />
                      </label>
                      <p className="text-[11px] text-slate-400 mt-1">
                        High resolution JPG or PNG. Max 5MB.
                      </p>
                    </div>
                  </div>
                  {galleryUploadError && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1">
                      {galleryUploadError}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    YouTube Video URL <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                    value={newGalleryData.url}
                    onChange={(e) => setNewGalleryData({ ...newGalleryData, url: e.target.value })}
                    className="w-full px-3 py-2 border rounded border-slate-300 outline-none focus:ring-1 focus:ring-[#0288D1]"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Paste the full YouTube video link. It will automatically be embedded on the public gallery page.
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setNewGalleryModal(false);
                    setGalleryImagePreview("");
                    setGalleryUploadError("");
                  }}
                  className="px-4 py-2 border border-slate-300 rounded hover:bg-slate-50 text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={galleryUploading}
                  className="px-5 py-2 bg-[#0288D1] hover:bg-[#0277bd] text-white rounded font-bold shadow-xs disabled:opacity-50"
                >
                  Save to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
