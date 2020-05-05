import React from 'react';
import GroupRow from './GroupRow';
import { useAllGroups } from '../hooks/ApiHooks';
import {
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
import Collapse from '@material-ui/core/Collapse';

const groupUrl = 'http://media.mw.metropolia.fi/wbma/favourites/';

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

  const groupArray = useAllGroups();
  const file = useAllGroups();
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div className={classes.root}>
      <List
        cellHeight={580}
        className={classes.gridList}
        cols={matches ? 1 : 1}
      >
        {groupArray.map((file) => (
          <ListItem key={file.file_id} className={classes.jaa}>
            <Card className={classes.jaa}>
              <CardHeader
                avatar={
                  file.avatar.length > 0 ? (
                    <Avatar
                      aria-label='user group'
                      className={classes.avatar}
                      src={groupUrl + file.avatar[0].filename}
                      alt='Group '
                      title='Avatar image'
                    />
                  ) : (
                    <Avatar
                      aria-label='user picture'
                      className={classes.avatar}
                    />
                  )
                }
                action={
                  <IconButton aria-label='settings'>
                    <MoreHoriz />
                  </IconButton>
                }
                title={
                  file.user ? file.user.username : 'log in to see user data'
                }
              />

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
