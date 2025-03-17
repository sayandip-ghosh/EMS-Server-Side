import express from 'express';
import {
    loginUser,
    createMember,
    getAllMembers,
    getMemberById,
    updateMember,
    deleteMember,
} from '../controllers/Member.controller.js';
import { upload } from '../../Middlewares/multer.js';

const router = express.Router();

// Login a user
router.post('/login', loginUser);

// Create a new member with file upload
router.post('/', upload.fields([
    { name: 'avatar', maxCount: 1 }
]), createMember);

// Get all members
router.get('/', getAllMembers);

// Get a single member by ID
router.get('/:id', getMemberById);

// Update a member by ID 
router.put('/:id', upload.fields([
    { name: 'avatar', maxCount: 1 }
]), updateMember);

// Delete a member by ID
router.delete('/:id', deleteMember);

export default router;
