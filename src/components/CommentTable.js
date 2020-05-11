import React from 'react';
import CommentRow from './CommentRow';
import {useAllComments} from '../hooks/ApiHooks';

import {
  makeStyles,
  CardMedia,
  List,
} from '@material-ui/core';
import {red} from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'left',
    overflow: 'hidden',
    /* backgroundColor: theme.palette.background.paper, */
  },
  gridList: {
    // width: '100%',
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

    alignItems: 'center',
  },
}));

const CommentTable = (file) => {
  const classes = useStyles();
  console.log('pre cA');
  const commentArray = useAllComments(file.file);
  console.log('cA', commentArray);

  return (
    <div className={classes.root}>
      <List
        cellheight={580}
        className={classes.gridList}
        cols={1}>
        {
          commentArray.map((file) =>
            <CardMedia key={file.comment_id} className={classes.container}>
              <CommentRow className={classes.media} file={file} />
            </CardMedia>)
        }
      </List>
    </div>
  );
};

export default CommentTable;
