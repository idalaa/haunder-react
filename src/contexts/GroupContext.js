import React, {useState} from 'react';
import PropTypes from 'prop-types';

const GroupContext = React.createContext();

const GroupProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [value, setValue] = useState('home');
  return (
    <GroupContext.Provider value={[user, setUser, value, setValue]}>
      {children}
    </GroupContext.Provider>
  );
};

GroupProvider.propTypes = {
  children: PropTypes.node,
};

export {GroupContext, GroupProvider};
