import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Box, Button, TextField, Typography} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import {setUser} from '../../store/actions/index';
import {loginUser} from './loginRequests';
import RegisterButton from '../Buttons/RegisterButton';

import './Login.scss';

function Login({setToken, setUser}) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setErrors([{message: 'Please fill in all fields.'}]);
            return;
        }

        // check if password is more than 6 characters
        if (password.length < 6) {
            setErrors([{message: 'Password must be at least 6 characters long.'}]);
            return;
        }

        // hide all errors
        setErrors([]);

        const response = await loginUser({email, password});

        if (!response) return;

        if (response.errors) {
            setErrors(response.errors);
            return;
        }
        if (response.user?.token) {
            setToken(response.user.token);
            setUser(response.user);
            history.push('/dashboard');
        }
    }


    return (
        <div>
            <Box m={2}/>

            <Typography variant="h5" align="center">
                Log In
            </Typography>

            <Box m={2}/>

            <form onSubmit={handleSubmit} className="login-wrapper">
                <div>
                    <TextField
                        required
                        id="outlined-required"
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
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        // autoComplete="current-password"
                        variant="outlined"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <Box m={2}/>

                <div className="login-buttons">
                    <Button variant="outlined" color="primary" type="submit">
                        Submit
                    </Button>

                    <Box mx={2}/>

                    <RegisterButton variant="outlined" color="primary">
                        <Link to='/register' style={{textDecoration: 'none', color: 'inherit'}}>Register</Link>
                    </RegisterButton>
                </div>

                <Box m={2}/>

                {errors.map((error, index) => (<Alert severity="error" key={index}>{error.message}</Alert>))}

            </form>
        </div>
    );
}


Login.propTypes = {
    setToken: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({user: state.user});
const mapDispatchToProps = (dispatch) => ({
    setUser: user => dispatch(setUser(user))
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);