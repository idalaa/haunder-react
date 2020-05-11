import React, {useState} from 'react';
import PropTypes from 'prop-types';

const CommentContext = React.createContext();

const CommentProvider = ({children}) => {
  const [comments, setComments] = useState([]);
  return (
    <CommentContext.Provider value={[comments, setComments]}>
      {children}
    </CommentContext.Provider>
  );
};

CommentProvider.propTypes = {
  children: PropTypes.node,
};

export {CommentContext, CommentProvider};
