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
