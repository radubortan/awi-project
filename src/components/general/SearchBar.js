import React from 'react';
import { BsSearch } from 'react-icons/bs';

function SearchBar(props) {
  return (
    <div class='container'>
      <input
        type='text'
        onChange={props.searchBarFiltering}
        placeholder='Search..'
      />
      <button type='button' class='btn btn-elegant'>
        <BsSearch />
      </button>
    </div>
  );
}

export default SearchBar;
