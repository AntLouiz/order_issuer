import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import OrderItemModal from '../../components/OrderItemModal'
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import integerToBRL from '../../utils';


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
  actions: {
    display: "inline"
  },
  price: {
    alignItems: "center",
    fontSize: 20,
    color: "rgb(51, 51, 51)",
    fontWeight: "bold"
  },
});


export default function OrderItemCard(props) {
    const classes = useStyles();
    let imageDefaultUrl = '/static/images/placeholder.png'
    let order = props.order

    order['name'] = order.productItem.name
    order['image_url'] = order.productItem.image_url
    order['description'] = order.productItem.description
    order['multiple'] = order.productItem.multiple

    return (
      <Card className={classes.root}>
        <CardActionArea>
            <CardMedia
              className={classes.media}
              image={order.image_url? order.image_url: imageDefaultUrl}
              title={order.name}
            />
        <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {order.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {order.description}
            </Typography>
            <Typography component="h2" className={classes.price}>
              {integerToBRL(order.price)}
            </Typography>
          </CardContent>
          <OrderItemModal className={classes.actions} order={order} setAppState={props.setAppState} appState={props.appState} modalActionText={"Editar item"} isEdition={true}/>
        </CardActionArea>
      </Card>
    )
}
