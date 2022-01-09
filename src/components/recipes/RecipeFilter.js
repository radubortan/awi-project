import Card from "../ui/Card";
import CategoriesCheckBox from "../general/CategoriesCheckBox";
import { useState, useEffect } from "react";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import classes from "./RecipeFilter.module.css";

function RecipeFilter(props) {
  const ingredientsCollectionRef = collection(db, "ingredients");
  const [ingredients, setIngredients] = useState([]);

  const CATEGORIES = [
    {
      nomCatRecette: "Entrée",
    },
    {
      nomCatRecette: "Principal",
    },
    {
      nomCatRecette: "Dessert",
    },
  ];

  const sortIngredients = (a, b) => {
    const textA = a.nomIng;
    const textB = b.nomIng;
    return textA < textB ? -1 : textA > textB ? 1 : 0;
  };

  useEffect(() => {
    const getIngredients = async () => {
      const data = await getDocs(ingredientsCollectionRef);
      const loadedIngredients = [];
      data.docs.map((doc) => {
        return loadedIngredients.push({
          nomIng: doc.data().nomIng,
        });
      });
      loadedIngredients.sort(sortIngredients);
      setIngredients(loadedIngredients);
    };
    getIngredients();
  }, []);

  return (
    <Card>
      <div className={`row ${classes.filters}`}>
        <div className="col-6 col-sm-6 col-md-12">
          <CategoriesCheckBox
            name="Catégorie repas"
            onChange={props.categoriesFiltering}
            categories={CATEGORIES}
            labelIdentifier="nomCatRecette"
          />
        </div>
        <div className="col-6 col-sm-6 col-md-12">
          <CategoriesCheckBox
            name="Ingrédients"
            onChange={props.ingredientsFiltering}
            categories={ingredients}
            labelIdentifier="nomIng"
          />
        </div>
      </div>
    </Card>
  );
}

export default RecipeFilter;
