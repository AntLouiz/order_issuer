import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Loader from "react-loader-spinner";
import { REQUEST_TIMEOUT } from '../../api/settings';


const useStyles = makeStyles(() => ({
    root: {
        position: "absolute",
        background: "#fbfbfb94",
        paddingTop: "5px"
    },
    loader: {
        margin: "auto"
    }
}));


export default function ButtonLoader(props) {
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Loader
                className={classes.loader}
                type="TailSpin"
                color="#3e3264"
                height={25}
                width={25}
                timeout={80000}
            />
        </Grid>
    )
}