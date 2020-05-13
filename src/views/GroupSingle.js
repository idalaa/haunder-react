import React from 'react';
import PropTypes from 'prop-types';
import { useSingleMedia } from '../hooks/ApiHooks';
import {
  Typography,
  Paper,
  Card,
  CardContent,
  makeStyles,
} from '@material-ui/core';
import BackButton from '../components/BackButton';
import GroupIcon from '@material-ui/icons/Group';
import GroupMedia from '../components/GroupMedia';
import CommentTable from '../components/CommentTable';
import CommentForm from './CommentForm';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'rgb(191, 54, 12)',
    fontSize: '40px',
    marginRight: '10px',
  },
}));

const GroupSingle = ({ match, myfiles }) => {
  const classes = useStyles();
  console.log('match', match.params.id);
  const file = useSingleMedia(match.params.id);
  console.log('file', file);
  let description = undefined;
  if (file !== null) {
    description = JSON.parse(file.description);
  }
  return (
    <>
      {file !== null && (
        <>
          <BackButton />
          <Card key={file.file_id}>
            <Paper style={{ boxShadow: 'none' }}>
              {description && (
                <GroupMedia file={file} description={description} />
              )}
            </Paper>
            <CardContent>
              <Typography component='h4' variant='h4' gutterBottom>
                <GroupIcon className={classes.icon} />
                {file.title}
              </Typography>
              <Typography component='h5' variant='h5' gutterBottom>
                {description.desc}
              </Typography>
            </CardContent>
            <CardContent>
              <CommentTable file={file.file_id} />
              <CommentForm fileId={file.file_id} />
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};

GroupSingle.propTypes = {
  match: PropTypes.object,
  myfiles: PropTypes.bool,
};

export default GroupSingle;
