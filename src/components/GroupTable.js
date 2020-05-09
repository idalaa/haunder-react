import React from 'react'; // useContext, useEffect, useState
import GroupRow from './GroupRow';
import { useAllGroups } from '../hooks/ApiHooks';
import Favourite from '../views/Favourite';

// import {getAvatarImage} from '../hooks/ApiHooks';

import {
  GridList,
  GridListTile,
  GridListTileBar,
  // ListSubheader,
  // CardContent,
  // Typography,
  // CardActions,
  // IconButton,
  // Avatar,
  makeStyles,
  useMediaQuery,
  Card,
  CardHeader,
  CardMedia,
  List,
  ListItem,
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

const GroupTable = () => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:697px)');
  const picArray = useAllGroups();

  return (
    <div className={classes.root}>
      <List
        cellheight={580}
        className={classes.gridList}
        cols={matches ? 1 : 1}
      >
        {picArray.map((file) => (
          <CardMedia key={file.file_id} className={classes.container}>
            <GroupRow className={classes.media} file={file} />
          </CardMedia>
        ))}
      </List>
    </div>
  );
};

export default GroupTable;
