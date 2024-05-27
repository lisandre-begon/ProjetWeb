const express = require('express');
const { getRecipes, addRecipe, removeRecipe, getIngredientsInRecipe } = require('../controllers/recipeControllers');

const router = express.Router();

router.get('/', getRecipes);
router.post('/', addRecipe);
router.delete('/:id', removeRecipe);
router.get('/:id_recipe/ingredients', getIngredientsInRecipe); // Route pour obtenir les ingrédients d'une recette

module.exports = router;
