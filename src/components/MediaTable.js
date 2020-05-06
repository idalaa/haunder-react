import React from // useContext, useEffect, useState
  'react';
import MediaRow from './MediaRow';
import {useAllMedia} from '../hooks/ApiHooks';

import {
  makeStyles,
  useMediaQuery,
  CardMedia,
  List,
} from '@material-ui/core';
import {red} from '@material-ui/core/colors';

// const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

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

  return (
    <div className={classes.root}>
      <List
        cellheight={580}
        className={classes.gridList}
        cols={matches ? 1 : 1}>
        {
          picArray.map((file) =>

            <CardMedia key={file.file_id} className={classes.container}>
              <MediaRow className={classes.media} file={file} />
            </CardMedia>)
        }
      </List>
    </div>
  );
};

export default MediaTable;
