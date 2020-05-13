import {useState} from 'react';

const useUploadForm = (callback) => {
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    file: null,
    dataUrl: '',
    brightness: 100,
    contrast: 100,
    saturation: 100,
    sepia: 0,
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
    if (event.target !== null &&
      event.target.previousElementSibling !== null &&
      event.target.previousElementSibling.name !== undefined) {
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

export default useUploadForm;
