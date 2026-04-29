const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

// GET /api/projects
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;
    const filter = {};
    if (category && category !== 'All') filter.category = category;
    if (featured) filter.featured = featured === 'true';
    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/projects/:id
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/projects/slug/:slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) return res.status(404).json({ message: 'Not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/projects
router.post('/', auth, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'innerImage', maxCount: 1 }]), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.files) {
      if (req.files.image && req.files.image[0]) {
        data.image = req.files.image[0].path;
      }
      if (req.files.innerImage && req.files.innerImage[0]) {
        data.innerImage = req.files.innerImage[0].path;
      }
    }
    if (data.tags && typeof data.tags === 'string') {
      data.tags = data.tags.split(',').map(tag => tag.trim());
    }
    
    // Handle nested client object from flat form fields
    if (data.clientName || data.clientRole || data.clientFeedback) {
      data.client = {
        name: data.clientName,
        role: data.clientRole,
        feedback: data.clientFeedback
      };
    }

    if (!data.slug && data.title) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    }
    const project = await Project.create(data);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/projects/:id
router.put('/:id', auth, upload.fields([{ name: 'image', maxCount: 1 }, { name: 'innerImage', maxCount: 1 }]), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.files) {
      if (req.files.image && req.files.image[0]) {
        data.image = req.files.image[0].path;
      }
      if (req.files.innerImage && req.files.innerImage[0]) {
        data.innerImage = req.files.innerImage[0].path;
      }
    }
    if (data.tags && typeof data.tags === 'string') {
      data.tags = data.tags.split(',').map(tag => tag.trim());
    }

    // Handle nested client object from flat form fields
    if (data.clientName || data.clientRole || data.clientFeedback) {
      data.client = {
        name: data.clientName,
        role: data.clientRole,
        feedback: data.clientFeedback
      };
    }

    if (!data.slug && data.title) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    }
    const project = await Project.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!project) return res.status(404).json({ message: 'Not found' });
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/projects/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
