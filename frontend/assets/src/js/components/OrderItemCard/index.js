import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import OrderItemModal from '../../components/OrderItemModal'
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import integerToBRL from '../../utils';


const useStyles = makeStyles({
  root: {
    width: "15rem",
    margin: "10px",
    maxHeight: "19rem"
  },
  media: {
    height: 140,
  },
  buttons: {
    margin: "auto"
  },
  actions: {
    display: "inline",
    width: "100%"
  },
  details: {
    alignItems: "center",
    fontSize: 18,
    color: "rgb(51, 51, 51)",
    fontWeight: "bold",
    listStyle: "none"
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

    const handleRemove = () => {
      console.log("Remove item")
    }

    return (
      <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={order.image_url? order.image_url: imageDefaultUrl}
                  title={order.name}
                />
            <CardContent>
            <Typography gutterBottom component="h4">
              {order.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {order.description}
            </Typography>
            <Typography component="ul" color="textSecondary">
              <Typography component="li" className={classes.details}>
                {integerToBRL(order.price)}
              </Typography>
              <Typography component="li" className={classes.details}>
                Qtd: {order.quantity}
              </Typography>
            </Typography>
          </CardContent>
          <Grid container xs={12}>
            <Grid item xs={6}>
              <OrderItemModal className={classes.actions} order={order} setAppState={props.setAppState} appState={props.appState} modalActionText={"Editar item"} isEdition={true}/>
            </Grid>
            <Grid item xs={6}>
              <Button
                  variant="contained"
                  color="secondary"
                  className={classes.actions}
                  onClick={handleRemove}
              >
                  Remover
              </Button>
            </Grid>
          </Grid>
          </CardActionArea>
      </Card>
    )
}
