import classes from './Navigation.module.css';
import { NavLink } from 'react-router-dom';

const Navigation = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>PolyCook</div>
      <nav className={classes.nav}>
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
          <li>
            <NavLink
              to='/logout'
              className={(data) => (data.isActive ? classes.active : '')}
            >
              Déconnexion
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
