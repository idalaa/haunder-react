import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  // IconButton,
  // Card,
  // CardHeader,
  Button,
  GridListTileBar,
  // Avatar,
  makeStyles,
  // CardActions,
  // List,
  // ListItem,
  // CardContent,
  // Typography,
  ButtonBase,
} from '@material-ui/core';

// import clsx from 'clsx';
// import { MoreHoriz } from '@material-ui/icons';
// import Collapse from '@material-ui/core/Collapse';
import { red } from '@material-ui/core/colors';
// import CommentForm from '../views/CommentForm';
// import PageviewIcon from '@material-ui/icons/Pageview';
// import DeleteIcon from '@material-ui/icons/Delete';
// import { deleteFile } from '../hooks/ApiHooks';
// import CreateIcon from '@material-ui/icons/Create';
// import TimeConvert from './TimeConvert';
// import MenuIcon from '@material-ui/icons/Menu';
// import Menu from '@material-ui/core/Menu';
// import MenuItem from '@material-ui/core/MenuItem';
// import Fade from '@material-ui/core/Fade';
import Favourite from '../views/Favourite';

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

const MyGroupRow = ({ file, myfiles }) => {
  const description = JSON.parse(file.description);
  const classes = useStyles();
  let thumb = 'https://via.placeholder.com/320x200.png?text=Audio';

  if (file.thumbnails) {
    thumb = mediaUrl + file.thumbnails.w320;
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ButtonBase
        component={RouterLink}
        to={'/groupsingle/' + file.file_id}
        className={classes.media}
      >
        <img
          src={thumb}
          // alt={file.title}
          // style={{
          //   height: '100%',
          //   width: '100%',
          //   filter: `
          //  brightness(${description.filters.brightness}%)
          //  contrast(${description.filters.contrast}%)
          //  saturate(${description.filters.saturation}%)
          //  sepia(${description.filters.sepia}%)
          //  `,
          // }}
        />

        <GridListTileBar
          title={file.title}
          subtitle={myfiles ? '' : description.desc}
          actionIcon={
            <>
              <Button className={classes.icon}>
                <Favourite file_id={file.file_id} />
              </Button>
            </>
          }
        />
      </ButtonBase>
    </>
  );
};

MyGroupRow.propTypes = {
  file: PropTypes.any,
  myfiles: PropTypes.bool,
};

export default MyGroupRow;
