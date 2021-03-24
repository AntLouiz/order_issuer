import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import OrderItemCard from '../../components/OrderItemCard'
import { closeOrder } from '../../api/Orders'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "2rem 6rem 2rem 6rem"
    },
    subtotal: {
        textAlign: "right"
    },
    submit: {
        backgroundColor: "#62db1d",
        color: "white",
        width: "100%",
        float: "right"
    },
    emptyMessageRoot: {
        textAlign: "center",
        padding: "8rem 2rem 8rem 2rem"
    },
    emptyMessage: {
        fontSize: "2rem"
    }
}))

export default function Bag(props) {
    const classes = useStyles()
    const {items} = props.appState.currentOrder
    let history = useHistory()
    let itemsList = [];
    let subtotal = 0;

    const handleSubmit = () => {
        let alertMessage = {message: null, severity: 'success'}
        const handler = () => {
            alertMessage['message'] = 'Pedido submetido com sucesso'
            props.setAppState((prevState) => {return {...prevState, alertMessage: alertMessage}})
        }
        const handlerError = () => {
            alertMessage['message'] = 'Falha ao submeter pedido'
            alertMessage['severity'] = 'error'
            props.setAppState((prevState) => {return {...prevState, alertMessage: alertMessage}})
        }
        closeOrder(props.setAppState, props.appState.currentOrder.pk, handler, handlerError)
        history.push('/')
    }

    for (let item of items) {
      let orderItemCard = (
          <Grid item xs={6}>
            <OrderItemCard
                key={item.id}
                order={item}
                setAppState={props.setAppState}
                appState={props.appState}
            />
          </Grid>
          )
          itemsList.push(orderItemCard)

      subtotal += item.quantity * item.price
    }

    let emptyBagMessage = (
        <Grid item xs={12} className={classes.emptyMessageRoot}>
            <Grid xs={12} className={classes.emptyMessage}>Sua sacola está vazia :(</Grid>
            <Grid xs={12}>
                <Link to="/">
                    <p>Voltar para a página principal</p>
                </Link>
            </Grid>
        </Grid>
    )

    let body = (
        <div>
            <Grid item xs={12}>
                <h2>Minha sacola</h2>
            </Grid>
            <Grid container>
                {itemsList}
            </Grid>
        </div>
    )

    let subtotalSubmit = (
        <Grid item xs={12}>
            <Grid item xs={12} className={classes.subtotal}>
                <h2>Subtotal: {subtotal}</h2>
            </Grid>
            <Grid item xs={12} className={classes.subtotal}>
                <Grid item xs={3} className={classes.submit}>
                    <Button onClick={handleSubmit} className={classes.submit}>Submeter pedido</Button>
                </Grid>
            </Grid>
        </Grid>
    )

    return (
        <div>
            <Grid container className={classes.root}>
                {itemsList.length?body: emptyBagMessage}
                {itemsList.length?subtotalSubmit: null}
            </Grid>
        </div>
    )
}