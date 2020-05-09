import { useState } from 'react';

const useTagForm = (callback) => {
  console.log('useCForm');
  const [inputs, setInputs] = useState({
    file_id: null,
    tag: '',
  });
  const handleSubmit = (event) => {
    console.log('handleSub');
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

export default useTagForm;
