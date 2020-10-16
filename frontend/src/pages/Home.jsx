import React, { useEffect, useState } from 'react';
import Content from './Content';
import AppBar from './../components/AppBar'
import axios from 'axios';
import { Container } from '@material-ui/core';

function Home() {

  const [data, setData] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:8000/rev/')
      .then(res => {
        setData(res.data);
      })
      .catch(err => { })
  },
    []);

  return (
    <div>
      <AppBar />
      <Container>
      {/* <Content /> */}
      </Container>
    </div>
  );

}

export default Home;