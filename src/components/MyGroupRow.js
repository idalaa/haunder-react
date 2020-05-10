import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  IconButton,
  Card,
  makeStyles,
  CardActions,
  List,
  ListItem,
  Typography,
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';

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
  },
  expand: {
    transform: 'rotate(0deg)',

    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(360deg)',
  },
}));

const MyGroupRow = ({ file, myfiles }) => {
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
          <List className={classes.list}>
            <ListItem>{file.title}</ListItem>
            <ListItem>{myfiles ? '' : description.desc}</ListItem>
            <ListItem>
              <CardActions disableSpacing>
                <IconButton aria-label='Add to favorites'>
                  <FavoriteIcon />
                </IconButton>
              </CardActions>
            </ListItem>
            <ListItem>
              <Collapse in={expanded} timeout='auto' unmountOnExit></Collapse>
            </ListItem>
          </List>
        </Card>
      </ListItem>
    </>
  );
};

MyGroupRow.propTypes = {
  file: PropTypes.any,
  myfiles: PropTypes.bool,
};

export default MyGroupRow;
