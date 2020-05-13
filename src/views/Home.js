import React from 'react';
import MediaTable from '../components/MediaTable';
import {useAllMedia} from '../hooks/ApiHooks';
// import MediaGrid from '../components/MediaGrid';

const Home = () => {
  const picArray = useAllMedia();
  return (
    <>
      <MediaTable mediaArray={picArray}/>
    </>
  );
};

export default Home;
