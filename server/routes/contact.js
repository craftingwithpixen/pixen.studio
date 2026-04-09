const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');
const requireAuth = require('../middleware/auth');

// POST /api/contact — public
router.post(
  '/',
  [
    body('name').trim().notEmpty().isLength({ max: 100 }),
    body('email').isEmail().normalizeEmail(),
    body('message').trim().notEmpty().isLength({ max: 2000 }),
    body('subject').optional().trim().isLength({ max: 200 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { name, email, subject, message } = req.body;
      const contact = await Contact.create({ name, email, subject, message });

      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: `New Contact: ${subject || 'No subject'} from ${name}`,
          text: `From: ${name} <${email}>\n\n${message}`,
        });
      }

      res.status(201).json({ success: true, id: contact._id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// GET /api/contact — admin only
router.get('/', requireAuth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// PATCH /api/contact/:id/status — admin only
router.patch('/:id/status', requireAuth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!['new', 'read', 'replied'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!contact) return res.status(404).json({ message: 'Not found' });
    res.json(contact);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/contact/:id — admin only
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
