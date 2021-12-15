import { Fragment } from 'react';
import Card from '../ui/Card';
import Checkbox from '../general/Checkbox';
import { useState, useEffect } from 'react';
import classes from './IngredientCategoryFilter.module.css';

const IngredientCategoryFilter = (props) => {
  const [checkedCategories, setCheckCategories] = useState([]);
  const checkboxHandler = (e) => {
    if (e.target.checked) {
      setCheckCategories((prevState) => {
        return [...prevState, e.target.value];
      });
    } else {
      const results = checkedCategories.filter((nomCatIng) => {
        return nomCatIng !== e.target.value;
      });
      setCheckCategories(results);
    }
  };

  useEffect(() => {
    props.categoriesFiltering(checkedCategories);
  }, [checkedCategories]);

  return (
    <Fragment>
      <h3>Catégories</h3>
      <Card>
        <ul className={classes.checkboxList}>
          {props.CATEGORIES.map((categorie) => {
            return (
              <Checkbox
                nomCatIng={categorie.nomCatIng}
                categoriesFiltering={checkboxHandler}
              />
            );
          })}
        </ul>
      </Card>
    </Fragment>
  );
};

export default IngredientCategoryFilter;
