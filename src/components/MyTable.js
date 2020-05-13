import React, { useContext } from 'react';
import MyRow from './MyRow';
import { useAllMedia } from '../hooks/ApiHooks';
import {
  GridList,
  GridListTile,
  //ListSubheader,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';
import { MediaContext } from '../contexts/MediaContext';

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
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const MyTable = (mediaArray) => {
  /* const classes = useStyles();
  const matches = useMediaQuery('(min-width:697px)');
  const [user] = useContext(MediaContext);

  return (
    <div className={classes.root}>
      {user !== null && (
        <GridList
          cellHeight={280}
          className={classes.gridList}
          cols={matches ? 3 : 1}
        >
          <GridListTile
            key='Subheader'
            cols={3}
            style={{ height: 'auto' }}
          ></GridListTile>
          {newPicArray.map((file) => (
            <GridListTile key={file.file_id}>
              <MyRow file={file} myfiles={true} size={'w320'}/>
            </GridListTile>
          ))}
        </GridList>
      )}
    </div>
  ); */
};

export default MyTable;
