import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const FavContext = React.createContext({ favourites: [] });

const FavProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const add = useCallback(
    (favourite) => setFavourites((current) => [...current, favourite]),
    [setFavourites]
  );

  return (
    <FavContext.Provider value={{ favourites, add }}>
      {children}
    </FavContext.Provider>
  );
};

FavProvider.propTypes = {
  children: PropTypes.node,
};

export default { FavContext, FavProvider };
