import React from 'react';
import MediaRow from './MediaRow';
import {useAllMedia} from '../hooks/ApiHooks';

import {
  makeStyles,
  CardMedia,
  List,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
  // const matches = useMediaQuery('(min-width:697px)');
  const picArray = useAllMedia();

  return (
    <div className={classes.root}>
      <List
        cellheight={580}
        className={classes.gridList}
        cols={1}>
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
