import React from 'react';
import {Link as RouteLink} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ProductsSearch from '../ProductsSearch';



const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: "1rem",
        paddingBottom: "1rem"
    },
    link: {
        display: 'flex',
    },
    logo: {
        display: 'flex',
        padding: '1rem',
        display: 'flex'
    },
    icon: {
        marginRight: theme.spacing(0.5),
        fontSize: '2.5rem',
        padding: '0.5rem'
    },
    greetings: {
        paddingTop: 5
    }
}));

export default function Menu(props) {
    const classes = useStyles();
    const {client} = props.appState

    let avatarSection;

    if (client) {
        avatarSection = (
            <Grid container>
                <Grid xs={3}>
                    <Avatar>{client.name[0]}</Avatar>
                </Grid>
                <Grid xs={9} className={classes.greetings}>
                    <strong>Olá, {client.name}</strong>
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid container xs={12} className={classes.root}>
        <Grid item xs={2}>
            <Link color="inherit" className={classes.logo}>
                <RouteLink to="home">
                    Home
                </RouteLink>
            </Link>
        </Grid>
        <Grid item xs={6}>
            <ProductsSearch />
        </Grid>
        <Grid
            item xs={2}
            alignItems="center"
            container
            direction="row"
            justify="center"
        >
            <Typography color="textPrimary" className={classes.link}>
                <RouteLink to="my-orders">
                    <ShoppingBasketIcon className={classes.icon} />
                </RouteLink>
            </Typography>
        </Grid>
        <Grid item xs={2}
            alignItems="center"
            container
            direction="row"
            justify="center"
        >
            {avatarSection}
        </Grid>
        </Grid>
    );
}