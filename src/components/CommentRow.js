import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Card,
  CardHeader,
  Avatar,
  Typography,
  Container,
  Grid,
  Paper,
  CardContent,
  Divider,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import TimeConvert from './TimeConvert';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: 0,
  },
  paper: {
    margin: '1rem',
    padding: 0,
    backgroundColor: 'rgb(236, 236, 236)',
  },
  griditem: {
    padding: '0 16px',
  },
}));
const CommentRow = ({ file }) => {
  console.log('commentRow');
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container wrap='nowrap' spacing={2}>
          <Grid item>
            <CardHeader
              className={classes.griditem}
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
              title={file.user ? file.user.username : 'log in to see user data'}
              subheader={<TimeConvert time={file.time_added} />}
            />
          </Grid>
          <Divider orientation='vertical' flexItem />
          <Grid item xs>
            <CardContent className={classes.griditem}>
              <Typography component='p' variant='body1'>
                {file.comment}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

CommentRow.propTypes = {
  file: PropTypes.any,
  users: PropTypes.object,
};

export default CommentRow;
