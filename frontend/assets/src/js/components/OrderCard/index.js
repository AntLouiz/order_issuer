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
    let defaultMessage = null;

    if (!props.title) {
        defaultMessage = <h3>Clique em um pedido para ver detalhes.</h3>
    }

    let CardContent = <div>{defaultMessage}</div>

    if (!defaultMessage) {
        CardContent = (
          <div>
          <CardMedia
            className={classes.media}
            image={props.image_url}
            title={props.title}
          />
          <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {props.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.description}
              </Typography>
          </CardContent>
          </div>
        )
    }

    let cardActions = (
      <CardActions hidden={!!defaultMessage}>
        <Button size="medium" color="secondary" className={classes.buttons}>
          Fazer pedido
        </Button>
        <Button size="small" color="primary" className={classes.buttons}>
          Saber mais
        </Button>
      </CardActions>
    )

    return (
        <Card className={classes.root}>
        <CardActionArea>
        {CardContent}
        </CardActionArea>
        {defaultMessage? null: cardActions}
      </Card>
    )
}
