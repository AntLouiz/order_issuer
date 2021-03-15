import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import OrderPricing from '../OrderPricing';
import { Grid } from '@material-ui/core';


let defaultState = {
  open: false,
  isLoading: false
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
    }
}));

function fakeRequest(handler, history) {
    setTimeout(() => {
        handler()
        setTimeout(() => {
            history.push("my-orders")
        }, 800)
    }, 1000);
}

export default function OrderItemModal(props) {
    const {order} = props

    const classes = useStyles();
    const [state, setState] = useState(defaultState);

    const handleOpen = () => {
        setState({...state, open: true});
    };

    const handleClose = () => {
      setState({...state, open: false, isLoading: false});
    };

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
                    <OrderPricing order={order} />
                </Grid>
            </Grid>
        </div>
    );

    return (
    <div>
        <IconButton aria-label="add to favorites" onClick={handleOpen}>
            <LocalMallIcon />
        </IconButton>
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
