import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import OrderDetail from '../OrderDetail';

const defaultState = {
    toggleDetails: false
}

const useStyles = makeStyles((theme) => ({
    tooltip: {
        color: "#848282",
        padding: "0rem 1rem 0rem 0rem",
        textAlign: "right"
    },
    row: {
        cursor: "pointer",
        padding: "1rem",
        background: "#f7f7f7",
        borderBottom: "1px solid #cacaca",
        marginBottom: "1rem",
        '&:hover': {
            background: "#f9f9f9"
        }
    }
}));

export default function OrderCard(props) {
    const [state, setState] = useState(defaultState)
    const { order } = props
    const classes = useStyles();

    const handleClick = () => {
        setState({toggleDetails: !state.toggleDetails})
    }

    return (
        <div className={classes.row}>
            <ListItem
                key={order.id}
                onClick={handleClick}
            >
            <ListItemText
                primary={`Cod.: #${order.id}`}
            />
            <ListItemText
                primary={`Submetido em: ${order.created_at}`}
            />
            <ListItemText
                className={classes.tooltip}
                primary={'Clique para visualizar detalhes'}
            />
            </ListItem>
            {state.toggleDetails? <OrderDetail order={order}/>: null}
        </div>
    )
}