import { Routes, Route } from 'react-router-dom';
import classes from './App.module.css';

import Navigation from './components/layout/Navigation';
import Home from './pages/Home';
import Parameters from './pages/Parameters';
import Stocks from './pages/Stocks';
import Ingredients from './pages/Ingredients';

function App() {
  return (
    <div className={classes.App}>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ingredients' element={<Ingredients />} />
        <Route path='/stocks' element={<Stocks />} />
        <Route path='/parametres' element={<Parameters />} />
      </Routes>
    </div>
  );
}

export default App;
