import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Favourite from '../views/Favourite';
import {
  Button,
  makeStyles,
  IconButton,
  CardActions,
  List,
  ListItem,
  CardContent,
} from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import CommentTable from './CommentTable';
import CommentForm from '../views/CommentForm';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

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
  const description = JSON.parse(file.description);
  const classes = useStyles();
  let thumb = 'https://via.placeholder.com/320x200.png?text=Audio';
  console.log('ile', file.file_id);

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  if (file.thumbnails) {
    thumb = mediaUrl + file.thumbnails.w320;
  }
  return (
    <>
      <img src={thumb} alt={file.title} />
      <List className={classes.list}>
        <ListItem>{file.title}</ListItem>
        <ListItem>{myfiles ? '' : description.desc}</ListItem>
        <ListItem>
          <Favourite file_id={file.file_id} />
          <ListItem>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
              <CardContent>
                <CommentTable file={file.file_id} />
                <CommentForm fileId={file.file_id} />
              </CardContent>
            </Collapse>
          </ListItem>
        </ListItem>
        {<></>}
      </List>
    </>
  );
};

GroupRow.propTypes = {
  file: PropTypes.object,
  myfiles: PropTypes.bool,
};

export default GroupRow;
