import React from // useContext, useEffect, useState
'react';
import MediaRow from './MediaRow';
import { useAllMedia } from '../hooks/ApiHooks';
// import {MediaContext} from '../contexts/MediaContext';
// import {getAvatarImage} from '../hooks/ApiHooks';

import {
  // GridList,
  // GridListTile,
  // ListSubheader,
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
  CardContent,
  Typography,
} from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import { red } from '@material-ui/core/colors';

// import {MediaContext} from '../contexts/MediaContext';
// import {getAvatarImage} from '../hooks/ApiHooks';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import clsx from 'clsx';
// import Collapse from '@material-ui/core/Collapse';

import Moment from 'react-moment';

import moment from 'moment';
import 'moment/locale/en-gb';
import 'moment-timezone';

moment.tz.add('Europe/Helsinki|HMT EET EEST|-1D.N -20 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1WuND.N OULD.N 1dA0 1xGq0 1cM0 1cM0 1cM0 1cN0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5');

/* import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import Moment from 'react-moment'; */

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
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    /* marginLeft: '33%' */
  },
  expand: {
    transform: 'rotate(0deg)',
    /* marginLeft: 'auto', */
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(360deg)',
  },
}));

const MediaTable = () => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:697px)');

  const picArray = useAllMedia();
  const file = useAllMedia();
  const [expanded, setExpanded] = React.useState(false);

  
  //Time functions
  const laskeEro = (time) =>{

    const date1 =new Date();
    const date2 = new Date(time);
  
    return Math.abs(date1 - date2) / /* 3.6e6 */ 3600000; 
  }

  return (
    <div className={classes.root}>
      <List
        cellHeight={580}
        className={classes.gridList}
        cols={matches ? 1 : 1}
      >
        {picArray.map((file) => (
          <ListItem key={file.file_id} className={classes.jaa}>
            <Card className={classes.jaa}>
              <CardHeader
                avatar={
                  file.avatar.length > 0 ? (
                    <Avatar
                      aria-label='user picture'
                      className={classes.avatar}
                      src={mediaUrl + file.avatar[0].filename}
                      alt='Avatar image'
                      title='Avatar image'
                    />
                  ) : (
                    <Avatar
                      aria-label='user picture'
                      className={classes.avatar}
                    />
                  )
                }
                action={
                  <IconButton aria-label='settings'>
                    <MoreHoriz />
                  </IconButton>
                }
                title={
                  file.user ? file.user.username : 'log in to see user data'
                }
                subheader={
                  (laskeEro(file.time_added) >= 24) ? (
                    console.log("TIME DD.MM.YYYY", file.time_added),
                    <Moment tz='Europe/Helsinki' format='DD.MM.YYYY'>{file.time_added}</Moment>
                  ) : (
                    console.log("TIME FROM NOW", file.time_added),
                    <Moment tz='Europe/Helsinki' fromNow>{file.time_added}</Moment>
                  )
                  //british backup time
                  /* console.log("aika", file.time_added),
                  
                   moment(file.time_added).calendar() */
                }
              />

              <CardMedia className={classes.container}>
                <MediaRow className={classes.media} file={file} />
              </CardMedia>

              {/* <CardActions disableSpacing>
                  <IconButton aria-label="Add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton
                    aria-label="Comment"
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                  >
                    <ChatBubbleIcon />
                  </IconButton>
                   <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>Comments:</Typography>
                    <CommentTable />
                  </CardContent>
                </Collapse> */}
            </Card>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MediaTable;
