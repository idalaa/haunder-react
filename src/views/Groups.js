import React, { useContext, useEffect, useState } from 'react';
import { MediaContext } from '../contexts/MediaContext';
import {
  Typography,
  ListItem,
  Grid,
  ButtonBase,
  Avatar,
} from '@material-ui/core';
import { getAvatarImage } from '../hooks/ApiHooks';
import CreateGroup from './CreateGroup';
import BackButton from '../components/BackButton';
// import {Link as RouterLink} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MyGroups from './MyGroups';
// import AvatarForm from '../components/AvatarForm';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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

const Groups = () => {
  const [user] = useContext(MediaContext);
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
    <>
      <BackButton pekka='home' />
      <MyGroups />
      {user !== null && (
        <>
          <Grid container spacing={2}></Grid>
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
                <CreateGroup />
              </ListItem>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default Groups;
