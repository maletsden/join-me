const express = require('express');
const passport = require('passport');

const { ServiceBusClient } = require("@azure/service-bus"); // newly added

const serviceBusClient = new ServiceBusClient(process.env.MESSAGE_QUEUE_CONNECT_URI);
const sender = serviceBusClient.createSender(process.env.MESSAGE_QUEUE_NAME);

// sender function
async function sendBatch(message) {
    let batch = await sender.createMessageBatch();
    batch.tryAddMessage(message);
    await sender.sendMessages(batch);
}

const User = require('../models/user.js');
const auth = require('../config/auth.js');

const router = express.Router();

// login handler
router.post('/login', auth.optional, async (req, res, next) =>{
    const { payload } = req;

    // try to login with payload if exist
    if (payload) {
        try {
            const user = await User.findById(payload.id);

            if (!user) {
                return res.status(400).json({errors: [{message: 'Login failed.'}]});
            }

            return res.json({ user: user.toAuthJSON() });
        } catch (e) {
            return res.status(400).json({errors: [{message: e.message}]});
        }
    }

    return passport.authenticate('local', {session: false}, (err, passportUser) => {
         if (err) {
            return next(err);
        }

        if (!passportUser) {
            return res.status(400).json({errors: [{message: 'Login failed.'}]});
        }

        const user = passportUser;
        user.token = passportUser.generateJWT();

        return res.json({user: user.toAuthJSON()});
    })(req, res, next);
});

// register handler
router.post('/register', auth.optional, async (req, res) => {
    const {username, email, password} = req.body;
    console.log('username: \'' + username + '\', email : \'' + email + '\', pass: \'' + password + '\'.');


    try {
        const user = await User.findOne({email}).exec();

        if (user) {
            res.json({
                errors: [{message: 'Email already registered.'}],
            });
            return;
        }

        const newUser = new User({username, email});
        newUser.setPassword(password);

        // save user
        await newUser.save();

        res.json({user: newUser.toAuthJSON()});

        // send http req to mes q
        await sendBatch({body: {username, email}});

    } catch (e) {
        console.error(e.message);

        res.json({
            errors: [{message: e.message}],
        });
    }
});


router.get('/usersList', (req, res) => {
    User.find({}, (err, users) => res.json(users));
});

module.exports = router;