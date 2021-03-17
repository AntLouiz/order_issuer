import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import OrdersList from '../../components/OrdersList';
import OrderCard from '../../components/OrderCard';

const defaultState = {
  title: null,
  description: null,
  price: null,
  image_url: null
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: 400,
    margin: "auto",
    backgroundColor: theme.palette.background.paper,
  },
}));

function mocked_orders() {
  return [
    {"id": 1, "description": "Lorem", "name": "Tie Fighter", "image_url": "https://bit.ly/30tP43i"},
    {"id": 2, "description": "Lorem", "name": "Tie Fighter", "image_url": "https://bit.ly/30tP43i"},
    {"id": 3, "description": "Lorem", "name": "Tie Fighter", "image_url": "https://bit.ly/30tP43i"},
    {"id": 4, "description": "Lorem", "name": "Tie Fighter", "image_url": "https://bit.ly/30tP43i"},
    {"id": 5, "description": "Lorem", "name": "Tie Fighter", "image_url": "https://bit.ly/30tP43i"},
    {"id": 6, "description": "Lorem", "name": "Tie Fighter", "image_url": "https://bit.ly/30tP43i"},
  ]
}

export default function Orders() {
    const products = mocked_orders();
    const classes = useStyles();

    const [selectedOrder, setOrder] = useState(defaultState);

    return (
      <Grid container xs={12}>
      <Grid item xs={12}>
        <h1>Meus pedidos</h1>
      </Grid>
      <Grid container xs={12} className={classes.root}>
      <Grid item xs={8}>
        <OrdersList handleItemClick={setOrder}/>
      </Grid>
      </Grid>
      </Grid>
    )
}