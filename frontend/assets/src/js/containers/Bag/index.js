import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import OrderItemCard from '../../components/OrderItemCard'
import MessageEmpty from '../../components/MessageEmpty';
import { closeOrder } from '../../api/Orders'
import integerToBRL from '../../utils';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "2rem 6rem 2rem 6rem"
    },
    subtotal: {
        textAlign: "right",
        padding: "5rem 1rem 6rem 1rem",
        background: "white",
        marginTop: "1rem",
        borderRadius: "1%",
        border: "#092ece 3px solid"
    },
    submit: {
        backgroundColor: "#62db1d",
        color: "white",
        width: "100%",
        float: "right"
    },
    itemsList: {
        backgroundColor: "white",
        padding: "1rem"
    },
    bagHeader: {
        padding: "2rem 1rem 1rem 4rem"
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
        closeOrder(props.setAppState, props.appState.currentOrder.pk, props.appState.client.pk, handler, handlerError)
        history.push('/')
    }

    for (let item of items) {
      let orderItemCard = (
            <OrderItemCard
                key={item.id}
                order={item}
                setAppState={props.setAppState}
                appState={props.appState}
            />
          )
          itemsList.push(<Grid item xs={12}>{orderItemCard}</Grid>)

      subtotal += item.quantity * item.price
    }

    let emptyBagMessage = <MessageEmpty message="Sua sacola está vazia :(" />

    let body = (
        <Grid container className={classes.itemsList}>
            <Grid item xs={12} className={classes.bagHeader}>
                <h2>Produtos adicionados à sacola</h2>
            </Grid>
            <Grid item xs={12}>
                {itemsList}
            </Grid>
        </Grid>
    )

    let subtotalSubmit = (
        <Grid item xs={12} className={classes.subtotal}>
            <Grid item xs={12}>
                <h2>Valor total: {integerToBRL(subtotal)}</h2>
            </Grid>
            <Grid item xs={12}>
                <Grid item xs={3} className={classes.submit}>
                    <Button onClick={handleSubmit} className={classes.submit}>Submeter pedido</Button>
                </Grid>
            </Grid>
        </Grid>
    )

    return (
        <Grid container className={classes.root}>
            {itemsList.length?body: emptyBagMessage}
            {itemsList.length?subtotalSubmit: null}
        </Grid>
    )
}