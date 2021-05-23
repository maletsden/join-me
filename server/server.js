const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require("express-session");
const port = process.env.PORT || 8080;

const app = express();

// Mongoose
mongoose.connect(process.env.MONGODB_CONNECT_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Mongodb is connected successfully.'))
    .catch(console.error);

// MongoDB models
require('./models/user');
require('./models/event');

// Passport config
require('./config/passport');

app
    .use(session({ secret: process.env.SESSION_SECRET }))
    .use(bodyParser.json())
    .use(express.urlencoded({extended: false}))
    .use(passport.initialize())
    .use(passport.session())
    .use(express.static('build'));

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

// Routes
app.use('/users', require('./routes/users'));
app.use('/events', require('./routes/events'));

app.listen(port, () => console.log(`Server started successfully on port ${port}`));