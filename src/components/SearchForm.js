import React, {useState, useEffect} from 'react';
import MediaRow from './MediaRow';

import {
  Grid,
  Typography,
  List,
  ListItem,
  TextField,
  Card,
} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  text: {
    paddingBottom: '20px',
  },
  card: {
    padding: '30px 20px 20px 20px',
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
    <>
      <Card className={classes.card}>
        <Grid container>
          <Grid item xs={12}>
            <Typography component='h1' variant='h4' gutterBottom>
      Search
            </Typography>
          </Grid>
          <Grid item>
            <Grid item className={classes.text} >
              <TextField
                fullWidth
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </Card>
      <List>
        {searchResults.map((item) => (
          <ListItem key={item.file_id}>
            <MediaRow file ={item} size={'w320'}/>
            {console.log('id', item.file_id)}
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default SearchForm;

