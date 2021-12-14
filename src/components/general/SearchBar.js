import React from 'react';
import { BsSearch } from 'react-icons/bs';
import classes from './SearchBar.module.css';

function SearchBar(props) {
  return (
    <form className={classes.search}>
      <input
        type='text'
        onChange={props.searchBarFiltering}
        placeholder='Rechercher...'
        className={classes.searchBar}
      />
      <button type='button' className={classes.button}>
        <BsSearch />
      </button>
    </form>
  );
}

export default SearchBar;
