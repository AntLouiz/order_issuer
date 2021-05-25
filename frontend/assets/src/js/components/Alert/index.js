import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(4),
    },
  },
  standardSuccess: {
    backgroundColor: "#1ccc79",
    display: "inline-flex"
  },
  message: {
    marginTop: "0px"
  },
  action: {
    marginTop: "0px"
  },
  close: {
    padding: theme.spacing(0.5),
  },
  anchorOriginTopCenter: {
    marginTop: "6rem",
    width: "auto",
    top: "24px",
    left: "50%",
    right: "auto",
    transform: "translateX(-50%)"
  }
}));

export default function Alert(props) {
  const {severity, message} = props
  const classes = useStyles();
  const [snackPack, setSnackPack] = React.useState([]);
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
    props.setAppState((prevState) => { return {...prevState, alertMessage: null}})
  }

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Snackbar
          key={severity}
          classes={classes}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          action={
            <React.Fragment>
              <IconButton
                aria-label="close"
                color="inherit"
                className={classes.close}
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </React.Fragment>
          }
        >
          <MaterialAlert
            severity={severity}
            classes={classes}
            icon={false}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleClose}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {message}
          </MaterialAlert>
        </Snackbar>
      </Collapse>
    </div>
  );
}

/*
        <MaterialAlert
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {message}
        </MaterialAlert>
*/