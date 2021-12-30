import classes from './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import { Fragment, useContext, useEffect, useState } from 'react';
import AuthContext from '../../store/auth-context';
import Modal from '../ui/Modal';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';

const Navigation = (props) => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const [showModal, setShowModal] = useState(false);
  const hideModalHandler = () => {
    setShowModal(false);
  };
  const showModalHandler = () => {
    setShowModal(true);
  };

  //code for hiding menu when screen becomes big
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });

  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  useEffect(() => {
    if (screenSize.dynamicWidth > 700 && showModal) {
      setShowModal(false);
    }
    window.addEventListener('resize', setDimension);

    return () => {
      window.removeEventListener('resize', setDimension);
    };
  }, [screenSize]);

  const logoutHandler = () => {
    authCtx.logout();
  };

  const loggedInNav = (
    <Fragment>
      <li>
        <NavLink
          to='/'
          className={(data) => (data.isActive ? classes.active : '')}
          onClick={hideModalHandler}
        >
          Accueil
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/stocks'
          className={(data) => (data.isActive ? classes.active : '')}
          onClick={hideModalHandler}
        >
          Stocks
        </NavLink>
      </li>
      <li>
        <NavLink
          to='/ingredients'
          className={(data) => (data.isActive ? classes.active : '')}
          onClick={hideModalHandler}
        >
          Ingrédients
        </NavLink>
      </li>
      <li
        onClick={() => {
          props.onShowSettings();
          hideModalHandler();
        }}
        className={classes.settings}
      >
        Paramètres
      </li>
      <li
        onClick={() => {
          logoutHandler();
          hideModalHandler();
        }}
        className={classes.settings}
      >
        Déconnexion
      </li>
    </Fragment>
  );

  return (
    <header className={classes.header}>
      <div>
        <NavLink to='/' className={classes.logo}>
          PolyCook
        </NavLink>
      </div>

      <nav className={classes.nav}>
        {/*hamburger menu*/}
        {isLoggedIn && (
          <button className={classes.menuBtn} onClick={showModalHandler}>
            <GiHamburgerMenu size={30} />
          </button>
        )}
        {/*nav for big screen*/}
        <ul className={classes.bigScreenNav}>
          {!isLoggedIn && (
            <ul>
              <li onClick={props.onShowLogin} className={classes.settings}>
                Connexion
              </li>
            </ul>
          )}
          <ul>{isLoggedIn && loggedInNav}</ul>
        </ul>
        {/*connection button for small screen*/}
        <div className={classes.smallScreenLogin}>
          {!isLoggedIn && (
            <ul>
              <li onClick={props.onShowLogin} className={classes.settings}>
                Connexion
              </li>
            </ul>
          )}
        </div>
        {/*nav for small screen*/}
        {showModal && isLoggedIn && (
          <Modal onClose={hideModalHandler}>
            <button onClick={hideModalHandler} className={classes.closeBtn}>
              <AiOutlineClose size={30} />
            </button>
            <ul className={classes.smallScreenLinks}>{loggedInNav}</ul>
          </Modal>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
