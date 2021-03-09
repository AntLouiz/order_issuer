import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}))


export default function Checkout() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Container>
            <Grid item xs={12}>
                <div>
                    <h2>
                        Checkout
                    </h2>
                </div>
            </Grid>
            </Container>
        </div>
    )
}