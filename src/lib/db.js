import mongoose from 'mongoose';
import crypto from 'crypto';
import connectToDatabase from './mongoose.js';

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// --------------------------------------------------------------------------
// Mongoose Schemas & Models
// --------------------------------------------------------------------------

const AdminUserSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.Mixed },
  username: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  full_name: { type: String, default: 'MICM Portal Administrator' },
  role: { type: String, default: 'superadmin' },
  created_at: { type: String, default: () => new Date().toISOString() }
}, { timestamps: true });

const NoticeSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.Mixed },
  title: { type: String, required: true },
  category: { type: String, default: 'Admissions' },
  date: { type: String },
  link: { type: String, default: '#' },
  is_new: { type: Number, default: 1 },
  is_active: { type: Number, default: 1 },
  created_at: { type: String, default: () => new Date().toISOString() }
}, { timestamps: true });

const ApplicationSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.Mixed },
  app_number: { type: String, required: true, unique: true },
  programme: { type: String, required: true },
  full_name: { type: String, required: true },
  gender: { type: String },
  dob: { type: String },
  category: { type: String },
  father_name: { type: String, default: '' },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String },
  qualification: { type: String },
  grad_percentage: { type: String },
  entrance_exam: { type: String },
  entrance_roll: { type: String, default: '' },
  entrance_score: { type: String, default: '' },
  documents_status: { type: String, default: 'Verified Online' },
  status: { type: String, default: 'Submitted' },
  created_at: { type: String, default: () => new Date().toISOString() }
}, { timestamps: true });

const EnquirySchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.Mixed },
  full_name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  programme: { type: String },
  message: { type: String, default: '' },
  status: { type: String, default: 'New' },
  created_at: { type: String, default: () => new Date().toISOString() }
}, { timestamps: true });

const GrievanceSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.Mixed },
  tracking_id: { type: String, required: true, unique: true },
  grievant_type: { type: String },
  full_name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  category: { type: String },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: 'Under Review' },
  resolution_notes: { type: String, default: 'Forwarded to Designated Grievance Officer' },
  created_at: { type: String, default: () => new Date().toISOString() }
}, { timestamps: true });

const FacultySchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.Mixed },
  name: { type: String, required: true },
  designation: { type: String, required: true },
  department: { type: String, default: 'Management Studies' },
  qualifications: { type: String },
  expertise: { type: String },
  email: { type: String, default: 'micmbbs@gmail.com' },
  phone: { type: String, default: '+91 674 2562826' },
  image_url: { type: String, default: null },
  order_seq: { type: Number, default: 9 },
  created_at: { type: String, default: () => new Date().toISOString() },
  updated_at: { type: String }
}, { timestamps: true });

const BannerSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.Mixed },
  title: { type: String, default: "CONGRATULATIONS" },
  subtitle: { type: String, default: "" },
  location: { type: String, default: "MADHUSUDAN INSTITUTE OF CO-OPERATIVE MANAGEMENT" },
  bg: { type: String, default: "from-[#0c2a5c] via-[#103a7d] to-[#0c2a5c]" },
  image_url: { type: String, default: null },
  students: { type: Array, default: [] },
  is_active: { type: Number, default: 1 },
  order_seq: { type: Number, default: 1 },
  created_at: { type: String, default: () => new Date().toISOString() },
  updated_at: { type: String }
}, { timestamps: true });

const DownloadSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.Mixed },
  title: { type: String, required: true },
  category: { type: String, default: 'General' },
  file_size: { type: String },
  upload_date: { type: String },
  file_type: { type: String, default: 'PDF' },
  created_at: { type: String, default: () => new Date().toISOString() }
}, { timestamps: true });

const NewsEventSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.Mixed },
  title: { type: String, required: true },
  category: { type: String },
  date: { type: String },
  summary: { type: String },
  content: { type: String },
  image_url: { type: String },
  is_active: { type: Number, default: 1 },
  created_at: { type: String, default: () => new Date().toISOString() }
}, { timestamps: true });

const TrainingSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.Mixed },
  title: { type: String, required: true },
  fromDate: { type: String },
  toDate: { type: String },
  venue: { type: String, default: 'MICM Campus, Bhubaneswar' },
  link: { type: String, default: '#' },
  created_at: { type: String, default: () => new Date().toISOString() }
}, { timestamps: true });

const AnnouncementSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.Mixed },
  title: { type: String, required: true },
  date: { type: String },
  pdf_url: { type: String, default: '#' },
  is_new: { type: Number, default: 1 },
  created_at: { type: String, default: () => new Date().toISOString() }
}, { timestamps: true });

const PlacementSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.Mixed },
  student_name: { type: String, required: true },
  company: { type: String, required: true },
  package: { type: String, required: true },
  year: { type: String },
  image_url: { type: String, default: '' },
  created_at: { type: String, default: () => new Date().toISOString() }
}, { timestamps: true });

const CoopNewsSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.Mixed },
  title: { type: String, required: true },
  date: { type: String },
  link: { type: String, default: '#' },
  created_at: { type: String, default: () => new Date().toISOString() }
}, { timestamps: true });

const QuickLinkSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.Mixed },
  title: { type: String, required: true },
  url: { type: String, required: true },
  order: { type: Number, default: 0 },
  created_at: { type: String, default: () => new Date().toISOString() }
}, { timestamps: true });

// Export Models (prevent overwrite in dev)
export const AdminUser = mongoose.models.AdminUser || mongoose.model('AdminUser', AdminUserSchema);
export const Notice = mongoose.models.Notice || mongoose.model('Notice', NoticeSchema);
export const Application = mongoose.models.Application || mongoose.model('Application', ApplicationSchema);
export const Enquiry = mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
export const Grievance = mongoose.models.Grievance || mongoose.model('Grievance', GrievanceSchema);
export const Faculty = mongoose.models.Faculty || mongoose.model('Faculty', FacultySchema);
export const Banner = mongoose.models.Banner || mongoose.model('Banner', BannerSchema);
export const Download = mongoose.models.Download || mongoose.model('Download', DownloadSchema);
export const NewsEvent = mongoose.models.NewsEvent || mongoose.model('NewsEvent', NewsEventSchema);
export const Training = mongoose.models.Training || mongoose.model('Training', TrainingSchema);
export const Announcement = mongoose.models.Announcement || mongoose.model('Announcement', AnnouncementSchema);
export const Placement = mongoose.models.Placement || mongoose.model('Placement', PlacementSchema);
export const CoopNews = mongoose.models.CoopNews || mongoose.model('CoopNews', CoopNewsSchema);
export const QuickLink = mongoose.models.QuickLink || mongoose.model('QuickLink', QuickLinkSchema);

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------

function formatDoc(doc) {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject({ virtuals: true }) : { ...doc };
  if (!obj.id && obj._id) {
    obj.id = obj._id.toString();
  }
  if (obj._id) {
    obj._id = obj._id.toString();
  }
  return obj;
}

function formatDocs(docs) {
  if (!Array.isArray(docs)) return [];
  return docs.map(formatDoc);
}

function buildIdQuery(id) {
  const queries = [];
  if (mongoose.Types.ObjectId.isValid(id)) {
    queries.push({ _id: id });
  }
  queries.push({ id: id });
  const num = Number(id);
  if (!isNaN(num)) {
    queries.push({ id: num });
  }
  return queries.length === 1 ? queries[0] : { $or: queries };
}

async function getNextId(Model) {
  const last = await Model.findOne().sort({ id: -1 }).select('id').lean();
  if (last && typeof last.id === 'number') {
    return last.id + 1;
  }
  const count = await Model.countDocuments();
  return count + 1;
}

// --------------------------------------------------------------------------
// Database Query Engine & Methods (Identical signatures and return formats)
// --------------------------------------------------------------------------

