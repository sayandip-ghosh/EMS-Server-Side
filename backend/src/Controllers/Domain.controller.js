import { DomainModel } from '../Models/Domain.model.js';

// Create a new domain
export const createDomain = async (req, res) => {
    try {
        const { members, domainName, events, projects, attendance } = req.body;
        const newDomain = new DomainModel({ members, domainName, events, projects, attendance });
        const savedDomain = await newDomain.save();
        res.status(201).json(savedDomain);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all domains
export const getAllDomains = async (req, res) => {
    try {
        const domains = await DomainModel.find()
            .populate('members')
            .populate('events')
            .populate('projects')
            .populate('attendance');
        res.status(200).json(domains);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single domain by ID
export const getDomainById = async (req, res) => {
    try {
        const domain = await DomainModel.findById(req.params.id)
            .populate('members')
            .populate('events')
            .populate('projects')
            .populate('attendance');
        if (!domain) {
            return res.status(404).json({ message: 'Domain not found' });
        }
        res.status(200).json(domain);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a domain by ID
export const updateDomain = async (req, res) => {
    try {
        const { members, domainName, events, projects, attendance } = req.body;
        const updatedDomain = await DomainModel.findByIdAndUpdate(
            req.params.id,
            { members, domainName, events, projects, attendance },
            { new: true }
        )
            .populate('members')
            .populate('events')
            .populate('projects')
            .populate('attendance');
        if (!updatedDomain) {
            return res.status(404).json({ message: 'Domain not found' });
        }
        res.status(200).json(updatedDomain);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a domain by ID
export const deleteDomain = async (req, res) => {
    try {
        const deletedDomain = await DomainModel.findByIdAndDelete(req.params.id);
        if (!deletedDomain) {
            return res.status(404).json({ message: 'Domain not found' });
        }
        res.status(200).json({ message: 'Domain deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};