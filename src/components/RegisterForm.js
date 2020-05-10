import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import useSignUpForm from '../hooks/RegisterHooks';
import { checkUserAvailable, login, register } from '../hooks/ApiHooks';
import { withRouter } from 'react-router-dom';
import { MediaContext } from '../contexts/MediaContext';
import { makeStyles, Card, Button, Grid, Typography } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: '30px 20px 20px 20px',
  },
  button: {
    margin: '20px 0 0 0',
  },
}));

const RegisterForm = ({ history }) => {
  const classes = useStyles();
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useContext(MediaContext);

  const doRegister = async () => {
    try {
      // await checkUserAvailable(inputs.username);
      delete inputs.confirm;
      await register(inputs);
      // kirjaudu automaagisesti
      const userdata = await login(inputs);
      setUser(userdata.user);
      // console.log(user);
      // tallenna token
      localStorage.setItem('token', userdata.token);
      // siirry etusivulle
      history.push('/home');
    } catch (e) {
      console.log(e.message);
      // TODO: näytä virhe
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useSignUpForm(doRegister);

  useEffect(() => {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      console.log(value);
      if (value !== inputs.password) {
        return false;
      }
      return true;
    });

    ValidatorForm.addValidationRule('isAvailable', async (value) => {
      console.log(value);
      try {
        const response = await checkUserAvailable(value);
        console.log(response);
        return response.available;
      } catch (e) {
        console.log(e.message);
        return true;
      }
    });
  }, [inputs]);

  return (
    <Card className={classes.card}>
      <Grid container>
        <Grid item xs={12}>
          <Typography component='h1' variant='h2' gutterBottom>
            Register
          </Typography>
        </Grid>
        <Grid item>
          <ValidatorForm
            onSubmit={handleSubmit}
            instantValidate={false}
            noValidate
          >
            <Grid container>
              <Grid container item className={classes.button}>
                <TextValidator
                  fullWidth
                  type='text'
                  name='username'
                  label='Username'
                  onChange={handleInputChange}
                  value={inputs.username}
                  validators={['required', 'minStringLength:3', 'isAvailable']}
                  errorMessages={[
                    'this field is required',
                    'minimum 3 charaters',
                    inputs.username + ' is not available',
                  ]}
                />
              </Grid>

              <Grid container item className={classes.button}>
                <TextValidator
                  fullWidth
                  type='password'
                  name='password'
                  label='Password'
                  onChange={handleInputChange}
                  value={inputs.password}
                  validators={['minStringLength:5', 'required']}
                  errorMessages={[
                    'minimum length 5 characters',
                    'this field is required',
                  ]}
                />
              </Grid>

              <Grid container item className={classes.button}>
                <TextValidator
                  fullWidth
                  type='password'
                  name='confirm'
                  label='Confirm password'
                  onChange={handleInputChange}
                  value={inputs.confirm}
                  validators={['isPasswordMatch', 'required']}
                  errorMessages={[
                    'password mismatch',
                    'this field is required',
                  ]}
                />
              </Grid>

              <Grid container item className={classes.button}>
                <TextValidator
                  fullWidth
                  type='email'
                  name='email'
                  label='Email'
                  onChange={handleInputChange}
                  value={inputs.email}
                  validators={['required', 'isEmail']}
                  errorMessages={[
                    'this field is required',
                    'email is not valid',
                  ]}
                />
              </Grid>

              <Grid container item className={classes.button}>
                <TextValidator
                  fullWidth
                  type='text'
                  name='full_name'
                  label='Full name'
                  onChange={handleInputChange}
                  value={inputs.full_name}
                  validators={[
                    "matchRegexp:^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
                  ]}
                  errorMessages={['text only']}
                />
              </Grid>

              <Grid container item>
                <Button
                  fullWidth
                  className={classes.button}
                  color='primary'
                  type='submit'
                  variant='contained'
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </ValidatorForm>
        </Grid>
      </Grid>
    </Card>
  );
};

RegisterForm.propTypes = {
  history: PropTypes.object,
};

export default withRouter(RegisterForm);
