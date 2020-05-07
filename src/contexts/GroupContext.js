import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const FavouritesContext = React.createContext({ favourites: [] });

const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const add = useCallback(
    (favourite) => setFavourites((current) => [...current, favourite]),
    [setFavourites]
  );

  return (
    <FavouritesContext.Provider value={{ favourites, add }}>
      {children}
    </FavouritesContext.Provider>
  );
};

FavouritesProvider.propTypes = {
  children: PropTypes.node,
};

export default { FavouritesContext, FavouritesProvider };
