import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { makeStyles, Button } from '@material-ui/core';
import '../index.css';
import styled from 'styled-components';

const Login = () => {
  const [toggle, setToggle] = useState(true);
  // funktio jolla setToggle true/false
  const showHide = () => {
    setToggle(!toggle);
  };
  return (
    <>
      {toggle ? <LoginForm /> : <RegisterForm />}
      <Button onClick={showHide}>{toggle ? 'or register' : 'or login'}</Button>
    </>
  );
};

export default Login;
