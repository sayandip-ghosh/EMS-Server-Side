import express from 'express';
import {
    createAttendance,
    getAllAttendances,
    getAttendanceById,
    updateAttendance,
    deleteAttendance,
} from '../Controllers/Attandance.controller.js';

const router = express.Router();

// Create a new attendance record
router.post('/', createAttendance);

// Get all attendance records
router.get('/', getAllAttendances);

// Get a single attendance record by ID
router.get('/:id', getAttendanceById);

// Update an attendance record by ID
router.put('/:id', updateAttendance);

// Delete an attendance record by ID
router.delete('/:id', deleteAttendance);

export default router;