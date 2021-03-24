import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
    footer: {
        padding: "5rem",
        backgroundColor: "#eaeaea",
        textAlign: "center",
        boxShadow: "7px 0px 4px 4px rgba(0,0,0,0.1)"
    }
}));

export default function Footer() {
    const classes = useStyles()
    let date = new Date();
    let currentYear = date.getFullYear(); 
    return (
        <footer className={classes.footer}>
            <small>&copy; Copyright {currentYear} Galactic Republic. All Rights Reserved</small>
        </footer>
        
    )
}