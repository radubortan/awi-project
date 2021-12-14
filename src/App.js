import classes from './App.module.css';
import Navigation from './components/Navigation';
import Home from './views/Home';
import { Routes, Route } from 'react-router-dom';
import Parameters from './views/Parameters';
import Stocks from './views/Stocks';
import Ingredients from './views/ingredients/Ingredients';

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
