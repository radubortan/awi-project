import React, { useEffect, useState } from 'react';
import classes from './IngredientCategoryFilter.module.css';

function IngredientCategoryFilter(props) {
  const CATEGORIES = [
    {
      nomCatIng: 'Fruit',
    },
    {
      nomCatIng: 'Légume',
    },
  ];

  const [checkedCategories, setCheckCategories] = useState([]);
  const categoriesFiltering = (e) => {
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
    <div class='container card'>
      <h3>Catégories</h3>
      <div className='card'>
        <ul>
          {CATEGORIES.map((categorie) => {
            return (
              <li>
                <div class='form-check'>
                  <input
                    class='form-check-input'
                    type='checkbox'
                    value={categorie.nomCatIng}
                    id={categorie.nomCatIng}
                    onChange={categoriesFiltering}
                  />
                  <label class='form-check-label' for={categorie.nomCatIng}>
                    {categorie.nomCatIng}
                  </label>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div class='row'>
        <div class='col-md-12'>
          <ul className={classes.alignement}>
            <li>
              <input
                type='radio'
                class='custom-control-input'
                id='allIngredients'
                name='typeIngredient'
                checked
              />
              <label class='custom-control-label' for='allIngredients'>
                Tous
              </label>
            </li>
            <li>
              <input
                type='radio'
                class='custom-control-input'
                id='allergen'
                name='typeIngredient'
              />
              <label class='custom-control-label' for='allergen'>
                Allergène
              </label>
            </li>
            <li>
              <input
                type='radio'
                class='custom-control-input'
                id='nonAllergen'
                name='typeIngredient'
              />
              <label class='custom-control-label' for='nonAllergen'>
                Non Allergène
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default IngredientCategoryFilter;
