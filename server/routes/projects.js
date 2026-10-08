const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

// Returns an `order` value that places a new project at the top of the list.
// Projects saved before manual ordering existed have no `order`, so they are
// numbered first, keeping their previous newest-first sequence.
const nextTopOrder = async () => {
  const unordered = await Project.find({ order: { $exists: false } }).sort({ createdAt: -1 }).select('_id').lean();
  if (unordered.length) {
    const last = await Project.findOne({ order: { $exists: true } }).sort({ order: -1 }).select('order').lean();
    const start = last ? last.order + 1 : 0;
    await Project.bulkWrite(unordered.map((p, i) => ({
      updateOne: { filter: { _id: p._id }, update: { $set: { order: start + i } } }
    })));
  }
  const first = await Project.findOne().sort({ order: 1 }).select('order').lean();
  return first ? first.order - 1 : 0;
};

// GET /api/projects
router.get('/', async (req, res) => {
  try {
    const { status, isFeatured } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (isFeatured) filter.isFeatured = isFeatured === 'true';
    
    const projects = await Project.find(filter)
      .populate('caseStudy')
      .sort({ order: 1, createdAt: -1 });
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
router.post('/', auth, upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'showcaseImage', maxCount: 1 }, { name: 'images', maxCount: 10 }, { name: 'diagram', maxCount: 1 }]), async (req, res) => {
  try {
    const data = { ...req.body };
    
    if (req.files) {
      if (req.files.thumbnail && req.files.thumbnail[0]) {
        data.thumbnail = req.files.thumbnail[0].path;
      }
      if (req.files.showcaseImage && req.files.showcaseImage[0]) {
        data.showcaseImage = req.files.showcaseImage[0].path;
      }
      if (req.files.images) {
        data.images = req.files.images.map(file => file.path);
      }
    }

    // Helper to handle array fields from form data
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
    parseArray('images');

    if (!data.slug && data.title) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    }
    
    data.createdBy = req.user.id;
    data.order = await nextTopOrder();

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

// PUT /api/projects/reorder  — body: { ids: [projectId, ...] } in display order
// Must stay above PUT /:id so "reorder" isn't treated as an id.
router.put('/reorder', auth, async (req, res) => {
  try {
    const { ids } = req.body;
    if (
      !Array.isArray(ids) ||
      ids.length === 0 ||
      new Set(ids).size !== ids.length ||
      !ids.every(id => mongoose.isObjectIdOrHexString(id))
    ) {
      return res.status(400).json({ message: 'ids must be a non-empty list of unique project ids' });
    }

    // Reject stale lists (e.g. a project was added or deleted in another tab)
    const [matched, total] = await Promise.all([
      Project.countDocuments({ _id: { $in: ids } }),
      Project.countDocuments(),
    ]);
    if (matched !== ids.length || total !== ids.length) {
      return res.status(409).json({ message: 'Project list has changed. Refresh and try again.' });
    }

    await Project.bulkWrite(ids.map((id, index) => ({
      updateOne: { filter: { _id: id }, update: { $set: { order: index } } }
    })));
    res.json({ message: 'Order updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/projects/:id
router.put('/:id', auth, upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'showcaseImage', maxCount: 1 }, { name: 'images', maxCount: 10 }, { name: 'diagram', maxCount: 1 }]), async (req, res) => {
  try {
    const data = { ...req.body };
    delete data.order; // position is only changed via PUT /reorder

    // ... existing image handling ...
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
    parseArray('images');

    if (req.files) {
      if (req.files.thumbnail && req.files.thumbnail[0]) {
        data.thumbnail = req.files.thumbnail[0].path;
      }
      if (req.files.showcaseImage && req.files.showcaseImage[0]) {
        data.showcaseImage = req.files.showcaseImage[0].path;
      }
      if (req.files.images) {
        const newImages = req.files.images.map(file => file.path);
        const existingImages = Array.isArray(data.images) ? data.images : [];
        data.images = [...existingImages, ...newImages];
      }
    }

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
