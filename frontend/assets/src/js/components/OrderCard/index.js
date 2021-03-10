import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "1rem"
  },
  media: {
    height: 140,
  },
  buttons: {
    margin: "auto"
  }
});


export default function OrderCard(props) {
    const classes = useStyles();
    const { order } = props;

    console.log(order)

    let defaultMessage = null;

    if (!order.title) {
        defaultMessage = <h3>Clique em um pedido para ver detalhes.</h3>
    }

    let content = <div>{defaultMessage}</div>

    if (!defaultMessage) {
      content = (
          <div>
          <CardMedia
            className={classes.media}
            image={order.image_url}
            title={order.title}
          />
          <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {order.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {order.description}
              </Typography>
          </CardContent>
          </div>
        )
    }

    let cardActions = (
      <CardActions hidden={!!defaultMessage}>
        Show details
      </CardActions>
    )

    return (
        <Card className={classes.root}>
        <CardActionArea>
        {content}
        </CardActionArea>
        {defaultMessage? null: cardActions}
      </Card>
    )
}
