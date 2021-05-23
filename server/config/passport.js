const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require("../models/user.js");

passport.use(new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
    try {
        // match user
        const user = await User.findOne({email});

        if (!user) {
            return done(null, false, {message: 'This email is not registered.'});
        }

        // validate password
        if (!user.validatePassword(password)) {
            return done(null, false, {message: 'Password is incorrect.'});
        }

        return done(null, user);
    } catch (e) {
        done(e);
    }
}));