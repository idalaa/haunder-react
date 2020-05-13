import React from 'react';
import PropTypes from 'prop-types';
import {useSingleMedia} from '../hooks/ApiHooks';
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
import Media from '../components/Media';
import CommentTable from '../components/CommentTable';
import CommentForm from '../components/CommentForm';
import Moment from 'react-moment';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'rgba(255, 0, 0, 0.54)',
  },
}));

const Single = ({match, myfiles}) => {
  const classes = useStyles();
  const file = useSingleMedia(match.params.id);
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
            <Paper style={{boxShadow: 'none'}}>
              {description && <Media file={file} description={description} />}
            </Paper>
            <CardContent>
              <CardHeader
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
              />
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

Single.propTypes = {
  match: PropTypes.object,
  myfiles: PropTypes.bool,
};

export default Single;
