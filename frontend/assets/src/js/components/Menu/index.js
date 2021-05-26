import React, { useState } from 'react';
import {Link as RouteLink} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ViewListIcon from '@material-ui/icons/ViewList';
import Tooltip from '@material-ui/core/Tooltip';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ProductsSearch from '../ProductsSearch';
import AvatarOptions from '../AvatarOptions';



const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: "1rem",
        paddingBottom: "1rem"
    },
    link: {
        display: 'flex',
        color: 'white',
        textDecoration: "none",
        fontFamily: "Mulish, sans-serif"
    },
    icon: {
        marginRight: theme.spacing(0.5),
        fontSize: '2.5rem',
    },
    greetings: {
        paddingTop: 5
    },
    fireIcon: {
        color: "#f27575"
    },
    colorError: {
        backgroundColor: "#df0772",
        marginTop: "1rem"
    },
    subtitle: {
        position: "absolute",
        top: "4rem",
        fontSize: "12px",
        margin: "1px 1px 1px 10px"
    }
}));

export default function Menu(props) {
    const classes = useStyles();
    const {client} = props.appState
    const items = props.appState.currentOrder.items
    const itemsLength = items?items.length:0

    let imageLogoUrl = '/static/images/logo.png'

    let avatarOptions;
    if (client) {
        avatarOptions = <AvatarOptions client={client}/>
    }

    return (
        <Grid container
            alignItems="center"
            className={classes.root}
            direction="row"
            justify="center"
        >
            <Grid item xs={2}>
                <RouteLink to="/" className={classes.link}>
                    <h2>Fire<WhatshotIcon className={classes.fireIcon}/>Blaster</h2>
                    <span className={classes.subtitle}>Arms and vehicles shop</span>
                </RouteLink>
            </Grid>
            <Grid item xs={5}>
                <ProductsSearch setAppState={props.setAppState} appState={props.appState} />
            </Grid>
            <Grid item xs={2} className={classes.link}>
                {avatarOptions}
            </Grid>
            <Grid
                item xs={1}
            >
                <Typography color="textPrimary">
                    <RouteLink to="/orders" className={classes.link}>
                        <Tooltip title="Meus pedidos" aria-label="my-orders">
                            <ViewListIcon className={classes.icon} />
                        </Tooltip>
                    </RouteLink>
                </Typography>
            </Grid>
            <Grid
                item xs={1}
            >
                <Typography color="textPrimary">
                    <RouteLink to="/my-bag" alt="Minha sacola" className={classes.link}>
                        <Tooltip title="Minha sacola" aria-label="my-bag">
                            <Badge badgeContent={itemsLength} color="error" classes={classes}>
                                <ShoppingBasketIcon className={classes.icon} />
                            </Badge>
                        </Tooltip>
                    </RouteLink>
                </Typography>
            </Grid>
        </Grid>
    );
}