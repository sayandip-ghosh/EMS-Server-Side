import express from 'express';
import {
    createDomain,
    getAllDomains,
    getDomainById,
    updateDomain,
    deleteDomain,
} from '../controllers/Domain.controller.js';

const router = express.Router();

// Create a new domain
router.post('/', createDomain);

// Get all domains
router.get('/', getAllDomains);

// Get a single domain by ID
router.get('/:id', getDomainById);

// Update a domain by ID
router.put('/:id', updateDomain);

// Delete a domain by ID
router.delete('/:id', deleteDomain);

export default router;