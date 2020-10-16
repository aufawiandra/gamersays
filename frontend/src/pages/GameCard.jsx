import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '@material-ui/core/';

import axios from 'axios';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    alignContent: 'center',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function GameCard() {

  const classes = useStyles();

  const [data, setData] = React.useState([]);
  const [cover, setCover] = React.useState([]);
  const [year, setYear] = React.useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/games?id=')
      .then(res => {
        setData(res.data.data[0]);
        setCover(res.data.cover[0]);
        setYear(res.data.year);
      }).catch(err => { })
  },
    []);

  return (
    <div>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <CardMedia
            component="img"
            alt="Logo"
            height="140"
            image={cover.url}
            title="Logo"
          />
          <Typography variant="h5" component="h2">
            {data.name}
            </Typography>
          <Typography variant="body2" component="p">
            {year}
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}
