import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OfferCard from '../OfferCard';
import Grid from '@material-ui/core/Grid';
import { getProducts } from '../../api/Products';


const useStyles = makeStyles({
  root: {
    padding: "1rem"
  }
});


export default function Offers(props) {
    const {products} = props.appState
    const classes = useStyles();
    let offers = [];

    if (!products.length) {
      getProducts(props.setAppState)
    }

    for (let offer of products) {
      let offerCard = <OfferCard offer={offer} setAppState={props.setAppState} appState={props.appState}/>
      offers.push(<Grid item key={offer.id} xs={3}>{offerCard}</Grid>)
    }

    return (
      <Grid container className={classes.root}>
        {offers? offers: "Nenhum produto encontrado."}
      </Grid>
    )
}