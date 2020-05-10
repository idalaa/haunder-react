import React, { useContext } from 'react';
import MyGroupRow from '../components/GroupRow';
import { useMyGroups } from '../hooks/ApiHooks';
import {
  List,
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
      {user !== null && (
        <List
          cellHeight={280}
          className={classes.gridList}
          cols={matches ? 3 : 1}
        >
          {newPicArray.map((file) => (
            <GridListTile key={file.file_id}>
              <MyGroupRow file={file} myfiles={true} />
            </GridListTile>
          ))}
        </List>
      )}
    </div>
  );
};

export default MyGroupTable;
