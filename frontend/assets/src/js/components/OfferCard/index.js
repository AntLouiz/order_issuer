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
    width: "12rem",
    margin: "1rem"
  },
  media: {
    height: 140,
  },
  buttons: {
    margin: "auto"
  }
});


export default function OfferCard(props) {
    const {offer} = props
    const classes = useStyles();

    return (
        <Card className={classes.root}>
        <CardActionArea>
            <CardMedia
              className={classes.media}
              image={offer.image_url}
              title={offer.name}
            />
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {offer.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {offer.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="h2">
              R$ {offer.price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <OrderItemModal order={offer} setAppState={props.setAppState} appState={props.appState} />
        </CardActions>
      </Card>
    )
}