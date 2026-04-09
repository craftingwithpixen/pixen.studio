require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  const existing = await Admin.findOne({ username: 'admin' });
  if (existing) {
    existing.password = 'kksyPixen!';
    await existing.save();
    console.log('Admin password updated successfully');
  } else {
    await Admin.create({ username: 'admin', password: 'kksyPixen!' });
    console.log('Admin created successfully');
  }

  await mongoose.disconnect();
}

main().catch((err) => { console.error(err); process.exit(1); });
