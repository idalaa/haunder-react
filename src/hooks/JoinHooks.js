import { useState } from 'react';

const useJoinGroupForm = (callback) => {
  const [inputs, setInputs] = useState({
    file_id: null,
  });
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    callback();
  };
  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => {
      return {
        ...inputs,
        [event.target.name]: event.target.value,
      };
    });
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs,
    setInputs,
  };
};

export default useJoinGroupForm;
