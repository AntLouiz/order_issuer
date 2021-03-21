import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';


const useStyles = makeStyles((theme) => ({
  root: {
    height: 400,
    margin: "auto",
    backgroundColor: theme.palette.background.paper,
  },
}));

function renderRow(props) {
  const { index, style, data } = props;

  let rowData = {"title": index, "description": "Lorem"}
  console.log(rowData)

  return (
    <ListItem button style={style} key={index} onClick={() => data.handleItemClick(rowData)}>
      <ListItemText primary={`Pedido ${index + 1}`}/>
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

export default function OrdersList({handleItemClick}) {
  const classes = useStyles();

  return (
    <FixedSizeList
      height={400}
      width={500}
      itemSize={46}
      itemCount={200}
      className={classes.root}
      itemData={{handleItemClick: handleItemClick}}
    >
      {renderRow}
    </FixedSizeList>
  )
}