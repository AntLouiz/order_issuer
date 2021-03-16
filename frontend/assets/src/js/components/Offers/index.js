import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OfferCard from '../OfferCard';
import Grid from '@material-ui/core/Grid';

function mocked_products() {
  return [
    {"id": 1, "description": "Lorem", "name": "Tie Fighter", "image_url": "https://bit.ly/30tP43i", "is_offer": true},
    {"id": 2, "description": "Lorem", "name": "Tie Fighter", "image_url": "https://bit.ly/30tP43i", "price": 20000},
    {"id": 3, "description": "Lorem", "name": "Tie Fighter", "image_url": "https://bit.ly/30tP43i", "price": 20000},
    {"id": 4, "description": "Lorem", "name": "Tie Fighter", "image_url": "https://bit.ly/30tP43i", "price": 20000},
    {"id": 5, "description": "Lorem", "name": "Tie Fighter", "image_url": "https://bit.ly/30tP43i", "price": 20000},
    {"id": 6, "description": "Lorem", "name": "Tie Fighter", "image_url": "https://bit.ly/30tP43i", "price": 20000},
  ]
}

export default function Offers(props) {
    const {setAppState} = props
    const products = mocked_products();
    let offers = [];

    for (let offer of products) {
      let offerCard = <OfferCard offer={offer} setAppState={setAppState}/>
      offers.push(offerCard)
    }

    return (
      <Grid container xs={9}>
        {offers}
      </Grid>
    )
}