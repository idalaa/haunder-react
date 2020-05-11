import React from 'react';
import SearchForm from '../components/SearchForm';
import {useAllMedia} from '../hooks/ApiHooks';
import {Grid, Typography} from '@material-ui/core';
import BackButton from '../components/BackButton';

const Search = () => {
  const dataArray = useAllMedia('haunderTest');
  return (
    <>
      <BackButton />

      <Grid container >
        <Grid item xs={12}>
          <Typography component='h1' variant='h4' gutterBottom>
          Search
          </Typography>
        </Grid>
        <Grid item>
          <SearchForm data = {dataArray}/>
        </Grid>
      </Grid>
    </>
  );
};


export default Search;
