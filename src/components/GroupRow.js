import React from 'react';
import PropTypes from 'prop-types';
// import {Link as RouterLink} from 'react-router-dom';
import {
  // GridListTileBar,
  // IconButton,
  makeStyles,
  List,
  ListItem,
} from '@material-ui/core';
// import PageviewIcon from '@material-ui/icons/Pageview';
// import CreateIcon from '@material-ui/icons/Create';
// import DeleteIcon from '@material-ui/icons/Delete';
import { getFavourites, useAllGroups } from '../hooks/ApiHooks';

const groupUrl = 'http://media.mw.metropolia.fi/wbma/favourites/';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  list: {
    height: '100%',
    width: '100%',
  },
}));

const GroupRow = ({ file, myfiles }) => {
  const classes = useStyles();
  const groups = useAllGroups();
  console.log('groups', groups);

  return (
    <>
      <List className={classes.list}>
        <ListItem>{file.file_id}</ListItem>
        <ListItem>{/* {myfiles ? '' : description.desc} */}</ListItem>
      </List>
    </>
  );
};

GroupRow.propTypes = {
  file: PropTypes.object,
  myfavourites: PropTypes.bool,
};

export default GroupRow;
