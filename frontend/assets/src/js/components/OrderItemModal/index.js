import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import OrderPricing from '../OrderPricing';
import { Grid } from '@material-ui/core';


let defaultState = {
  open: false
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        margin: "10rem",
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    button: {
        width: "100%",
        backgroundColor: "red"
    },
    loading: {
        margin: "auto",
        height: "100%",
        padding: 10,
        backgroundColor: 'blue',
        fontSize: 30,
        fontWeight: 600
    }
}));

export default function OrderItemModal(props) {
    const {order} = props
    const classes = useStyles();
    const [state, setState] = useState(defaultState);

    const handleOpen = () => {
        setState({...state, open: true});
    };

    const handleClose = () => {
      setState({...state, open: false});
    };

    const handleSubmit = (item) => {
        setTimeout(() => {
            setTimeout(() => {
                let newMessage = {severity: "success", message: "Item adicionado na sacola"}
                props.setAppState((prevState) => {
                    let order = prevState.currentOrder
                    if (props.isEdition) {
                        order.items.forEach((element, index) => {
                            if (element.id == item.id) {
                                order.items[index] = item
                                newMessage['severity'] = "info"
                                newMessage['message'] = "Item atualizado com sucesso"
                            }
                        })
                    } else {
                        order.items.push(item);
                    }
                    return {...prevState, alertMessage: newMessage, currentOrder: order}
                })
                setState({...state, open: false});
            }, 800)
        }, 1000);
    }

    const orderPricing = (
        <OrderPricing order={order} handleSubmit={handleSubmit} isEdition={props.isEdition}/>
    )

    const body = (
        <div className={classes.paper}>
            <Grid container xs={12}>
                <Grid item xs={6}>
                    <h2 id="simple-modal-title">{order.name}</h2>
                    <p id="simple-modal-description">
                        {order.description}
                    </p>
                </Grid>
                <Grid item xs={6}>
                    {orderPricing}
                </Grid>
            </Grid>
        </div>
    );

    let modalAction = (
        <IconButton aria-label="add to favorites" onClick={handleOpen}>
            <LocalMallIcon />
        </IconButton>
    )
    if (props.modalActionText) {
        modalAction = (
            <Button onClick={handleOpen}>{props.modalActionText}</Button>
        )
    }

    return (
    <div>
        {modalAction}
        <Modal
            open={state.open}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
    </div>
    );
}
