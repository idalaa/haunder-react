import React from 'react';
import {Typography} from '@material-ui/core';
import MyTable from '../components/MyTable';

const MyFiles = () => {
    return (
        <>
            <Typography
                component="h1"
                variant="h2"
                gutterBottom>My Files</Typography>
            <MyTable />
        </>
    );
};

export default MyFiles;
