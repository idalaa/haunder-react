import {useState} from 'react';

const useProfileForm = (callback) => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    full_name: '',
    file_name: '',
  });
  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    delete inputs.confirm;
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

export default useProfileForm;
