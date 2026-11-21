const API_BASE_URL = '/api';

export const api = {
  // Health
  checkHealth: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      return await res.json();
    } catch (e) {
      return { status: 'offline', error: e.message };
    }
  },

  // Auth
  login: async (username, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Login failed');
    }
    return await res.json();
  },

  getMe: async (token) => {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  // Notices
  getNotices: async (activeOnly = true) => {
    try {
      const res = await fetch(`${API_BASE_URL}/notices?active_only=${activeOnly}`);
      return await res.json();
    } catch {
      return [];
    }
  },

  createNotice: async (noticeData, token) => {
    const res = await fetch(`${API_BASE_URL}/notices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(noticeData),
    });
    return await res.json();
  },

  deleteNotice: async (id, token) => {
    const res = await fetch(`${API_BASE_URL}/notices/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  // Enquiries
  submitEnquiry: async (enquiryData) => {
    const res = await fetch(`${API_BASE_URL}/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiryData),
    });
    return await res.json();
  },

  getEnquiries: async (token) => {
    const res = await fetch(`${API_BASE_URL}/enquiries`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  updateEnquiryStatus: async (id, status, token) => {
    const res = await fetch(`${API_BASE_URL}/enquiries/${id}/status?status=${status}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  // Multi-step Applications
  submitApplication: async (appData) => {
    const res = await fetch(`${API_BASE_URL}/applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appData),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Application submission failed');
    }
    return await res.json();
  },

  getApplications: async (token) => {
    const res = await fetch(`${API_BASE_URL}/applications`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  getApplicationByNumber: async (appNumber) => {
    const res = await fetch(`${API_BASE_URL}/applications/${appNumber}`);
    if (!res.ok) throw new Error('Application Number not found');
    return await res.json();
  },

  // Grievances
  submitGrievance: async (grievanceData) => {
    const res = await fetch(`${API_BASE_URL}/grievances`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(grievanceData),
    });
    return await res.json();
  },

  trackGrievance: async (trackingId) => {
    const res = await fetch(`${API_BASE_URL}/grievances/track/${trackingId}`);
    if (!res.ok) throw new Error('Tracking ID not found');
    return await res.json();
  },

  getGrievances: async (token) => {
    const res = await fetch(`${API_BASE_URL}/grievances`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  // Faculty
  getFaculty: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/faculty`);
      return await res.json();
    } catch {
      return [];
    }
  },

  createFaculty: async (facultyData, token) => {
    const res = await fetch(`${API_BASE_URL}/faculty`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(facultyData),
    });
    return await res.json();
  },

  deleteFaculty: async (id, token) => {
    const res = await fetch(`${API_BASE_URL}/faculty/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  // Downloads
  getDownloads: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/downloads`);
      return await res.json();
    } catch {
      return [];
    }
  },

  // News
  getNews: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/news`);
      return await res.json();
    } catch {
      return [];
    }
  },

  // Dashboard Stats
  getDashboardStats: async (token) => {
    const res = await fetch(`${API_BASE_URL}/stats/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },
};