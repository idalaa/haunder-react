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
import { useAllComments } from '../hooks/ApiHooks';

//const commentUrl = 'http://media.mw.metropolia.fi/wbma/comments/file/';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  list: {
    height: '100%',
    width: '100%',
  },
}));

const CommentRow = ({ file, myfiles }) => {
  const classes = useStyles();
  const comments = useAllComments(file.file_id);
  console.log('comments', comments);

  return (
    <>
      <List className={classes.list}>
        <ListItem>{file.comment}</ListItem>
        <ListItem>{/* {myfiles ? '' : description.desc} */}</ListItem>
        {/* actionIcon={
          <>
            <IconButton
              aria-label={`info about ${file.title}`}
              component={RouterLink}
              to={'/single/' + file.file_id}
              className={classes.icon}
            >
              <PageviewIcon fontSize="large" />
            </IconButton>
            {myfiles &&
              <>
                <IconButton
                  aria-label={`Modify file`}
                  component={RouterLink}
                  to={'/modify/' + file.file_id}
                  className={classes.icon}
                >
                  <CreateIcon fontSize="large" />
                </IconButton>
                <IconButton
                  aria-label={`Delete file`}
                  onClick={() => {
                    const delOK = window.confirm('Do you really want to delete?');
                    if (delOK) {
                      deleteFile(file.file_id);
                    }
                  }}
                  className={classes.icon}
                >
                  <DeleteIcon fontSize="large" />
                </IconButton>
              </>
            }
          </>
          } */}
      </List>
    </>
  );
};

CommentRow.propTypes = {
  file: PropTypes.number,
  myfiles: PropTypes.bool,
};

export default CommentRow;
