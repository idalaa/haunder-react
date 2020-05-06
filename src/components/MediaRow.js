import React from 'react';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';
import {
  IconButton,
  Card,
  CardHeader,
  Avatar,
  makeStyles,
  CardActions,
  List,
  ListItem,
  CardContent,
  Typography,
  ButtonBase,
} from '@material-ui/core';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import PageviewIcon from '@material-ui/icons/Pageview';
// import CreateIcon from '@material-ui/icons/Create';
// import DeleteIcon from '@material-ui/icons/Delete';
// import {deleteFile} from '../hooks/ApiHooks';
import clsx from 'clsx';
import {MoreHoriz} from '@material-ui/icons';
import Collapse from '@material-ui/core/Collapse';
import CommentTable from './CommentTable';
import CommentForm from '../views/CommentForm';

import Moment from 'react-moment';

import moment from 'moment';
import 'moment/locale/en-gb';
import 'moment-timezone';

moment.tz.add('Europe/Helsinki|HMT EET EEST|-1D.N -20 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1WuND.N OULD.N 1dA0 1xGq0 1cM0 1cM0 1cM0 1cN0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5');


const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  list: {
    height: '100%',
    width: '100%',
  },
}));

const MediaRow = ({file, myfiles}) => {
  const description = JSON.parse(file.description);
  const classes = useStyles();
  let thumb = 'https://via.placeholder.com/320x200.png?text=Audio';
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  if (file.thumbnails) {
    thumb = mediaUrl + file.thumbnails.w320;
  }

  // Time functions
  const laskeEro = (time) =>{
    const date1 =new Date();
    const date2 = new Date(time);

    return Math.abs(date1 - date2) / /* 3.6e6 */ 3600000;
  };
  return (
    <>
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
                    console.log('TIME DD.MM.YYYY', file.time_added),
                    <Moment tz='Europe/Helsinki' format='DD.MM.YYYY'>{file.time_added}</Moment>
                  ) : (
                    console.log('TIME FROM NOW', file.time_added),
                    <Moment tz='Europe/Helsinki' fromNow>{file.time_added}</Moment>
                  )
                  // british backup time
                  /* console.log("aika", file.time_added),

                   moment(file.time_added).calendar() */
            }
          />
          <ButtonBase component={RouterLink}
            to={'/single/' + file.file_id}>
            <img
              src={thumb}
              alt={file.title}

              style={
                {
                  filter: `
                 brightness(${description.filters.brightness}%)
                 contrast(${description.filters.contrast}%) 
                 saturate(${description.filters.saturation}%)
                 sepia(${description.filters.sepia}%)
                 `,
                }
              }
            />
          </ButtonBase>
          <List className={classes.list}>
            <ListItem>
              {file.title}
            </ListItem>
            <ListItem>
              {myfiles ? '' : description.desc}
            </ListItem>
            <ListItem>
              <CardActions disableSpacing>
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
                {/*  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton> */}
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <CommentForm fileId = {file.file_id}/>
                  <Typography paragraph>Comments:</Typography>
                  <CommentTable file = {file.file_id}/>
                </CardContent>
              </Collapse>
            </ListItem>
          </List>
        </Card>
      </ListItem>
    </>
  );
};

MediaRow.propTypes = {
  file: PropTypes.any,
  myfiles: PropTypes.bool,
};

export default MediaRow;
