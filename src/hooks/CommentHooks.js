import {useState} from 'react';

const useCommentForm = (callback) => {
  console.log('useCForm');
  const [inputs, setInputs] = useState({
    file_id: null,
    comment: '',
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

  const clearForm = (fileId) =>{
    setInputs({
      file_id: null,
      comment: '',
    });
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs,
    setInputs,
    clearForm,
  };
};

export default useCommentForm;
