import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true, // Example: "10 A.M. - 11 A.M."
    },
    organizingTeam: [
        {
            memberId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Member',
                required: true,
            },
            assignment: {
                type: String,
                required: true, // Example: "Event Manager", "Lead Coordinator"
            }
        }
    ]
}, { timestamps: true });

export const EventModel = mongoose.model('Event', EventSchema);
