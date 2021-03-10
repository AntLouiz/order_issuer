import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import OrderCard from '../OrderCard';


const useStyles = makeStyles((theme) => ({
  root: {
    height: 400,
    margin: "auto",
    backgroundColor: theme.palette.background.paper,
  },
}));

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem button style={style} key={index}>
      <ListItemText primary={`Pedido ${index + 1}`} />
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

export default function OrdersList() {
  const classes = useStyles();

  return (
    <Grid container xs={12} className={classes.root}>
      <Grid item xs={8}>
      <FixedSizeList height={400} width={500} itemSize={46} itemCount={200} className={classes.root}>
        {renderRow}
      </FixedSizeList>
      </Grid>
      <Grid
        item xs={4}
        alignItems="center"
        direction="row"
        justify="center"
      >
        <OrderCard />
      </Grid>
    </Grid>
  );
}