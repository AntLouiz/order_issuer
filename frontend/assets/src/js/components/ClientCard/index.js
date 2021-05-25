import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "1rem"
  },
  media: {
    height: 140,
  },
  avatar: {
    margin: 5,
    backgroundColor: "#0188a5"
  }
});


export default function ClientCard(props) {
    const classes = useStyles();
    const { client, setClient } = props;

    let defaultMessage = null;

    let content = <div>{defaultMessage}</div>

    if (!defaultMessage) {
      content = (
          <div>
          <CardContent >
            <Grid container>
              <Grid item xs={3}>
                <Avatar className={classes.avatar} src={client.image_url}>{client.name[0]}</Avatar>
              </Grid>
              <Grid item xs={8}>
                <Typography gutterBottom variant="h5" component="h5">
                  {client.name}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          </div>
        )
    }

    return (
        <Card className={classes.root} onClick={() => setClient(client)}>
        <CardActionArea>
          {content}
        </CardActionArea>
      </Card>
    )
}
