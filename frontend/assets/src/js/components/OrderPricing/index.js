import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';


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


function convertPrice(price) {
    return price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
}


export default function OrderPricing(props) {
    const {order} = props

    let orderPrice = convertPrice(order.price)
    let defaultState = {
        price: null,
        showInput: false,
        showUserInput: false,
        confirmedPrice: orderPrice,
        sugestedPrice: orderPrice,
        useSugestedPrice: true,
        quantity: order.multiple? order.multiple: 1,
        inputError: false,
        multiple: order.multiple? order.multiple: 1
    }

    const [state, setState] = useState(defaultState);

    const classes = useStyles();

    const handleChange = (event) => {
        let {name, value} = event.target
        let inputError = false

        if (!parseInt(value)) {
            inputError = true
        } else {
            value = parseInt(value)
        }

        setState({...state, [name]: value, inputError: inputError})
    };

    const handleInputButtonClick = () => {
        let confirmedPrice = 0
        let showInput = false
        if (state.sugestedPrice && state.useSugestedPrice) {
            confirmedPrice = state.sugestedPrice
        } else {
            confirmedPrice = state.price
        }

        if (!state.price) {
            showInput = true
        }
        confirmedPrice = convertPrice(confirmedPrice)
        setState({...state, confirmedPrice: confirmedPrice, showInput: showInput})
    }

    const handleShowHideClick = () => {
        setState({...state,
                  useSugestedPrice: !state.useSugestedPrice,
                  showInput: !state.showInput,
                  showUserInput: !state.showUserInput
                })
    }

    const handleQuantity = (event) => {
        if (event === "sum") {
            let quantity = state.multiple + state.quantity
            setState({...state, quantity: quantity})
        } else {
            if (state.quantity > state.multiple) {
                let quantity =  state.quantity - state.multiple
                setState({...state, quantity: quantity})
            }
        }
    }

    let inputAmount = null
    if (state.showInput && !state.useSugestedPrice) {
        inputAmount = (
            <label>
                <InputLabel htmlFor="standard-adornment-amount">Informe um valor:</InputLabel>
                <Input
                    id="standard-adornment-amount"
                    name="price"
                    error={state.inputError}
                    value={state.price}
                    onChange={handleChange}
                    startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                />
                <Button
                    color="default"
                    to="checkout"
                    onClick={handleInputButtonClick}
                    disabled={state.inputError}
                >
                    Pronto
                </Button>
            </label>)
    }

    return (
        <Grid container className={classes.root} justify="space-evenly">
            <Grid container xs={12}>
                <Grid item xs={12}>
                    <span className={classes.price}>
                        Preço sugerido: <br/>{state.showUserInput? state.confirmedPrice: orderPrice}
                    </span>
                </Grid>
                <Grid item xs={12}>
                    <Button color="green" onClick={handleShowHideClick}>
                        {state.useSugestedPrice? "Alterar preço sugerido": "Utilizar preço sugerido"}
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                {inputAmount}
                {!state.showInput && !state.useSugestedPrice?<Button size="small">Clique para alterar o preço informado</Button>:null}
            </Grid>
            <Grid item xs={12}>
                <InputLabel htmlFor="standard-adornment-amount">Informe a quantidade:</InputLabel>
                <Button
                    color="green"
                    to="checkout"
                    disabled={state.quantity===1}
                    className={classes.buttonQuantity}
                    onClick={() => handleQuantity("sub")}
                >
                    <RemoveIcon />
                </Button>
                    {state.quantity}
                <Button
                    color="green"
                    to="checkout"
                    className={classes.buttonQuantity}
                    onClick={() => handleQuantity("sum")}
                >
                    <AddIcon />
                </Button>
            </Grid>
            <Grid item xs={12}>
            <Button color="green" to="checkout" className={classes.button}>
                Submeter pedido
            </Button>
            </Grid>
        </Grid>
    )
}
