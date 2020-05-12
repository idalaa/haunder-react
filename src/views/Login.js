import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { makeStyles, Button } from '@material-ui/core';
// import '../index.css';
import styled from 'styled-components';

const StyledBody = styled.div`
  background: url('./img/puppybg.png');
  background-size: cover;
`;

const useStyles = makeStyles({
  root: {
    background:
      'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%) no-repeat center center fixed',
    height: '100vh',
  },
});

const Login = () => {
  const classes = useStyles();
  const [toggle, setToggle] = useState(true);
  // funktio jolla setToggle true/false
  const showHide = () => {
    setToggle(!toggle);
  };
  return (
    <div className={classes.root}>
      {/* <StyledBody> */}
      {toggle ? <LoginForm /> : <RegisterForm />}
      <Button onClick={showHide}>{toggle ? 'or register' : 'or login'}</Button>
      {/* </StyledBody> */}
    </div>
  );
};

export default Login;
