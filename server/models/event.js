const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    imagePath: {
        type: String,
        required: true
    },

    shortDescription: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: false
    },

    author: {
        type: String,
        required: false
    },

    authorName: {
        type: String,
        required: false
    },

    eventStartDate: {
        type: Date,
        required: false
    },

    eventEndDate: {
        type: Date,
        required: false
    },

    date: {
        type: Date,
        default: Date.now
    },
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;