export const db = {
  // Generic collection lookup mapping
  _getModel: (collection) => {
    switch (collection) {
      case 'admin_users': return AdminUser;
      case 'notices': return Notice;
      case 'applications': return Application;
      case 'enquiries': return Enquiry;
      case 'grievances': return Grievance;
      case 'faculty': return Faculty;
      case 'banners': return Banner;
      case 'downloads': return Download;
      case 'news_events': return NewsEvent;
      case 'trainings': return Training;
      case 'announcements': return Announcement;
      case 'placements': return Placement;
      case 'coop_news': return CoopNews;
      case 'quick_links': return QuickLink;
      default: return null;
    }
  },

  query: {
    find: async (collection, filter = {}, { sort, limit, skip = 0 } = {}) => {
      await connectToDatabase();
      const Model = db._getModel(collection);
      if (!Model) return [];
      let q = Model.find(filter).skip(skip);
      if (sort) q = q.sort(sort);
      if (limit) q = q.limit(limit);
      const docs = await q.lean();
      return formatDocs(docs);
    },
    findOne: async (collection, filter = {}) => {
      await connectToDatabase();
      const Model = db._getModel(collection);
      if (!Model) return null;
      const doc = await Model.findOne(filter).lean();
      return formatDoc(doc);
    },
    findById: async (collection, id) => {
      await connectToDatabase();
      const Model = db._getModel(collection);
      if (!Model) return null;
      const doc = await Model.findOne(buildIdQuery(id)).lean();
      return formatDoc(doc);
    },
    insert: async (collection, document) => {
      await connectToDatabase();
      const Model = db._getModel(collection);
      if (!Model) return null;
      const id = document.id || (await getNextId(Model));
      const created = await Model.create({
        ...document,
        id,
        created_at: document.created_at || new Date().toISOString()
      });
      return formatDoc(created);
    },
    update: async (collection, id, updates) => {
      await connectToDatabase();
      const Model = db._getModel(collection);
      if (!Model) return null;
      const updated = await Model.findOneAndUpdate(
        buildIdQuery(id),
        { ...updates, updated_at: new Date().toISOString() },
        { new: true }
      ).lean();
      return formatDoc(updated);
    },
    delete: async (collection, id) => {
      await connectToDatabase();
      const Model = db._getModel(collection);
      if (!Model) return false;
      const res = await Model.findOneAndDelete(buildIdQuery(id));
      return !!res;
    },
    count: async (collection, filter = {}) => {
      await connectToDatabase();
      const Model = db._getModel(collection);
      if (!Model) return 0;
      return await Model.countDocuments(filter);
    }
  },

  // Authentication
  authenticateAdmin: async (username, password) => {
    await connectToDatabase();
    const hash = hashPassword(password);
    const user = await AdminUser.findOne({ username, password_hash: hash }).lean();
    if (!user) return null;
    const userId = user.id || user._id.toString();
    const token = `micm_admin_token_${userId}_${Math.floor(100000 + Math.random() * 900000)}`;
    return {
      access_token: token,
      token_type: 'bearer',
      user: {
        id: userId,
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
  getNotices: async (activeOnly = true) => {
    await connectToDatabase();
    const query = activeOnly ? { is_active: { $ne: 0 } } : {};
    const docs = await Notice.find(query).sort({ created_at: -1, _id: -1 }).lean();
    return formatDocs(docs);
  },

  createNotice: async (notice) => {
    await connectToDatabase();
    const id = notice.id || (await getNextId(Notice));
    const now = new Date();
    const dateStr = notice.date || now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
    const created = await Notice.create({
      id,
      title: notice.title,
      category: notice.category || 'Admissions',
      date: dateStr,
      link: notice.link || '#',
      is_new: notice.is_new !== undefined ? Number(notice.is_new) : 1,
      is_active: 1,
      created_at: new Date().toISOString()
    });
    return formatDoc(created);
  },

  deleteNotice: async (id) => {
    await connectToDatabase();
    const res = await Notice.findOneAndDelete(buildIdQuery(id));
    return !!res;
  },

  // Applications
  getApplications: async () => {
    await connectToDatabase();
    const docs = await Application.find().sort({ created_at: -1, _id: -1 }).lean();
    return formatDocs(docs);
  },

  getApplicationByNumber: async (appNumber) => {
    await connectToDatabase();
    const doc = await Application.findOne({ app_number: appNumber }).lean();
    return formatDoc(doc);
  },

  createApplication: async (app) => {
    await connectToDatabase();
    const id = app.id || (await getNextId(Application));
    const year = new Date().getFullYear();
    const random = Math.floor(10000 + Math.random() * 90000);
    const appNumber = app.app_number || `MICM-${year}-${random}`;

    const created = await Application.create({
      id,
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
    });
    return formatDoc(created);
  },

  // Enquiries
  getEnquiries: async () => {
    await connectToDatabase();
    const docs = await Enquiry.find().sort({ created_at: -1, _id: -1 }).lean();
    return formatDocs(docs);
  },

  createEnquiry: async (enq) => {
    await connectToDatabase();
    const id = enq.id || (await getNextId(Enquiry));
    const created = await Enquiry.create({
      id,
      full_name: enq.full_name,
      email: enq.email,
      phone: enq.phone,
      programme: enq.programme,
      message: enq.message || '',
      status: 'New',
      created_at: new Date().toISOString()
    });
    return formatDoc(created);
  },

  updateEnquiryStatus: async (id, status) => {
    await connectToDatabase();
    const updated = await Enquiry.findOneAndUpdate(
      buildIdQuery(id),
      { status, updated_at: new Date().toISOString() },
      { new: true }
    ).lean();
    return formatDoc(updated);
  },

  // Grievances
  getGrievances: async () => {
    await connectToDatabase();
    const docs = await Grievance.find().sort({ created_at: -1, _id: -1 }).lean();
    return formatDocs(docs);
  },

  trackGrievance: async (trackingId) => {
    await connectToDatabase();
    const doc = await Grievance.findOne({ tracking_id: trackingId }).lean();
    return formatDoc(doc);
  },

  createGrievance: async (grv) => {
    await connectToDatabase();
    const id = grv.id || (await getNextId(Grievance));
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    const trackingId = grv.tracking_id || `GRV-${year}-${random}`;

    const created = await Grievance.create({
      id,
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
    });
    return formatDoc(created);
  },

  // Faculty
  getFaculty: async () => {
    await connectToDatabase();
    const docs = await Faculty.find().sort({ order_seq: 1, id: 1 }).lean();
    return formatDocs(docs);
  },

  createFaculty: async (fac) => {
    await connectToDatabase();
    const id = fac.id || (await getNextId(Faculty));
    const created = await Faculty.create({
      id,
      name: fac.name,
      designation: fac.designation,
      department: fac.department || 'Management Studies',
      qualifications: fac.qualifications,
      expertise: fac.expertise,
      email: fac.email || 'micmbbs@gmail.com',
      phone: fac.phone || '+91 674 2562826',
      image_url: fac.image_url || null,
      order_seq: fac.order_seq !== undefined ? Number(fac.order_seq) : 9,
      created_at: new Date().toISOString()
    });
    return formatDoc(created);
  },

  updateFaculty: async (id, facUpdates) => {
    await connectToDatabase();
    const updated = await Faculty.findOneAndUpdate(
      buildIdQuery(id),
      { ...facUpdates, updated_at: new Date().toISOString() },
      { new: true }
    ).lean();
    return formatDoc(updated);
  },

  deleteFaculty: async (id) => {
    await connectToDatabase();
    const res = await Faculty.findOneAndDelete(buildIdQuery(id));
    return !!res;
  },

  // Banners
  getBanners: async (activeOnly = true) => {
    await connectToDatabase();
    const query = activeOnly ? { is_active: { $ne: 0 } } : {};
    const docs = await Banner.find(query).sort({ order_seq: 1, id: 1 }).lean();
    return formatDocs(docs);
  },

  createBanner: async (bannerData) => {
    await connectToDatabase();
    const id = bannerData.id || (await getNextId(Banner));
    const count = await Banner.countDocuments();
    const created = await Banner.create({
      id,
      title: bannerData.title || "CONGRATULATIONS",
      subtitle: bannerData.subtitle || "",
      location: bannerData.location || "MADHUSUDAN INSTITUTE OF CO-OPERATIVE MANAGEMENT",
      bg: bannerData.bg || "from-[#0c2a5c] via-[#103a7d] to-[#0c2a5c]",
      image_url: bannerData.image_url || null,
      students: Array.isArray(bannerData.students) ? bannerData.students : [],
      is_active: bannerData.is_active !== undefined ? (bannerData.is_active ? 1 : 0) : 1,
      order_seq: bannerData.order_seq || count + 1,
      created_at: new Date().toISOString()
    });
    return formatDoc(created);
  },

  updateBanner: async (id, bannerData) => {
    await connectToDatabase();
    const updated = await Banner.findOneAndUpdate(
      buildIdQuery(id),
      { ...bannerData, updated_at: new Date().toISOString() },
      { new: true }
    ).lean();
    return formatDoc(updated);
  },

  deleteBanner: async (id) => {
    await connectToDatabase();
    const res = await Banner.findOneAndDelete(buildIdQuery(id));
    return !!res;
  },

  // Downloads
  getDownloads: async () => {
    await connectToDatabase();
    const docs = await Download.find().sort({ created_at: -1, id: -1 }).lean();
    return formatDocs(docs);
  },

  // News Events
  getNews: async () => {
    await connectToDatabase();
    const docs = await NewsEvent.find({ is_active: { $ne: 0 } }).sort({ created_at: -1, id: -1 }).lean();
    return formatDocs(docs);
  },

  // Trainings
  getTrainings: async () => {
    await connectToDatabase();
    const docs = await Training.find().sort({ created_at: -1, id: -1 }).lean();
    return formatDocs(docs);
  },

  createTraining: async (training) => {
    await connectToDatabase();
    const id = training.id || (await getNextId(Training));
    const created = await Training.create({
      id,
      title: training.title || '',
      fromDate: training.fromDate || '',
      toDate: training.toDate || '',
      venue: training.venue || 'MICM Campus, Bhubaneswar',
      link: training.link || '#',
      created_at: new Date().toISOString()
    });
    return formatDoc(created);
  },

  deleteTraining: async (id) => {
    await connectToDatabase();
    const res = await Training.findOneAndDelete(buildIdQuery(id));
    return !!res;
  },

  // Announcements
  getAnnouncements: async () => {
    await connectToDatabase();
    const docs = await Announcement.find().sort({ created_at: -1, id: -1 }).lean();
    return formatDocs(docs);
  },

  createAnnouncement: async (ann) => {
    await connectToDatabase();
    const id = ann.id || (await getNextId(Announcement));
    const dateStr = ann.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
    const created = await Announcement.create({
      id,
      title: ann.title || '',
      date: dateStr,
      pdf_url: ann.pdf_url || '#',
      is_new: ann.is_new !== undefined ? (ann.is_new ? 1 : 0) : 1,
      created_at: new Date().toISOString()
    });
    return formatDoc(created);
  },

  deleteAnnouncement: async (id) => {
    await connectToDatabase();
    const res = await Announcement.findOneAndDelete(buildIdQuery(id));
    return !!res;
  },

  // Placements
  getPlacements: async () => {
    await connectToDatabase();
    const docs = await Placement.find().sort({ created_at: -1, id: -1 }).lean();
    return formatDocs(docs);
  },

  createPlacement: async (plc) => {
    await connectToDatabase();
    const id = plc.id || (await getNextId(Placement));
    const created = await Placement.create({
      id,
      student_name: plc.student_name || '',
      company: plc.company || '',
      package: plc.package || '',
      year: plc.year || new Date().getFullYear().toString(),
      image_url: plc.image_url || '',
      created_at: new Date().toISOString()
    });
    return formatDoc(created);
  },

  deletePlacement: async (id) => {
    await connectToDatabase();
    const res = await Placement.findOneAndDelete(buildIdQuery(id));
    return !!res;
  },

  // Cooperative News
  getCoopNews: async () => {
    await connectToDatabase();
    const docs = await CoopNews.find().sort({ created_at: -1, id: -1 }).lean();
    return formatDocs(docs);
  },

  createCoopNews: async (item) => {
    await connectToDatabase();
    const id = item.id || (await getNextId(CoopNews));
    const dateStr = item.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, '-');
    const created = await CoopNews.create({
      id,
      title: item.title || '',
      date: dateStr,
      link: item.link || '#',
      created_at: new Date().toISOString()
    });
    return formatDoc(created);
  },

  deleteCoopNews: async (id) => {
    await connectToDatabase();
    const res = await CoopNews.findOneAndDelete(buildIdQuery(id));
    return !!res;
  },

  // Quick Links
  getQuickLinks: async () => {
    await connectToDatabase();
    const docs = await QuickLink.find().sort({ order: 1, id: 1 }).lean();
    return formatDocs(docs);
  },

  createQuickLink: async (linkData) => {
    await connectToDatabase();
    const id = linkData.id || (await getNextId(QuickLink));
    const count = await QuickLink.countDocuments();
    const created = await QuickLink.create({
      id,
      title: linkData.title || '',
      url: linkData.url || '#',
      order: linkData.order !== undefined ? Number(linkData.order) : count + 1,
      created_at: new Date().toISOString()
    });
    return formatDoc(created);
  },

  deleteQuickLink: async (id) => {
    await connectToDatabase();
    const res = await QuickLink.findOneAndDelete(buildIdQuery(id));
    return !!res;
  },

  // Dashboard Stats
  getDashboardStats: async () => {
    await connectToDatabase();
    const [
      enquiries_total,
      applications_total,
      active_notices,
      grievances_total,
      faculty_members,
      banners_total,
      trainings_total,
      announcements_total,
      placements_total,
      coop_news_total,
      quick_links_total
    ] = await Promise.all([
      Enquiry.countDocuments(),
      Application.countDocuments(),
      Notice.countDocuments({ is_active: { $ne: 0 } }),
      Grievance.countDocuments(),
      Faculty.countDocuments(),
      Banner.countDocuments(),
      Training.countDocuments(),
      Announcement.countDocuments(),
      Placement.countDocuments(),
      CoopNews.countDocuments(),
      QuickLink.countDocuments()
    ]);

    return {
      enquiries_total,
      applications_total,
      active_notices,
      grievances_total,
      faculty_members,
      banners_total,
      trainings_total,
      announcements_total,
      placements_total,
      coop_news_total,
      quick_links_total,
      server_status: "Online (MongoDB Atlas & Next.js)",
      last_backup: new Date().toLocaleString('en-GB')
    };
  }
};

export default db;
