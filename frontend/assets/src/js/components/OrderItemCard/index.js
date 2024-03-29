import React, { useState } from 'react';
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
import { removeItem } from '../../api/Orders';
import { RENTABILITY_CHOICES } from '../../api/settings';
import ButtonLoader from '../ButtonLoader';


const useStyles = makeStyles({
  root: {
    padding: "1rem",
    background: "#f7f7f7",
    border: "1px #e1dede solid",
    borderRadius: "3px",
    marginBottom: "1rem"
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
    listStyle: "none",
    padding: "2rem 0rem 0rem 2rem"
  },
});


export default function OrderItemCard(props) {
    const classes = useStyles();
    const [state, setState] = useState({isLoading: false})
    let imageDefaultUrl = '/static/images/placeholder.png'
    let order = props.order

    order['name'] = order.productItem.name
    order['image_url'] = order.productItem.image_url
    order['description'] = order.productItem.description
    order['multiple'] = order.productItem.multiple

    const handleRemove = () => {
      setState({isLoading: true})
      removeItem(props.setAppState, order)
    }

    let rentability = RENTABILITY_CHOICES[order.rentability]

    return (
      <Grid container className={classes.root}>
        <Grid item xs={3}>
          <Grid item xs={12}>
            <CardMedia
              className={classes.media}
              image={order.image_url? order.image_url: imageDefaultUrl}
              title={order.name}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
                variant="text"
                color="secondary"
                className={classes.actions}
                onClick={handleRemove}
            >
              {state.isLoading? <ButtonLoader />: null}
              Remover produto
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={3} className={classes.details}>
          <Typography gutterBottom component="h4">
            {order.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {order.description}
          </Typography>
          <Typography component="h3">
            <b>{integerToBRL(order.price)}</b>
          </Typography>
        </Grid>
        <Grid item xs={2} className={classes.details}>
            <Typography component="h3">
              <span>Quantidade:</span> <b>{order.quantity}</b>
            </Typography>
        </Grid>
        <Grid item xs={2} className={classes.details}>
            <Typography component="h3">
              <span>Rent.:</span> <b>{rentability}</b>
            </Typography>
        </Grid>
        <Grid item xs={2} className={classes.details}>
          <OrderItemModal
            className={classes.actions}
            order={order}
            setAppState={props.setAppState}
            appState={props.appState}
            modalActionText={"Editar valores"}
            isEdition={true}
          />
        </Grid>
      </Grid>
    )
}
