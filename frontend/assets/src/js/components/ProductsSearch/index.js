import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { getProducts } from '../../api/Products';
import { debounce } from "lodash";

const useStyles = makeStyles((theme) => ({
    search: {
        width: "90%",
        height: "5px",
    },
    input: {
        padding: "10.5px 14px"
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
                placeholder="busque aqui seu produto"
                variant="outlined"
                className={classes.search}
            />
        </div>
    )
}