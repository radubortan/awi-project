import classes from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import AuthContext from '../../store/auth-context';

const Navigation = (props) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  const loggedInNav = (
    <ul>
      <li>
        <NavLink
          to='/'
          className={(data) => (data.isActive ? classes.active : '')}
        >
          Accueil
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/stocks'
          className={(data) => (data.isActive ? classes.active : '')}
        >
          Stocks
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/ingredients'
          className={(data) => (data.isActive ? classes.active : '')}
        >
          Ingrédients
        </NavLink>
      </li>
      <li onClick={props.onShowSettings} className={classes.settings}>
        Paramètres
      </li>
      <li onClick={logoutHandler} className={classes.settings}>
        Déconnexion
      </li>
    </ul>
  );

  return (
    <header className={classes.header}>
      <div>
        <NavLink to='/' className={classes.logo}>
          PolyCook
        </NavLink>
      </div>
      <nav className={classes.nav}>
        <ul>
          {!isLoggedIn && (
            <ul>
              <li onClick={props.onShowLogin} className={classes.settings}>
                Connexion
              </li>
            </ul>
          )}
          {isLoggedIn && loggedInNav}
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
