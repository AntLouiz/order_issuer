import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link as RouteLink} from "react-router-dom";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Offers from '../../components/Offers';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    welcome: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.primary,
    },
    subwelcome: {
        fontSize: "0.9rem",
    }
}))


export default function Home(props) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Container>
                <Grid
                    alignItems="center"
                    container
                    direction="row"
                    justify="center"
                >
                    <Offers setAppState={props.setAppState} appState={props.appState}/>
                </Grid>
            </Container>
        </div>
    )
}