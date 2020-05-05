import React from 'react';
import GroupRow from './GroupRow';
import { getFavourites } from '../hooks/ApiHooks';
// import {MediaContext} from '../contexts/MediaContext';
// import {getAvatarImage} from '../hooks/ApiHooks';

import {
  //   GridList,
  //   GridListTile,
  //   ListSubheader,
  makeStyles,
  useMediaQuery,
  Card,
  CardHeader,
  IconButton,
  Avatar,
  CardMedia,
  CardActions,
  List,
  ListItem,
  CardContent,
  Typography,
} from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { red } from '@material-ui/core/colors';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';

// const groupUrl = 'http://media.mw.metropolia.fi/wbma/favourites/';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    /* backgroundColor: theme.palette.background.paper, */
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
    /* marginLeft: '33%' */
  },
  expand: {
    transform: 'rotate(0deg)',
    /* marginLeft: 'auto', */
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(360deg)',
  },
}));

const GroupTable = (file) => {
  const file = getFavourites();
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:697px)');

  const favouritesArray = getFavourites();
  console.log('favouritesArray', favouritesArray);

  return (
    <div className={classes.root}>
      <List
        cellHeight={580}
        className={classes.gridList}
        cols={matches ? 1 : 1}
      >
        {favouritesArray.map((file) => (
          <ListItem key={file.file_id} className={classes.jaa}>
            <Card className={classes.jaa}>
              <CardMedia className={classes.container}>
                <groupRow className={classes.media} file={file} />
              </CardMedia>
              <CardActions disableSpacing></CardActions>
              <Collapse in={expanded} timeout='auto' unmountOnExit>
                <CardContent>
                  <Typography paragraph>Groups:</Typography>
                </CardContent>
                <CardMedia className={classes.container}>
                  <GroupRow className={classes.media} file={file} />
                </CardMedia>
              </Collapse>
            </Card>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default GroupTable;
