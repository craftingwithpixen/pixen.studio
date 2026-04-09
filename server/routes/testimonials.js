const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const requireAuth = require('../middleware/auth');

// GET /api/testimonials — public
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/testimonials — admin only
router.post('/', requireAuth, async (req, res) => {
  try {
    const t = await Testimonial.create(req.body);
    res.status(201).json(t);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/testimonials/:id — admin only
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const t = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!t) return res.status(404).json({ message: 'Not found' });
    res.json(t);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/testimonials/:id — admin only
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const t = await Testimonial.findByIdAndDelete(req.params.id);
    if (!t) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
