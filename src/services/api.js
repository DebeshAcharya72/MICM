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

  getFacultyMember: async (idOrSlug) => {
    try {
      const res = await fetch(`${API_BASE_URL}/faculty/${idOrSlug}`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
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

  updateFaculty: async (id, facultyData, token) => {
    const res = await fetch(`${API_BASE_URL}/faculty/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(facultyData),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Failed to update faculty');
    }
    return await res.json();
  },

  deleteFaculty: async (id, token) => {
    const res = await fetch(`${API_BASE_URL}/faculty/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  // Image Upload (ImgBB with resilient fallback)
  uploadImage: async (file) => {
    console.log("[api.uploadImage] Preparing upload for file:", file?.name, file?.size);
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.error("[api.uploadImage] Upload failed:", err);
      throw new Error(err.detail || 'Failed to upload image');
    }
    const data = await res.json();
    console.log("[api.uploadImage] Upload succeeded:", data);
    return data;
  },

  // Banners
  getBanners: async (activeOnly = true) => {
    try {
      const res = await fetch(`${API_BASE_URL}/banners?active_only=${activeOnly}`);
      return await res.json();
    } catch {
      return [];
    }
  },

  createBanner: async (bannerData, token) => {
    const res = await fetch(`${API_BASE_URL}/banners`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bannerData),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Failed to create banner');
    }
    return await res.json();
  },

  updateBanner: async (id, bannerData, token) => {
    const res = await fetch(`${API_BASE_URL}/banners/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bannerData),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Failed to update banner');
    }
    return await res.json();
  },

  deleteBanner: async (id, token) => {
    const res = await fetch(`${API_BASE_URL}/banners/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Failed to delete banner');
    }
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

  // Trainings
  getTrainings: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/trainings`);
      return await res.json();
    } catch {
      return [];
    }
  },

  createTraining: async (trainingData, token) => {
    const res = await fetch(`${API_BASE_URL}/trainings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(trainingData),
    });
    return await res.json();
  },

  deleteTraining: async (id, token) => {
    const res = await fetch(`${API_BASE_URL}/trainings/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  // Announcements
  getAnnouncements: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/announcements`);
      return await res.json();
    } catch {
      return [];
    }
  },

  createAnnouncement: async (announcementData, token) => {
    const res = await fetch(`${API_BASE_URL}/announcements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(announcementData),
    });
    return await res.json();
  },

  deleteAnnouncement: async (id, token) => {
    const res = await fetch(`${API_BASE_URL}/announcements/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  // Placements
  getPlacements: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/placements`);
      return await res.json();
    } catch {
      return [];
    }
  },

  createPlacement: async (placementData, token) => {
    const res = await fetch(`${API_BASE_URL}/placements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(placementData),
    });
    return await res.json();
  },

  deletePlacement: async (id, token) => {
    const res = await fetch(`${API_BASE_URL}/placements/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  // Cooperative News
  getCoopNews: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/coop-news`);
      return await res.json();
    } catch {
      return [];
    }
  },

  createCoopNews: async (newsData, token) => {
    const res = await fetch(`${API_BASE_URL}/coop-news`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newsData),
    });
    return await res.json();
  },

  deleteCoopNews: async (id, token) => {
    const res = await fetch(`${API_BASE_URL}/coop-news/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  // Quick Links
  getQuickLinks: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/quick-links`);
      return await res.json();
    } catch {
      return [];
    }
  },

  createQuickLink: async (linkData, token) => {
    const res = await fetch(`${API_BASE_URL}/quick-links`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(linkData),
    });
    return await res.json();
  },

  deleteQuickLink: async (id, token) => {
    const res = await fetch(`${API_BASE_URL}/quick-links/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  // Placement Stats
  getPlacementStats: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/placement-stats`);
      return await res.json();
    } catch {
      return [];
    }
  },

  createPlacementStat: async (statData, token) => {
    const res = await fetch(`${API_BASE_URL}/placement-stats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(statData),
    });
    return await res.json();
  },

  deletePlacementStat: async (id, token) => {
    const res = await fetch(`${API_BASE_URL}/placement-stats/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  // Recruiters
  getRecruiters: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/recruiters`);
      return await res.json();
    } catch {
      return [];
    }
  },

  createRecruiter: async (recruiterData, token) => {
    const res = await fetch(`${API_BASE_URL}/recruiters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(recruiterData),
    });
    return await res.json();
  },

  deleteRecruiter: async (id, token) => {
    const res = await fetch(`${API_BASE_URL}/recruiters/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  // Internships
  getInternships: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/internships`);
      return await res.json();
    } catch {
      return [];
    }
  },

  createInternship: async (internshipData, token) => {
    const res = await fetch(`${API_BASE_URL}/internships`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(internshipData),
    });
    return await res.json();
  },

  deleteInternship: async (id, token) => {
    const res = await fetch(`${API_BASE_URL}/internships/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  // Campus Events
  getCampusEvents: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/campus-events`);
      return await res.json();
    } catch {
      return [];
    }
  },

  createCampusEvent: async (eventData, token) => {
    const res = await fetch(`${API_BASE_URL}/campus-events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    });
    return await res.json();
  },

  deleteCampusEvent: async (id, token) => {
    const res = await fetch(`${API_BASE_URL}/campus-events/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  // Alumni
  getAlumni: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/alumni`);
      return await res.json();
    } catch {
      return [];
    }
  },

  createAlumni: async (alumniData, token) => {
    const res = await fetch(`${API_BASE_URL}/alumni`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(alumniData),
    });
    return await res.json();
  },

  deleteAlumni: async (id, token) => {
    const res = await fetch(`${API_BASE_URL}/alumni/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  // Alumni Registration Requests
  submitAlumniRequest: async (requestData) => {
    const res = await fetch(`${API_BASE_URL}/alumni-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Failed to submit alumni registration');
    }
    return await res.json();
  },

  getAlumniRequests: async (token) => {
    try {
      const res = await fetch(`${API_BASE_URL}/alumni-requests`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return await res.json();
    } catch {
      return [];
    }
  },

  deleteAlumniRequest: async (id, token) => {
    const res = await fetch(`${API_BASE_URL}/alumni-requests/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  // Gallery CMS (Images & Videos)
  getGallery: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/gallery`);
      return await res.json();
    } catch {
      return [];
    }
  },

  createGalleryItem: async (itemData, token) => {
    const res = await fetch(`${API_BASE_URL}/gallery`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(itemData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || 'Failed to add gallery item');
    }
    return await res.json();
  },

  deleteGalleryItem: async (id, token) => {
    const res = await fetch(`${API_BASE_URL}/gallery/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },

  // Dashboard Stats
  getDashboardStats: async (token) => {
    const res = await fetch(`${API_BASE_URL}/stats/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  },
};