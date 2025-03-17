import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
    },
    members:[{  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    team: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Member',
            },
            name: {
                type: String,
                required: true,
            },
            assign: {
                type: String,
                required: true,
            }
        }
    ],
    githubLink: {
        type: String,
    },
    deploymentLink: {
        type: String,
    }
}, { timestamps: true });

// Middleware to validate `progress` based on `status`
ProjectSchema.pre('save', function (next) {
    if (this.status === 'Completed' && this.progress < 100) {
        this.progress = 100; // Auto-set progress to 100 for completed projects
    }
    next();
});

export const ProjectModel = mongoose.model('Project', ProjectSchema);
