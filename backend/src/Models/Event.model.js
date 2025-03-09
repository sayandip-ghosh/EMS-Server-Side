import mongoose from  'mongoose'

const eventSchema = new mongoose.Schema({
    eventName: String,
    date: Date,
    time: String,
    venue: String,
    description: String,
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'Member'}],
    attendance:[{type: mongoose.Schema.Types.ObjectId, ref:'Attendance'}]

},{timestamp: true})

export const EventModel = mongoose.model('Event', eventSchema)