import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Alert } from '@material-ui/lab';
import ClientCard from '../ClientCard';


let defaultState = {
    open: true,
    isLoading: false,
    errorMessage: null
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: "10%",
        left: "30%"
    },
    button: {
        width: "100%",
        backgroundColor: "red"
    }
}));

function get_fake_clients() {
    return [{name: "Obi-wan Kenobi"}, {name: "Darth Vader"}]
}

export default function ClientChooseModal(props) {
    const classes = useStyles();

    defaultState['open'] = !props.appState.client
    const [state, setState] = useState(defaultState);

    const setClient = (client) => {
        props.setAppState({...props.appState, client: client})
    }

    const handleClose = () => {
        if (props.appState.client) {
            setState({...state, open: false, isLoading: false});
        } else {
            setState({...state, errorMessage: "Selecione um dos clientes para continuar."})
        }
    };

    let clients = []
    let fakeClients = get_fake_clients()
    for (let client of fakeClients) {
        clients.push(<ClientCard client={client} setClient={setClient} />)
    }

    const body = (
        <div className={classes.paper}>
            <h2 id="simple-modal-title">Você gostaria de se identificar como:</h2>
            <p id="simple-modal-description">
                {clients}
            </p>
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