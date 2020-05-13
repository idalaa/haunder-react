import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {IconButton} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import useMakeFavourite from '../hooks/FavoriteHooks';
import {favourite} from '../hooks/ApiHooks';

const Favourite = (file) => {
  // eslint-disable-next-line
  const [loading, setLoading] = useState(false);
  const makeFavourite = async () => {
    setLoading(true);
    try {
      const favouriteObject ={
        file_id: file.file,
      };
      // eslint-disable-next-line
      const result = await favourite(favouriteObject, localStorage.getItem('token'));

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (e) {
      console.log(e.message);
    }
  };
  const {
    handleClick,
  } = useMakeFavourite(makeFavourite);
  return (
    <div>
      <IconButton aria-label='Add to favorites'
        onClick= {handleClick}>
        <FavoriteIcon />
      </IconButton>
    </div>
  );
};

Favourite.propTypes = {
  file: PropTypes.number,
};

export default Favourite;
