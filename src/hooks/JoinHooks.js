import { useState } from 'react';

const useJoinGroup = (callback) => {
  const [join, setJoin] = useState({ file_id: null });
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };
  const handleInputChange = (event) => {
    event.persist();
    setInputs((join) => {
      return {
        ...join,
        [event.target.name]: event.target.value,
      };
    });
  };

  return {
    handleSubmit,
    handleInputChange,
    join,
    Setjoin,
  };
};

export default useJoinGroup;
