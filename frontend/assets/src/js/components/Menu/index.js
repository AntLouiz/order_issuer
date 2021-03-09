import React from 'react';
import {Link as RouteLink} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ProductsSearch from '../ProductsSearch';



const useStyles = makeStyles((theme) => ({
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
    }
}));

export default function Menu() {
    const classes = useStyles();

    return (
        <Grid container xs={12}>
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
        <Grid item xs={4}>
            <Typography color="textPrimary" className={classes.link}>
                <RouteLink to="orders">
                    <ShoppingBasketIcon className={classes.icon} />
                </RouteLink>
            </Typography>
        </Grid>
        </Grid>
    );
}