import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {makeStyles} from '@material-ui/core/styles';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Box,
    SwipeableDrawer
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import {loginUserByToken} from '../Login/loginRequests';
import {removeUser, setUser} from '../../store/actions';
import {HeaderButton} from "../Buttons/HeaderButtons";
import LeftMenu from "./LeftMenu";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function Header({user = {}, setUser, token, removeUser, removeToken}) {
    const classes = useStyles();
    const [auth, setAuth] = useState('username' in user);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const logoutUser = () => {
        removeToken();
        removeUser();
        setAuth(false);
        handleClose();
    };

    useEffect(() => {
        if (!auth && token) {
            loginUserByToken(token).then((userData) => {
                setUser(userData?.user || {});
                setAuth(true);
            });
        }

        // returned function will be called on component unmount
        return () => {
        }
    }, [token, auth, setUser]);

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleDrawer = (isOpen) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setIsMenuOpen(isOpen);
    };

    return (
        <React.Fragment>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            onClick={toggleDrawer(true)}
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                        >
                            <MenuIcon/>
                        </IconButton>

                        <SwipeableDrawer
                            anchor="left"
                            open={isMenuOpen}
                            onOpen={toggleDrawer(true)}
                            onClose={toggleDrawer(false)}
                        >
                            <LeftMenu
                                toggleDrawer={toggleDrawer}
                                auth={auth}
                                logoutUser={logoutUser}
                            />
                        </SwipeableDrawer>

                        <Typography variant="h6" className={classes.title}>
                            JoinMe
                        </Typography>

                        {auth ? (
                            <div>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={logoutUser}>Log Out</MenuItem>
                                </Menu>
                            </div>
                        ) : (
                            <Box display="flex">
                                <HeaderButton variant="outlined" color="primary" type="submit">
                                    <Link to='/login' style={{textDecoration: 'none', color: 'inherit'}}>Log In</Link>
                                </HeaderButton>

                                <Box mx={1}/>

                                <HeaderButton variant="outlined" color="primary" type="submit">
                                    <Link to='/register'
                                          style={{textDecoration: 'none', color: 'inherit'}}>Register</Link>
                                </HeaderButton>
                            </Box>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        </React.Fragment>
    );
}

const mapStateToProps = (state) => ({user: state.user});
const mapDispatchToProps = (dispatch) => ({
    setUser: user => dispatch(setUser(user)),
    removeUser: () => dispatch(removeUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
