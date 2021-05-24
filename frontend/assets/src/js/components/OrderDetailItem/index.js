import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import integerToBRL from '../../utils';
import { RENTABILITY_CHOICES } from '../../api/settings';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "5px",
        fontSize: "13px",
        marginBottom: "10px"
    }
}));

export default function OrderDetailItem(props) {
    const {item} = props
    const classes = useStyles();

    let rentability = RENTABILITY_CHOICES[item.rentability]

    return (
        <Grid container className={classes.root}>
            <Grid item xs={3}>{item.productItem.name}</Grid>
            <Grid item xs={2}>{integerToBRL(item.price)}</Grid>
            <Grid item xs={2}>Qtd.: {item.quantity}</Grid>
            <Grid item xs={3}>Total: {integerToBRL(item.quantity * item.price)}</Grid>
            <Grid item xs={2}>Rent.: {rentability}</Grid>
        </Grid>
    )
}
//<Grid item xs={3}>Rent.: {item.rentability}</Grid>