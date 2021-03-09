import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OfferCard from '../OfferCard';
import Grid from '@material-ui/core/Grid';

function mocked_products() {
  return [
    {"description": "Lorem", "name": "Tie Fighter", "image_url": "https://bit.ly/30tP43i"},
    {"description": "Lorem", "name": "Tie Fighter", "image_url": "https://bit.ly/30tP43i"},
    {"description": "Lorem", "name": "Tie Fighter", "image_url": "https://bit.ly/30tP43i"},
    {"description": "Lorem", "name": "Tie Fighter", "image_url": "https://bit.ly/30tP43i"},
    {"description": "Lorem", "name": "Tie Fighter", "image_url": "https://bit.ly/30tP43i"},
    {"description": "Lorem", "name": "Tie Fighter", "image_url": "https://bit.ly/30tP43i"},
  ]
}

export default function Offers() {
    const products = mocked_products();
    let offers = [];

    for (let offer of products) {
      let offerCard = <OfferCard title={offer.name}
                        description={offer.description}
                        image_url={offer.image_url}/>
      offers.push(offerCard)
    }

    return (
      <Grid container xs={9}>
        {offers}
      </Grid>
    )
}