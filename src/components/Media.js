import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles((theme) => ({
  image: {
    width: '100%',
    borderRadius: 4,
    marginBottom: -3,
  },
}));

const Media = ({file, description}) => {
  const classes = useStyles();
  return (
    <>
      {file.media_type === 'image' &&
      <img
        src={mediaUrl + file.filename}
        alt={file.title}
        className={classes.image}
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
      }
      {file.media_type === 'video' &&
      <video
        src={mediaUrl + file.filename}
        controls
        className={classes.image}
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
      }
      {file.media_type === 'audio' &&
      <audio src={mediaUrl + file.filename} controls/>
      }
    </>
  );
};

Media.propTypes = {
  file: PropTypes.object,
  description: PropTypes.object,
};

export default Media;
