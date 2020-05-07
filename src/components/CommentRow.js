import React from 'react';
import PropTypes from 'prop-types';
import {useAllComments} from '../hooks/ApiHooks';
import {
  makeStyles,
  List,
  ListItem,
  Card,
  CardHeader,
  IconButton,
  Avatar,
  // useMediaQuery,
  // CardMedia,
  // CardActions,
  // CardContent,
  // Typography,

} from '@material-ui/core';
import {MoreHoriz} from '@material-ui/icons';
import {red} from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  list: {
    height: '100%',
    width: '100%',
  },
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

const CommentRow = ({file, myfiles}) => {
  const classes = useStyles();
  // const comments = useAllComments(file.file_id);
  // console.log('comments', comments);
  const commentArray = useAllComments(file.file);
  return (
    <>
      <List className={classes.list}>
        <Card className={classes.jaa}>
          <CardHeader
            avatar={
              <Avatar
                aria-label='user picture'
                className={classes.avatar}
                /* image={commentUrl + avatar[0].filename}
                      alt="Avatar image"
                      title="Avatar image" */
              />
            }
            action={
              <IconButton aria-label='settings'>
                <MoreHoriz />
              </IconButton>
            }
            title={file.user_id}
            subheader='April 23, 2020'
          />
          <ListItem key={file.comment_id}>{file.comment}</ListItem>
          <ListItem>{/* {myfiles ? '' : description.desc} */}</ListItem>
        </Card>

      </List>
    </>
  );
};

CommentRow.propTypes = {
  file: PropTypes.any,
  myfiles: PropTypes.bool,
};

export default CommentRow;
