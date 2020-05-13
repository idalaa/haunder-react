import React from 'react';
import PropTypes from 'prop-types';
import { useSingleMedia } from '../hooks/ApiHooks';
import {
  Typography,
  Paper,
  Card,
  CardContent,
  makeStyles,
  Avatar,
  CardHeader,
} from '@material-ui/core';
import BackButton from '../components/BackButton';
import GroupMedia from '../components/GroupMedia';
import CommentTable from '../components/CommentTable';
import CommentForm from './CommentForm';

// import {Link as RouterLink} from 'react-router-dom';
// import PageviewIcon from '@material-ui/icons/Pageview';
// import CreateIcon from '@material-ui/icons/Create';
// import DeleteIcon from '@material-ui/icons/Delete';
// import {deleteFile} from '../hooks/ApiHooks';
import Moment from 'react-moment';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'rgba(255, 0, 0, 0.54)',
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
  console.log('avatar lenght ', file);
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
              {/* <CardHeader
                avatar={
                  <Avatar
                    avatar={
                      file.avatar.length > 0 ? (
                        <Avatar
                          aria-label='user picture'
                          className={classes.avatar}
                          src={mediaUrl + file.avatar[0].filename}
                          alt='Avatar image'
                          title='Avatar image'
                        />
                      ) : (
                        <Avatar
                          aria-label='user picture'
                          className={classes.avatar}
                        />
                      )
                    }
                  />
                }
                title={file.user ? file.user.username : 'login to see userdata'}
                subheader={
                  <Moment format='DD.MM.YYYY, HH:MM'>{file.time_added}</Moment>
                }
              /> */}
              {/* <Typography
                component="h6"
                variant="h6"
                gutterBottom>
                {file.user ? file.user.username : 'login to see userdata'}
              </Typography>
              <Typography
                component="h6"
                variant="h6"
                gutterBottom>
                {<Moment format='DD.MM.YYYY, HH:MM'>{file.time_added}</Moment>}
              </Typography> */}
              <Typography component='h4' variant='h4' gutterBottom>
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
