import React from 'react';
import { useParams } from 'react-router-dom';


export default function OrderDetail(props) {
    const { id } = useParams()
    const { order } = props

    return <div>My order {order}</div>
}