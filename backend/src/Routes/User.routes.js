import express from 'express';
import {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} from '../controllers/User.controller.js';

const router = express.Router();

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);

// Get all users
router.get('/', getAllUsers);

// Get a single user by ID
router.get('/:id', getUserById);

// Update a user by ID
router.put('/:id', updateUser);

// Delete a user by ID
router.delete('/:id', deleteUser);

export default router;