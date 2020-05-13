import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import useJoinGroupForm from '../hooks/JoinHooks';
import { favourite } from '../hooks/ApiHooks';
import { Button, Grid } from '@material-ui/core';
import { ValidatorForm } from 'react-material-ui-form-validator';
import '../App.css';

const Favourite = ({ file_id, history }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const onSubmit = (data) => {
    setIsSubmitted(true);
  };

  const [loading, setLoading] = useState(false);
  console.log('jjjj', file_id);

  const doUpload = async () => {
    setLoading(true);
    try {
      const uploadObject = {
        file_id: file_id,
      };

      const result = await favourite(
        uploadObject,
        localStorage.getItem('token')
      );
      console.log(result);
      setTimeout(() => {
        setLoading(false);
        history.push('/groups');
      }, 2000);
    } catch (e) {
      console.log(e.message);
    }
  };

  const {
    inputs,
    setInputs,
    handleSubmit,
    formState,
  } = useJoinGroupForm(doUpload, { mode: 'onChange' });

  useEffect(() => {
    setIsSubmitted(false);
  }, [inputs.file_id, setInputs]);

  return (
    <>
      <Grid container>
        <Grid item>
          <ValidatorForm
            onSubmit={handleSubmit}
            disabled={isSubmitted}
            instantValidate={false}
            noValidate
          >
            <Grid container item>
              <Button color='primary' type='submit' variant='contained'>
                Join
              </Button>
            </Grid>
          </ValidatorForm>
          {loading && <Grid item></Grid>}
        </Grid>
      </Grid>
    </>
  );
};

Favourite.propTypes = {
  history: PropTypes.object,
  file_id: PropTypes.number,
};

export default withRouter(Favourite);
