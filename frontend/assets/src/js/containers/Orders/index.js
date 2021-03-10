import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import OrdersList from '../../components/OrdersList';

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
    let offers = [];

    for (let offer of products) {
      console.log(offer)
    }

    return (
      <Grid container xs={12}>
      <Grid item xs={12}>
        <h1>Meus pedidos</h1>
      </Grid>
      <OrdersList />
      </Grid>
    )
}