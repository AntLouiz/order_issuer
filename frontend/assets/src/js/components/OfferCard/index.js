import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import OrderItemModal from '../OrderItemModal';


const useStyles = makeStyles({
  root: {
    width: "18rem",
    margin: "1rem"
  },
  media: {
    height: 140,
  },
  buttons: {
    margin: "auto"
  },
  price: {
    alignItems: "center",
    fontSize: 20,
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
        <CardContent>
            <CardMedia
              className={classes.media}
              image={offer.image_url? offer.image_url: imageDefaultUrl}
              title={offer.name}
            />
        <CardContent>
            <Typography gutterBottom>
              <span className={classes.offerName}>{offer.name}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {offer.description}
            </Typography>
            <Typography variant="body2" component="strong" className={classes.price}>
                <b>R$ {offer.price}</b>
            </Typography>
          </CardContent>
        </CardContent>
        <OrderItemModal className={classes.actions} order={offer} setAppState={props.setAppState} appState={props.appState} />
      </Card>
    )
}