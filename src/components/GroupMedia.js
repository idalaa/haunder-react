import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles((theme) => ({
  image: {
    height: '20vh',
    width: '100vw',
    objectFit: 'cover',
    borderRadius: 4,
    marginBottom: -3,
  },
}));

const GroupMedia = ({ file, description }) => {
  const classes = useStyles();
  return (
    <>
      {file.media_type === 'image' && (
        <img
          src={mediaUrl + file.filename}
          alt={file.title}
          className={classes.image}
        />
      )}
      {file.media_type === 'video' && (
        <video
          src={mediaUrl + file.filename}
          controls
          className={classes.image}
        />
      )}
      {file.media_type === 'audio' && (
        <audio src={mediaUrl + file.filename} controls />
      )}
    </>
  );
};

GroupMedia.propTypes = {
  file: PropTypes.object,
  description: PropTypes.object,
};

export default GroupMedia;
