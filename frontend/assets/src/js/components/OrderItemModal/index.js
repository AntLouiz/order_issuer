import React, { useState } from 'react';
import CloseIcon from '@material-ui/icons/Close';
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
        margin: "5rem",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: "2rem",
    },
    button: {
        width: "100%",
        backgroundColor: "#5f41b5",
        borderRadius: 0,
        "&:hover": {
            backgroundColor: "#342364"
        }
    },
    editButton: {
        width: "100%",
        backgroundColor: "#0188a5",
        borderRadius: 0,
        "&:hover": {
            backgroundColor: "#0188a5"
        }
    },
    loading: {
        margin: "auto",
        height: "100%",
        padding: 10,
        backgroundColor: 'blue',
        fontSize: 30,
        fontWeight: 600
    },
    image: {
        width: "20rem"
    },
    product: {
        textAlign: "center"
    },
    close: {
        position: "absolute",
        right: "1rem"
    }
}));

export default function OrderItemModal(props) {
    const {order} = props
    const classes = useStyles();
    const [state, setState] = useState(defaultState);
    let imageDefaultUrl = '/static/images/placeholder.png'

    const handleOpen = () => {
        setState({...state, open: true});
    };

    const handleClose = () => {
      setState({...state, open: false});
    };

    const handleSubmit = (product, postHandler) => {
        let item = {...product, product: product.id}
        if (!props.appState.currentOrder.pk) {
            postOrder(props.setAppState, props.appState.client.pk, item)
            setState({...state, open: false})
            postHandler()
            return
        }

        const handler = () => {
            setState({...state, open: false});
        }

        item['order'] = props.appState.currentOrder.pk

        if (props.isEdition) {
            item = {...product, product: product.product}
            updateItem(props.setAppState, item, handler, postHandler)
        } else {
            postItem(props.setAppState, item, handler, postHandler)
        }
    }

    const orderPricing = (
        <OrderPricing order={order} handleSubmit={handleSubmit} isEdition={props.isEdition}/>
    )

    const body = (
        <div className={classes.paper}>
            <Grid container>
                <Grid item xs={12} className={classes.close}>
                    <Button
                        onClick={handleClose}
                        startIcon={<CloseIcon />}
                    />
                </Grid>
                <Grid item xs={6} className={classes.product}>
                    <h2 id="simple-modal-title">{order.name}</h2>
                    <img src={order.image_url?order.image_url:imageDefaultUrl} className={classes.image}></img>
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
            <Button
                variant="contained"
                color="secondary"
                className={props.isEdition?classes.editButton: classes.button}
                onClick={handleOpen}
            >
                {props.modalActionText}
            </Button>
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
