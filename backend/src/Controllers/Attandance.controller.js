import { AttendanceModel } from '../Models/Attendance.model.js';

// Create a new attendance record
export const createAttendance = async (req, res) => {
    try {
        const { event, members } = req.body;
        const newAttendance = new AttendanceModel({ event, members });
        const savedAttendance = await newAttendance.save();
        res.status(201).json(savedAttendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all attendance records
export const getAllAttendances = async (req, res) => {
    try {
        const attendances = await AttendanceModel.find().populate('event').populate('members');
        res.status(200).json(attendances);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single attendance record by ID
export const getAttendanceById = async (req, res) => {
    try {
        const attendance = await AttendanceModel.findById(req.params.id).populate('event').populate('members');
        if (!attendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an attendance record by ID
export const updateAttendance = async (req, res) => {
    try {
        const { event, members } = req.body;
        const updatedAttendance = await AttendanceModel.findByIdAndUpdate(
            req.params.id,
            { event, members },
            { new: true }
        ).populate('event').populate('members');
        if (!updatedAttendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.status(200).json(updatedAttendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an attendance record by ID
export const deleteAttendance = async (req, res) => {
    try {
        const deletedAttendance = await AttendanceModel.findByIdAndDelete(req.params.id);
        if (!deletedAttendance) {
            return res.status(404).json({ message: 'Attendance record not found' });
        }
        res.status(200).json({ message: 'Attendance record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

