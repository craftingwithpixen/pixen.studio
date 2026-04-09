const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    handle: { type: String, trim: true },
    platform: { type: String, enum: ['twitter', 'linkedin', 'github', 'other'], default: 'other' },
    message: { type: String, required: true, trim: true, maxlength: 500 },
    avatar: { type: String },
    avatar_public_id: { type: String },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
