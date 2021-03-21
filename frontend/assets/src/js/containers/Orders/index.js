import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import OrdersList from '../../components/OrdersList';
import { getClientOrders } from '../../api/Orders';

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


export default function Orders(props) {
    const classes = useStyles();

    const [selectedOrder, setOrder] = useState(defaultState);
    let orders = props.appState.orders
  
    if (!props.appState.currentOrder.items.length && props.appState.client) {
      getClientOrders(props.setAppState, props.appState.client.pk)
    }

    let ordersList = []
    let currentOrder = null
    for (let order of orders) {
      let orderPath = `/order/${order.id}`

      if (order.id == props.appState.currentOrder.id) {
        orderPath = '/my-bag/'
      }
      let orderRow = (
        <div
          className={classes.row}
        >
          Pedido {order.id} {order.created_at}
          <Link to={orderPath}>Visualizar pedido</Link>
        </div>
      )
      if (!order.is_closed) {
        currentOrder = orderRow
      } else {
        ordersList.push(orderRow)
      }
    }

    if (currentOrder) {
      ordersList.unshift(currentOrder)
    }

    return (
      <Grid container xs={12}>
        <Grid item xs={12}>
          <h1>Meus pedidos</h1>
          {ordersList}
        </Grid>
      </Grid>
    )
}