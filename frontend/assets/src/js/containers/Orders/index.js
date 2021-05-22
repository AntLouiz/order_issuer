import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
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
    padding: "2rem 6rem 2rem 6rem",
    margin: "auto",
    background: "red",
    marginTop: "3rem",
    marginBottom: "3rem",
    background: "white"
  },
  tooltip: {
    color: "#848282",
    padding: "0rem 1rem 0rem 0rem",
    textAlign: "right"
  },
  row: {
    cursor: "pointer",
    padding: "1rem",
    background: "#f7f7f7",
    borderBottom: "1px solid #cacaca",
    marginBottom: "1rem",
    '&:hover': {
      background: "#f9f9f9"
    }
  }
}));


export default function Orders(props) {
    const classes = useStyles();
    const history = useHistory();

    const [selectedOrder, setOrder] = useState(defaultState);
    let orders = props.appState.orders
  
    if (!props.appState.orders.length && props.appState.client) {
      getClientOrders(props.setAppState, props.appState.client.pk)
    }

    let ordersList = []
    let currentOrder = null
    for (let order of orders) {
      let orderPath = `orders/${order.id}`

      if (order.id == props.appState.currentOrder.pk) {
        orderPath = 'my-bag'
      }

      let orderRow = (
        <ListItem
          className={classes.row}
          key={order.id}
          onClick={() => history.push(orderPath)}
        >
        <ListItemText
          primary={`Cod.: #${order.id}`}
        />
        <ListItemText
          primary={`Submetido em: ${order.created_at}`}
        />
        <ListItemText
          className={classes.tooltip}
          primary={'Clique para visualizar'}
        />
        </ListItem>
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
      <Grid container>
        <Grid item xs={10} className={classes.root}>
          <h1>Meus pedidos</h1>
          <List>{ordersList}</List>
        </Grid>
      </Grid>
    )
}