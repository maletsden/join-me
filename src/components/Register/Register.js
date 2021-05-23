import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Box, Button, TextField, Typography} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

import RegisterSuccessfully from './RegisterSuccessfully';

async function registerUser(credentials) {
    try {
        const data = await fetch('/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        return await data.json();
    } catch (e) {
        console.error(e.message);
    }
}

export default function Register({setToken}) {
    const [username, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState();
    const [errors, setErrors] = useState([]);
    const [isRegisterSuccessfully, setIsRegisterSuccessfully] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();

        if (!username || !email || !password || !password2) {
            setErrors([{message : 'Please fill in all fields.'}]);
            return;
        }

        const errors = [];

        // check if match
        if (password !== password2) {
            errors.push({message: 'Passwords dont match.'})
        }

        // check if password is more than 6 characters
        if (password.length < 6) {
            errors.push({message: 'Password must be at least 6 characters long.'});
        }

        if (errors.length) {
            setErrors(errors);
            return;
        }

        // hide all errors
        setErrors([]);

        // register a new user
        const response = await registerUser({ username, email, password });

        if (response.errors) {
            setErrors(response.errors);
            return;
        }

        if (response.user?.token) {
            setToken(response.user?.token);
            setIsRegisterSuccessfully(true);
        }
    }

    if (isRegisterSuccessfully) {
        return (<RegisterSuccessfully username={username}/>);
    }
    return (
        <div >
            <Typography variant="h5" align="center">
                Register
            </Typography>

            <Box m={2}/>
            <form onSubmit={handleSubmit} className="login-wrapper">
                <div>
                    <TextField
                        required
                        label="Username"
                        variant="outlined"
                        type="text"
                        onChange={e => setUserName(e.target.value)}
                    />
                </div>

                <Box m={2}/>

                <div>
                    <TextField
                        required
                        label="Email"
                        variant="outlined"
                        type="email"
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>

                <Box m={2}/>

                <div>
                    <TextField
                        required
                        label="Password"
                        variant="outlined"
                        type="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <Box m={2}/>

                <div>
                    <TextField
                        required
                        label="Confirm password"
                        variant="outlined"
                        type="password"
                        onChange={e => setPassword2(e.target.value)}
                    />
                </div>

                <Box m={2}/>

                <Button variant="outlined" color="primary" type="submit">
                    Submit
                </Button>

                <Box m={2}/>

                {errors.map((error, index) => <Alert severity="error" key={index}>{error.message}</Alert>)}

            </form>
        </div>
    )
}


Register.propTypes = {
    setToken: PropTypes.func.isRequired
}