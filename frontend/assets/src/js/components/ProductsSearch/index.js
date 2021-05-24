import React, { useCallback, useState } from 'react';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory, useLocation } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { getProducts } from '../../api/Products';
import { debounce } from "lodash";

const defaultState = {searchText: ""}

const useStyles = makeStyles((theme) => ({
    root: {
        background: "white",
    },
    search: {
        bottom: "1rem",
        width: "90%",
        height: "5px",
        background: "white",
        "& input": {
            background: "white",
            borderRadius: "inherit"
        }
    },
    input: {
        padding: "10.5px 14px",
        background: "white"
    },
    adornment: {
        background: "white",
        width: "90%"
    },
    searchIcon: {
        pointerEvents: "none"
    }
}));

export default function ProductsSearch(props) {
    const classes = useStyles()
    const [state, setState] = useState(defaultState)
    const handler = useCallback(debounce(getProducts, 250), [])
    const location = useLocation()
    const history = useHistory()

    const handleChange = (event) => {
        let searchText = event.target.value
        if (location.pathname != '/') {
            history.push('/')
        }

        setState({searchText: searchText})

        handler(props.setAppState, searchText)
    }

    const clearInput = () => {
        let mockedEvent = {target: {value: ""}}
        handleChange(mockedEvent)
    }

    let inputProps = {"endAdornment": (
        <InputAdornment>
            <IconButton
                onClick={clearInput}
                className={state.searchText? null: classes.searchIcon}
            >
                {state.searchText?<CloseIcon/>:<SearchIcon/>}
            </IconButton>
        </InputAdornment>
    )}

    return (
        <div>
            <TextField
                onChange={handleChange}
                placeholder="O que você está procurando?"
                variant="outlined"
                value={state.searchText}
                className={classes.search}
                InputProps={inputProps}
                className={classes.adornment}
            />
        </div>
    )
}