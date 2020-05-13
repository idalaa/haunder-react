import React from 'react';
import PropTypes from 'prop-types';
import {useSingleMedia, useAllMedia} from '../hooks/ApiHooks';
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
  },
  card: {
    marginTop: '30px',
  },
}));

const GroupSingle = ({match, myfiles}) => {
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
          <Typography component='h1' variant='h4' gutterBottom>
            <GroupIcon className={classes.icon} />
            Groups
          </Typography>
          <Card key={file.file_id} className={classes.card}>
            <Paper style={{boxShadow: 'none'}}>
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
              <GroupUpload tag = {match.params.id}/>
              <MediaTable mediaArray = {picArray}/>
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
