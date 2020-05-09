import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useTagForm from '../hooks/CommentHooks';
import { withRouter } from 'react-router-dom';
import { addTag } from '../hooks/ApiHooks';
import {
  Button,
  List,
  ListItem,
  Card,
  CardHeader,
  CircularProgress,
  Typography,
} from '@material-ui/core';
// import {red} from '@material-ui/core/colors';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const TagForm = ({ file_id, tag, history }) => {
  console.log('tagss');
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const doUpload = async () => {
    setLoading(true);
    try {
      const uploadObject = {
        file_id: file_id,
        tag: inputs.tag,
      };
      const result = await addTag(uploadObject, localStorage.getItem('token'));
      console.log('tagged', result);
      setTimeout(() => {
        setLoading(false);
        history.push('/home');
        console.log('fff');
      }, 500);
    } catch (e) {
      console.log(e.message);
      // TODO: näytä vihe
    }
  };

  const { inputs, setInputs, handleInputChange, handleSubmit } = useTagForm(
    doUpload
  );

  useEffect(() => {}, [inputs.comment, setInputs]);
  console.log('inputs', inputs);

  return (
    <>
      <List>
        <Card>
          <ValidatorForm
            onSubmit={handleSubmit}
            instantValidate={false}
            noValidate
          >
            <ListItem>
              <TextValidator
                fullWidth
                label='Tag'
                type='text'
                name='tag'
                value={inputs.tag}
                onChange={handleInputChange}
                validators={['required']}
                errorMessages={['this field is required']}
              />
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                color='primary'
                type='submit'
                variant='contained'
              >
                Post
              </Button>
            </ListItem>
          </ValidatorForm>
          {loading && (
            <ListItem>
              <CircularProgress />
            </ListItem>
          )}
        </Card>
      </List>
    </>
  );
};

CommentForm.propTypes = {
  history: PropTypes.object,
  tag: PropTypes.string,
  file_id: PropTypes.number,
};

export default withRouter(TagForm);
