import { Fragment } from 'react';
import Card from '../ui/Card';
import Checkbox from '../general/Checkbox';
import { useState, useEffect } from 'react';
import classes from './CategoriesCheckbox.module.css';

const CategoriesCheckBox = (props) => {
  const [checkedCategories, setCheckedCategories] = useState([]);

  const checkboxHandler = (e) => {
    if (e.target.checked) {
      setCheckedCategories((prevState) => {
        return [...prevState, e.target.value];
      });
    } else {
      const results = checkedCategories.filter((category) => {
        return category !== e.target.value;
      });
      setCheckedCategories(results);
    }
  };

  useEffect(() => {
    props.onChange(checkedCategories);
  }, [checkedCategories]);

  return (
    <Fragment>
      <h3>{props.name}</h3>
      <Card>
        <ul className={classes.checkboxList}>
          {props.categories.map((categorie) => {
            return (
              <li>
                <Checkbox
                  label={categorie[props.labelIdentifier]}
                  onChange={checkboxHandler}
                />
              </li>
            );
          })}
        </ul>
      </Card>
    </Fragment>
  );
};

export default CategoriesCheckBox;
