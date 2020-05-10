import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useLoginForm from '../hooks/LoginHooks';
import { login } from '../hooks/ApiHooks';
import { withRouter } from 'react-router-dom';
import { MediaContext } from '../contexts/MediaContext';
import {
  makeStyles,
  Card,
  Button,
  TextField,
  Grid,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: '30px 20px 20px 20px',
  },
  button: {
    margin: '20px 0 0 0',
  },
}));

const LoginForm = ({ history }) => {
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();
  const [user, setUser] = useContext(MediaContext);
  const doLogin = async () => {
    try {
      const userdata = await login(inputs);
      setUser(userdata.user);
      // console.log(user);
      // tallenna token
      localStorage.setItem('token', userdata.token);
      // siirry etusivulle
      history.push('/home');
    } catch (e) {
      console.log(e.message);
      // TODO: näytä vihe
    }
  };
  const { inputs, handleInputChange, handleSubmit } = useLoginForm(doLogin);
  return (
    <Card className={classes.card}>
      <Grid container>
        <Grid item xs={12}>
          <Typography component='h1' variant='h2' gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container>
              <Grid container item>
                <TextField
                  fullWidth
                  type='text'
                  name='username'
                  label='Username'
                  onChange={handleInputChange}
                  value={inputs.username}
                />
              </Grid>

              <Grid container item>
                <TextField
                  fullWidth
                  type='password'
                  name='password'
                  label='Password'
                  onChange={handleInputChange}
                  value={inputs.password}
                />
              </Grid>

              <Grid container item margin={3}>
                <Button
                  className={classes.button}
                  fullWidth
                  color='primary'
                  type='submit'
                  variant='contained'
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Card>
  );
};

LoginForm.propTypes = {
  history: PropTypes.object,
};

export default withRouter(LoginForm);
