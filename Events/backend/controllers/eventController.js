const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  try {
    const { name, description, date, tags } = req.body;

    // Handle banner image path
    const banner = req.file ? `/uploads/${req.file.filename}` : '';

    // Parse tags: either a single string or comma-separated string
    const tagsArray = typeof tags === 'string'
      ? tags.split(',').map(tag => tag.trim()).filter(Boolean)
      : [];

    const event = new Event({
      name,
      description,
      date,
      tags: tagsArray,
      banner,
    });

    await event.save();

    res.status(201).json({
      success: true,
      message: 'Event created successfully',
      event,
    });
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({
      success: false,
      message: 'Server error while creating event',
      error: err.message,
    });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });

    res.json({ success: true, events });
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    res.json({ success: true, event });
  } catch (err) {
    console.error('Error fetching event by ID:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
