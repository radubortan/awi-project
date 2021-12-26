import React from 'react';
import classes from './SearchBar.module.css';

const submitHandler = (e) => {
  e.preventDefault();
};

function SearchBar(props) {
  return (
    <form className={classes.search} onSubmit={submitHandler}>
      <input
        type='text'
        onChange={props.onChange}
        placeholder='Rechercher...'
        className={classes.searchBar}
      />
    </form>
  );
}

export default SearchBar;
