import React, { useState, useEffect } from 'react';

import AppBar from '../components/AppBar';
import Review from '../components/Review';

import { useParams } from 'react-router-dom';

import {
  makeStyles,
  Container,
  Typography,
  CardMedia,
  Button,
  Divider,
  TextField,
} from '@material-ui/core';

import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: "240px",
    height: "345px",
  },
  imageBox: {
    alignItems: 'center',
  },
  rating: {
    display: 'flex',
    flexDirection: 'column',
    '& > * + *': {
      marginTop: theme.spacing(1),
    },
    alignItems: 'center'
  }
}));

export default function Games() {

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [cover, setCover] = React.useState([]);
  const [year, setYear] = React.useState([]);
  const gameId = useParams();

  const axios = require('axios').default;

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = (event) => {
    if (event.target.name === 'name') {
      setDetails({ ...details, name: event.target.value });
    } else if (event.target.name === 'detail') {
      setDetails({ ...details, detail: event.target.value });
    }
  }

  useEffect((props) => {
    const fetchGameId = async () => {
      const response = await axios(`http://localhost:8000/games?id=${gameId}`);
      setData(response.data);
    };
    fetchGameId();
  }, [gameId]);

  const [details, setDetails] = React.useState({ name: '', game: gameId.id, detail: '', stars: 2.5 });

  useEffect(() => {
    axios.get(`http://localhost:8000/games?id=` + gameId.id)
      .then(res => {
        setData(res.data.data[0]);
        setCover(res.data.cover[0]);
        setYear(res.data.year);
      })
      .catch(err => { })
  },
    []);


  function submitReview(event) {
    // console.log(details);
    event.preventDefault();
    axios.post('http://localhost:8000/rev/', details)
      .then((result) => {console.log(result.status)})
      .catch(err => console.log(err));
      // this.setDetails({details: ''});
  }

  // console.log(details);

  return (
    <div>
      <AppBar />
      <div>
        <Container maxWidth="sm">
          <div>
            <Typography align='center' variant='h3'>
              {data.name} <br />
              {year} <br /> 
              {/* by Company */}
          </Typography>
            <div className={classes.imageBox}>
              <CardMedia
                className={classes.image}
                component="img"
                image={cover.url}
              />
            </div>
            <Typography>
              {data.summary}
            </Typography>

            <form onSubmit={submitReview}>
              
              <TextField 
                  margin="dense"
                  id="filled-multiline-static"
                  label="Write a your name"
                  type="text"
                  size='small'
                  onChange={handleChange}
                  name='name'
                  value={details.name}
              />
              <br/>
              <TextField 
                  margin="dense"
                  id="filled-multiline-static"
                  label="Write details"
                  type="text"
                  size='small'
                  onChange={handleChange}
                  name='detail'
                  value={details.detail}
              />

              <br></br>
            
              <Button variant="outlined" color="primary" type='submit'>
              Submit a Review
          </Button>
              
            </form>
          
            <Typography>
              REVIEWS
                </Typography>
            <Divider />
            <Review />
          </div>
        </Container>
      </div>
    </div>
  );
}

