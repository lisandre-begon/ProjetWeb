import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeList from '../components/RecipeList';
import '../styles/Recipe.scss';

function RecipePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/recipes')
      .then(response => setRecipes(response.data))
      .catch(error => console.error(`Error: ${error}`));
  }, []);

  return (
    <div className="recipe-page">
      <RecipeList recipes={recipes} />
    </div>
  );
}

export default RecipePage;
