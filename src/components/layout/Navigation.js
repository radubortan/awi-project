// import React from 'react';
// import {  Link } from "react-router-dom";
// const Navigation= () =>{
//     const navTitleClass = "nav-item nav-link"
//   return (
//     <nav class="navbart navbar-light bg-light">
//       <div class="container-fluid">
//         <ul class="nav">
//           <li>
//             <Link className={navTitleClass} to="/">Accueil</Link>
//           </li>
//           <li>
//             <Link className={navTitleClass} to="/stocks">Stocks</Link>
//           </li>
//           <li>
//             <Link className={navTitleClass} to="/ingredients">Ingrédients</Link>
//           </li>
//           <li>
//             <Link className={navTitleClass} to="/parametres">Paramètres</Link>
//           </li>
//           <li>
//             <Link className={navTitleClass} to="/Logout">Se déconnecter</Link>
//           </li>
//         </ul>
//       </div>
// </nav>

//   );
// }

// export default Navigation;

import classes from './Navigation.module.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
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
          <li>
            <NavLink
              to='/parametres'
              className={(data) => (data.isActive ? classes.active : '')}
            >
              Paramètres
            </NavLink>
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
