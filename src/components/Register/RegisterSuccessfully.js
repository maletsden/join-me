import React from "react";
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';
import {Box, Button, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

import './RegisterSuccessfully.scss';


export default function RegisterSuccessfully({username}) {
    return (
        <div className='register-successfully-wrapper'>
            <Box display="flex" alignItems="center" flexDirection="column">
                <CheckCircleOutlineRoundedIcon style={{fill: "green", fontSize: "5.5rem"}}/>

                <Box m={2}/>

                <Typography variant="h6">
                    Congratulations, <span style={{fontWeight: 'bold'}}>{username}</span>, your account has been successfully created.
                </Typography>

                <Box m={2}/>

                <Typography variant="h6">
                    Let's try to <span style={{fontStyle: 'italic'}}>JoinYou</span>.
                </Typography>

                <Box m={2}/>

                <Button variant="outlined" color="primary">
                    <Link to='/login' style={{textDecoration: 'none', color: 'inherit'}}>Log In</Link>
                </Button>
            </Box>



        </div>
    );
}