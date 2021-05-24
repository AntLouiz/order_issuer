import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { getOrderItems } from '../../api/Orders';


export default function OrderDetail(props) {
    const { order } = props.location
    const defaultState = {
        order: order,
        currentOrder: {
            items: []
        }
    }
    let orderItems = []
    const [state, setState] = useState(defaultState)

    if (!order) {
        return <Redirect to="/"/>
    }

    useEffect(() => {
        if (!state.currentOrder.items.length) {

            getOrderItems(setState, order.id)
        }
    })

    for(let orderItem of state.currentOrder.items) {
        orderItems.push(<li>{orderItem.productItem.name} | Price: {orderItem.price} x{orderItem.quantity}</li>)
    }

    return (
        <Grid container>
            <Grid item xs={12}><ul>{orderItems}</ul></Grid>
        </Grid>
    )
}