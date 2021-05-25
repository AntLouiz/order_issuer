import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';


const useStyles = makeStyles((theme) => ({
    greetings: {
        paddingTop: 5
    },
    toggle: {
        cursor: "pointer"
    },
    expandIcon: {
        position: "absolute",
        cursor: "pointer"
    },
    popper: {
        margin: "3px 0px 0px 2rem"
    },
    avatar: {
        backgroundColor: "#0188a5"
    }
}));

export default function AvatarOptions(props) {
    const {client} = props
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)
    const anchorRef = React.useRef(null)

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen)
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return
        }
        setOpen(false)
        location.reload()
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault()
            setOpen(false)
        }
    }

    function handleClickAway() {
        setOpen(false)
    }

    return (
        <Grid container>
        <Grid item xs={3}>
            <Avatar src={client.image_url} className={classes.avatar}>{client.name[0]}</Avatar>
        </Grid>
        <Grid item xs={9} className={classes.greetings}>
            <a
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                className={classes.toggle}
            >
                <strong>Olá,<br></br>{client.name}</strong>
                <ExpandMoreIcon className={classes.expandIcon} />
            </a>
            <Popper className={classes.popper} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                    <Paper>
                    <ClickAwayListener onClickAway={handleClickAway}>
                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                            <MenuItem onClick={handleClose}>Sair</MenuItem>
                        </MenuList>
                    </ClickAwayListener>
                    </Paper>
                    </Grow>
                )}
            </Popper>
        </Grid>
        </Grid>
    )
}