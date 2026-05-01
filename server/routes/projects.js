const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

// GET /api/projects
router.get('/', async (req, res) => {
  try {
    const { status, isFeatured } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (isFeatured) filter.isFeatured = isFeatured === 'true';
    
    const projects = await Project.find(filter)
      .populate('caseStudy')
      .sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/projects/:id
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('caseStudy');
    if (!project) return res.status(404).json({ message: 'Not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/projects/slug/:slug
router.get('/slug/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug }).populate('caseStudy');
    if (!project) return res.status(404).json({ message: 'Not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/projects
router.post('/', auth, upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 10 }, { name: 'diagram', maxCount: 1 }]), async (req, res) => {
  try {
    const data = { ...req.body };
    
    if (req.files) {
      if (req.files.thumbnail && req.files.thumbnail[0]) {
        data.thumbnail = req.files.thumbnail[0].path;
      }
      if (req.files.images) {
        data.images = req.files.images.map(file => file.path);
      }
    }

    // Helper to handle array fields from form data
    const parseArray = (field) => {
      if (data[field] && typeof data[field] === 'string') {
        try {
          // Try parsing as JSON first (if sent from a controlled component)
          data[field] = JSON.parse(data[field]);
        } catch (e) {
          // Fallback to comma-separated string
          data[field] = data[field].split(',').map(item => item.trim()).filter(item => item !== '');
        }
      }
    };

    parseArray('tags');
    parseArray('techStack');
    parseArray('features');

    if (!data.slug && data.title) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    }
    
    data.createdBy = req.user.id;

    const project = await Project.create(data);

    // Handle nested CaseStudy data if provided
    if (data.caseStudyData) {
      let csData = data.caseStudyData;
      if (typeof csData === 'string') csData = JSON.parse(csData);
      csData.project = project._id;
      if (req.files.diagram && req.files.diagram[0]) {
        csData.architecture = csData.architecture || {};
        csData.architecture.diagram = req.files.diagram[0].path;
      }
      const caseStudy = await require('../models/CaseStudy').create(csData);
      project.caseStudy = caseStudy._id;
      await project.save();
    }

    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/projects/:id
router.put('/:id', auth, upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 10 }, { name: 'diagram', maxCount: 1 }]), async (req, res) => {
  try {
    const data = { ...req.body };
    
    // ... existing image handling ...
    if (req.files) {
      if (req.files.thumbnail && req.files.thumbnail[0]) {
        data.thumbnail = req.files.thumbnail[0].path;
      }
      if (req.files.images) {
        const newImages = req.files.images.map(file => file.path);
        let existingImages = [];
        if (data.images) {
          try {
            existingImages = typeof data.images === 'string' ? JSON.parse(data.images) : data.images;
          } catch (e) {
            existingImages = [data.images];
          }
        }
        data.images = [...existingImages, ...newImages];
      }
    }

    // Helper to handle array fields
    const parseArray = (field) => {
      if (data[field] && typeof data[field] === 'string') {
        try {
          data[field] = JSON.parse(data[field]);
        } catch (e) {
          data[field] = data[field].split(',').map(item => item.trim()).filter(item => item !== '');
        }
      }
    };

    parseArray('tags');
    parseArray('techStack');
    parseArray('features');

    if (!data.slug && data.title) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    }

    // Handle nested CaseStudy data if provided
    if (data.caseStudyData) {
        let csData = data.caseStudyData;
        if (typeof csData === 'string') csData = JSON.parse(csData);
        
        csData.project = req.params.id;
        if (req.files.diagram && req.files.diagram[0]) {
            csData.architecture = csData.architecture || {};
            csData.architecture.diagram = req.files.diagram[0].path;
        }
        
        const CaseStudy = require('../models/CaseStudy');
        let caseStudy;
        if (data.caseStudyId) {
            caseStudy = await CaseStudy.findByIdAndUpdate(data.caseStudyId, csData, { new: true });
        } else {
            csData.project = req.params.id;
            caseStudy = await CaseStudy.create(csData);
            data.caseStudy = caseStudy._id;
        }
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
