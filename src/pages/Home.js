import React from 'react';
import SearchBar from '../components/general/SearchBar';
import Card from '../components/ui/Card';

function Home() {
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-3'></div>
        <div className='col-6'>
          <SearchBar />
        </div>
        <div className='col-3'></div>
      </div>
      <div className='container-fluid'>
        <div class='row'>
          <div class='col-3'></div>
          <div class='col-6'>
            <Card />
          </div>
          <div class='col-3'></div>
        </div>
      </div>
    </div>
  );
}

export default Home;
