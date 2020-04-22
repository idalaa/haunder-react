import React, {useContext} from 'react';
import MediaRow from './MediaRow';
import {useAllMedia} from '../hooks/ApiHooks';
import {
  GridList,
  GridListTile,
  ListSubheader,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';
import {MediaContext} from '../contexts/MediaContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const MyTable = () => {
  const [user] = useContext(MediaContext);
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:697px)');

  const picArray = useAllMedia();
  console.log(picArray);
  let newPicArray = [];
  if (picArray.length > 0 && user !== null) {
    newPicArray = picArray.filter((pic) => pic.user_id === user.user_id);
  }

  return (
    <div className={classes.root}>
      {user !== null &&
        <GridList
          cellHeight={180}
          className={classes.gridList}
          cols={matches ? 3 : 2}>
          <GridListTile key="Subheader" cols={3} style={{height: 'auto'}}>
            <ListSubheader component="div">All Media</ListSubheader>
          </GridListTile>
          {
            newPicArray.map((file) =>
              <GridListTile key={file.file_id}>
                <MediaRow file={file} myfiles={true} />
              </GridListTile>)
          }
        </GridList>
      }
    </div>
  );
};

export default MyTable;
