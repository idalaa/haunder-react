import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useGroupForm from '../hooks/GroupHooks';
import { createGroup } from '../hooks/ApiHooks';
import { makeStyles, Button, Grid, Typography, Paper } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const useStyles = makeStyles((theme) => ({
  card: {
    padding: '30px 20px 20px 20px',
  },
  button: {
    margin: '20px 0 0 0',
  },
}));

const CreateGroup = ({ history }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false); // eslint-disable-line no-unused-vars

  const doGroup = async () => {
    setLoading(true);
    try {
      const uploadObject = {
        title: inputs.title,
        description: JSON.stringify({
          desc: inputs.description,
          filters: {
            brightness: inputs.brightness,
            contrast: inputs.contrast,
            saturation: inputs.saturation,
            sepia: inputs.sepia,
          },
        }),
        file: inputs.file,
      };
      const result = await createGroup(
        uploadObject,
        localStorage.getItem('token')
      );
      console.log(result);
      setTimeout(() => {
        setLoading(false);
        history.push('/home');
      }, 2000);
    } catch (e) {
      console.log(e.message);
    }
  };

  const {
    inputs,
    setInputs,
    handleInputChange,
    handleSubmit,
    handleFileChange,
  } = useGroupForm(doGroup);

  useEffect(() => {
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        // convert image file to base64 string
        setInputs((inputs) => {
          return {
            ...inputs,
            dataUrl: reader.result,
          };
        });
      },
      false
    );

    if (inputs.file !== null) {
      if (inputs.file.type.includes('image')) {
        reader.readAsDataURL(inputs.file);
      } else {
        setInputs((inputs) => {
          return {
            ...inputs,
            dataUrl: 'logo192.png',
          };
        });
      }
    }
  }, [inputs.file, setInputs]);
  console.log('inputs', inputs);

  return (
    <>
      <Grid container>
        <Typography component='h1' variant='h4' gutterBottom>
          Create Groups
        </Typography>
        <Grid item xs={12}></Grid>
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
                  label='Group name'
                  type='text'
                  name='title'
                  value={inputs.title}
                  onChange={handleInputChange}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </Grid>
              <Grid container item>
                <TextValidator
                  fullWidth
                  label='Description'
                  name='description'
                  value={inputs.description}
                  onChange={handleInputChange}
                  validators={['minStringLength:5', 'required']}
                  errorMessages={[
                    'minimum length 5 characters',
                    'this field is required',
                  ]}
                />
              </Grid>
              <Grid container item>
                <TextValidator
                  fullWidth
                  type='file'
                  name='file'
                  accept='image/*,video/*,audio/*'
                  onChange={handleFileChange}
                />
              </Grid>
              <Grid container item>
                <Button
                  fullWidth
                  className={classes.button}
                  color='primary'
                  type='submit'
                  variant='contained'
                >
                  Create Group
                </Button>
              </Grid>
            </Grid>
          </ValidatorForm>
        </Grid>
      </Grid>
    </>
  );
};

CreateGroup.propTypes = {
  history: PropTypes.object,
};

export default CreateGroup;
