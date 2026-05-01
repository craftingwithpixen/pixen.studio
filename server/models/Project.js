const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    category: { 
      type: String, 
      enum: ['MVP', 'Our Products', 'Client Project'],
      default: 'Client Project' 
    },
    type: { type: String, enum: ['in project', 'showcase'], default: 'in project' },
    shortDescription: { type: String },
    detailedDescription: { type: String },

    status: {
      type: String,
      enum: ["idea", "in-progress", "completed"],
      default: "idea",
    },

    techStack: [{ type: String }], // ["React", "Node", "MongoDB"]

    features: [{ type: String }],


    liveUrl: { type: String },

    thumbnail: { type: String },
    images: [{ type: String }],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    caseStudy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CaseStudy",
    },

    tags: [{ type: String }],

    isFeatured: { type: Boolean, default: false },
    
    // Keeping category and type for compatibility if needed, or just follow user's new schema strictly
    // The user said "take reference... and modify", so I will follow their schema.
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
