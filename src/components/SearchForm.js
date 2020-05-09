import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import MediaRow from './MediaRow';

const people = [
  {
    name: 'James',
    age: 31,
  },
  {
    name: 'John',
    age: 45,
  },
  {
    name: 'Paul',
    age: 65,
  },
  {
    name: 'Ringo',
    age: 49,
  },
  {
    name: 'George',
    age: 34,
  },
];

const SearchForm = (data) => {
//   const dataArray = useAllMedia();
  console.log('dataAeeay', data.data);
  console.log('peep', people);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    const results = data.data.filter((result) =>
      (result.description).toLowerCase().includes(searchTerm),
    );
    console.log('results', results);
    setSearchResults(results);
  }, [searchTerm]);
  return (
    <div className="Search">
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <ul>
        {searchResults.map((item) => (
          <li key={item.file_id}>
            <MediaRow file ={item}/>
            {console.log('id', item.file_id)}
          </li>
        ))}
      </ul>
    </div>
  );
};

SearchForm.propTypes = {

};

export default SearchForm;

