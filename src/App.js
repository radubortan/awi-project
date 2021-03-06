import { Routes, Route, Navigate } from 'react-router-dom';
import classes from './App.module.css';
import { useState, useContext, useEffect, Fragment } from 'react';

import Navigation from './components/layout/Navigation';
import Home from './pages/Home';
import Stocks from './pages/Stocks';
import Ingredients from './pages/Ingredients';
import Login from './components/general/Login';
import Settings from './components/general/Settings';
import AuthContext from './store/auth-context';
import AddRecipe from './components/recipes/AddRecipe';
import ViewRecipe from './components/recipes/viewRecipe/ViewRecipe';

function App() {
  const authCtx = useContext(AuthContext);
  const [settingsIsShown, setSettingsIsShown] = useState(false);
  const [loginIsShown, setLoginIsShown] = useState(false);

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      setLoginIsShown(false);
    }
  }, [authCtx.isLoggedIn]);

  const hideSettingsHandler = () => {
    setSettingsIsShown(false);
  };

  const showSettingsHandler = () => {
    setSettingsIsShown(true);
  };

  const hideLoginHandler = () => {
    setLoginIsShown(false);
  };

  const showLoginHandler = () => {
    setLoginIsShown(true);
  };

  return (
    <div className={classes.App}>
      {settingsIsShown && <Settings onClose={hideSettingsHandler} />}
      {loginIsShown && !authCtx.isLoggedIn && (
        <Login onClose={hideLoginHandler} />
      )}
      <Navigation
        onShowSettings={showSettingsHandler}
        onShowLogin={showLoginHandler}
      />
      <div className={classes.main}>
        <Routes>
          <Route path='/' element={<Home />} />
          {authCtx.isLoggedIn && (
            <Fragment>
              <Route path='/ajouter-recette' element={<AddRecipe />} />
              <Route path='/ingredients' element={<Ingredients />} />
              <Route path='/stocks' element={<Stocks />} />
            </Fragment>
          )}
          <Route path='/recipe/:idRecette' element={<ViewRecipe />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
