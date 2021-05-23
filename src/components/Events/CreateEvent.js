import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Box, Button, TextField, Typography} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import CreatedEventSuccessfully from "./CreatedEventSuccessfully";

async function createEvent(eventData, token) {
    try {
        const data = await fetch('/events/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
            body: JSON.stringify({ eventData })
        });

        return await data.json();
    } catch (e) {
        console.error(e.message);
    }
}

function CreateEvent({user}) {
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [imagePath] = useState('/images/events/ucu.jpg');
    const [shortDescription, setShortDescription] = useState('');
    const [description, setDescription] = useState('');
    const [eventStartDate, setEventStartDate] = useState(new Date().toISOString().slice(0, 16));
    const [eventEndDate, setEventEndDate] = useState(new Date().toISOString().slice(0, 16));

    const [errors, setErrors] = useState([]);
    const [createdSuccessfully, setCreatedSuccessfully] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const {token} = user;

        if (!token) {
            setErrors([{message: 'You must to be logged in to create a new event.'}]);
            return;
        }

        const errors = [];

        const startDate = new Date(eventStartDate);
        const endDate = new Date(eventEndDate);

        if (startDate > endDate) {
            errors.push({message: 'Event must end after the start date.'});
        }

        if (shortDescription.length < 10) {
            errors.push({message: 'Event short description must be at least 10 characters long.'});
        }

        if (errors.length) {
            setErrors(errors);
            return;
        }

        // hide all errors
        setErrors([]);

        const eventData = {
            name, address, shortDescription, description, eventStartDate, eventEndDate, imagePath
        };
        const response = await createEvent(eventData, token);

        if (!response) return;

        if (response.errors) {
            setErrors(response.errors);
            return;
        }

        setCreatedSuccessfully(true);
    }

    if (createdSuccessfully) {
        return (<CreatedEventSuccessfully setCreatedSuccessfully={setCreatedSuccessfully}/>)
    }


    return (
        <Box>
            <Box m={2}/>

            <Typography variant="h5" align="center">
                Create a new Event
            </Typography>

            <Box m={2}/>

            <form onSubmit={handleSubmit} className="login-wrapper">
                <Box m={2}>
                    <TextField
                        required
                        label="Name"
                        variant="outlined"
                        type="text"
                        onChange={e => setName(e.target.value.trim())}
                    />
                </Box>

                <Box m={2}>
                    <TextField
                        required
                        label="Address"
                        variant="outlined"
                        type="address"
                        onChange={e => setAddress(e.target.value.trim())}
                    />
                </Box>

                <Box m={2}>
                    <TextField
                        required
                        label="Short Description"
                        variant="outlined"
                        multiline
                        type="text"
                        onChange={e => setShortDescription(e.target.value.trim())}
                    />
                </Box>

                <Box m={2}>
                    <TextField
                        label="Description (Optional)"
                        variant="outlined"
                        multiline
                        type="text"
                        onChange={e => setDescription(e.target.value.trim())}
                    />
                </Box>

                <Box m={2}>
                    <TextField
                        required
                        label="Event Start"
                        variant="outlined"
                        type="datetime-local"
                        defaultValue={eventStartDate}
                        onChange={e => setEventStartDate(e.target.value)}
                    />
                </Box>

                <Box m={2}>
                    <TextField
                        required
                        label="Event End"
                        variant="outlined"
                        type="datetime-local"
                        defaultValue={eventEndDate}
                        onChange={e => setEventEndDate(e.target.value)}
                    />
                </Box>

                <Button variant="outlined" color="primary" type="submit">
                    Submit
                </Button>

                <Box m={2}>
                    {errors.map((error, index) => (
                        <Box m={2}><Alert severity="error" key={index}>{error.message}</Alert></Box>
                    ))}
                </Box>


            </form>
        </Box>
    );
}


CreateEvent.propTypes = {
    user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({user: state.user});

export default connect(mapStateToProps)(CreateEvent);