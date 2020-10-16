import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
  Typography,
  Avatar
} from '@material-ui/core';

// import Rating from '@material-ui/lab/Rating'

import axios from 'axios';

import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
  },
}));

export default function Review() {

  const classes = useStyles();

  const [data, setData] = React.useState([]);
  const [ review, setReview ] = React.useState([]);

  const gameId = useParams();

  useEffect((props) => {
    const fetchGameId = async () => {
      const response = await axios(`http://localhost:8000/games?id=${gameId}`);
      setData(response.data);
    };
    fetchGameId();
  }, [gameId]);

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  };

  useEffect(() => {
    axios.get('http://localhost:8000/rev/', headers)
      .then(res => {
        setReview(res.data);
      })
      .catch(err => { })
  },
    []);

  const rev = review.filter(function(item){
    return item.game===parseInt(gameId.id);
  });

  return (
    <div className={classes.root}>
      <div>
        <Avatar>A</Avatar>
      </div>
      <div className={classes.reviewDetail}>
        <Typography>
          Review by {rev.map(a => a.name)[0]}
            </Typography>
        <Typography variant='subtitle2'>
          {rev.map(a => a.detail)[0]}
        </Typography>
      </div>
    </div>
  );
}