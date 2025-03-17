import express from 'express';
import {
    loginUser,
    createMember,
    getAllMembers,
    getMemberById,
    updateMember,
    deleteMember,
} from '../controllers/Member.controller.js';

const router = express.Router();

// Login a user
router.post('/login', loginUser);

// Create a new member
router.post('/', createMember);

// Get all members
router.get('/', getAllMembers);

// Get a single member by ID
router.get('/:id', getMemberById);

// Update a member by ID
router.put('/:id', updateMember);

// Delete a member by ID
router.delete('/:id', deleteMember);

export default router;