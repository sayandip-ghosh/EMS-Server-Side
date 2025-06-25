import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      default: 'ongoing',
      enum: ['ongoing', 'completed'],
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    deadline: {
      type: Date,
    },
    githubLink: {
      type: String,
    },
    deploymentLink: {
      type: String,
    },
    team: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Member',
          required: true,
        },
        assign: {
          type: String,
          required: true,
        }
      }
    ],
  },
  { timestamps: true }
);

export const ProjectModel = mongoose.model('Project', ProjectSchema);
