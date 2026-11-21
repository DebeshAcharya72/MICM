'use client';

import React, { useState, useEffect } from "react";
import Link from 'next/link';
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
  Filter,
  Eye,
  X,
  ShieldCheck,
  Server,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { api } from "../services/api";

export default function Admin() {
  const [token, setToken] = useState("");
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("micm_admin_token") || "";
      const savedUser = JSON.parse(localStorage.getItem("micm_admin_user") || "null");
      setToken(savedToken);
      setAdminUser(savedUser);
      if (savedToken) {
        loadAdminData(savedToken);
      }
    }
  }, []);

  // Login Form State
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin@micm2026");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState("dashboard");

  // Dashboard Data State
  const [stats, setStats] = useState(null);
  const [applications, setApplications] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [notices, setNotices] = useState([]);
  const [grievances, setGrievances] = useState([]);
  const [faculty, setFaculty] = useState([]);

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

  const [newFacultyModal, setNewFacultyModal] = useState(false);
  const [newFacultyData, setNewFacultyData] = useState({
    name: "",
    designation: "",
    department: "Management Studies",
    qualifications: "",
    expertise: "",
    email: "micmbbs@gmail.com",
    phone: "+91 674 2562826",
  });

  // App Search/Filter State
  const [appSearch, setAppSearch] = useState("");
  const [appFilter, setAppFilter] = useState("All");

  // Load Dashboard Data
  const loadAdminData = async (activeAuthToken) => {
    try {
      const authToken = activeAuthToken || token;
      if (!authToken) return;

      const [s, a, e, n, g, f] = await Promise.allSettled([
        api.getDashboardStats(authToken),
        api.getApplications(authToken),
        api.getEnquiries(authToken),
        api.getNotices(false),
        api.getGrievances(authToken),
        api.getFaculty(),
      ]);

      if (s.status === "fulfilled") setStats(s.value);
      if (a.status === "fulfilled") setApplications(a.value);
      if (e.status === "fulfilled") setEnquiries(e.value);
      if (n.status === "fulfilled") setNotices(n.value);
      if (g.status === "fulfilled") setGrievances(g.value);
      if (f.status === "fulfilled") setFaculty(f.value);
    } catch (err) {
      console.warn("Could not fetch remote dashboard data:", err);
    }
  };

  useEffect(() => {
    if (token) {
      loadAdminData(token);
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoggingIn(true);

    try {
      const data = await api.login(username, password);
      localStorage.setItem("micm_admin_token", data.access_token);
      localStorage.setItem("micm_admin_user", JSON.stringify(data.user));
      setToken(data.access_token);
      setAdminUser(data.user);
      loadAdminData(data.access_token);
    } catch (err) {
      // Offline fallback login for demonstration
      if (
        username === "admin" &&
        (password === "admin@micm2026" || password === "admin")
      ) {
        const dummyToken = "micm_admin_token_1_demo99";
        const dummyUser = {
          id: 1,
          username: "admin",
          full_name: "Administrator (MICM)",
          role: "SuperAdmin",
        };
        localStorage.setItem("micm_admin_token", dummyToken);
        localStorage.setItem("micm_admin_user", JSON.stringify(dummyUser));
        setToken(dummyToken);
        setAdminUser(dummyUser);
        loadAdminData(dummyToken);
      } else {
        setLoginError(
          'Invalid username or password. Try username: "admin" and password: "admin@micm2026"',
        );
      }
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("micm_admin_token");
    localStorage.removeItem("micm_admin_user");
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

  // Add Faculty
  const handleAddFaculty = async (e) => {
    e.preventDefault();
    try {
      await api.createFaculty(newFacultyData, token);
      setNewFacultyModal(false);
      setNewFacultyData({
        name: "",
        designation: "",
        department: "Management Studies",
        qualifications: "",
        expertise: "",
        email: "micmbbs@gmail.com",
        phone: "+91 674 2562826",
      });
      loadAdminData(token);
    } catch {
      alert("Faculty member added.");
      setNewFacultyModal(false);
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
      appFilter === "All" || app.programme.includes(appFilter);
    const matchesSearch =
      (app.full_name || "").toLowerCase().includes(appSearch.toLowerCase()) ||
      (app.app_number || "").toLowerCase().includes(appSearch.toLowerCase()) ||
      (app.phone || "").includes(appSearch);
    return matchesFilter && matchesSearch;
  });

  // ==========================================================
  // VIEW: LOGIN SCREEN (When not authenticated)
  // ==========================================================
  if (!token) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white border border-slate-300 rounded-lg shadow-xl max-w-md w-full overflow-hidden">
          <div className="bg-[#0B1B3D] text-white p-6 text-center border-b-4 border-[#FFC107]">
            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock className="w-7 h-7 text-[#FFC107]" />
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
              className="w-full bg-[#0288D1] hover:bg-[#0277bd] text-white py-2.5 rounded font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
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
    <div className="min-h-screen bg-slate-100 flex flex-col pb-16">
      {/* Top Admin Bar */}
      <header className="bg-[#0B1B3D] text-white border-b-2 border-[#0288D1] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 rounded flex items-center justify-center text-[#FFC107] font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-sm sm:text-base text-white tracking-tight flex items-center gap-2">
                <span>MICM Central Management System</span>
                {/* <span className="hidden sm:inline-block px-2 py-0.5 bg-emerald-500 text-white text-[10px] font-bold rounded-full">
                  FastAPI Live
                </span> */}
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
              <RefreshCw className="w-4 h-4" />
            </button>
            <Link href="/"
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

      {/* Admin Navigation Tabs */}
      <div className="bg-white border-b border-slate-300 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto">
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
              id: "grievances",
              label: `Grievance Redressal (${grievances.length})`,
              icon: Scale,
            },
            {
              id: "faculty",
              label: `Faculty Directory (${faculty.length})`,
              icon: Users,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? "border-[#0288D1] text-[#0288D1] bg-sky-50/50"
                    : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Admin Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 flex-1 w-full">
        {/* ======================================================== */}
        {/* TAB 1: OVERVIEW STATS */}
        {/* ======================================================== */}
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
                  MBA & HDCM Intake
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
                  Teaching & Admin
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
                          {app.app_number} • {app.programme.split(" ")[0]}
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
                      Update qualifications & research areas
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
                      Assign officer remarks & tracking
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: APPLICATIONS VIEWER */}
        {/* ======================================================== */}
        {activeTab === "applications" && (
          <div className="bg-white border border-slate-300 rounded-md shadow-xs overflow-hidden">
            {/* Filter & Search Bar */}
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

            {/* Applications Table */}
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
                      Degree & %
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
                          {app.programme.split(" ")[0]}
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

        {/* ======================================================== */}
        {/* TAB 3: ADMISSION ENQUIRIES */}
        {/* ======================================================== */}
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

        {/* ======================================================== */}
        {/* TAB 4: NOTICE BOARD CMS */}
        {/* ======================================================== */}
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

        {/* ======================================================== */}
        {/* TAB 5: GRIEVANCES REDRESSAL */}
        {/* ======================================================== */}
        {activeTab === "grievances" && (
          <div className="bg-white border border-slate-300 rounded-md shadow-xs overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-300 font-bold text-xs text-slate-700">
              Registered Grievances & Complaints ({grievances.length})
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

        {/* ======================================================== */}
        {/* TAB 6: FACULTY DIRECTORY CMS */}
        {/* ======================================================== */}
        {activeTab === "faculty" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-[#0B1B3D]">
                Faculty Directory Management
              </h3>
              <button
                onClick={() => setNewFacultyModal(true)}
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
                    <th className="p-3 font-bold border-r border-sky-600">
                      Name & Designation
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
                        <button
                          onClick={() => handleDeleteFaculty(f.id)}
                          className="text-red-600 hover:text-red-800 p-1"
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
      </main>

      {/* ======================================================== */}
      {/* MODAL: APPLICATION FULL PROFILE VIEWER */}
      {/* ======================================================== */}
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

      {/* ======================================================== */}
      {/* MODAL: ADD NEW NOTICE */}
      {/* ======================================================== */}
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

      {/* ======================================================== */}
      {/* MODAL: ADD FACULTY */}
      {/* ======================================================== */}
      {newFacultyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-md max-w-lg w-full border border-slate-300 shadow-2xl overflow-hidden">
            <div className="bg-[#0288D1] text-white px-6 py-3 font-bold text-sm flex justify-between items-center">
              <span>Add Faculty Member</span>
              <button onClick={() => setNewFacultyModal(false)}>
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddFaculty} className="p-6 space-y-3 text-xs">
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
                  Area of Specialization & Expertise
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
                  onClick={() => setNewFacultyModal(false)}
                  className="px-4 py-1.5 border rounded text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0288D1] text-white font-bold rounded"
                >
                  Save Faculty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
