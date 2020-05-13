import React from 'react';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';
import logo from '../img/audio-logo.jpg';
import {
  makeStyles,
  ButtonBase,
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

    <>
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
    </>
  );
};

MediaCell.propTypes = {
  file: PropTypes.any,
  myfiles: PropTypes.bool,
  size: PropTypes.string,
};

export default MediaCell;
