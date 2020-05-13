import React from 'react';
import { Typography } from '@material-ui/core';
import MyGroupTable from '../components/MyGroupTable';
import { useAllGroups } from '../hooks/ApiHooks';
import { withRouter } from 'react-router-dom';

const MyGroups = () => {
  const picArray = useAllGroups();
  return (
    <>
      <Typography component='h1' variant='h4' gutterBottom>
        My groups
      </Typography>
      <MyGroupTable mediaArray={picArray} />
    </>
  );
};

export default withRouter(MyGroups);
