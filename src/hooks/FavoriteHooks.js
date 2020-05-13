import {useState} from 'react';

const useMakeFavourite = (callback) => {
  const [inputs, setInputs] = useState({
    file_id: null,
  });

  const handleClick = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };

  return {
    useMakeFavourite,
    handleClick,
  };
};

export default useMakeFavourite;
