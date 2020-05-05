import React, { useState } from 'react';
import { Typography } from '@material-ui/core';
import GroupTable from '../components/GroupRow';

import PropTypes from 'prop-types';

const groupUrl = 'http://media.mw.metropolia.fi/wbma/favourites/';

const Groups = () => {
  return (
    <>
      <Typography component='h1' variant='h2' gutterBottom>
        Join Group
      </Typography>
      <GroupTable />
    </>
  );
};

export default Groups;
