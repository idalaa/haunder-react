import React from 'react';
import PropTypes from 'prop-types';
import { useSingleMedia, useAllMedia } from '../hooks/ApiHooks';
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
import GroupUpload from '../components/GroupUpload';
import MediaTable from '../components/MediaTable';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'rgb(191, 54, 12)',
    fontSize: '40px',
    marginRight: '10px',
    fontSize: '10px',
  },
  card: {
    margin: '20px 0 20px 0',
  },
}));

const GroupSingle = ({ match, myfiles }) => {
  const classes = useStyles();
  console.log('match', match.params.id);
  const file = useSingleMedia(match.params.id);
  let description = undefined;
  if (file !== null) {
    description = JSON.parse(file.description);
  }
  const picArray = useAllMedia('group_' + match.params.id);
  return (
    <>
      {file !== null && (
        <>
          <BackButton />
          <Card key={file.file_id} className={classes.card}>
            <Paper style={{ boxShadow: 'none' }}>
              {description && (
                <GroupMedia file={file} description={description} />
              )}
            </Paper>
            <CardContent>
              <Typography component='h4' variant='h4' gutterBottom>
                {file.title}
              </Typography>
              <Typography component='h7' variant='h7' gutterBottom>
                <GroupIcon className={classes.icon} />
                Groups
              </Typography>
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <GroupUpload tag={match.params.id} />
            </CardContent>
          </Card>
          <Card className={classes.card}>
            <CardContent>
              <Typography component='h4' variant='h4' gutterBottom>
                Posts
              </Typography>
              <MediaTable mediaArray={picArray} />
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
