import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import OrderDetail from '../../components/OrderDetail';
import OrderPricing from '../../components/OrderPricing';

const defaultState = {
  title: "Tie Fighter",
  description: "Lorem",
  price: 215500,
  image_url: "https://bit.ly/30tP43i",
  multiple: 2
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    margin: "auto",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Orders() {
    const classes = useStyles();

    const [selectedOrder, setOrder] = useState(defaultState);

    return (
      <Grid container xs={12}>
      <Grid item xs={12}>
        <h1>Checkout</h1>
      </Grid>
      <Grid container xs={12} className={classes.root}>
      <Grid item xs={8}>
        <OrderDetail order={selectedOrder}/>
      </Grid>
      <Grid
        item xs={4}
        alignItems="center"
        direction="row"
        justify="center"
      >
        <OrderPricing order={selectedOrder}/>
      </Grid>
      </Grid>
      </Grid>
    )
}