import React from 'react';
import CommentRow from './CommentRow';
import {useAllComments} from '../hooks/ApiHooks';

import {
  makeStyles,
  useMediaQuery,
  CardMedia,
  List,
} from '@material-ui/core';

import {red} from '@material-ui/core/colors';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// const commentUrl = 'http://media.mw.metropolia.fi/wbma/comments/';

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

const CommentTable = (file) => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:697px)');
  const commentArray = useAllComments(file.file);
  console.log('commentArray', commentArray);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div className={classes.root}>
      <List
        cellheight={580}
        className={classes.gridList}
        cols={matches ? 1 : 1}>
        {
          commentArray.map((file) =>
            <CardMedia key={file.file_id} className={classes.container}>
              <CommentRow className={classes.media} file={file} />
            </CardMedia>)
        }
      </List>
    </div>
  );
};

export default CommentTable;
