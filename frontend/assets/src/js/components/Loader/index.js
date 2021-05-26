import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Loader from "react-loader-spinner";
import { REQUEST_TIMEOUT } from '../../api/settings';


const useStyles = makeStyles(() => ({
    loader: {
        margin: "auto",
        padding: "5rem"
    }
}));


export default function DotLoader(props) {
    const classes = useStyles();

    return (
        <Loader
            className={classes.loader}
            type="ThreeDots"
            color="#3e3264"
            height={100}
            width={100}
            timeout={REQUEST_TIMEOUT}
        />
    )
}