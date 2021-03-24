import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { getProducts } from '../../api/Products';
import { debounce } from "lodash";

const useStyles = makeStyles((theme) => ({
    root: {
        background: "white"
    },
    search: {
        bottom: "1rem",
        width: "90%",
        height: "5px",
        "& input": {
            background: "white",
            borderRadius: "inherit"
        }
    },
    input: {
        padding: "10.5px 14px",
        background: "white"
    }
}));

export default function ProductsSearch(props) {
    const classes = useStyles();
    const handler = useCallback(debounce(getProducts, 250), []);

    const handleChange = (event) => {
        let searchText = event.target.value
        handler(props.setAppState, searchText)
    }

    return (
        <div>
            <TextField
                onChange={handleChange}
                placeholder="O que você está procurando?"
                variant="outlined"
                className={classes.search}
            />
        </div>
    )
}