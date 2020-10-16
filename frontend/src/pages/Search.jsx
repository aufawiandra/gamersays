import React, { useState, useEffect } from 'react';

import AppBar from '../components/AppBar';

import { useParams } from 'react-router-dom';

import {
  makeStyles,
  Container,
  Typography,
  CardMedia,
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


export default function Search() {

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [cover, setCover] = React.useState([]);
  const [year, setYear] = React.useState([]);
  const search = useParams();

  const axios = require('axios').default;

  useEffect((props) => {

    const fetchSearch = async () => {
      const response = await axios(`http://localhost:8000/search?search=${search}`);
      setData(response.data);
    };
    fetchSearch();
  }, [search]);


  useEffect(() => {
    axios.get(`http://localhost:8000/search?search=` + search.search)
      .then(res => {
        setData(res.data);

        console.log(res.data);
      })
      .catch(err => { })
  },
    []);


  console.log(search);

  return (
    <div>
      <AppBar />
      <div>
        <Container maxWidth="sm">
          <div>
            <Typography align='center' variant='h3'>
              Search result for {search.search}
            </Typography>
          </div>
        </Container>
      </div>
    </div>
  );
}

