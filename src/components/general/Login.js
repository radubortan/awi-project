import classes from './Login.module.css';
import Button from './Button';
import Modal from '../ui/Modal';
import { Fragment, useRef, useState, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHadError] = useState(false);

  const validateInput = (enteredEmail, enteredPassword) => {
    setEmailIsValid(true);
    setPasswordIsValid(true);
    let emailOk = true;
    let passwordOk = true;
    if (!enteredEmail.toLowerCase().match(/^\S+@\S+\.\S+$/)) {
      setEmailIsValid(false);
      emailOk = false;
    }
    if (!(enteredPassword.trim().length > 0)) {
      setPasswordIsValid(false);
      passwordOk = false;
    }
    return emailOk && passwordOk;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setHadError(false);
    const url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBs8lRnKg3r90pb-pGbndKFSrT74F0S2QY';
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    if (validateInput(enteredEmail, enteredPassword)) {
      setIsLoading(true);
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
          } else {
            setHadError(true);
          }
        })
        .then((data) => {
          authCtx.login(data.idToken);
          navigate('/');
        })
        .catch(() => {
          setHadError(true);
        });
    }
  };

  return (
    <Modal onClose={props.onClose}>
      <h1 className={classes.title}>Connexion</h1>
      {hasError && (
        <p className={classes.connectionError}>Connexion a échoué</p>
      )}
      <form className={classes.form}>
        <div className={`row ${classes.information}`}>
          <label className={classes.label} htmlFor='email'>
            Email
          </label>
          <input
            className={classes.input}
            type='email'
            id='email'
            ref={emailInputRef}
          />
          {!emailIsValid && (
            <p className={classes.errorMessage}>L'email n'est pas valide.</p>
          )}
        </div>
        <div className={`row ${classes.information}`}>
          <label className={classes.label} htmlFor='password'>
            Mot de Passe
          </label>
          <input
            className={classes.input}
            type='password'
            id='password'
            ref={passwordInputRef}
          />
          {!passwordIsValid && (
            <p className={classes.errorMessage}>
              Veuillez entrer le mot de passe.
            </p>
          )}
        </div>
      </form>
      <div className={classes.buttons}>
        {!isLoading && (
          <Fragment>
            <Button className='confirmButton' onClick={submitHandler}>
              Connexion
            </Button>
            <Button className='cancelButton' onClick={props.onClose}>
              Annuler
            </Button>
          </Fragment>
        )}
        {isLoading && <p className={classes.loading}>Chargement...</p>}
      </div>
    </Modal>
  );
};

export default Login;
