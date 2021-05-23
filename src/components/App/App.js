import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Box} from "@material-ui/core";

import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Register from '../Register/Register';
import useToken from './useToken';
import Header from "../Header/Header";

import '@fontsource/roboto';
import './App.scss';
import EventDashboardCard from "../Events/EventDashboardCard";
import CreateEvent from "../Events/CreateEvent";
import Event from "../Events/Event";

function App() {
    const {token, setToken, removeToken} = useToken();

    const dashboard = (<Dashboard token={token} removeToken={removeToken}/>);

    return (
        <div className="wrapper">
            <BrowserRouter>
                <Header token={token} removeToken={removeToken}/>

                <Box m={2}/>

                <div className="contentWrapper">
                    <Switch>
                        <Route path="/dashboard">
                            {dashboard}
                        </Route>
                        <Route path="/register">
                            <Register setToken={setToken}/>
                        </Route>
                        <Route path="/login">
                            <Login setToken={setToken}/>
                        </Route>
                        <Route path="/card">
                            <EventDashboardCard/>
                        </Route>
                        <Route path="/create-event">
                            <CreateEvent/>
                        </Route>
                        <Route path="/event/:id">
                            <Event/>
                        </Route>
                        <Route path="/">
                            {dashboard}
                        </Route>
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
