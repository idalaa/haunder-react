import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {IconButton} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import useMakeFavourite from '../hooks/FavoriteHooks';
import {favourite} from '../hooks/ApiHooks';

const Favourite = (file) => {
  console.log('favfile', file.file);
  const [loading, setLoading] = useState(false);
  const makeFavourite = async () => {
    setLoading(true);
    try {
      const favouriteObject ={
        file_id: file.file,
      };
      const result = await favourite(favouriteObject, localStorage.getItem('token'));
      console.log(result);
      setTimeout(() => {
        setLoading(false);
        // history.push('/home');
      }, 2000);
    } catch (e) {
      console.log(e.message);
      // TODO: näytä vihe
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
  file: PropTypes.string,
};

export default Favourite;
