import React from 'react';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';
import logo from '../img/audio-logo.jpg';
import {
  makeStyles,
  ButtonBase,
  MenuItem,
} from '@material-ui/core';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles((theme) => ({
  media: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
}));


const MediaCell = ({file, myfiles, size}) => {
//   const description = JSON.parse(file.description);
  //   const [user] = useContext(MediaContext);
  const classes = useStyles();
  let thumb = logo;

  if (file.thumbnails) {
    thumb = mediaUrl + file.thumbnails[size];
  }
  return (

    <>           <Card className={classes.card}
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
      <ButtonBase component={RouterLink} to={'/single/' + file.file_id} className={classes.media}>
        <img
          src={thumb}
          alt={file.title}
          style={{
            height: '100%',
            width: '100%',
          }}
        />
      </ButtonBase>
    </Card>

    </>
  );
};

MediaCell.propTypes = {
  file: PropTypes.any,
  myfiles: PropTypes.bool,
  size: PropTypes.string,
};

export default MediaCell;
