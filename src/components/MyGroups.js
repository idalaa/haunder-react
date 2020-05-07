// import React from 'react';
// import { Typography } from '@material-ui/core';
// import GroupFiles from '../components/MyTable';

// const MyGroups = () => {
//   return (
//     <>
//       <Typography component='h1' variant='h2' gutterBottom>
//         My Groups
//       </Typography>
//     </>
//   );
// };

import React, { useContext } from 'react';
import GroupRow from './GroupRow';
import { getGroups } from '../hooks/ApiHooks';
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

const MyGroups = () => {
  const [user] = useContext(MediaContext);
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:697px)');

  const picArray = getGroups();
  console.log(picArray);
  let newPicArray = [];
  if (picArray.length > 0 && user !== null) {
    newPicArray = picArray.filter((pic) => pic.file_id === user.file_id);
  }

  return (
    <div className={classes.root}>
      {user !== null && (
        <GridList
          cellHeight={180}
          className={classes.gridList}
          cols={matches ? 3 : 2}
        >
          <GridListTile key='Subheader' cols={3} style={{ height: 'auto' }}>
            <ListSubheader component='div'>My Groups</ListSubheader>
          </GridListTile>
          {newPicArray.map((file) => (
            <GridListTile key={file.file_id}>
              <GroupRow file={file} myfiles={true} />
            </GridListTile>
          ))}
        </GridList>
      )}
    </div>
  );
};

export default MyGroups;
