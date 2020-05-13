import React,  { useContext } from 'react';
import {Typography, useMediaQuery,} from '@material-ui/core';
import MyTable from '../components/MyTable';
import { useAllMedia } from '../hooks/ApiHooks';
import MediaGrid from '../components/MediaGrid';
import { MediaContext } from '../contexts/MediaContext';

const MyFiles = () => {
  const [user] = useContext(MediaContext);
  const matches = useMediaQuery('(min-width:697px)');
  const picArray = useAllMedia('haunderTest');
  console.log(picArray);
  let newPicArray = [];
  if (picArray.length > 0 && user !== null) {
    newPicArray = picArray.filter((pic) => pic.user_id === user.user_id);
  }

  return (
    <>
      <Typography
        component="h1"
        variant="h4"
        gutterBottom>My Files</Typography>
      <MediaGrid mediaArray={newPicArray}/>
    </>
  );
};

export default MyFiles;
