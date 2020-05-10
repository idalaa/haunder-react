import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import useCommentForm from '../hooks/CommentHooks';
import {withRouter} from 'react-router-dom';
import {comment, useAllComments} from '../hooks/ApiHooks';
import {
  Button,
  makeStyles,
  List,
  ListItem,
  Card,
  CardHeader,
  CircularProgress,
  Typography,
} from '@material-ui/core';
// import {red} from '@material-ui/core/colors';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

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
    /* backgroundColor: theme.palette.background.paper, */
  },
  jaa: {
    display: 'block',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    /* backgroundColor: theme.palette.background.paper, */
  },
  container: {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const CommentForm = ({fileId, history}) => {
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
      // setTimeout(() => {
      clearForm(fileId);
      setLoading(false);
      history.push('/home');
      console.log('end');
      // }, 500);
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
    clearForm,
  } = useCommentForm(doUpload);
  console.log('cForm useFx');
  useEffect(() => {
  },
  [inputs.comment, setInputs]);
  console.log('inputs', inputs);

  return (
    <>
      <List>
        <Card className={classes.jaa}>
          <CardHeader title={
            <Typography paragraph>NEW COMMENT</Typography>}
          />

          <ValidatorForm
            onSubmit={handleSubmit}
            instantValidate={false}
            noValidate
          >
            <ListItem>
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
            </ListItem>
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
      </List>
    </>
  );
};

CommentForm.propTypes = {
  history: PropTypes.object,
  fileId: PropTypes.number,
};

export default withRouter(CommentForm);
