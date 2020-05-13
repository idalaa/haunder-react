import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';
import logo from '../img/audio-logo.jpg';
import {
  makeStyles,
  ButtonBase,
  IconButton,
  ListItem,
  GridListTileBar,
  GridListTile,
  Card,
} from '@material-ui/core';
import {MoreHoriz} from '@material-ui/icons';
import TimeConvert from './TimeConvert';
import {deleteFile} from '../hooks/ApiHooks';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles((theme) => ({
  list: {
    height: '100%',
    width: '100%',
  },
  card: {
    display: 'contents',
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
  header: {
    zIndex: 1,
    top: 0,
    height: '50px',
  },
  more: {
    color: '#fff',
  },
}));


const MediaCell = ({file, myfiles, size}) => {
  const description = JSON.parse(file.description);
  const classes = useStyles();
  let thumb = 'https://via.placeholder.com/320x200.png?text=Audio';
  /* const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  }; */
  if (file.thumbnails) {
    thumb = mediaUrl + file.thumbnails[size];
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isShown, setIsShown] = useState(false);

  return (
    <>
      <ListItem key={file.file_id} >
        <GridListTile className={classes.card} 
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}>

          {isShown && ( 
            <GridListTileBar className={classes.header}
              title={file.title}
              subtitle={
                <TimeConvert time = {file.time_added}/>
              }  
                actionIcon={
                  <>
                    <IconButton aria-label='settings'>
                      <MoreHoriz
                      className={classes.more}
                        aria-controls='fade-menu'
                        aria-haspopup='true'
                        onClick={handleClick}
                      />
                    </IconButton>

                    <Menu
                      id='fade-menu'
                      anchorEl={anchorEl}
                      keepMounted
                      open={open}
                      onClose={handleClose}
                      TransitionComponent={Fade}>
                      <MenuItem
                        onClick={handleClose}
                        aria-label={`View file`}
                        color='inherit'
                        component={RouterLink}
                        to={'/mysingle/' + file.file_id}
                      >
                            View
                      </MenuItem>

                      <MenuItem
                        onClick={handleClose}
                        aria-label={`Modify file`}
                        color='inherit'
                        component={RouterLink}
                        to={'/modify/' + file.file_id}
                      >
                            Modify
                      </MenuItem>

                      <MenuItem
                        // onClick={handleClose}
                        onClick={() => {
                          const delOK = window.confirm('Do you really want to delete?');
                          if (delOK) {
                            deleteFile(file.file_id);
                          }
                        }}
                        aria-label={`Delete file`}
                        color='inherit'
                        component={RouterLink}
                        to='/profile'
                      >
                            Delete
                      </MenuItem>
                    </Menu>
                  </>
                }              
            />
          )} 
          <ButtonBase component={RouterLink}
            to={'/mysingle/' + file.file_id}>
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

        </GridListTile>
      </ListItem>
    </>
  );
};

MediaCell.propTypes = {
  file: PropTypes.any,
  myfiles: PropTypes.bool,
  size: PropTypes.string,
};

export default MediaCell;
