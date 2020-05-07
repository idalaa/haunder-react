import React from 'react';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';
import {
  IconButton,
  Card,
  CardHeader,
  Avatar,
  makeStyles,
  CardActions,
  List,
  ListItem,
  CardContent,
  Typography,
  ButtonBase,
} from '@material-ui/core';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import PageviewIcon from '@material-ui/icons/Pageview';
// import CreateIcon from '@material-ui/icons/Create';
// import DeleteIcon from '@material-ui/icons/Delete';
// import {deleteFile} from '../hooks/ApiHooks';
import clsx from 'clsx';
import {MoreHoriz} from '@material-ui/icons';
import Collapse from '@material-ui/core/Collapse';
import {red} from '@material-ui/core/colors';

import CommentTable from './CommentTable';
import CommentForm from '../views/CommentForm';
import TimeConvert from './TimeConvert';

import PageviewIcon from '@material-ui/icons/Pageview';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import {deleteFile} from '../hooks/ApiHooks';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles((theme) => ({
  list: {
    height: '100%',
    width: '100%',
  },
  jaa: {
    display: 'block',
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
    color: 'rgba(255, 0, 0, 0.54)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  container: {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    // marginLeft: '33%',
  },
  expand: {
    transform: 'rotate(0deg)',
    /* marginLeft: 'auto', */
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(0deg)',
  },
}));

const MyRow = ({file, myfiles}) => {
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
      <ListItem key={file.file_id} className={classes.jaa}>
        <Card className={classes.jaa}>
          <CardHeader
            action={
                <>
                <IconButton aria-label='settings'
                    className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}>
                    <MoreHoriz />
                </IconButton>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
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
                            const delOK = window.confirm('Do you reallu want to delete?');
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
                </Collapse>
                </>
            }
            subheader={
              <TimeConvert time = {file.time_added}/>
            }
          />
          <ButtonBase component={RouterLink}
            to={'/single/' + file.file_id}>
            <img
              src={thumb}
              alt={file.title}

              style={
                {
                  filter: `
                 brightness(${description.filters.brightness}%)
                 contrast(${description.filters.contrast}%) 
                 saturate(${description.filters.saturation}%)
                 sepia(${description.filters.sepia}%)
                 `,
                }
              }
            />
          </ButtonBase>
          
        </Card>
      </ListItem>
    </>
  );
};

MyRow.propTypes = {
  file: PropTypes.any,
  myfiles: PropTypes.bool,
};

export default MyRow;
