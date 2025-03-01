import mongoose from 'mongoose'

const memberSchema = new mongoose.Schema({
    domain: [String],
    socials: {
        linkedin: String,
        instagram: String,
        twitter: String,
        //add kar lo aur chahiye to
    },
    yearOfJoining: Number,
    yearOfPassing: Number,
    stream: String,
    universityRollNumber: Number,
    avatarUrl: String,
    skills:[String],
    events:[{type: mongoose.Schema.Types.ObjectId, ref:'Event'}],
    projects:[{type: mongoose.Schema.Types.ObjectId, ref:'Project'}],
    attendance:[{type: mongoose.Schema.Types.ObjectId, ref:'Attendance'}],
    
},{timestamps: true})

export const MemberModel = mongoose.model('Member', memberSchema)