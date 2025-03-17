import { EventModel } from '../Models/Event.model.js';

// Create a new event
export const createEvent = async (req, res) => {
    try {
        console.log('Request Body:', req.body); // Debugging log

        const { name, date, time, location, organizingTeam } = req.body;

        const newEvent = new EventModel({
            name,
            date,
            time,
            location,
            organizingTeam
        });

        await newEvent.save();

        res.status(201).json({
            success: true,
            message: 'Event created successfully',
            data: newEvent,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error creating event' });
    }
};

// Get all events
export const getAllEvents = async (req, res) => {
    try {
        const events = await EventModel.find().populate('organizingTeam.memberId', 'name email'); // Populate team members
        res.status(200).json({ success: true, data: events });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching events' });
    }
};

// Get a single event by ID
export const getEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await EventModel.findById(id).populate('organizingTeam.memberId', 'name email');
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        res.status(200).json({ success: true, data: event });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching event' });
    }
};

// Update an existing event
export const updateEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedEvent = await EventModel.findByIdAndUpdate(id, req.body, { new: true })
            .populate('organizingTeam.memberId', 'name email');
        if (!updatedEvent) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Event updated successfully',
            data: updatedEvent,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error updating event' });
    }
};

// Delete an event
export const deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedEvent = await EventModel.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Event deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error deleting event' });
    }
};
