import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import OrdersList from '../../components/OrdersList';

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
      </Grid>
    )
}