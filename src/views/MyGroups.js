import React from 'react';
import { Typography } from '@material-ui/core';
import MyGroupTable from '../components/MyGroupTable';
import GroupTable from '../components/MyGroupTable';

const MyGroups = () => {
  return (
    <>
      <Typography component='h1' variant='h4' gutterBottom>
        My groups
      </Typography>
      <GroupTable />
    </>
  );
};

export default MyGroups;
