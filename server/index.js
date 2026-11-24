require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/case-studies', require('./routes/caseStudies'));
app.use('/api/testimonials', require('./routes/testimonials'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Root route
app.get('/', (req, res) => {
  res.send('Pixen Studio API is running...');
});

// Error handler: surfaces errors thrown by middleware (multer/Cloudinary uploads)
// as JSON so the client can show the real message instead of a bare 500.
app.use((err, req, res, next) => {
  console.error(err);
  const code = err.status || err.http_code;
  const status = code >= 400 && code < 600 ? code : err.name === 'MulterError' ? 400 : 500;
  res.status(status).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;

// Only listen if not running as a serverless function
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
