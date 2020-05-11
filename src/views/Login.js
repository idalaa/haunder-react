import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { backgroundImage, makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  body: {
    backgroundImage: 'url(./img/haundrlogo.png)',
  },
}));
const Login = () => {
  const classes = useStyles();
  const [toggle, setToggle] = useState(true);
  // funktio jolla setToggle true/false
  const showHide = () => {
    setToggle(!toggle);
  };
  return (
    <>
      {toggle ? (
        <LoginForm className={classes.body} />
      ) : (
        <RegisterForm className={classes.body} />
      )}
      <Button onClick={showHide}>{toggle ? 'or register' : 'or login'}</Button>
    </>
  );
};

export default Login;
