const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { 
      type: String, 
      required: true, 
      enum: ['MVP', 'Our Products', 'Client Project'],
      default: 'Client Project' 
    },
    description: { type: String, trim: true },
    challenge: { type: String, trim: true },
    solution: { type: String, trim: true },
    results: { type: String, trim: true },
    image: { type: String },
    innerImage: { type: String },
    gallery: [{ type: String }],
    tags: [{ type: String }],
    link: { type: String },
    client: {
      name: { type: String },
      role: { type: String },
      feedback: { type: String }
    },
    slug: { type: String, unique: true, trim: true },
    type: { type: String, enum: ['in project', 'showcase'], default: 'in project' },
    order: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
