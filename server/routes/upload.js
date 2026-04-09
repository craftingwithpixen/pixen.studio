const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/auth');
const { upload, cloudinary } = require('../config/cloudinary');

// POST /api/upload — single image, admin only
router.post('/', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  res.json({ url: req.file.path, public_id: req.file.filename });
});

// POST /api/upload/multiple — up to 10 images, admin only
router.post('/multiple', requireAuth, upload.array('images', 10), (req, res) => {
  if (!req.files?.length) return res.status(400).json({ message: 'No files uploaded' });
  const files = req.files.map((f) => ({ url: f.path, public_id: f.filename }));
  res.json(files);
});

// DELETE /api/upload — delete image from cloudinary, admin only
router.delete('/', requireAuth, async (req, res) => {
  const { public_id } = req.body;
  if (!public_id) return res.status(400).json({ message: 'public_id required' });
  try {
    await cloudinary.uploader.destroy(public_id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete image' });
  }
});

module.exports = router;
