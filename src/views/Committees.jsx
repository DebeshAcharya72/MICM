'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  ShieldAlert, 
  Scale, 
  HeartHandshake, 
  Phone, 
  Mail, 
  AlertTriangle,
  FileText,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export default function Committees() {
  const [activeCommittee, setActiveCommittee] = useState('icc');

  const committeesList = [
    { id: 'icc', name: 'Internal Complaints Committee (ICC)', icon: HeartHandshake, color: 'text-rose-600 bg-rose-50' },
    { id: 'anti-ragging', name: 'Anti-Ragging Committee & Squad', icon: ShieldAlert, color: 'text-amber-600 bg-amber-50' },
    { id: 'grievance', name: 'Grievance Redressal Committee (GRC)', icon: Scale, color: 'text-sky-600 bg-sky-50' },
    { id: 'scst', name: 'SC / ST / OBC & Equal Opportunity Cell', icon: Users, color: 'text-emerald-600 bg-emerald-50' },
    { id: 'ombudsman', name: 'Ombudsman / Student Grievance', icon: Scale, color: 'text-indigo-600 bg-indigo-50' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Header Banner */}
      <div className="bg-[#0B1B3D] text-white py-10 border-b-4 border-[#0288D1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-sky-300 font-semibold mb-2">
            <Link href="/" className="hover:underline">HOME</Link>
            <span>/</span>
            <span className="text-white">STATUTORY COMMITTEES & GOVERNANCE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-[#FFC107]" />
            Statutory Committees & Grievance Bodies
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-3xl">
            In compliance with AICTE and UGC Statutory Directives, MICM Bhubaneswar has constituted mandatory monitoring bodies to ensure student welfare, prevention of harassment, zero-tolerance towards ragging, and equitable campus opportunities.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Left Menu Selection */}
          <div className="lg:col-span-1 space-y-2">
            <div className="bg-white border border-slate-300 rounded-md p-2 shadow-xs">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 py-2 border-b">
                Committees Directory
              </div>
              <div className="mt-1 space-y-1">
                {committeesList.map(item => {
                  const Icon = item.icon;
                  const isActive = activeCommittee === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveCommittee(item.id)}
                      className={`w-full text-left px-3 py-2.5 rounded text-xs font-bold flex items-center gap-2.5 transition-colors ${
                        isActive
                          ? 'bg-[#0288D1] text-white shadow-xs'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                      <span className="line-clamp-1">{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Action Box for Filing Grievance */}
            <div className="bg-[#0B1B3D] text-white p-5 rounded-md shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#FFC107] mb-2">Have a Grievance?</h4>
              <p className="text-xs text-slate-300 mb-3">
                Students and parents can lodge an online complaint directly through the MICM Grievance Redressal Portal.
              </p>
              <Link href="/grievance"
                className="block text-center w-full bg-[#FFC107] hover:bg-amber-400 text-[#0B1B3D] font-extrabold text-xs py-2 rounded shadow-xs transition-colors"
              >
                Lodge Grievance Online
              </Link>
            </div>
          </div>

          {/* Right Committee Details Content */}
          <div className="lg:col-span-3">
            
            {/* COMMITTEE 1: INTERNAL COMPLAINTS COMMITTEE (ICC) */}
            {activeCommittee === 'icc' && (
              <div className="bg-white border border-slate-300 rounded-md p-6 sm:p-8 shadow-xs space-y-6">
                <div className="border-b pb-4">
                  <div className="inline-block px-2.5 py-1 bg-rose-50 text-rose-700 rounded text-xs font-bold mb-2">
                    Under Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013
                  </div>
                  <h2 className="text-xl font-extrabold text-[#0B1B3D]">Internal Complaints Committee (ICC)</h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Constituted to provide protection against sexual harassment of women at the workplace and for the prevention and redressal of complaints.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-200">
                    <thead className="bg-[#0288D1] text-white">
                      <tr>
                        <th className="p-3 font-bold border-r border-sky-600">Sl. No.</th>
                        <th className="p-3 font-bold border-r border-sky-600">Name of Member</th>
                        <th className="p-3 font-bold border-r border-sky-600">Designation in Committee</th>
                        <th className="p-3 font-bold border-r border-sky-600">Institutional Designation</th>
                        <th className="p-3 font-bold">Contact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-600 border-r">1</td>
                        <td className="p-3 font-extrabold text-slate-900 border-r">Dr. Sanjib Kumar Hota</td>
                        <td className="p-3 font-semibold text-rose-700 border-r">Presiding Officer</td>
                        <td className="p-3 text-slate-600 border-r">Dy. Director, MICM</td>
                        <td className="p-3 font-mono text-slate-700">micmbbs@gmail.com</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-600 border-r">2</td>
                        <td className="p-3 font-extrabold text-slate-900 border-r">Dr. P.K. Upadhyaya</td>
                        <td className="p-3 font-semibold text-slate-800 border-r">Faculty Member</td>
                        <td className="p-3 text-slate-600 border-r">Guest Lecturer</td>
                        <td className="p-3 font-mono text-slate-700">+91 674 2562826</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-600 border-r">3</td>
                        <td className="p-3 font-extrabold text-slate-900 border-r">Smt. P. Das</td>
                        <td className="p-3 font-semibold text-slate-800 border-r">Non-Teaching Staff Member</td>
                        <td className="p-3 text-slate-600 border-r">Assistant Registrar</td>
                        <td className="p-3 font-mono text-slate-700">+91 674 2562826</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-600 border-r">4</td>
                        <td className="p-3 font-extrabold text-slate-900 border-r">Adv. Manorama Mishra</td>
                        <td className="p-3 font-semibold text-slate-800 border-r">External Member</td>
                        <td className="p-3 text-slate-600 border-r">Advocate / NGO Representative</td>
                        <td className="p-3 font-mono text-slate-700">icc.external@micm.ac.in</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-slate-50 p-4 rounded border border-slate-200 text-xs text-slate-700 space-y-1">
                  <div className="font-bold text-slate-900">ICC Complaint Procedure:</div>
                  <div>Any aggrieved person may submit a written complaint to the Presiding Officer within three months from the date of the incident. Strict confidentiality is maintained throughout inquiry proceedings.</div>
                </div>
              </div>
            )}

            {/* COMMITTEE 2: ANTI-RAGGING COMMITTEE */}
            {activeCommittee === 'anti-ragging' && (
              <div className="bg-white border border-slate-300 rounded-md p-6 sm:p-8 shadow-xs space-y-6">
                <div className="border-b pb-4">
                  <div className="inline-block px-2.5 py-1 bg-amber-50 text-amber-800 rounded text-xs font-bold mb-2">
                    Zero Tolerance Policy as per UGC & AICTE Guidelines
                  </div>
                  <h2 className="text-xl font-extrabold text-[#0B1B3D]">Anti-Ragging Committee & Flying Squad</h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Constituted to prohibit, prevent and eliminate the scourge of ragging including any conduct by any student which has the effect of teasing, treating or handling with rudeness a fresher or any other student.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border border-amber-200 rounded p-4 text-xs">
                    <div className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      24x7 Anti-Ragging Helpline
                    </div>
                    <div className="text-slate-800 font-mono text-sm font-bold mt-1">
                      National Toll-Free: 1800-180-5522
                    </div>
                    <div className="text-slate-600 mt-1">Email: helpline@antiragging.in</div>
                  </div>

                  <div className="bg-sky-50 border border-sky-200 rounded p-4 text-xs">
                    <div className="font-bold text-[#0288D1] mb-1">
                      MICM Campus Anti-Ragging Officer
                    </div>
                    <div className="text-slate-800 font-bold mt-1">Director & Dy. Director Desk</div>
                    <div className="text-slate-600 mt-0.5">Telephone: +91 674 2562826 / 2562827</div>
                    <div className="text-slate-600">Email: micmbbs@gmail.com</div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-200">
                    <thead className="bg-[#0288D1] text-white">
                      <tr>
                        <th className="p-3 font-bold border-r border-sky-600">Sl. No.</th>
                        <th className="p-3 font-bold border-r border-sky-600">Committee Member</th>
                        <th className="p-3 font-bold border-r border-sky-600">Role</th>
                        <th className="p-3 font-bold">Designation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-600 border-r">1</td>
                        <td className="p-3 font-bold text-slate-900 border-r">Dr. P. Kannaiah</td>
                        <td className="p-3 font-semibold text-slate-800 border-r">Chairman</td>
                        <td className="p-3 text-slate-600">Director, MICM</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-600 border-r">2</td>
                        <td className="p-3 font-bold text-slate-900 border-r">Dr. Sanjib Kumar Hota</td>
                        <td className="p-3 font-semibold text-slate-800 border-r">Member Secretary</td>
                        <td className="p-3 text-slate-600">Dy. Director, MICM</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-600 border-r">3</td>
                        <td className="p-3 font-bold text-slate-900 border-r">Local Police Representative</td>
                        <td className="p-3 font-semibold text-slate-800 border-r">Police Administration</td>
                        <td className="p-3 text-slate-600">IIC, Capital Police Station, Bhubaneswar</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-600 border-r">4</td>
                        <td className="p-3 font-bold text-slate-900 border-r">Hostel Warden (Boys & Girls)</td>
                        <td className="p-3 font-semibold text-slate-800 border-r">Hostel Administration</td>
                        <td className="p-3 text-slate-600">Wardens, MICM Campus</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* COMMITTEE 3: GRIEVANCE REDRESSAL */}
            {activeCommittee === 'grievance' && (
              <div className="bg-white border border-slate-300 rounded-md p-6 sm:p-8 shadow-xs space-y-6">
                <div className="border-b pb-4">
                  <h2 className="text-xl font-extrabold text-[#0B1B3D]">Grievance Redressal Committee (GRC)</h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Constituted under AICTE (Redressal of Grievance of Students) Regulations, 2019 for addressing academic, examination, hostel, and fee-related grievances.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-200">
                    <thead className="bg-[#0288D1] text-white">
                      <tr>
                        <th className="p-3 font-bold border-r border-sky-600">Sl. No.</th>
                        <th className="p-3 font-bold border-r border-sky-600">Name</th>
                        <th className="p-3 font-bold border-r border-sky-600">Position in GRC</th>
                        <th className="p-3 font-bold">Category</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-600 border-r">1</td>
                        <td className="p-3 font-bold text-slate-900 border-r">Dr. P. Kannaiah</td>
                        <td className="p-3 font-semibold text-slate-800 border-r">Chairman</td>
                        <td className="p-3 text-slate-600">Head of Institute</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-600 border-r">2</td>
                        <td className="p-3 font-bold text-slate-900 border-r">Dr. Sanjib Kumar Hota</td>
                        <td className="p-3 font-semibold text-slate-800 border-r">Senior Faculty Member</td>
                        <td className="p-3 text-slate-600">Faculty</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-600 border-r">3</td>
                        <td className="p-3 font-bold text-slate-900 border-r">Dr. P.K. Upadhyaya</td>
                        <td className="p-3 font-semibold text-slate-800 border-r">Faculty Member</td>
                        <td className="p-3 text-slate-600">Faculty</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-4 bg-sky-50 rounded border border-sky-200 flex justify-between items-center">
                  <div className="text-xs text-slate-700">
                    <strong>Submit an Online Grievance:</strong> Receive a system-generated tracking ID to monitor inquiry progress.
                  </div>
                  <Link href="/grievance"
                    className="bg-[#0288D1] text-white font-bold text-xs px-4 py-2 rounded shadow-xs hover:bg-[#0277bd] transition-colors"
                  >
                    Open Form
                  </Link>
                </div>
              </div>
            )}

            {/* COMMITTEE 4: SC/ST CELL */}
            {activeCommittee === 'scst' && (
              <div className="bg-white border border-slate-300 rounded-md p-6 sm:p-8 shadow-xs space-y-6">
                <div className="border-b pb-4">
                  <h2 className="text-xl font-extrabold text-[#0B1B3D]">SC / ST & Equal Opportunity Cell</h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Constituted under the Scheduled Castes and the Scheduled Tribes (Prevention of Atrocities) Act, 1989 to safeguard the interests of SC/ST students, staff, and faculty members.
                  </p>
                </div>

                <div className="text-xs text-slate-700 space-y-3 leading-relaxed">
                  <p>
                    The SC/ST Cell ensures the effective implementation of reservation policies, welfare schemes, and scholarships instituted by the Ministry of Social Justice & Empowerment, Ministry of Tribal Affairs, and Govt. of Odisha PRERANA scholarship portal.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-200">
                    <thead className="bg-[#0288D1] text-white">
                      <tr>
                        <th className="p-3 font-bold border-r border-sky-600">Sl. No.</th>
                        <th className="p-3 font-bold border-r border-sky-600">Member</th>
                        <th className="p-3 font-bold border-r border-sky-600">Role</th>
                        <th className="p-3 font-bold">Contact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr className="hover:bg-slate-50">
                        <td className="p-3 font-bold text-slate-600 border-r">1</td>
                        <td className="p-3 font-bold text-slate-900 border-r">Liaison Officer (SC/ST)</td>
                        <td className="p-3 font-semibold text-slate-800 border-r">Convener</td>
                        <td className="p-3 font-mono text-slate-700">+91 674 2562826</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* COMMITTEE 5: OMBUDSMAN */}
            {activeCommittee === 'ombudsman' && (
              <div className="bg-white border border-slate-300 rounded-md p-6 sm:p-8 shadow-xs space-y-6">
                <div className="border-b pb-4">
                  <h2 className="text-xl font-extrabold text-[#0B1B3D]">Ombudsman for Grievances</h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Appointment of Ombudsman pursuant to AICTE Notification for hearing appeals arising from the Grievance Redressal Committee.
                  </p>
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded text-xs space-y-2">
                  <div className="text-sm font-bold text-slate-900">Affiliating University Ombudsman:</div>
                  <div className="text-slate-700">Office of the Ombudsman, Biju Patnaik University of Technology (BPUT), Chhend, Rourkela - 769015, Odisha.</div>
                  <div className="text-slate-600">Official Portal: <a href="https://bput.ac.in" target="_blank" rel="noopener noreferrer" className="text-[#0288D1] hover:underline font-mono">www.bput.ac.in</a></div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}