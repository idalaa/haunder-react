import { useState } from 'react';

const useGroupForm = (callback) => {
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    file: null,
    dataUrl: '',
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

  const handleFileChange = (event) => {
    event.persist();
    console.log(event.target.files[0]);
    setInputs((inputs) => {
      return {
        ...inputs,
        file: event.target.files[0],
      };
    });
  };

  const handleSliderChange = (event, value) => {
    if (
      event.target !== null &&
      event.target.previousElementSibling !== null &&
      event.target.previousElementSibling.name !== undefined
    ) {
      // console.log('nimi', event.target.previousElementSibling.name);
      // console.log('arvo', value);
      setInputs((inputs) => {
        return {
          ...inputs,
          [event.target.previousElementSibling.name]: value,
        };
      });
    }
  };

  return {
    handleSubmit,
    handleInputChange,
    handleFileChange,
    handleSliderChange,
    inputs,
    setInputs,
  };
};

export default useGroupForm;
