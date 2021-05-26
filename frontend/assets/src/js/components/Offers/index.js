import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OfferCard from '../OfferCard';
import Grid from '@material-ui/core/Grid';
import { getProducts } from '../../api/Products';
import DotLoader from '../../components/Loader';


const useStyles = makeStyles({
  root: {
    padding: "1rem"
  }
});


export default function Offers(props) {
    // const [state, setState] = useState({isLoading: true})
    const {products, isLoading} = props.appState
    const classes = useStyles();
    let offers = [];
    let isOffersLoading = true;

    if (!products.length) {
      getProducts(props.setAppState)
    } else {
      isOffersLoading = false
    }

    if (isLoading) {
      isOffersLoading = true
    }

    for (let offer of products) {
      let offerCard = <OfferCard offer={offer} setAppState={props.setAppState} appState={props.appState}/>
      offers.push(<Grid item key={offer.id} xs={3}>{offerCard}</Grid>)
    }

    let body = offers? offers: "Nenhum produto encontrado."

    return (
      <Grid container className={classes.root}>
        {isOffersLoading? <DotLoader />: body}
      </Grid>
    )
}