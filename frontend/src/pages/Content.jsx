import React, {useState, useEffect} from 'react'
import GameCard from './GameCard'
import { Grid, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}))

export default function Content() {

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/games?&')
            .then(res => {
                setData(res.data);
                console.log(res.data);
            })
            .catch(err => { })
    },
        []);

    return (
        <div>
            <Typography>
                New Games
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <GameCard />
                </Grid>
                <Grid item xs={4}>
                    <GameCard />
                </Grid>
                <Grid item xs={4}>
                    <GameCard />
                </Grid>
            </Grid>
            <Typography>
                Popular Games
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <GameCard />
                </Grid>
                <Grid item xs={4}>
                    <GameCard />
                </Grid>
                <Grid item xs={4}>
                    <GameCard />
                </Grid>
            </Grid>
        </div>
    )
}