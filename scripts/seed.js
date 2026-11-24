import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import {
  AdminUser,
  Notice,
  Application,
  Enquiry,
  Grievance,
  Faculty,
  Banner,
  Download,
  NewsEvent,
  Training,
  Announcement,
  Placement,
  CoopNews,
  QuickLink
} from '../src/lib/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read MONGODB_URI from environment or fallback to Atlas connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Demon:Demon12345@cluster0.oc0w5of.mongodb.net/micm_portal?retryWrites=true&w=majority&appName=Cluster0';

const jsonPath = path.join(__dirname, '..', 'data', 'micm_portal.json');

async function seedDatabase() {
  console.log('🚀 Starting MongoDB Atlas Database Migration & Seed...');
  console.log(`📡 Connecting to MongoDB Atlas: ${MONGODB_URI.split('@')[1] || 'Cluster0'}...`);

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'micm_portal',
      bufferCommands: false
    });
    console.log('✅ Connected successfully to MongoDB Atlas!\n');

    if (!fs.existsSync(jsonPath)) {
      throw new Error(`Data file not found at: ${jsonPath}`);
    }

    const rawData = fs.readFileSync(jsonPath, 'utf8');
    const data = JSON.parse(rawData);

    const modelMap = [
      { key: 'admin_users', model: AdminUser, label: 'Admin Users' },
      { key: 'notices', model: Notice, label: 'Notices' },
      { key: 'applications', model: Application, label: 'Applications' },
      { key: 'enquiries', model: Enquiry, label: 'Enquiries' },
      { key: 'grievances', model: Grievance, label: 'Grievances' },
      { key: 'faculty', model: Faculty, label: 'Faculty Members' },
      { key: 'banners', model: Banner, label: 'Banners' },
      { key: 'downloads', model: Download, label: 'Downloads' },
      { key: 'news_events', model: NewsEvent, label: 'News & Events' },
      { key: 'trainings', model: Training, label: 'Trainings' },
      { key: 'announcements', model: Announcement, label: 'Announcements' },
      { key: 'placements', model: Placement, label: 'Placements' },
      { key: 'coop_news', model: CoopNews, label: 'Cooperative News' },
      { key: 'quick_links', model: QuickLink, label: 'Quick Links' },
    ];

    for (const { key, model, label } of modelMap) {
      const records = data[key] || [];
      // Clean existing records in this collection
      await model.deleteMany({});
      if (records.length > 0) {
        await model.insertMany(records);
        console.log(`  ✓ Seeded ${records.length} ${label} (${key})`);
      } else {
        console.log(`  - 0 ${label} (${key}) to seed`);
      }
    }

    console.log('\n🎉 All collections seeded into MongoDB Atlas successfully!');
  } catch (err) {
    console.error('❌ Error during seeding:', err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB Atlas.');
    process.exit(0);
  }
}

seedDatabase();
