import { Routes, Route } from 'react-router-dom';
import classes from './App.module.css';
import { useState } from 'react';

import Navigation from './components/layout/Navigation';
import Home from './pages/Home';
import Parameters from './pages/Parameters';
import Stocks from './pages/Stocks';
import Ingredients from './pages/Ingredients';
import AddIngredient from './components/ingredients/AddIngredient';
import Settings from './components/general/Settings';

function App() {
  const [settingsIsShown, setSettingsIsShown] = useState(false);

  const hideSettingsHandler = () => {
    setSettingsIsShown(false);
  };

  const showSettingsHandler = () => {
    setSettingsIsShown(true);
  };

  return (
    <div className={classes.App}>
      {settingsIsShown && <Settings onClose={hideSettingsHandler} />}
      <Navigation onShowSettings={showSettingsHandler} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ingredients' element={<Ingredients/>} />
        <Route path='/stocks' element={<Stocks />} />
        <Route path='/parametres' element={<Parameters />} />
      </Routes>
    </div>
  );
}

export default App;
