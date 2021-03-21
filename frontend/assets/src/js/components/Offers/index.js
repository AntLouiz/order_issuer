import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OfferCard from '../OfferCard';
import Grid from '@material-ui/core/Grid';
import { getProducts } from '../../api/Products';


export default function Offers(props) {
    const {products} = props.appState
    let offers = [];

    if (!products.length) {
      getProducts(props.setAppState)
    }

    for (let offer of products) {
      let offerCard = <OfferCard offer={offer} setAppState={props.setAppState} appState={props.appState}/>
      offers.push(offerCard)
    }

    return (
      <Grid container xs={9}>
        {offers}
      </Grid>
    )
}