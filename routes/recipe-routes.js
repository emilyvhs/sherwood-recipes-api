const express = require('express');

const {
    getAllRecipes,
    getSingleRecipe,
    addRecipe,
} = require('../controllers/recipe-controller');

const router = express.Router();

router.get('/', getAllRecipes);
router.get('/:id', getSingleRecipe);
router.post('/add', addRecipe);

module.exports = router;