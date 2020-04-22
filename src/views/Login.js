import React, {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Button} from '@material-ui/core';

const Login = () => {
  const [toggle, setToggle] = useState(true);
  // funktio jolla setToggle true/false
  const showHide = () => {
    setToggle(!toggle);
  };
  return (
    <>
      {toggle ?
        <LoginForm/> :
        <RegisterForm/>
      }
      <Button onClick={showHide}>{toggle ? 'or register' : 'or login'}</Button>
    </>
  );
};

export default Login;
