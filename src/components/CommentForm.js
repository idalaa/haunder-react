import React, {useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import useCommentForm from '../hooks/CommentHooks';
import {withRouter} from 'react-router-dom';
import {comment, getAllComments} from '../hooks/ApiHooks';
import {
  Button,
  makeStyles,
  List,
  ListItem,
  Card,
  CardHeader,
  CircularProgress,
} from '@material-ui/core';

import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {CommentContext} from '../contexts/CommentContext';
import {MediaContext} from '../contexts/MediaContext';

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
    backgroundColor: 'rgb(236, 236, 236)',
    width: '100%',
  },
  container: {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '100%',
  },
}));

const CommentForm = ({fileId}) => {
  const [comments, setComments] = useContext(CommentContext);
  const [user] = useContext(MediaContext);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const doUpload = async () => {
    setLoading(true);
    try {
      const uploadObject = {
        file_id: fileId,
        comment: inputs.comment,
      };
      const result = await comment(uploadObject, localStorage.getItem('token'));
      clearForm(fileId);
      setLoading(false);

      const kommentit = await getAllComments(fileId);
      setComments(kommentit);
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

  useEffect(() => {
  },
  [inputs.comment, setInputs]);


  return (
    <>
      <List>
        {user !== null && (
          <Card className={classes.jaa}>
            <CardHeader
            />

            <ValidatorForm
              onSubmit={handleSubmit}
              instantValidate={false}
              noValidate
            >
              <Card >

                <TextValidator
                  className={classes.form}
                  label="New Comment"
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
              </Card>
              <ListItem>
                <Button
                  fullWidth
                  color="primary"
                  type="submit"
                  variant="contained"
                >
                  Post
                </Button>
              </ListItem>

            </ValidatorForm>
            {loading &&
          <ListItem>
            <CircularProgress/>
          </ListItem>
            }
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
