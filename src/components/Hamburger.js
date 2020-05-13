import React, {useContext} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import {MediaContext} from '../contexts/MediaContext';

const FadeMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [user] = useContext(MediaContext);

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
          to='/home'
        >
            Home
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          color='inherit'
          component={RouterLink}
          to='/search'
        >
            Search
        </MenuItem>
        {user !== null && (
          <>
            <MenuItem
              onClick={handleClose}
              color='inherit'
              component={RouterLink}
              to='/upload'
            >
            Upload
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              color='inherit'
              component={RouterLink}
              to='/groups'
            >
            My Groups
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              color='inherit'
              component={RouterLink}
              to='/profile'
            >
            Profile
            </MenuItem>
          </>
        )}
        {user === null ? (
          <MenuItem
            onClick={handleClose}
            color='inherit'
            component={RouterLink}
            to='/'
          >
          Login
          </MenuItem>
        ):(
          <MenuItem
            onClick={handleClose}
            color='inherit'
            component={RouterLink}
            to='/logout'
          >
            Logout
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default FadeMenu;
