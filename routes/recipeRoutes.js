const express = require('express');
const {
    createRecipe,
    getPublicRecipes,
    getMyRecipes,
    updateRecipe,
    deleteRecipe
} = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .post(protect, createRecipe)
    .get(getPublicRecipes);

router.route('/my').get(protect, getMyRecipes);

router.route('/:id')
    .put(protect, updateRecipe)
    .delete(protect, deleteRecipe);

module.exports = router;
