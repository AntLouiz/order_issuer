import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import OrderItemModal from '../OrderItemModal';
import integerToBRL from '../../utils';


const useStyles = makeStyles({
  root: {
    width: "15rem",
    margin: "10px",
    maxHeight: "19rem"
  },
  content: {
    padding: "8px"
  },
  media: {
    height: 140,
  },
  buttons: {
    margin: "auto"
  },
  price: {
    alignItems: "center",
    fontSize: 17,
    color: "rgb(51, 51, 51)",
    fontWeight: "bold"
  },
  actions: {
    display: "inline"
  },
  offerName: {
    fontSize: "1rem"
  }
});


export default function OfferCard(props) {
    const {offer} = props
    const classes = useStyles();
    let imageDefaultUrl = '/static/images/placeholder.png'

    return (
        <Card className={classes.root}>
        <CardContent className={classes.content}>
            <CardMedia
              className={classes.media}
              image={offer.image_url? offer.image_url: imageDefaultUrl}
              title={offer.name}
            />
        <CardContent>
            <Typography gutterBottom>
              <span className={classes.offerName}>{offer.name}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="span">
              {offer.description}
            </Typography>
            <Typography variant="body2" component="strong" className={classes.price}>
                <b>{integerToBRL(offer.price)}</b>
            </Typography>
          </CardContent>
        </CardContent>
        <OrderItemModal className={classes.actions} order={offer} setAppState={props.setAppState} appState={props.appState} />
      </Card>
    )
}