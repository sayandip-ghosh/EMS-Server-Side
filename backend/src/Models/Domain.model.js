import mongoose from 'mongoose'

const domainSchema = new mongoose.Schema({
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'Member'}],
    domainName:[String],
    events:[{type: mongoose.Schema.Types.ObjectId, ref:'Event'}],
    projects:[{type: mongoose.Schema.Types.ObjectId, ref:'Project'}],
    attendance:[{type: mongoose.Schema.Types.ObjectId, ref:'Attendance'}],

},{timestamp: true})
export const DomainModel = mongoose.model('Domain', domainSchema)