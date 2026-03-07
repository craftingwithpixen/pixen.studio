const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    image: { type: String },
    tags: [{ type: String }],
    link: { type: String },
    type: { type: String, enum: ['in project', 'showcase'], default: 'in project' },
    order: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
