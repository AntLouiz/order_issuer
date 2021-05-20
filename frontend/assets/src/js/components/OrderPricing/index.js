import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import OrderConfirmModal from '../OrderConfirmModal';
import integerToBRL from '../../utils';


const useStyles = makeStyles((theme) => ({
    root: {
        margin: "auto",
        height: "100%",
        padding: 10
    },
    price: {
        fontSize: 25,
        fontWeight: 600
    },
    button: {
        width: "100%",
        color: "white",
        backgroundColor: "#21349d",
        borderRadius: 0,
        "&:hover": {
            backgroundColor: "#141d4d"
        }
    },
    buttonQuantity: {
        width: 80
    },
    subtotal: {
        textAlign: "right",
        fontSize: 18,
        fontWeight: "bold",
        margin: 10,
        paddingBottom: "1rem",
        paddingTop: "3rem"
    },
    quantity: {
        paddingTop: "3rem"
    }
}));


function convertPrice(price) {
    return price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
}


export default function OrderPricing(props) {
    const {order, handleSubmit} = props

    let orderPrice = order.price
    let defaultState = {
        price: null,
        showInput: false,
        showUserInput: false,
        confirmedPrice: orderPrice,
        sugestedPrice: orderPrice,
        useSugestedPrice: true,
        quantity: order.multiple? order.multiple: 1,
        inputError: false,
        multiple: order.multiple? order.multiple: 1,
        subtotal: order.multiple?order.multiple * order.price: order.price
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
        confirmedPrice = confirmedPrice
        let subtotal = state.quantity * confirmedPrice
        setState({...state, confirmedPrice: confirmedPrice, subtotal: subtotal, showInput: showInput})
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
            let subtotal = quantity * state.confirmedPrice
            setState({...state, quantity: quantity, subtotal: subtotal})
        } else {
            if (state.quantity > state.multiple) {
                let quantity =  state.quantity - state.multiple
                let subtotal = quantity * state.confirmedPrice
                setState({...state, quantity: quantity, subtotal: subtotal})
            }
        }
    }

    const handleItemSubmit = () => {
        let item = {
            ...order,
            quantity: state.quantity,
            price: state.confirmedPrice
        }

        handleSubmit(item)
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
                    type="number"
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
            <Grid container>
                <Grid item xs={12}>
                    <span className={classes.price}>
                        Preço sugerido: <br/>{state.showUserInput? integerToBRL(state.confirmedPrice): integerToBRL(orderPrice)}
                    </span>
                </Grid>
                <Grid item xs={12}>
                    <Button color="default" onClick={handleShowHideClick}>
                        {state.useSugestedPrice? "Alterar preço sugerido": "Utilizar preço sugerido"}
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                {inputAmount}
                {!state.showInput && !state.useSugestedPrice?<Button size="small">Clique para alterar o preço informado</Button>:null}
            </Grid>
            <Grid item xs={12} className={classes.quantity}>
                <InputLabel htmlFor="standard-adornment-amount">Informe a quantidade:</InputLabel>
                <Button
                    color="default"
                    to="checkout"
                    disabled={state.quantity===state.multiple}
                    className={classes.buttonQuantity}
                    onClick={() => handleQuantity("sub")}
                >
                    <RemoveIcon />
                </Button>
                    {state.quantity}
                <Button
                    color="default"
                    to="checkout"
                    className={classes.buttonQuantity}
                    onClick={() => handleQuantity("sum")}
                >
                    <AddIcon />
                </Button>
            </Grid>
            <Grid
                item
                xs={12}
                className={classes.subtotal}
            >
                <hr></hr>
                <span>Subtotal: {integerToBRL(state.subtotal)}</span>
            </Grid>
            <Grid item xs={12}>
            <Button color="default" className={classes.button} onClick={handleItemSubmit}>
                {props.isEdition? "Atualizar item": "Adicionar item na sacola"}
            </Button>
            </Grid>
        </Grid>
    )
}
