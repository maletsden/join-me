import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {Link} from "react-router-dom";
import {Box, Typography} from "@material-ui/core";

const useStyles = makeStyles({
    list: {
        width: 250,
    },
});

export default function LeftMenu({toggleDrawer, auth, logoutUser}) {
    const classes = useStyles();


    return (
        <div
            className={clsx(classes.list)}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <Box display="flex" justifyContent="center" m={2}>
                <Typography variant="h6" className={classes.title}>
                    <Link to='/dashboard' style={{textDecoration: 'none'}}>
                        <Box>JoinMe</Box>
                    </Link>
                </Typography>
            </Box>


            <List>
                <Link to='/dashboard' style={{textDecoration: 'none', color: 'inherit'}}>
                    <ListItem button>
                        <ListItemIcon>
                            <DashboardIcon color="primary"/>
                        </ListItemIcon>
                        <ListItemText>
                            Dashboard
                        </ListItemText>
                    </ListItem>
                </Link>


                <Link to='/create-event' style={{textDecoration: 'none', color: 'inherit'}}>
                    <ListItem button>

                        <ListItemIcon>
                            <AddBoxOutlinedIcon color="primary"/>
                        </ListItemIcon>
                        <ListItemText>
                            Create New Event
                        </ListItemText>
                    </ListItem>
                </Link>


            </List>
            <Divider/>
            <List>
                <ListItem button>
                    <ListItemText>
                        {auth ? (
                            <Box display="flex" justifyContent="center">
                                <Button variant="outlined" color="primary" onClick={logoutUser}>
                                    Log Out
                                </Button>
                            </Box>
                        ) : (
                            <Box display="flex" justifyContent="space-between">
                                <Button variant="outlined" color="primary">
                                    <Link to='/login' style={{textDecoration: 'none', color: 'inherit'}}>Log In</Link>
                                </Button>
                                <Button variant="outlined" color="primary">
                                    <Link to='/register'
                                          style={{textDecoration: 'none', color: 'inherit'}}>Register</Link>
                                </Button>
                            </Box>
                        )}
                    </ListItemText>
                </ListItem>
            </List>
        </div>
    );
}
