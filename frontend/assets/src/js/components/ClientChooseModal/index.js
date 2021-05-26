import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Alert } from '@material-ui/lab';
import { Grid } from '@material-ui/core';
import ClientCard from '../ClientCard';
import { getCurrentClientOrder } from '../../api/Orders';
import { getClients } from '../../api/Clients';
import DotLoader from '../Loader';


let defaultState = {
    open: true,
    isLoading: true,
    errorMessage: null,
    clients: []
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        borderRadius: "0.8%",
        padding: "16px 32px 24px",
        color: "#333",
        left: "50%",
        top: "50%",
        width: "800px",
        height: "400px",
        marginTop: "-220px",
        marginLeft: "-450px"
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

        setState({...state, isLoading: true})
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
            cardClients.push(<Grid item key={client.pk} xs={4}><ClientCard client={client} setClient={setClient} /></Grid>)
        }
        setState((prevState) => { return {...prevState, clients: cardClients, isLoading: false}})
    }

    if (!state.clients.length) {
        getClients(setClients)
    }

    const body = (
        <div className={classes.paper}>
            <h2 id="simple-modal-title">Você gostaria de se identificar como:</h2>
            <Grid container id="simple-modal-description">
                {state.isLoading? <DotLoader />: state.clients}
            </Grid>
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