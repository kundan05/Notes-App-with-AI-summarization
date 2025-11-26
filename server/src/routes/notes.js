const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Note = require('../models/Note');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// @route   GET api/notes
// @desc    Get all notes
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/notes
// @desc    Add new note
// @access  Private
router.post('/', auth, async (req, res) => {
    const { title, content } = req.body;

    try {
        const newNote = new Note({
            title,
            content,
            userId: req.user.id,
        });

        const note = await newNote.save();
        res.json(note);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/notes/:id
// @desc    Update note
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const { title, content } = req.body;

    const noteFields = {};
    if (title) noteFields.title = title;
    if (content) noteFields.content = content;

    try {
        let note = await Note.findById(req.params.id);

        if (!note) return res.status(404).json({ message: 'Note not found' });

        // Make sure user owns note
        if (note.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: noteFields }, { new: true });

        res.json(note);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/notes/:id
// @desc    Delete note
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);

        if (!note) return res.status(404).json({ message: 'Note not found' });

        // Make sure user owns note
        if (note.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await Note.findByIdAndDelete(req.params.id);

        res.json({ message: 'Note removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/notes/:id/summarize
// @desc    Summarize note using AI
// @access  Private
router.post('/:id/summarize', auth, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);

        if (!note) return res.status(404).json({ message: 'Note not found' });

        if (note.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ message: 'Gemini API Key not configured' });
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `Please summarize the following note concisely:
        
        Title: ${note.title}
        Content: ${note.content}
        
        Summary:`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const summary = response.text();

        note.summary = summary;
        await note.save();

        res.json(note);
    } catch (err) {
        console.error("AI Summarization Error:", err);
        if (err.message.includes('API_KEY_INVALID') || err.toString().includes('API_KEY_INVALID')) {
            return res.status(500).json({ message: 'Invalid Gemini API Key. Please check your server .env file.' });
        }
        res.status(500).json({ message: 'Error generating summary', error: err.message });
    }
});

module.exports = router;
