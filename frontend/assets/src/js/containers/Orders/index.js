import React from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { getClientOrders } from '../../api/Orders';
import OrderCard from '../../components/OrderCard';

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

    let orders = props.appState.orders
  
    if (!props.appState.orders.length && props.appState.client) {
      getClientOrders(props.setAppState, props.appState.client.pk)
    }

    let ordersList = []
    for (let order of orders) {
      let orderRow = <OrderCard order={order}/>
      ordersList.push(orderRow)
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