import React from 'react';
import MediaTable from '../components/MediaTable';
import {useAllMedia} from '../hooks/ApiHooks';

const Home = () => {
  const picArray = useAllMedia('haunderTest');
  return (
    <>
      <MediaTable mediaArray={picArray}/>
    </>
  );
};

export default Home;
