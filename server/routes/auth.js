const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Admin = require('../models/Admin');
const requireAuth = require('../middleware/auth');

function signToken(id, username) {
  return jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

// POST /api/auth/login
router.post(
  '/login',
  [
    body('username').trim().notEmpty(),
    body('password').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: 'Username and password required' });

    try {
      const { username, password } = req.body;
      const admin = await Admin.findOne({ username: username.toLowerCase() });
      if (!admin || !(await admin.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = signToken(admin._id, admin.username);
      res.json({ token, username: admin.username });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// GET /api/auth/verify — check if token is still valid
router.get('/verify', requireAuth, (req, res) => {
  res.json({ valid: true, username: req.admin.username });
});

// POST /api/auth/setup — one-time admin creation (only if no admin exists)
router.post(
  '/setup',
  [body('username').trim().notEmpty(), body('password').isLength({ min: 8 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ message: 'Username required, password min 8 chars' });

    try {
      const count = await Admin.countDocuments();
      if (count > 0) return res.status(403).json({ message: 'Admin already exists' });

      const admin = await Admin.create({ username: req.body.username, password: req.body.password });
      const token = signToken(admin._id, admin.username);
      res.status(201).json({ token, username: admin.username });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
