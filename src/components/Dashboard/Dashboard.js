import React, {useEffect, useState} from 'react';
import EventDashboardCard from "../Events/EventDashboardCard";
import {Box} from "@material-ui/core";
import { useHistory } from "react-router-dom";

// const events = [
//     {
//         name: 'Перегляд Фіналу Евробачення',
//         address: 'м. Львів, вул. Козельницька 2a',
//         imagePath: '/images/events/ucu.jpg',
//         shortDescription: 'Спільний перегляд фіналу Євробачення в УКУ',
//         description: 'Спільний перегляд фіналу Євробачення в УКУ',
//         author: '1',
//         eventDate: 'Date',
//         date: 'Date',
//     },
// ];

async function getAllEvents() {
    try {
        const res = await fetch('/events/');
        return await res.json();
    } catch (e) {
        console.error(e.message);

        return [];
    }
}

export default function Dashboard() {
    const [events, setEvents] = useState([]);
    const history = useHistory();
    useEffect(() => {
        getAllEvents().then((events) => setEvents(events));

        // returned function will be called on component unmount
        return () => {}
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>

            <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                {events.map((event, index) => (
                    <Box
                        mb={3}
                        key={index}
                        onClick={() => history.push(`/event/${event._id}`)}
                    >
                        <EventDashboardCard event={event}/>
                    </Box>
                ))}
            </Box>
            {/*{user && (*/}
            {/*    <div>*/}
            {/*        <div>*/}
            {/*            Username: {user.username}*/}
            {/*        </div>*/}
            {/*        <div>*/}
            {/*            Email: {user.email}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
}