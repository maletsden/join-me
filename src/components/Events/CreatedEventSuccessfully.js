import React from "react";
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import {Box, Button, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

export default function CreatedEventSuccessfully({setCreatedSuccessfully}) {
    return (
        <Box className='register-successfully-wrapper'>
            <Box display="flex" alignItems="center" flexDirection="column">
                <CheckCircleOutlineRoundedIcon style={{fill: "green", fontSize: "5.5rem"}}/>

                <Box m={2}/>

                <Typography variant="h6">
                    Congratulations, your event has been successfully created.
                </Typography>

                <Box m={2}/>

                <Typography variant="h6">
                    Ready to create a new one?
                </Typography>

                <Box m={2}/>

                <Button variant="outlined" color="primary" onClick={() => setCreatedSuccessfully(false)}>
                    Create Event
                </Button>

                <Box m={2}/>

                <Typography variant="h6">
                    Or discover events created by other users?
                </Typography>

                <Box m={2}/>

                <Button variant="outlined" color="primary">
                    <Link to='/dashboard' style={{textDecoration: 'none', color: 'inherit'}}>
                        Dashboard
                    </Link>
                </Button>
            </Box>
        </Box>
    );
}