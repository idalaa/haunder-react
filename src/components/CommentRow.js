import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  List,
  ListItem,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  list: {
    height: '100%',
    width: '100%',
  },
}));

const CommentRow = ({file, myfiles}) => {
  const classes = useStyles();
  // const comments = useAllComments(file.file_id);
  // console.log('comments', comments);

  return (
    <>
      <List className={classes.list}>
        <ListItem key={file.comment_id} >{file.comment}</ListItem>
        <ListItem>{/* {myfiles ? '' : description.desc} */}</ListItem>
      </List>
    </>
  );
};

CommentRow.propTypes = {
  file: PropTypes.any,
  myfiles: PropTypes.bool,
};

export default CommentRow;
