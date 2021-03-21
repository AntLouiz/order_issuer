import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Alert } from '@material-ui/lab';
import ClientCard from '../ClientCard';
import { getCurrentClientOrder } from '../../api/Orders';
import { getClients } from '../../api/Clients';


let defaultState = {
    open: true,
    isLoading: false,
    errorMessage: null,
    clients: []
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: "2%",
        left: "30%"
    },
    button: {
        width: "100%",
        backgroundColor: "red"
    }
}));


export default function ClientChooseModal(props) {
    const classes = useStyles();

    defaultState['open'] = !props.appState.client
    const [state, setState] = useState(defaultState);

    const setClient = (client) => {
        const handler = () => setState({...state, open: false, isLoading: false})
        const handlerError = handler
        getCurrentClientOrder(props.setAppState, client.pk, handler, handlerError)
        props.setAppState({...props.appState, client: client})
    }

    const handleClose = () => {
        if (props.appState.client) {
            getCurrentClientOrder(props.setAppState, props.appState.client.pk, handler, handlerError)
        } else {
            setState({...state, errorMessage: "Selecione um dos clientes para continuar."})
        }
    };

    const setClients = (clients) => {
        let cardClients = []
        for (let client of clients) {
            cardClients.push(<ClientCard key={client.pk} client={client} setClient={setClient} />)
        }
        setState((prevState) => { return {...prevState, clients: cardClients}})
    }

    if (!state.clients.length) {
        getClients(setClients)
    }

    const body = (
        <div className={classes.paper}>
            <h2 id="simple-modal-title">Você gostaria de se identificar como:</h2>
            <div id="simple-modal-description">
                {state.clients}
            </div>
            {state.errorMessage &&
                <Alert variant="filled" severity="error">{state.errorMessage}</Alert>
            }
        </div>
    );

    return (
    <div>
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