import React from 'react'
import Grid from '@material-ui/core/Grid';
import OrderItemCard from '../../components/OrderItemCard'


export default function Bag(props) {
    const {items} = props.appState.currentOrder
    let itemsList = [];
    let subtotal = 0;

    for (let item of items) {
      let orderItemCard = <OrderItemCard order={item} setAppState={props.setAppState} />
      itemsList.push(orderItemCard)

      subtotal += item.quantity * item.price
    }

    const handleSubmit = () => {
        alert("Pedido submetido.")
    }

    return (
        <div>
            Minha sacola
            <Grid container xs={12}>
                {itemsList}
            </Grid>
            <h2>Subtotal: {subtotal}</h2>
            <button onClick={handleSubmit}>Submeter pedido</button>
        </div>
    )
}