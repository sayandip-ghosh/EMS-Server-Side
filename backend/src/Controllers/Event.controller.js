import { EventModel } from '../Models/Event.model.js';

// Create a new event
export const createEvent = async (req, res) => {
    try {
        const { eventName, date, time, venue, description, members, attendance } = req.body;
        const newEvent = new EventModel({ eventName, date, time, venue, description, members, attendance });
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all events
export const getAllEvents = async (req, res) => {
    try {
        const events = await EventModel.find()
            .populate('members')
            .populate('attendance');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single event by ID
export const getEventById = async (req, res) => {
    try {
        const event = await EventModel.findById(req.params.id)
            .populate('members')
            .populate('attendance');
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an event by ID
export const updateEvent = async (req, res) => {
    try {
        const { eventName, date, time, venue, description, members, attendance } = req.body;
        const updatedEvent = await EventModel.findByIdAndUpdate(
            req.params.id,
            { eventName, date, time, venue, description, members, attendance },
            { new: true }
        )
            .populate('members')
            .populate('attendance');
        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json(updatedEvent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an event by ID
export const deleteEvent = async (req, res) => {
    try {
        const deletedEvent = await EventModel.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};