// scripts/createAdminSimple.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// ⚠️ HARDCODE YOUR CONNECTION STRING HERE (temporary - for testing)
const MONGODB_URI = 'mongodb+srv://propertyhub:CzywGwpXeHlgGtSr@cluster0.ylktcmv.mongodb.net/propertyhub?retryWrites=true&w=majority&appName=Cluster0';

// Admin Schema
const AdminSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String,
  isActive: Boolean,
  createdAt: { type: Date, default: Date.now }
});

async function createAdmin() {
  try {
    console.log('🚀 Starting admin creation...\n');
    
    // Validate connection string
    if (!MONGODB_URI.startsWith('mongodb+srv://')) {
      console.error('❌ Invalid MongoDB URI');
      console.log('Current URI:', MONGODB_URI);
      process.exit(1);
    }
    
    console.log('🔄 Connecting to MongoDB...');
    console.log('📍 URI:', MONGODB_URI.substring(0, 50) + '...\n');
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully!\n');

    const Admin = mongoose.model('Admin', AdminSchema);

    // Check if admin exists
    console.log('🔍 Checking if admin exists...');
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    
    if (existingAdmin) {
      console.log('\n⚠️  Admin already exists!');
      console.log('Username:', existingAdmin.username);
      console.log('Email:', existingAdmin.email);
      await mongoose.connection.close();
      process.exit(0);
    }

    // Create new admin
    console.log('🔐 Hashing password...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    console.log('👤 Creating admin user...');
    await Admin.create({
      username: 'admin',
      email: 'admin@propertyhub.com',
      password: hashedPassword,
      role: 'superadmin',
      isActive: true
    });

    console.log('\n✅ SUCCESS!\n');
    console.log('═══════════════════════════════════════');
    console.log('📧 Email:    admin@propertyhub.com');
    console.log('👤 Username: admin');
    console.log('🔑 Password: admin123');
    console.log('═══════════════════════════════════════');
    console.log('\n🔗 Login: http://localhost:3000/admin/login\n');

    await mongoose.connection.close();
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
    }
    process.exit(1);
  }
}

createAdmin();