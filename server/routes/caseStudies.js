const express = require('express');
const router = express.Router();
const CaseStudy = require('../models/CaseStudy');
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

// GET /api/case-studies
router.get('/', async (req, res) => {
  try {
    const caseStudies = await CaseStudy.find().populate('project');
    res.json(caseStudies);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/case-studies/:id
router.get('/:id', async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findById(req.params.id).populate('project');
    if (!caseStudy) return res.status(404).json({ message: 'Not found' });
    res.json(caseStudy);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/case-studies
router.post('/', auth, upload.single('diagram'), async (req, res) => {
  try {
    const data = { ...req.body };
    
    if (req.file) {
      data.architecture = data.architecture || {};
      if (typeof data.architecture === 'string') {
        data.architecture = JSON.parse(data.architecture);
      }
      data.architecture.diagram = req.file.path;
    }

    // Helper to handle nested/array fields from form data
    const parseField = (field) => {
      if (data[field] && typeof data[field] === 'string') {
        try {
          data[field] = JSON.parse(data[field]);
        } catch (e) {
          // If it's not JSON, maybe it's comma separated (for simple arrays)
          if (Array.isArray(CaseStudy.schema.path(field).caster?.instance === 'String')) {
             data[field] = data[field].split(',').map(item => item.trim()).filter(item => item !== '');
          }
        }
      }
    };

    ['objectives', 'targetUsers', 'challenges', 'solutions', 'techDetails', 'workflow', 'results', 'learnings', 'futureScope'].forEach(parseField);

    const caseStudy = await CaseStudy.create(data);
    
    // Update the project with this case study reference
    await Project.findByIdAndUpdate(data.project, { caseStudy: caseStudy._id });
    
    res.status(201).json(caseStudy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/case-studies/:id
router.put('/:id', auth, upload.single('diagram'), async (req, res) => {
  try {
    const data = { ...req.body };
    
    if (req.file) {
      let arch = data.architecture || {};
      if (typeof arch === 'string') {
        try {
          arch = JSON.parse(arch);
        } catch (e) {
          arch = {};
        }
      }
      arch.diagram = req.file.path;
      data.architecture = arch;
    }

    const parseField = (field) => {
      if (data[field] && typeof data[field] === 'string') {
        try {
          data[field] = JSON.parse(data[field]);
        } catch (e) {}
      }
    };

    ['objectives', 'targetUsers', 'challenges', 'solutions', 'techDetails', 'workflow', 'results', 'learnings', 'futureScope'].forEach(parseField);

    const caseStudy = await CaseStudy.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!caseStudy) return res.status(404).json({ message: 'Not found' });
    
    // Ensure the project is updated if it changed
    if (data.project) {
        await Project.findByIdAndUpdate(data.project, { caseStudy: caseStudy._id });
    }

    res.json(caseStudy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/case-studies/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const caseStudy = await CaseStudy.findById(req.params.id);
    if (!caseStudy) return res.status(404).json({ message: 'Not found' });
    
    // Remove reference from project
    await Project.findOneAndUpdate({ caseStudy: caseStudy._id }, { $unset: { caseStudy: 1 } });
    
    await CaseStudy.findByIdAndDelete(req.params.id);
    res.json({ message: 'Case study deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
