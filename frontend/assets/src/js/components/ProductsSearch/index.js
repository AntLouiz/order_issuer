import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    search: {
        width: "90%",
        height: "5px",
    },
    input: {
        padding: "10.5px 14px"
    }
}));

export default function ProductsSearch() {
    const classes = useStyles();

    return (
        <div>
            <TextField
                placeholder="busque aqui seu produto"
                variant="outlined"
                className={classes.search}
            />
        </div>
    )
}