import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import {CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Box} from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function EventDashboardCard({event}) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={event.imagePath}
                    title={event.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                        {event.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {event.shortDescription}
                    </Typography>

                    <Box m={2}/>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Адреса: {event.address}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>

                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}