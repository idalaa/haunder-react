import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useGroupForm from '../hooks/GroupHooks';
import { createGroup } from '../hooks/ApiHooks';
import GroupTable from '../components/GroupTable';
import { Button, Grid, Typography } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import BackButton from '../components/BackButton';

const Groups = ({ history }) => {
  const [loading, setLoading] = useState(false); // eslint-disable-line no-unused-vars
  const doGroup = async () => {
    setLoading(true);
    try {
      const uploadObject = {
        title: inputs.title,
        description: JSON.stringify({
          desc: inputs.description,
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
      // TODO: näytä vihe
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
    // failriideri tänne
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
      <BackButton />
      <Grid container>
        <Grid item xs={12}>
          <Typography component='h1' variant='h2' gutterBottom>
            Create Group
          </Typography>
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
        {/* <JoinGroup> */}
        <GroupTable />
        {/* </JoinGroup> */}
        {/* <MyGroups /> */}
      </Grid>
    </>
  );
};

Groups.propTypes = {
  history: PropTypes.object,
};

export default Groups;
