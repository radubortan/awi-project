import React from 'react';
import {  Link } from "react-router-dom";
const Navigation= () =>{
    const navTitleClass = "nav-item nav-link"
  return (
    <nav class="navbart navbar-light bg-light">
      <div class="container-fluid">
        <ul class="nav">
          <li>
            <Link className={navTitleClass} to="/">Accueil</Link>
          </li>
          <li>
            <Link className={navTitleClass} to="/stocks">Stocks</Link>
          </li>
          <li>
            <Link className={navTitleClass} to="/ingredients">Ingrédients</Link>
          </li>
          <li>
            <Link className={navTitleClass} to="/parametres">Paramètres</Link>
          </li>
          <li>
            <Link className={navTitleClass} to="/Logout">Se déconnecter</Link>
          </li>
        </ul>
      </div>
</nav>

  );
}

export default Navigation;