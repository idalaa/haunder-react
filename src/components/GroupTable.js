// import React from 'react';
// import GroupRow from './GroupRow';
// import PropTypes from 'prop-types';

// import { makeStyles, CardMedia, List } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     overflow: 'hidden',
//   },
//   gridList: {
//     maxWidth: '600px',
//     width: '100%',
//     height: '100%',
//   },
// }));

// const GroupTable = (mediaArray) => {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <List cellheight={580} className={classes.gridList} cols={1}>
//         {mediaArray.mediaArray.map((file) => (
//           <CardMedia key={file.file_id} className={classes.container}>
//             <GroupRow className={classes.media} file={file} size={'w640'} />
//           </CardMedia>
//         ))}
//       </List>
//     </div>
//   );
// };

// GroupTable.propTypes = {
//   mediaArray: PropTypes.array,
// };

// export default GroupTable;

import React from 'react';
import GroupRow from './GroupRow';
import PropTypes from 'prop-types';

import { makeStyles, CardMedia, List } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    maxWidth: '600px',
    width: '100%',
    height: '100%',
  },
}));

const GroupTable = (mediaArray) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List cellheight={580} className={classes.gridList} cols={1}>
        {mediaArray.mediaArray.map((file) => (
          <CardMedia key={file.file_id} className={classes.container}>
            <GroupRow className={classes.media} file={file} size={'w640'} />
          </CardMedia>
        ))}
      </List>
    </div>
  );
};

GroupTable.propTypes = {
  mediaArray: PropTypes.array,
};

export default GroupTable;
