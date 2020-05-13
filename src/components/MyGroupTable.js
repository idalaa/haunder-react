import React, { useContext } from 'react';
import MyGroupRow from './MyGroupRow';
import { useMyGroups } from '../hooks/ApiHooks';
import {
  GridList,
  GridListTile,
  ListSubheader,
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
    paddingBottom: '40px',
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const MyGroupTable = () => {
  const [user] = useContext(MediaContext);
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:697px)');
  const tag = 'haunderGroup';
  const picArray = useMyGroups(tag);
  console.log(picArray);
  let newPicArray = [];
  if (picArray.length > 0 && user !== null) {
    newPicArray = picArray.filter((pic) => pic.user_id === user.user_id);
  }

  return (
    <div className={classes.root}>
      <GridList
        cellHeight={180}
        className={classes.gridList}
        cols={matches ? 3 : 2}
      >
        <GridListTile
          key='Subheader'
          cols={3}
          style={{ height: 'auto' }}
        ></GridListTile>
        {picArray.map((file) => (
          <GridListTile key={file.file_id}>
            <MyGroupRow file={file} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default MyGroupTable;
