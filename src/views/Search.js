import React from 'react';
import SearchForm from '../components/SearchForm';
import {useAllMedia} from '../hooks/ApiHooks';

const Search = () => {
  const dataArray = useAllMedia('haunderTest');
  return (
    <div className="Search">
      <SearchForm data = {dataArray}/>
    </div>
  );
};


export default Search;
