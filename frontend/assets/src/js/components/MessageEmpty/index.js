import React from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    emptyMessageRoot: {
        textAlign: "center",
        padding: "8rem 2rem 8rem 2rem"
    },
    emptyMessage: {
        fontSize: "2rem"
    }
}))


export default function MessageEmpty(props) {
    const classes = useStyles()
    let message = props.message

    return (
        <Grid item xs={12} className={classes.emptyMessageRoot}>
            <Grid xs={12} className={classes.emptyMessage}>{message}</Grid>
            <Grid xs={12}>
                <Link to="/">
                    <p>Continuar comprando</p>
                </Link>
            </Grid>
        </Grid>
    )
}