import React from 'react';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';
import logo from '../img/audio-logo.jpg';
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
import {red} from '@material-ui/core/colors';

import CommentTable from './CommentTable';
import CommentForm from '../views/CommentForm';
import TimeConvert from './TimeConvert';
// import {useAllMedia} from '../hooks/ApiHooks';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles((theme) => ({
  root: {
    /* display: 'flex', */
   /*  flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden', */
    /* backgroundColor: theme.palette.background.paper, */
  },
  list: {
    height: '100%',
    width: '100%',
  },
  /* jaa: {
    display: 'block',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  }, */
  /* icon: {
    color: 'rgba(255, 0, 0, 0.54)',
  }, */
  avatar: {
    backgroundColor: red[500],
  },
  container: {
    display: 'grid',
    /* justifyContent: 'center', */
    alignItems: 'center',
    width: '100%',
  },
  media: {
    width: '100%',
    height: '100%',
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
  w: {
    display: 'block',
  },
}));

const MediaRow = ({file, myfiles}) => {
  const description = JSON.parse(file.description);
  const classes = useStyles();
  let thumb = logo;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  if (file.thumbnails) {
    thumb = mediaUrl + file.thumbnails.w640;
  }
  console.log('avatar lenght ', file.avatar);
  return (
    <div className={classes.root}>
      <List key={file.file_id} className={classes.jaa}>
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
                <Avatar aria-label='user picture' className={classes.avatar} />
              )
            }
            action={
              <IconButton aria-label='settings'>
                <MoreHoriz />
              </IconButton>
            }
            title={file.user ? file.user.username : 'log in to see user data'}
            subheader={<TimeConvert time={file.time_added} />}
          />
          <ListItem><Typography component='h4' variant='h5'>{file.title}</Typography></ListItem>
          <div className={classes.container}>
            <ButtonBase component={RouterLink} to={'/single/' + file.file_id} className={classes.media}>
              <img
                src={thumb}
                alt={file.title}
                style={{
                  height: '100%',
                  width: '100%',
                  filter: `
                 brightness(${description.filters.brightness}%)
                 contrast(${description.filters.contrast}%) 
                 saturate(${description.filters.saturation}%)
                 sepia(${description.filters.sepia}%)
                 `,
                }}
              />
            </ButtonBase>
          </div>
          <List className={classes.list}>

            <ListItem>{myfiles ? '' : description.desc}</ListItem>
            <ListItem>
              <CardActions disableSpacing>
                <IconButton aria-label='Add to favorites'>
                  <FavoriteIcon />
                </IconButton>
                <IconButton
                  aria-label='Comment'
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                >
                  <ChatBubbleIcon />
                </IconButton>
              </CardActions>
            </ListItem>
            <ListItem className={classes.w}>
              <Collapse in={expanded} timeout='auto' unmountOnExit >
                <CardContent>
                  <Typography paragraph>COMMENTS</Typography>
                  <CommentTable file={file.file_id} />
                  <CommentForm fileId={file.file_id} />
                </CardContent>
              </Collapse>
            </ListItem>
          </List>
        </Card>
      </List>
    </div>
  );
};

MediaRow.propTypes = {
  file: PropTypes.any,
  myfiles: PropTypes.bool,
};

export default MediaRow;
