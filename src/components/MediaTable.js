import React, {useContext, useEffect, useState} from 'react';
import MediaRow from './MediaRow';
import {useAllMedia} from '../hooks/ApiHooks';
import {
  GridList,
  GridListTile,
  ListSubheader,
  makeStyles,
  useMediaQuery,
  Card,
  CardHeader,
  IconButton,
  Avatar,
  CardMedia,
  CardActions,
  List,
  ListItem,
} from '@material-ui/core';
import {MoreHoriz} from '@material-ui/icons';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { red } from '@material-ui/core/colors';
import {MediaContext} from '../contexts/MediaContext';
import {getAvatarImage} from '../hooks/ApiHooks';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    /* backgroundColor: theme.palette.background.paper, */
  },
  jaa: {
    display: 'block',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    /* backgroundColor: theme.palette.background.paper, */
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  icon: {
    color: 'rgba(255, 0, 0, 0.54)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  container: {
   /*  display: 'grid', */
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    width: '100%',
    height: '100%',
  },
}));

const MediaTable = () => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:697px)');

  const picArray = useAllMedia();
/*   const userPic = useAllMedia(kuva.avatar); */

/* const [user] = useContext(MediaContext);
  const [avatar, setAvatar, kuva] = useState([]);
  // console.log(user);
  useEffect(() => {
    (async () => {
        setAvatar(await getAvatarImage(kuva.user_id));
    })();
  }, [user]);

  console.log(picArray);
 */
  return (
    <div className={classes.root}>
      <List
        cellHeight={580}
        className={classes.gridList}
        cols={matches ? 1 : 1}>
        {
          picArray.map((file) =>
            <ListItem key={file.file_id} className={classes.jaa}>

              <Card className={classes.jaa}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="user picture" className={classes.avatar}
                      /* image={mediaUrl + avatar[0].filename}
                      alt="Avatar image"
                      title="Avatar image" */
                    />
                  }
                  action={
                    <IconButton aria-label="settings">
                      <MoreHoriz />
                    </IconButton>
                  } 
                  title={file.title}
                  subheader="April 23, 2020"
                />
                
                <CardMedia  className={classes.container}>
                  <MediaRow className={classes.media} file={file}/>
                </CardMedia>
                
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="comment">
                    <ChatBubbleIcon />
                  </IconButton>
                </CardActions>
              </Card>
              
            </ListItem>)
        }
      </List>
    </div>
  );
};

export default MediaTable;
