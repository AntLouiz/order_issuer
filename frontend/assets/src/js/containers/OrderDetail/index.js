import React from 'react';
import { Redirect } from 'react-router-dom';


export default function OrderDetail(props) {
    const { order } = props.location

    if (!order) {
        return <Redirect to="/"/>
    }
    console.log(order)

    return <div>My order</div>
}