import mongoose from 'mongoose'

const attendanceSchema =new mongoose.Schema({
    event:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
},
members: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
],
time: {
    type: Date,
    default: Date.now,
}


},{timestamps:true})
export const AttendanceModel = mongoose.model('Attendance',attendanceSchema);