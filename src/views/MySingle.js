import React from 'react';
import PropTypes from 'prop-types';
import {useSingleMedia} from '../hooks/ApiHooks';
import {Typography, Paper, Card, CardContent, IconButton, makeStyles} from '@material-ui/core';
import BackButton from '../components/BackButton';
import Media from '../components/Media';
import CommentTable from '../components/CommentTable';
import CommentForm from './CommentForm';

import {Link as RouterLink} from 'react-router-dom';
// import PageviewIcon from '@material-ui/icons/Pageview';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import {deleteFile} from '../hooks/ApiHooks';
import Moment from 'react-moment';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'rgba(255, 0, 0, 0.54)',
  },
}));


const Single = ({match, myfiles}) => {
  const classes = useStyles();
  console.log('match', match.params.id);
  const file = useSingleMedia(match.params.id);
  console.log('file', file);
  let description = undefined;
  if (file !== null) {
    description = (JSON.parse(file.description));
  }

  return (
    <>
      {file !== null &&
        <>
          <BackButton />
          <Card >
            <Paper style={{boxShadow: 'none'}}>
              {description &&
                <Media file={file} description={description} />
              }
            </Paper>
            <CardContent>
              {/* avatar={
                    file.avatar.length > 0 ? (
                      <Avatar
                        aria-label='user picture'
                        src={mediaUrl + file.avatar[0].filename}
                        alt='Avatar image'
                        title='Avatar image'
                      />
                    ) : (
                      <Avatar
                        aria-label='user picture'
                      />
                    )
                  } */}

              <>
                <IconButton
                  aria-label={`Modify file`}
                  component={RouterLink}
                  to={'/modify/' + file.file_id}
                  className={classes.icon}
                >
                  <CreateIcon fontSize="large" />
                </IconButton>
                <IconButton
                  aria-label={`Delete file`}
                  onClick={() => {
                    const delOK = window.confirm('Do you really want to delete?');
                    if (delOK) {
                      deleteFile(file.file_id);
                    }
                  }}
                  component={RouterLink}
                    to='/profile'
                  className={classes.icon}
                >
                  <DeleteIcon fontSize="large" />
                </IconButton>
              </>
              <Typography
                component="h6"
                variant="h6"
                gutterBottom>
                {<Moment format='DD.MM.YYYY, HH:MM'>{file.time_added}</Moment>}
              </Typography>
              <Typography
                component="h4"
                variant="h4"
                gutterBottom>{file.title}
              </Typography>
              <Typography
                component="h5"
                variant="h5"
                gutterBottom>
                {description.desc}
              </Typography>
            </CardContent>
            <CardContent>
              <CommentForm fileId = {file.file_id}/>
              <CommentTable file ={file.file_id}/>
            </CardContent>
          </Card>
        </>
      }
    </>
  );
};

Single.propTypes = {
  match: PropTypes.object,
  myfiles: PropTypes.bool,
};


export default Single;
