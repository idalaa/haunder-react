import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import useCommentForm from '../hooks/CommentHooks';
import { withRouter } from 'react-router-dom';
import { comment, getAllComments } from '../hooks/ApiHooks';
import {
  Button,
  makeStyles,
  List,
  ListItem,
  Card,
  CardHeader,
  CircularProgress,
} from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { CommentContext } from '../contexts/CommentContext';
import { MediaContext } from '../contexts/MediaContext';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  list: {
    height: '100%',
    width: '100%',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  jaa: {
    display: 'block',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    width: '100%',
    boxShadow: 'none',
  },
  container: {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    backgroundColor: 'rgb(236, 236, 236)',
    borderRadius: '6',
  },
}));

const CommentForm = ({ fileId, history }) => {
  const [comments, setComments] = useContext(CommentContext);
  const [user] = useContext(MediaContext);
  console.log('commentForm');
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const doUpload = async () => {
    console.log('doUpload');
    setLoading(true);
    try {
      const uploadObject = {
        file_id: fileId,
        comment: inputs.comment,
      };
      console.log('try');
      const result = await comment(uploadObject, localStorage.getItem('token'));
      console.log('comment posted', result);

      clearForm(fileId);
      setLoading(false);

      const kommentit = await getAllComments(fileId);
      setComments(kommentit);
      console.log('end', comments);
    } catch (e) {
      console.log(e.message);
    }
  };

  const {
    inputs,
    setInputs,
    handleInputChange,
    handleSubmit,
    clearForm,
  } = useCommentForm(doUpload);
  console.log('cForm useFx');
  useEffect(() => {}, [inputs.comment, setInputs]);
  console.log('inputs', inputs);

  return (
    <>
      <List>
        {user !== null && (
          <Card className={classes.jaa}>
            <CardHeader />

            <ValidatorForm
              onSubmit={handleSubmit}
              instantValidate={false}
              noValidate
            >
              <Card className={classes.form}>
                <TextValidator
                  fullWidth
                  label='New Comment'
                  type='text'
                  name='comment'
                  value={inputs.comment}
                  onChange={handleInputChange}
                  validators={['required']}
                  errorMessages={['this field is required']}
                />
              </Card>
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
        )}
      </List>
    </>
  );
};

CommentForm.propTypes = {
  history: PropTypes.object,
  fileId: PropTypes.number,
};

export default withRouter(CommentForm);
