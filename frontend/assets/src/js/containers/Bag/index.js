import React from 'react'
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import OrderItemCard from '../../components/OrderItemCard'
import { closeOrder } from '../../api/Orders'


export default function Bag(props) {
    const {items} = props.appState.currentOrder
    let history = useHistory()
    let itemsList = [];
    let subtotal = 0;

    for (let item of items) {
      let orderItemCard = <OrderItemCard key={item.id} order={item} setAppState={props.setAppState} appState={props.appState} />
      itemsList.push(orderItemCard)

      subtotal += item.quantity * item.price
    }

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

    return (
        <div>
            Minha sacola
            <Grid container>
                <Grid item xs={12}>{itemsList}</Grid>
            </Grid>
            <h2>Subtotal: {subtotal}</h2>
            <button onClick={handleSubmit}>Submeter pedido</button>
        </div>
    )
}