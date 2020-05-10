import React from 'react';
import { Typography } from '@material-ui/core';
import MyGroupTable from '../components/MyGroupTable';
import GroupTable from '../components/MyGroupTable';

const MyGroups = () => {
  return (
    <>
      <Typography component='h1' variant='h2' gutterBottom>
        Find groups
      </Typography>
      <MyGroupTable />
    </>
  );
};

export default MyGroups;
