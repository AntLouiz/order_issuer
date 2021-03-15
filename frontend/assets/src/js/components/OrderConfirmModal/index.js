import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';


let defaultState = {
  open: false,
  isLoading: false
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: "30%",
        left: "30%"
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
            history.push('/')
        }, 800)
    }, 1000);
}

export default function OrderConfirmModal(props) {
    const {openButtonText} = props
    const [message, setMessage] = useState("Processando pedido...")
    let history = useHistory()

    const classes = useStyles();
    const [state, setState] = useState(defaultState);

    const handleOpen = () => {
        setState({...state, open: true, isLoading: true});
        fakeRequest(() => setMessage("Item adicionado à cesta."), history)
    };

    const handleClose = () => {
       setState({...state, open: false, isLoading: false});
    };

    const body = (
        <div className={classes.paper}>
            <strong id="simple-modal-title">{message}</strong>
        </div>
    );

    return (
    <div>
        <Button color="green" className={classes.button} onClick={handleOpen}>
            {openButtonText}
        </Button>
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
