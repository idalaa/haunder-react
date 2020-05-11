import React, {useState, useEffect} from 'react';
import MediaRow from './MediaRow';

import {
  Button,
  Grid,
  CircularProgress,
  Slider,
  Typography,
  List,
  ListItem,
  GridList,
  TextField,
} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import BackButton from '../components/BackButton';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  text: {
    paddingBottom: '20px',
  },
}));

const SearchForm = (data) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    const results = data.data.filter((result) =>
      (result.description).toLowerCase().includes(searchTerm),
    );
    console.log('results', results);
    setSearchResults(results);
  }, [searchTerm]);
  return (
    <Grid item className={classes.text} >
      <TextField
        fullWidth
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <List>
        {searchResults.map((item) => (
          <ListItem key={item.file_id}>
            <MediaRow file ={item}/>
            {console.log('id', item.file_id)}
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export default SearchForm;

