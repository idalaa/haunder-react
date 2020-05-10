import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

const FadeMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <MenuIcon
        aria-controls='fade-menu'
        aria-haspopup='true'
        onClick={handleClick}
      ></MenuIcon>
      <Menu
        id='fade-menu'
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={handleClose}
          color='inherit'
          component={RouterLink}
          to='/profile'
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          onClick={handleClose}
          color='inherit'
          component={RouterLink}
          to='/groups'
        >
          My Groups
        </MenuItem>
      </Menu>
    </div>
  );
};

export default FadeMenu;
