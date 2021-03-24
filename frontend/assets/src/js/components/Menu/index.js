import React from 'react';
import {Link as RouteLink} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ViewListIcon from '@material-ui/icons/ViewList';
import Tooltip from '@material-ui/core/Tooltip';
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
        color: 'white',
        textDecoration: "none"
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
                <Grid item xs={3}>
                    <Avatar>{client.name[0]}</Avatar>
                </Grid>
                <Grid item xs={9} className={classes.greetings}>
                    <strong>Olá, {client.name}</strong>
                </Grid>
            </Grid>
        )
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
                    <h2>ShopTropper</h2>
                </RouteLink>
            </Grid>
            <Grid item xs={5}>
                <ProductsSearch setAppState={props.setAppState} appState={props.appState} />
            </Grid>
            <Grid item xs={2} className={classes.link}>
                {avatarSection}
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
                            <ShoppingBasketIcon className={classes.icon} />
                        </Tooltip>
                    </RouteLink>
                </Typography>
            </Grid>
        </Grid>
    );
}