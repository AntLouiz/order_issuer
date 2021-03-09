import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link as RouteLink} from "react-router-dom";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


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


export default function Home() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Container>
            <Grid item xs={12}>
                <div className={classes.welcome}>
                    <h2>
                        Welcome to the order issuer!
                    </h2>
                    <p>
                        <span className={classes.subwelcome}>
                            Produtos a um click de distância.
                        </span>
                    </p>

                    <Grid item>
                    <Button color="green" component={RouteLink} to="new-order">
                        Comprar agora
                    </Button>
                    </Grid>
                </div>
            </Grid>
            </Container>
        </div>
    )
}