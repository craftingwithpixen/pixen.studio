const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const requireAuth = require('../middleware/auth');

// GET /api/projects — public
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (featured) filter.featured = featured === 'true';
    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(projects);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/projects/grouped — returns { products, poc_projects, client_projects }
router.get('/grouped', async (req, res) => {
  try {
    const all = await Project.find().sort({ order: 1, createdAt: -1 });
    const grouped = { products: [], poc_projects: [], client_projects: [] };
    for (const p of all) {
      if (grouped[p.category]) grouped[p.category].push(p);
    }
    res.json(grouped);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/projects/:id — public
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Not found' });
    res.json(project);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/projects — admin only
router.post('/', requireAuth, async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/projects/:id — admin only
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ message: 'Not found' });
    res.json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/projects/:id — admin only
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
