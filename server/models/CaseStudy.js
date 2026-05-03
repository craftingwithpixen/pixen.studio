const mongoose = require('mongoose');
const { Schema } = mongoose;

const CaseStudySchema = new Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    overview: String,

    problemStatement: String,

    objectives: [String],

    targetUsers: [String],

    challenges: [String],

    solutions: [
      {
        title: String,
        description: String,
      },
    ],

    architecture: {
      description: String,
      diagram: String, // image URL
    },

    techDetails: [
      {
        title: String,
        description: String,
      },
    ],

    workflow: [
      {
        step: String,
        description: String,
      },
    ],

    results: {
      metrics: [
        {
          label: String, // e.g. "Response Time"
          value: String, // e.g. "200ms"
        },
      ],
      summary: String,
    },

    learnings: [String],

    futureScope: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("CaseStudy", CaseStudySchema);
