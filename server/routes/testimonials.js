const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

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
router.post('/', auth, upload.single('avatar'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.avatar = req.file.path;
    }
    const t = await Testimonial.create(data);
    res.status(201).json(t);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/testimonials/:id
router.put('/:id', auth, upload.single('avatar'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.avatar = req.file.path;
    }
    const t = await Testimonial.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!t) return res.status(404).json({ message: 'Not found' });
    res.json(t);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/testimonials/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const t = await Testimonial.findByIdAndDelete(req.params.id);
    if (!t) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Testimonial deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
