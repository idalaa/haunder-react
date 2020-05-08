import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import JoinGroup from '../components/JoinGroup';
import {
  Button,
  makeStyles,
  IconButton,
  CardActions,
  List,
  ListItem,
  CardContent,
  Typography,
} from '@material-ui/core';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteFile } from '../hooks/ApiHooks';
import clsx from 'clsx';
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
          <CardActions disableSpacing>
            <Button color='primary'>
              <Button
                onClick={JoinGroup}
                fullWidth
                color='primary'
                type='submit'
                variant='contained'
              >
                Join Group
              </Button>
            </Button>
          </CardActions>
          <IconButton
            aria-label='Comment'
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
          >
            <ChatBubbleIcon />
          </IconButton>
          <ListItem>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
              <CardContent>
                <CommentTable file={file.file_id} />
                <CommentForm fileId={file.file_id} />
              </CardContent>
            </Collapse>
          </ListItem>
        </ListItem>
        {
          <>
            {myfiles && (
              <>
                <IconButton
                  aria-label={`Modify file`}
                  component={RouterLink}
                  to={'/modify/' + file.file_id}
                  className={classes.icon}
                >
                  <CreateIcon fontSize='large' />
                </IconButton>
                <IconButton
                  aria-label={`Delete file`}
                  onClick={() => {
                    const delOK = window.confirm(
                      'Do you really want to delete?'
                    );
                    if (delOK) {
                      deleteFile(file.file_id);
                    }
                  }}
                  className={classes.icon}
                >
                  <DeleteIcon fontSize='large' />
                </IconButton>
              </>
            )}
          </>
        }
      </List>
    </>
  );
};

GroupRow.propTypes = {
  file: PropTypes.object,
  myfiles: PropTypes.bool,
};

export default GroupRow;
