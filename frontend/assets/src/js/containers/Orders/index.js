import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { getClientOrders } from '../../api/Orders';
import OrderCard from '../../components/OrderCard';
import MessageEmpty from '../../components/MessageEmpty';
import {PAGE_SIZE} from '../../api/settings';

const defaultState = {page: 1}

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
  },
  pagination: {
    "textAlign": "center",
    "& > ul": {
      "display": "inline-flex"
    }
  }
}));


export default function Orders(props) {
    const classes = useStyles()
    const [state, setState] = useState(defaultState)

    let orders = []
    let ordersCards = []
    let pagination = null

    const handleChange = (event, value) => {
      setState({page: value})
      getClientOrders(props.setAppState, props.appState.client.pk, value)
    }

    if (props.appState.orders.results) {
      orders = props.appState.orders.results
      let count = props.appState.orders.count
      let totalPages = Math.ceil(count/PAGE_SIZE)
      totalPages = totalPages? totalPages: totalPages+1
      pagination = <Pagination
                      count={totalPages}
                      page={state.page}
                      onChange={handleChange}
                      className={classes.pagination}
                    />
    }

    if (!props.appState.orders.results && props.appState.client) {
      getClientOrders(props.setAppState, props.appState.client.pk)
    }

    for (let order of orders) {
      let orderRow = <OrderCard order={order}/>
      ordersCards.push(orderRow)
    }

    let body = (
      <Grid item xs={10} className={classes.root}>
        <h1>Meus pedidos</h1>
        <Grid item xs={12}>
          <List>{ordersCards}</List>
        </Grid>
        <Grid item xs={12}>
          {pagination}
        </Grid>
      </Grid>
    )

    let emptyOrdersMessage = <MessageEmpty
                                message="Você não tem pedidos"
                              />

    return (
      <Grid container>
        {ordersCards.length? body: emptyOrdersMessage}
      </Grid>
    )
}