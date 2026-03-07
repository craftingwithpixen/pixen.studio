const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');

// GET /api/testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/testimonials
router.post('/', async (req, res) => {
  try {
    const t = await Testimonial.create(req.body);
    res.status(201).json(t);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
