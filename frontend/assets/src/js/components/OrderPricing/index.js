import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';


let defaultState = {
    price: null,
    showInput: false,
    amount: undefined,
    quantity: 1
}

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "auto",
        height: "100%",
        padding: 10,
        backgroundColor: 'blue',
    },
    price: {
        fontSize: 30,
        fontWeight: 600
    },
    button: {
        width: "100%",
        backgroundColor: "red"
    },
    buttonQuantity: {
        width: 80
    }
}));


export default function OrderPricing(props) {
    const {order} = props
    const [state, setState] = useState(defaultState);

    const classes = useStyles();

    const convertPrice = (price) => {
        return price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    }

    const handleChange = (event) => {
        console.log(event.target.value)
    };

    const handleInputClick = () => {

    }

    let orderPrice = convertPrice(order.price)

    let inputAmount = null
    if (state.showInput) {
        inputAmount = (
            <label>
                <InputLabel htmlFor="standard-adornment-amount">Informe um valor:</InputLabel>
                <Input
                    id="standard-adornment-amount"
                    value={state.amount}
                    onChange={handleChange}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
                <Button color="default" to="checkout" onClick={handleInputClick}>
                    Pronto
                </Button>
            </label>)
    }

    return (
        <Grid container className={classes.root} justify="space-evenly">
            <Grid item xs={12}>
                <span className={classes.price}>
                    Preço sugerido: {state.price? state.price: orderPrice}
                </span>
                <Button color="green" onClick={() => setState({...state, showInput: !state.showInput})}>
                    {state.showInput? "Utilizar preço sugerido": "Alterar preço sugerido"}
                </Button>
            </Grid>
            <Grid item xs={12}>
                {inputAmount}
            </Grid>
            <Grid item xs={12}>
                <InputLabel htmlFor="standard-adornment-amount">Informe a quantidade:</InputLabel>
                <Button
                    color="green"
                    to="checkout"
                    disabled={state.quantity===1}
                    className={classes.buttonQuantity}
                    onClick={() => setState({...state, quantity: state.quantity > 1? state.quantity - 1: state.quantity})}
                >
                    <RemoveIcon />
                </Button>
                    {state.quantity}
                <Button
                    color="green"
                    to="checkout"
                    className={classes.buttonQuantity}
                    onClick={() => setState({...state, quantity: state.quantity + 1})}
                >
                    <AddIcon />
                </Button>
            </Grid>
            <Grid item xs={12}>
            <Button color="green" to="checkout" className={classes.button}>
                Finalizar pedido
            </Button>
            </Grid>
        </Grid>
    )
}
