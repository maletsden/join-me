import React, {useEffect, useState} from "react";
import {Box, Card, Grid, Typography} from "@material-ui/core";
import {useParams} from "react-router-dom";

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import {OSM} from 'ol/source';
import {fromLonLat} from 'ol/proj';
import Geocoder from 'ol-geocoder';

import './Event.scss';

async function getEventData(id) {
    try {
        const res = await fetch(`/events/getById?id=${id}`);
        return await res.json();
    } catch (e) {
        console.error(e);

        return {};
    }
}

function setMarker(map, geocoder, address) {
    // insert address in search field
    const inputQuery = document.getElementById('gcd-input-query');
    inputQuery.value = address;

    // wait for the results of the search
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type !== 'childList') continue;

            for (const addedNode of mutation.addedNodes) {
                if (addedNode.tagName !== 'LI') continue;

                addedNode.click();
                observer.disconnect();

                setTimeout(() => {
                    map.getView().animate({
                        zoom: 15,
                        duration: 10
                    })
                }, 500)

                return;
            }
        }
    });

    // start listening for search results
    const results = document.querySelector('.gcd-gl-result');
    observer.observe(
        results,
        {attributes: false, childList: true, characterData: false, subtree: true}
    );

    // simulate search
    const ke = new KeyboardEvent('keypress', {
        bubbles: true, cancelable: true, keyCode: 13
    });
    inputQuery.dispatchEvent(ke);
}

function createMap(target) {
    const map = new Map({
        target,
        layers: [
            new TileLayer({
                source: new OSM()
            })
        ],
        view: new View({
            center: fromLonLat([37.41, 8.82]),
            zoom: 4
        })
    });

    const geocoder = new Geocoder('nominatim', {
        lang: 'UK'
    });

    map.addControl(geocoder);

    return [map, geocoder];
}

/**
 *
 * @param {Date} date
 * @return {string}
 */
function toLocalDateString(date) {
    return date ? new Date(date).toLocaleString() : '';
}

export default function Event() {
    const {id} = useParams();
    const [event, setEvent] = useState({});

    useEffect(() => {
        getEventData(id).then((event) => {
            setEvent(event);
            const [map, geocoder] = createMap('map');

            setMarker(map, geocoder, event.address);
        });

        // returned function will be called on component unmount
        return () => {
        };
    }, [id]);

    return (


        <Box display="flex" alignItems="center" flexDirection="column">

            <Typography gutterBottom variant="h5">
                {event.name}
            </Typography>

            <Box m={2}/>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <img src={event.imagePath} alt={event.name} style={{width: '100%'}}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <Box ml={2}>
                            <Typography gutterBottom variant="h6" component="h5">
                                Опис Події:
                            </Typography>

                            <Typography gutterBottom variant="h6" component="h5">
                                {event.description || event.shortDescription}
                            </Typography>

                            <Typography gutterBottom variant="h6" component="h5">
                                Автор: {event.authorName}
                            </Typography>
                        </Box>
                    </Card>
                </Grid>
            </Grid>

            <Box m={2}/>

            <Card style={{width: '100%'}}>
                <Box m={2}>
                    <Typography gutterBottom variant="h6" component="h5">
                        <Box fontWeight="fontWeightBold" display="inline"> Aдреса: </Box> {event.address}
                    </Typography>

                    <Typography gutterBottom variant="h6" component="h5">
                        <Box
                            fontWeight="fontWeightBold"
                            display="inline"
                        >
                            Початок:
                        </Box> {toLocalDateString(event.eventStartDate)}
                    </Typography>

                    <Typography gutterBottom variant="h6" component="h5">
                        <Box
                            fontWeight="fontWeightBold"
                            display="inline"
                        >
                            Кінець:
                        </Box> {toLocalDateString(event.eventEndDate)}
                    </Typography>
                </Box>
            </Card>

            <Box m={2}/>

            <Box id="map" className="map"/>

            <Box m={2}/>
        </Box>
    );
}