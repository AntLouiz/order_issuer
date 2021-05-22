import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import OrderDetailItem from '../OrderDetailItem';
import integerToBRL from '../../utils';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "auto",
        backgroundColor: 'white',
        border: "1px #0433ff solid",
        padding: "1rem"
    },
    total: {
        textAlign: "right",
        padding: "0rem 1rem 0rem 0rem",
        borderTop: "1px solid #5b5b5b"
    }
}));

export default function OrderDetail(props) {
    const {order} = props

    const classes = useStyles();

    let subtotal = order.subtotal
    let items = [];
    order.items.forEach((item) => {
        items.push(<OrderDetailItem key={item.id} item={item} />)
    })

    return (
        <Grid container className={classes.root}>
            {items}
            <Grid item xs={12} className={classes.total}>
                Total: {integerToBRL(subtotal)}
            </Grid>
        </Grid>
    )
}
