const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['products', 'poc_projects', 'client_projects'],
    },
    description: { type: String, trim: true },
    // Primary thumbnail image
    image: { type: String },
    image_public_id: { type: String },
    // Multiple demo screenshots
    images: [
      {
        url: { type: String },
        public_id: { type: String },
      },
    ],
    tech_stack: [{ type: String }],
    link: { type: String },
    client_name: { type: String, trim: true },
    order: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
