import React from 'react';
import SearchForm from '../components/SearchForm';
import {useAllMedia} from '../hooks/ApiHooks';
import BackButton from '../components/BackButton';

const Search = () => {
  const dataArray = useAllMedia('haunderTest');
  return (
    <>
      <BackButton />
      <SearchForm data = {dataArray}/>
    </>
  );
};

export default Search;
