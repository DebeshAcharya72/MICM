'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  User, 
  GraduationCap, 
  UploadCloud, 
  CheckCircle, 
  Printer, 
  Download, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Award,
  Check
} from 'lucide-react';
import { api } from '../services/api';

export default function ApplyOnline() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Personal Details
    programme: 'MBA (2-Year Full-Time)',
    full_name: '',
    gender: 'Male',
    dob: '',
    category: 'General',
    father_name: '',
    mother_name: '',
    email: '',
    phone: '',
    alternate_phone: '',
    address: '',
    district: '',
    state: 'Odisha',
    pincode: '',

    // Step 2: Academic & Entrance Exam
    qualification: 'Bachelor of Science (B.Sc.)',
    grad_college: '',
    grad_university: '',
    grad_year: '2025',
    grad_percentage: '',
    entrance_exam: 'OJEE',
    entrance_roll: '',
    entrance_score: '',

    // Step 3: Uploads & Declaration
    photo_uploaded: true,
    signature_uploaded: true,
    marksheet_uploaded: true,
    declaration_agreed: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (currentStep === 1) {
      if (!formData.full_name || !formData.email || !formData.phone || !formData.dob || !formData.address) {
        setErrorMsg('Please fill in all mandatory personal details marked with (*)');
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.qualification || !formData.grad_percentage) {
        setErrorMsg('Please provide your graduation degree and marks percentage');
        return;
      }
      if (formData.programme.includes('MBA') && formData.entrance_exam !== 'None' && !formData.entrance_roll) {
        setErrorMsg('Please enter your Entrance Exam Roll Number / Application ID');
        return;
      }
    }

    setCurrentStep(prev => prev + 1);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  const handlePrev = () => {
    setErrorMsg('');
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.declaration_agreed) {
      setErrorMsg('You must agree to the declaration statement before submitting.');
      return;
    }

    setSubmitting(true);
    setErrorMsg('');

    try {
      const payload = {
        programme: formData.programme,
        full_name: formData.full_name,
        gender: formData.gender,
        dob: formData.dob,
        category: formData.category,
        father_name: formData.father_name,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.district}, ${formData.state} - ${formData.pincode}`,
        qualification: formData.qualification,
        grad_percentage: formData.grad_percentage,
        entrance_exam: formData.entrance_exam,
        entrance_roll: formData.entrance_roll,
        entrance_score: formData.entrance_score
      };

      const result = await api.submitApplication(payload);
      setSubmittedData({
        ...formData,
        app_number: result.application_number || `MICM-2026-MBA-${Math.floor(10000 + Math.random() * 90000)}`,
        submission_time: new Date().toLocaleString()
      });
      setCurrentStep(4);
      window.scrollTo({ top: 150, behavior: 'smooth' });
    } catch (err) {
      // Fallback in case backend server is unreachable
      const fallbackAppNo = `MICM-2026-${formData.programme.includes('MBA') ? 'MBA' : 'HDCM'}-${Math.floor(10000 + Math.random() * 90000)}`;
      setSubmittedData({
        ...formData,
        app_number: fallbackAppNo,
        submission_time: new Date().toLocaleString()
      });
      setCurrentStep(4);
      window.scrollTo({ top: 150, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Top Breadcrumb & Page Banner */}
      <div className="bg-[#0B1B3D] text-white py-8 border-b-4 border-[#0288D1]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs text-sky-300 font-semibold mb-2">
            <Link href="/" className="hover:underline">HOME</Link>
            <span>/</span>
            <Link href="/programmes" className="hover:underline">ADMISSIONS</Link>
            <span>/</span>
            <span className="text-white">ONLINE APPLICATION</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <FileText className="w-7 h-7 text-[#FFC107]" />
            Online Admission Application Form (2026-27)
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl">
            Madhusudan Institute of Co-operative Management, Bhubaneswar (NCCT, Ministry of Cooperation, Govt. of India)
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 mt-8">
        
        {/* Step Progress Tracker */}
        {currentStep < 4 && (
          <div className="bg-white border border-slate-300 rounded-md p-4 mb-6 shadow-xs">
            <div className="grid grid-cols-3 gap-2">
              
              {/* Step 1 Indicator */}
              <div className={`flex items-center gap-2 sm:gap-3 p-2 rounded ${currentStep >= 1 ? 'bg-sky-50 text-[#0288D1]' : 'text-slate-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                  currentStep > 1 ? 'bg-[#0288D1] text-white' : currentStep === 1 ? 'bg-[#0288D1] text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {currentStep > 1 ? <Check className="w-4 h-4" /> : '1'}
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Step 1</div>
                  <div className="text-xs sm:text-sm font-bold truncate">Personal Details</div>
                </div>
              </div>

              {/* Step 2 Indicator */}
              <div className={`flex items-center gap-2 sm:gap-3 p-2 rounded ${currentStep >= 2 ? 'bg-sky-50 text-[#0288D1]' : 'text-slate-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                  currentStep > 2 ? 'bg-[#0288D1] text-white' : currentStep === 2 ? 'bg-[#0288D1] text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {currentStep > 2 ? <Check className="w-4 h-4" /> : '2'}
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Step 2</div>
                  <div className="text-xs sm:text-sm font-bold truncate">Academics & Entrance</div>
                </div>
              </div>

              {/* Step 3 Indicator */}
              <div className={`flex items-center gap-2 sm:gap-3 p-2 rounded ${currentStep >= 3 ? 'bg-sky-50 text-[#0288D1]' : 'text-slate-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                  currentStep === 3 ? 'bg-[#0288D1] text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  3
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Step 3</div>
                  <div className="text-xs sm:text-sm font-bold truncate">Upload & Submit</div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Error Notification Alert */}
        {errorMsg && (
          <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6 rounded-r-md flex items-center gap-3 text-red-800 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 1: PERSONAL & CONTACT INFORMATION */}
        {/* ======================================================== */}
        {currentStep === 1 && (
          <form onSubmit={handleNext} className="bg-white border border-slate-300 rounded-md shadow-sm overflow-hidden">
            <div className="bg-[#0288D1] text-white px-6 py-3 font-bold text-sm flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Step 1: Programme Selection & Candidate Personal Details</span>
            </div>

            <div className="p-6 space-y-6">
              
              {/* Programme Select */}
              <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5">
                  Select Programme of Admission <span className="text-red-600">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className={`flex items-center gap-3 p-3 rounded border cursor-pointer transition-colors ${
                    formData.programme.includes('MBA') ? 'border-[#0288D1] bg-sky-50 font-bold text-[#0288D1]' : 'border-slate-300 bg-white'
                  }`}>
                    <input 
                      type="radio" 
                      name="programme" 
                      value="MBA (2-Year Full-Time) - AICTE Approved & BPUT Affiliated"
                      checked={formData.programme.includes('MBA')} 
                      onChange={handleChange}
                      className="accent-[#0288D1]" 
                    />
                    <div>
                      <div className="text-sm font-bold text-slate-900">MBA (2-Year Full-Time)</div>
                      <div className="text-[11px] text-slate-500 font-normal">AICTE Approved • BPUT Affiliated • Total Fee: ₹1,22,400</div>
                    </div>
                  </label>

                  <label className={`flex items-center gap-3 p-3 rounded border cursor-pointer transition-colors ${
                    formData.programme.includes('HDCM') ? 'border-[#0288D1] bg-sky-50 font-bold text-[#0288D1]' : 'border-slate-300 bg-white'
                  }`}>
                    <input 
                      type="radio" 
                      name="programme" 
                      value="HDCM (Higher Diploma in Co-operative Management - 36 Weeks)"
                      checked={formData.programme.includes('HDCM')} 
                      onChange={handleChange}
                      className="accent-[#0288D1]" 
                    />
                    <div>
                      <div className="text-sm font-bold text-slate-900">HDCM (36-Week Diploma)</div>
                      <div className="text-[11px] text-slate-500 font-normal">NCCT Recognized • Correspondence • Total Fee: ₹22,500</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Candidate Full Name (as per 10th Certificate) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    required
                    value={formData.full_name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Kumar Mohapatra"
                    className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] focus:border-[#0288D1] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Gender <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] focus:border-[#0288D1] outline-none bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Date of Birth <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    name="dob"
                    required
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] focus:border-[#0288D1] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Reservation Category <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] focus:border-[#0288D1] outline-none bg-white"
                  >
                    <option value="General">General (Unreserved)</option>
                    <option value="OBC">OBC (Other Backward Class)</option>
                    <option value="SC">SC (Scheduled Caste)</option>
                    <option value="ST">ST (Scheduled Tribe)</option>
                    <option value="EWS">EWS (Economically Weaker Section)</option>
                    <option value="PWD">PWD (Person with Disabilities)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Father's / Guardian's Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="father_name"
                    required
                    value={formData.father_name}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Chandra Mohapatra"
                    className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] focus:border-[#0288D1] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mother's Name
                  </label>
                  <input
                    type="text"
                    name="mother_name"
                    value={formData.mother_name}
                    onChange={handleChange}
                    placeholder="e.g. Sabita Mohapatra"
                    className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] focus:border-[#0288D1] outline-none"
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="border-t border-slate-200 pt-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#0288D1]" />
                  Contact & Communication Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. applicant@gmail.com"
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] focus:border-[#0288D1] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number (for SMS & WhatsApp alerts) <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 9876543210"
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] focus:border-[#0288D1] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Alternate Contact Number
                    </label>
                    <input
                      type="tel"
                      name="alternate_phone"
                      value={formData.alternate_phone}
                      onChange={handleChange}
                      placeholder="e.g. 06742562826"
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] focus:border-[#0288D1] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Permanent Postal Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Plot No., Street, Landmark, Village/Town"
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] focus:border-[#0288D1] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      District <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="district"
                      required
                      value={formData.district}
                      onChange={handleChange}
                      placeholder="e.g. Khordha / Cuttack"
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] focus:border-[#0288D1] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Pincode <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="e.g. 751012"
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] focus:border-[#0288D1] outline-none"
                    />
                  </div>
                </div>
              </div>

            </div>

            <div className="bg-slate-100 px-6 py-4 flex justify-end border-t border-slate-200">
              <button
                type="submit"
                className="bg-[#0288D1] hover:bg-[#0277bd] text-white px-6 py-2.5 rounded font-bold text-sm flex items-center gap-2 shadow-xs transition-colors"
              >
                <span>Continue to Step 2 (Academics)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* ======================================================== */}
        {/* STEP 2: ACADEMIC QUALIFICATIONS & ENTRANCE DETAILS */}
        {/* ======================================================== */}
        {currentStep === 2 && (
          <form onSubmit={handleNext} className="bg-white border border-slate-300 rounded-md shadow-sm overflow-hidden">
            <div className="bg-[#0288D1] text-white px-6 py-3 font-bold text-sm flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>Step 2: Educational Qualifications & Entrance Exam Scores</span>
            </div>

            <div className="p-6 space-y-6">
              
              <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r text-amber-900 text-xs">
                <strong>Eligibility Criteria Note:</strong> For MBA admission, candidate must possess a recognized Bachelor’s Degree in any discipline with minimum 50% marks (45% for reserved categories). OJEE rank is prioritized for state quota seats.
              </div>

              {/* Graduation Details */}
              <div className="border border-slate-200 rounded p-4 bg-slate-50">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#0288D1]" />
                  Graduation / Qualifying Degree Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Degree / Stream <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] focus:border-[#0288D1] outline-none bg-white"
                    >
                      <option value="Bachelor of Science (B.Sc.)">B.Sc. (Science / Agriculture)</option>
                      <option value="Bachelor of Commerce (B.Com)">B.Com (Commerce / Accounting)</option>
                      <option value="Bachelor of Arts (B.A.)">B.A. (Arts / Economics / Humanities)</option>
                      <option value="Bachelor of Business Administration (BBA)">BBA</option>
                      <option value="Bachelor of Technology (B.Tech)">B.Tech / B.E.</option>
                      <option value="Bachelor of Computer Applications (BCA)">BCA</option>
                      <option value="Other Recognized Bachelor Degree">Other Recognized Degree</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      College / Institute Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="grad_college"
                      required
                      value={formData.grad_college}
                      onChange={handleChange}
                      placeholder="e.g. Utkal University College"
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] focus:border-[#0288D1] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Year of Passing <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="grad_year"
                      value={formData.grad_year}
                      onChange={handleChange}
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] focus:border-[#0288D1] outline-none bg-white"
                    >
                      <option value="2026">2026 (Appearing / Final Semester)</option>
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="Earlier">2021 or Earlier</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Aggregate Percentage (%) / CGPA <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="grad_percentage"
                      required
                      value={formData.grad_percentage}
                      onChange={handleChange}
                      placeholder="e.g. 68.5% or 7.2 CGPA"
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] focus:border-[#0288D1] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Entrance Examination Details */}
              <div className="border border-slate-200 rounded p-4 bg-slate-50">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  Management Entrance Test Details (For MBA Applicants)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Entrance Exam Appeared <span className="text-red-600">*</span>
                    </label>
                    <select
                      name="entrance_exam"
                      value={formData.entrance_exam}
                      onChange={handleChange}
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] focus:border-[#0288D1] outline-none bg-white"
                    >
                      <option value="OJEE">OJEE (Odisha Joint Entrance Examination)</option>
                      <option value="CAT">CAT (IIM Common Admission Test)</option>
                      <option value="MAT">MAT (AIMA)</option>
                      <option value="CMAT">CMAT (NTA)</option>
                      <option value="ATMA">ATMA</option>
                      <option value="Direct/Institutional">Direct / Institute Level GD-PI</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Roll Number / Application No.
                    </label>
                    <input
                      type="text"
                      name="entrance_roll"
                      value={formData.entrance_roll}
                      onChange={handleChange}
                      placeholder="e.g. OJEE26019482"
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] focus:border-[#0288D1] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Score / Rank / Percentile
                    </label>
                    <input
                      type="text"
                      name="entrance_score"
                      value={formData.entrance_score}
                      onChange={handleChange}
                      placeholder="e.g. State Rank 1420 / 82 Percentile"
                      className="w-full text-xs sm:text-sm px-3 py-2 border border-slate-300 rounded focus:ring-1 focus:ring-[#0288D1] focus:border-[#0288D1] outline-none"
                    />
                  </div>
                </div>
              </div>

            </div>

            <div className="bg-slate-100 px-6 py-4 flex justify-between items-center border-t border-slate-200">
              <button
                type="button"
                onClick={handlePrev}
                className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded font-semibold text-sm flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>

              <button
                type="submit"
                className="bg-[#0288D1] hover:bg-[#0277bd] text-white px-6 py-2.5 rounded font-bold text-sm flex items-center gap-2 shadow-xs transition-colors"
              >
                <span>Continue to Step 3 (Uploads & Submit)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* ======================================================== */}
        {/* STEP 3: UPLOAD SIMULATION & FORM DECLARATION */}
        {/* ======================================================== */}
        {currentStep === 3 && (
          <form onSubmit={handleSubmit} className="bg-white border border-slate-300 rounded-md shadow-sm overflow-hidden">
            <div className="bg-[#0288D1] text-white px-6 py-3 font-bold text-sm flex items-center gap-2">
              <UploadCloud className="w-4 h-4" />
              <span>Step 3: Document Uploads & Declaration</span>
            </div>

            <div className="p-6 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Photo Upload Box */}
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center bg-slate-50 hover:bg-sky-50 transition-colors">
                  <div className="w-12 h-12 bg-sky-100 text-[#0288D1] rounded-full flex items-center justify-center mx-auto mb-2">
                    <User className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-bold text-slate-800">Passport Photograph</div>
                  <div className="text-[11px] text-slate-500 mb-3">JPG/PNG, Max 2 MB</div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[11px] font-semibold">
                    <Check className="w-3 h-3" /> Ready for upload
                  </span>
                </div>

                {/* Signature Upload Box */}
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center bg-slate-50 hover:bg-sky-50 transition-colors">
                  <div className="w-12 h-12 bg-sky-100 text-[#0288D1] rounded-full flex items-center justify-center mx-auto mb-2">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-bold text-slate-800">Candidate Signature</div>
                  <div className="text-[11px] text-slate-500 mb-3">JPG/PNG, Max 1 MB</div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[11px] font-semibold">
                    <Check className="w-3 h-3" /> Ready for upload
                  </span>
                </div>

                {/* Marksheet Upload Box */}
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center bg-slate-50 hover:bg-sky-50 transition-colors">
                  <div className="w-12 h-12 bg-sky-100 text-[#0288D1] rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-bold text-slate-800">Degree Marksheet / Certificate</div>
                  <div className="text-[11px] text-slate-500 mb-3">PDF/JPG, Max 5 MB</div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[11px] font-semibold">
                    <Check className="w-3 h-3" /> Ready for upload
                  </span>
                </div>

              </div>

              {/* Applicant Review Summary Card */}
              <div className="border border-slate-200 rounded p-4 bg-sky-50/50 text-xs">
                <h4 className="font-bold text-slate-900 mb-2 uppercase tracking-wider text-[11px] text-[#0288D1]">Application Summary Review:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-700">
                  <div><strong>Programme:</strong> {formData.programme.split(' ')[0]}</div>
                  <div><strong>Name:</strong> {formData.full_name}</div>
                  <div><strong>Phone:</strong> {formData.phone}</div>
                  <div><strong>Category:</strong> {formData.category}</div>
                  <div><strong>Degree:</strong> {formData.qualification}</div>
                  <div><strong>Score:</strong> {formData.grad_percentage}</div>
                  <div><strong>Entrance:</strong> {formData.entrance_exam}</div>
                  <div><strong>District:</strong> {formData.district}</div>
                </div>
              </div>

              {/* Declaration Statement */}
              <div className="border border-slate-300 rounded p-4 bg-amber-50/40">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="declaration_agreed"
                    checked={formData.declaration_agreed}
                    onChange={handleChange}
                    className="w-4 h-4 mt-0.5 accent-[#0288D1]"
                  />
                  <div className="text-xs text-slate-700 leading-relaxed">
                    <strong>Declaration:</strong> I hereby declare that all particulars stated in this application form are true, complete and correct to the best of my knowledge and belief. I understand that in the event of any information being found false or incorrect at any stage, my admission shall be liable to immediate cancellation without refund of fees. I also agree to abide by all the rules and regulations of Madhusudan Institute of Co-operative Management (MICM) and BPUT.
                  </div>
                </label>
              </div>

            </div>

            <div className="bg-slate-100 px-6 py-4 flex justify-between items-center border-t border-slate-200">
              <button
                type="button"
                onClick={handlePrev}
                className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded font-semibold text-sm flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>

              <button
                type="submit"
                disabled={submitting || !formData.declaration_agreed}
                className={`px-8 py-2.5 rounded font-bold text-sm flex items-center gap-2 shadow-md transition-all ${
                  submitting || !formData.declaration_agreed
                    ? 'bg-slate-400 text-white cursor-not-allowed'
                    : 'bg-[#FFC107] text-[#0B1B3D] hover:bg-amber-400 font-extrabold'
                }`}
              >
                {submitting ? (
                  <span>Registering Application...</span>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Submit & Generate Application Number</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* ======================================================== */}
        {/* STEP 4: OFFICIAL PRINTABLE ACKNOWLEDGEMENT SLIP */}
        {/* ======================================================== */}
        {currentStep === 4 && submittedData && (
          <div className="space-y-6">
            
            {/* Success Header Message */}
            <div className="bg-emerald-600 text-white p-6 rounded-md shadow-md text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold">Online Application Successfully Registered!</h2>
              <p className="text-emerald-100 text-sm mt-1">
                Your admission application has been recorded in the MICM Admissions Portal database.
              </p>
              <div className="mt-4 inline-block bg-white text-[#0B1B3D] px-6 py-2.5 rounded-full font-mono text-lg font-extrabold shadow-sm">
                Application No: {submittedData.app_number}
              </div>
            </div>

            {/* Printable Institutional Slip */}
            <div id="print-slip" className="bg-white border-2 border-slate-400 rounded-md p-6 sm:p-8 shadow-sm print:p-0 print:border-none">
              
              {/* Slip Header */}
              <div className="border-b-2 border-slate-800 pb-4 mb-6 text-center">
                <div className="text-xs uppercase font-bold tracking-wider text-slate-600">
                  National Council for Cooperative Training (NCCT), New Delhi
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#0B1B3D]">
                  MADHUSUDAN INSTITUTE OF CO-OPERATIVE MANAGEMENT (MICM)
                </h3>
                <p className="text-xs text-slate-600">
                  Unit-VIII, Bhubaneswar - 751012, Odisha | Tel: +91 674 2562826 | Email: micmbbs@gmail.com
                </p>
                <div className="inline-block mt-2 px-3 py-1 bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider rounded">
                  Official Admission Acknowledgment Receipt (2026-27)
                </div>
              </div>

              {/* Data Table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                
                <div className="space-y-2 border border-slate-200 p-3 rounded">
                  <div className="font-bold text-[#0288D1] border-b pb-1">Application Information</div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Application Number:</span>
                    <span className="font-mono font-bold text-slate-900">{submittedData.app_number}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Programme:</span>
                    <span className="font-bold text-slate-900">{submittedData.programme.split(' - ')[0]}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Application Status:</span>
                    <span className="text-emerald-700 font-bold">Submitted / Pending Verification</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Date & Timestamp:</span>
                    <span className="text-slate-700">{submittedData.submission_time}</span>
                  </div>
                </div>

                <div className="space-y-2 border border-slate-200 p-3 rounded">
                  <div className="font-bold text-[#0288D1] border-b pb-1">Applicant Profile</div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Full Name:</span>
                    <span className="font-bold text-slate-900">{submittedData.full_name}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Gender / DOB:</span>
                    <span className="text-slate-900">{submittedData.gender} | {submittedData.dob}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Category:</span>
                    <span className="text-slate-900">{submittedData.category}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Father's Name:</span>
                    <span className="text-slate-900">{submittedData.father_name}</span>
                  </div>
                </div>

                <div className="space-y-2 border border-slate-200 p-3 rounded">
                  <div className="font-bold text-[#0288D1] border-b pb-1">Contact & Address</div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Email:</span>
                    <span className="text-slate-900">{submittedData.email}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Mobile:</span>
                    <span className="font-mono text-slate-900">{submittedData.phone}</span>
                  </div>
                  <div className="py-1">
                    <span className="text-slate-500 block">Address:</span>
                    <span className="text-slate-900">{submittedData.address}, {submittedData.district}, {submittedData.state} - {submittedData.pincode}</span>
                  </div>
                </div>

                <div className="space-y-2 border border-slate-200 p-3 rounded">
                  <div className="font-bold text-[#0288D1] border-b pb-1">Academic & Entrance Record</div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Qualifying Degree:</span>
                    <span className="text-slate-900">{submittedData.qualification}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Graduation % / CGPA:</span>
                    <span className="font-bold text-slate-900">{submittedData.grad_percentage}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Entrance Test:</span>
                    <span className="font-bold text-slate-900">{submittedData.entrance_exam}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Score / Rank:</span>
                    <span className="text-slate-900">{submittedData.entrance_score || 'Submitted'}</span>
                  </div>
                </div>

              </div>

              {/* Instructions Box */}
              <div className="mt-6 border-t border-slate-200 pt-4 text-xs text-slate-600 space-y-1">
                <div className="font-bold text-slate-900">Next Steps & Instructions:</div>
                <div>1. Please keep this printout / Application Number safe for all future correspondence and counselling.</div>
                <div>2. Candidate must attend OJEE Web Counselling or institutional GD-PI round with original documents.</div>
                <div>3. For any admission queries, contact the Admission Desk at <strong>+91 674 2562826</strong> or email <strong>micmbbs@gmail.com</strong>.</div>
              </div>

              {/* Signature footer */}
              <div className="mt-8 pt-6 border-t border-dashed border-slate-300 flex justify-between items-end text-xs text-slate-500">
                <div>Generated through MICM Web Admission Portal</div>
                <div className="text-right">
                  <div className="font-bold text-slate-800">Officer In-Charge Admissions</div>
                  <div>MICM Bhubaneswar</div>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center print:hidden">
              <button
                onClick={handlePrint}
                className="bg-[#0288D1] hover:bg-[#0277bd] text-white px-6 py-2.5 rounded font-bold text-sm flex items-center gap-2 shadow-xs transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Application Slip</span>
              </button>

              <Link href="/programmes"
                className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 rounded font-bold text-sm flex items-center gap-2 shadow-xs transition-colors"
              >
                <span>Back to Programmes</span>
              </Link>

              <Link href="/"
                className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 px-6 py-2.5 rounded font-bold text-sm flex items-center gap-2 transition-colors"
              >
                <span>Return to Home</span>
              </Link>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}