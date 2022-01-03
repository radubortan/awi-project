import classes from './Card.module.css';

const Card = (props) => {
  const style = props.className;

  return <div className={`${style} ${classes.card}`}>{props.children}</div>;
};

export default Card;
