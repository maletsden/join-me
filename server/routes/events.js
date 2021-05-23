const express = require('express');

const Event = require('../models/event.js');
const auth = require('../config/auth.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const events = await Event.find({});
        res.json(events);
    } catch (e) {
        console.error(e.message);
        res.json([]);
    }
});

router.post('/create', auth.required, async (req, res) => {
    try {
        const {payload: {id, username}, body: {eventData}} = req;

        eventData.author = id;
        eventData.authorName = username;
        const newEvent = new Event(eventData);

        await newEvent.save();

        res.json({});
    } catch (e) {
        console.error(e.message);

        res.status(400).json({
            errors: [{message: e.message}]
        });
    }
});

router.get('/getById', async (req, res) => {
    try {
        const {id} = req.query;

        const event = await Event.findOne({_id: id});
        res.json(event ?? {});
    } catch (e) {
        console.error(e.message);
        res.json([]);
    }
});
module.exports = router;