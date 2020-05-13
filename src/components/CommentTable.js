import React, { useEffect, useContext } from 'react';
import CommentRow from './CommentRow';
import { getAllComments } from '../hooks/ApiHooks';

import { makeStyles, CardMedia, List } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import { CommentContext } from '../contexts/CommentContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'left',
    overflow: 'hidden',
  },
  gridList: {
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
  const [comments, setComments] = useContext(CommentContext);
  const classes = useStyles();
  console.log('pre cA');

  console.log('cA', comments);

  useEffect(() => {
    const updateComments = async () => {
      const kommentit = await getAllComments(file.file);
      setComments(kommentit);
    };
    updateComments();
  }, []);

  return (
    <div className={classes.root}>
      <List cellheight={580} className={classes.gridList} cols={1}>
        {comments.map((file) => (
          <CardMedia key={file.comment_id} className={classes.container}>
            <CommentRow className={classes.media} file={file} />
          </CardMedia>
        ))}
      </List>
    </div>
  );
};

export default CommentTable;
