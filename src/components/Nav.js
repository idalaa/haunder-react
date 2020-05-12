import React, {useContext, useEffect} from 'react';
import {Link as RouterLink, useLocation} from 'react-router-dom';
import {checkToken} from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {MediaContext} from '../contexts/MediaContext';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  makeStyles,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SearchIcon from '@material-ui/icons/Search';
import FadeMenu from './Hamburger';

const useStyles = makeStyles((theme) => ({
  root: {
    /* flexGrow: 1, */
    width: '100%',
    position: 'fixed',
    bottom: 0,
    zIndex: 1,
    left: 1,
    borderTop: '1px solid #bf360c',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    justifyContent: 'space-around',
    /* paddingLeft: '43%', */
  },
  logo: {
    minWidth: '10px',
    maxWidth: '168px',
  },
}));

const Nav = ({history}) => {
  const classes = useStyles();
  const [user, setUser, value, setValue] = useContext(MediaContext);
  // eslint-disable-next-line
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (opener) => () => {
    setOpen(opener);
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userdata = await checkToken(localStorage.getItem('token'));
        console.log(userdata);
        setUser(userdata);
      } catch (e) {
        // send to login
        history.push('/');
      }
    };
    checkUser();
  }, [history, setUser]);

  const location = useLocation();
  useEffect(() => {
    const loc = location.pathname.substr(1);
    console.log(location.pathname);
    setValue(loc);
  }, [location, setValue]);

  // eslint-disable-next-line no-unused-vars
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            onClick={toggleDrawer(true)}
          >
            {/* <MenuIcon /> */}
            <FadeMenu />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            HAUNDER
          </Typography>
        </Toolbar>
      </AppBar>

      {user !== null && (
        <BottomNavigation
          value={value}
          /*  onChange={handleChange}  */
          className={classes.root}
        >
          <BottomNavigationAction
            className={classes.logo}
            label='Home'
            value='home'
            icon={<HomeIcon />}
            component={RouterLink}
            to='/home'
          />
          <BottomNavigationAction
            className={classes.logo}
            label='Search'
            value='search'
            icon={<SearchIcon />}
            component={RouterLink}
            to='/search'
          />
          <BottomNavigationAction
            className={classes.logo}
            label='Upload'
            value='upload'
            icon={<AddCircleOutlineIcon />}
            component={RouterLink}
            to='/upload'
          />
          <BottomNavigationAction
            className={classes.logo}
            label='Favorites'
            value='favorites'
            icon={<FavoriteIcon />}
            component={RouterLink}
            to='/favourite'
          />
          <BottomNavigationAction
            className={classes.logo}
            label='Profile'
            value='profile'
            icon={<AccountBoxIcon />}
            component={RouterLink}
            to='/profile'
          />
        </BottomNavigation>
      )}
    </>
  );
};

Nav.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Nav);
