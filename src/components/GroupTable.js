import React from 'react'; // useContext, useEffect, useState
import GroupRow from './GroupRow';
import { useAllGroups } from '../hooks/ApiHooks';
// import {MediaContext} from '../contexts/MediaContext';
// import {getAvatarImage} from '../hooks/ApiHooks';

import {
  // GridList,
  // GridListTile,
  // ListSubheader,
  // CardContent,
  // Typography,
  // CardActions,
  makeStyles,
  useMediaQuery,
  Card,
  CardHeader,
  IconButton,
  Avatar,
  CardMedia,
  List,
  ListItem,
} from '@material-ui/core';

import { MoreHoriz } from '@material-ui/icons';
import { red } from '@material-ui/core/colors';

// import {MediaContext} from '../contexts/MediaContext';
// import {getAvatarImage} from '../hooks/ApiHooks';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import clsx from 'clsx';
// import Collapse from '@material-ui/core/Collapse';

import Moment from 'react-moment';

import moment from 'moment';
import 'moment/locale/en-gb';
import 'moment-timezone';

moment.tz.add(
  'Europe/Helsinki|HMT EET EEST|-1D.N -20 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1WuND.N OULD.N 1dA0 1xGq0 1cM0 1cM0 1cM0 1cN0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5'
);

/* import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import Moment from 'react-moment'; */

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

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

const GroupTable = () => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:697px)');

  const picArray = useAllGroups();
  const file = useAllGroups();
  // eslint-disable-next-line
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className={classes.root}>
      <List
        cellheight={580}
        className={classes.gridList}
        cols={matches ? 1 : 1}
      >
        {picArray.map((file) => (
          <ListItem key={file.file_id} className={classes.jaa}>
            <Card className={classes.jaa}>
              <CardHeader />
              <CardMedia className={classes.container}>
                <GroupRow className={classes.media} file={file} />
              </CardMedia>
            </Card>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default GroupTable;
