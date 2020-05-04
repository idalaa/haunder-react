import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import useCommentForm from '../hooks/CommentHooks';
import {comment} from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';
import {
  Button,
  Grid,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import BackButton from '../components/BackButton';

const CommentForm = ({fileId, history}) => {
  const [loading, setLoading] = useState(false);
  const doUpload = async () => {
    setLoading(true);
    try {
      const uploadObject = {
        file_id: fileId,
        comment: inputs.comment,
      };
      const result = await comment(uploadObject, localStorage.getItem('token'));
      console.log('juu', result);
      setTimeout(() => {
        setLoading(false);
        history.push('/home');
      }, 1000);
    } catch (e) {
      console.log(e.message);
      // TODO: näytä vihe
    }
  };

  const {
    inputs,
    setInputs,
    handleInputChange,
    handleSubmit,
  } = useCommentForm(doUpload);


  useEffect(() => {

  }, [inputs.comment, setInputs]);
  // console.log('inputs', inputs);

  return (
    <>
      <BackButton />
      <Grid container>
        <Grid item xs={12}>
          <Typography
            component="h1"
            variant="h2"
            gutterBottom>Comment</Typography>
        </Grid>
        <Grid item>
          <ValidatorForm
            onSubmit={handleSubmit}
            instantValidate={false}
            noValidate
          >
            <Grid container>
              <Grid container item>
                <TextValidator
                  fullWidth
                  label="Comment"
                  type="text"
                  name="comment"
                  value={inputs.comment}
                  onChange={handleInputChange}
                  validators={[
                    'required',
                  ]}
                  errorMessages={[
                    'this field is required',
                  ]}
                />
              </Grid>
              <Grid container item>
                <Button
                  fullWidth
                  color="primary"
                  type="submit"
                  variant="contained"
                >
                  Post
                </Button>
              </Grid>
            </Grid>
          </ValidatorForm>
          {loading &&
          <Grid item>
            <CircularProgress/>
          </Grid>
          }
        </Grid>
      </Grid>
    </>
  );
};

CommentForm.propTypes = {
  history: PropTypes.object,
  fileId: PropTypes.number,
};

export default withRouter(CommentForm);
