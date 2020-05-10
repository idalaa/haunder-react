import React, {useState, useEffect} from 'react';
import MediaRow from './MediaRow';

const SearchForm = (data) => {
  console.log('dataAeeay', data.data);
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

export default SearchForm;

