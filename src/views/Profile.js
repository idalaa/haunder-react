import React, {useContext, useEffect, useState} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {
  // Card,
  // CardContent,
  // List,
  // Button,
  // ListItemAvatar,
  CardMedia,
  Typography,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Grid,
  ButtonBase,
  Avatar,
} from '@material-ui/core';
import {getAvatarImage} from '../hooks/ApiHooks';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import ProfileForm from '../components/ProfileForm';

import BackButton from '../components/BackButton';
// import {Link as RouterLink} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import MyFiles from './MyFiles';
// import AvatarForm from '../components/AvatarForm';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',

    /* maxWidth: 500, */
  },
  image: {
    width: 125,
    height: 176,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  text: {
    /* paddingLeft: '20%', */
  },
}));

const Profile = () => {
  const [user] = useContext(MediaContext);
  // console.log('user', user);
  const [avatar, setAvatar] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      if (user !== null) {
        setAvatar(await getAvatarImage(user.user_id));
      }
    })();
  }, [user]);


  return (
    console.log('ava', avatar),
    <>
      <BackButton pekka='home' />
      <Typography component='h1' variant='h2' gutterBottom>
        Profile
      </Typography>
      {user !== null && (
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            {avatar.length > 0 ? (
              console.log('MITAE', avatar),
              <Grid item>
                <ButtonBase className={classes.image}>
                  <CardMedia
                    className={classes.img}
                    component='img'
                    image={mediaUrl + avatar[0].filename}
                    alt='Avatar image'
                    title='Avatar image'
                  />
                </ButtonBase>
              </Grid>
            ):(
            <Grid item>
              <ButtonBase className={classes.image}>
                <Avatar
                  aria-label='user picture'
                  className={classes.avatar}
                />
              </ButtonBase>
            </Grid>
            )
            }
            <Grid item xs={12} sm container>
              <Grid
                item
                xs
                container
                direction='column'
                spacing={2}
                className={classes.text}
              >
                <ListItem>
                  <ListItemIcon>
                    <AccountBoxIcon />
                  </ListItemIcon>
                  <ListItemText primary={user.username} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText primary={user.email} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary={user.full_name} />
                </ListItem>
                {/* <ListItem>
                      <Button
                        color="inherit"
                        component={RouterLink}
                        to="/myfiles"
                      >
                        My files
                      </Button>
                    </ListItem> */}
                <ListItem>
                  <ProfileForm />
                </ListItem>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      )}
      <MyFiles />
    </>
  );
};


export default Profile;
