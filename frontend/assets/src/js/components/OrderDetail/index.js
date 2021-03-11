import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "auto",
        backgroundColor: 'red',
    },
    media: {
        width: "100%",
        margin: "1rem"
    }
}));

export default function OrderDetail(props) {
    const {order} = props

    const classes = useStyles();

    return (
        <Grid container className={classes.root} justify="space-evenly">
            <Grid item xs={4}>
                <img src={order.image_url} className={classes.media} />
            </Grid>
            <Grid item xs={6}>
                <h4>{order.title}</h4>
                <p>
                    {order.description}
                </p>
            </Grid>
        </Grid>
    )
}
