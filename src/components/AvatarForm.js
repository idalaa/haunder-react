import React, {useEffect, useState, useContext} from 'react';
import PropTypes from 'prop-types';
import useUploadForm from '../hooks/UploadHooks';
import {withRouter} from 'react-router-dom';
import {upload, delTag, addTag, getAvatarImage, useAllMedia, useAllAvatars, deleteFile} from '../hooks/ApiHooks';
import {
  Button,
  Grid,
  CircularProgress,
  Slider,
  Typography,
} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {MediaContext} from '../contexts/MediaContext';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  text: {
    paddingBottom: '20px',
    paddingTop: '20px',
  },
}));

const AvatarForm = ({history}) => {
  const classes = useStyles();
  const [user] = useContext(MediaContext);
  const tag = 'Havatar_' + user.user_id;
  const deleteOldAvatar = async () => {
    const oldAvatar = await getAvatarImage(user.user_id);
    console.log('old', oldAvatar);
    if (oldAvatar.length > 0) deleteFile(oldAvatar[0].file_id);
  };
  // const avatarArray = useAllAvatars().reverse();
  // console.log('AVATARARRAY', avatarArray);

  const [loading, setLoading] = useState(false);

  const doUpload = async () => {
    setLoading(true);
    try {
      const uploadObject = {
        title: 'avatar',
        description: JSON.stringify({
          desc: '',
          filters: {
            brightness: inputs.brightness,
            contrast: inputs.contrast,
            saturation: inputs.saturation,
            sepia: inputs.sepia,
          },
        }),
        file: inputs.file,
      };

      deleteOldAvatar();
      const result = await upload(uploadObject,
          localStorage.getItem('token'), tag);
      console.log('result', result, 'tag', tag);
      setTimeout(() => {
        setLoading(false);
        history.push('/profile');
      }, 2000);
    } catch (e) {
      console.log(e.message);
      // TODO: näytä vihe
    }
  };

  const {
    inputs,
    setInputs,
    // handleInputChange,
    handleSubmit,
    handleFileChange,
    handleSliderChange,
  } = useUploadForm(doUpload);

  useEffect(() => {
    // failriideri tänne
    const reader = new FileReader();

    reader.addEventListener(
        'load',
        () => {
        // convert image file to base64 string
          setInputs((inputs) => {
            return {
              ...inputs,
              dataUrl: reader.result,
            };
          });
        },
        false,
    );

    if (inputs.file !== null) {
      if (inputs.file.type.includes('image')) {
        reader.readAsDataURL(inputs.file);
      } else {
        setInputs((inputs) => {
          return {
            ...inputs,
            dataUrl: 'logo192.png',
          };
        });
      }
    }
  }, [inputs.file, setInputs]);
  console.log('inputs', inputs);

  return (
    <>
      <Grid container>
        <Grid item>
          <ValidatorForm
            onSubmit={handleSubmit}
            instantValidate={false}
            noValidate
          >
            <Grid container>
              <Grid container item>
                <TextValidator
                className={classes.text}
                  fullWidth
                  type='file'
                  name='file'
                  accept='image/*'
                  onChange={handleFileChange}
                />
              </Grid>
              <Grid container item>
                <Button
                  fullWidth
                  color='primary'
                  type='submit'
                  variant='contained'
                >
                  Upload Profile Picture
                </Button>
              </Grid>
            </Grid>
          </ValidatorForm>
          {loading && (
            <Grid item>
              <CircularProgress />
            </Grid>
          )}
          {inputs.dataUrl.length > 0 && (
            <Grid item>
              <img
                style={{
                  filter: `
                 brightness(${inputs.brightness}%)
                 contrast(${inputs.contrast}%) 
                 saturate(${inputs.saturation}%)
                 sepia(${inputs.sepia}%)
                 `,
                  width: '100%',
                }}
                src={inputs.dataUrl}
                alt='preview'
              />
              <Typography>Brightness</Typography>
              <Slider
                name='brightness'
                value={inputs.brightness}
                min={0}
                max={200}
                step={1}
                onChange={handleSliderChange}
              />
              <Typography>Contrast</Typography>
              <Slider
                name='contrast'
                value={inputs.contrast}
                min={0}
                max={200}
                step={1}
                onChange={handleSliderChange}
              />
              <Typography>Saturation</Typography>
              <Slider
                name='saturation'
                value={inputs.saturation}
                min={0}
                max={200}
                step={1}
                onChange={handleSliderChange}
              />
              <Typography>Sepia</Typography>
              <Slider
                name='sepia'
                value={inputs.sepia}
                min={0}
                max={200}
                step={1}
                onChange={handleSliderChange}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
};

AvatarForm.propTypes = {
  history: PropTypes.object,
};

export default withRouter(AvatarForm);
