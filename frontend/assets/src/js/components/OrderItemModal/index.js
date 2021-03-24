import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import OrderPricing from '../OrderPricing';
import { Grid } from '@material-ui/core';
import { postOrder, postItem, updateItem } from '../../api/Orders';


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
        backgroundColor: "#21349d",
        borderRadius: 0,
        "&:hover": {
            backgroundColor: "#141d4d"
        }
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

    const handleSubmit = (product) => {
        let item = {...product, product: product.id}
        if (!props.appState.currentOrder.pk) {
            postOrder(props.setAppState, props.appState.client.pk, item)
            setState({...state, open: false});
            return
        }

        const handler = () => {
            setState({...state, open: false});
        }

        item['order'] = props.appState.currentOrder.pk

        if (props.isEdition) {
            item = {...product, product: product.product}
            updateItem(props.setAppState, item, handler)
        } else {
            postItem(props.setAppState, item, handler)
        }
    }

    const orderPricing = (
        <OrderPricing order={order} handleSubmit={handleSubmit} isEdition={props.isEdition}/>
    )

    const body = (
        <div className={classes.paper}>
            <Grid container>
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
        <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={handleOpen}
            startIcon={<LocalMallIcon />}
        >
            Fazer pedido
        </Button>
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
