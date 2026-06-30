const express = require('express');

const {
    getAllRecipes,
    getSingleRecipe,
} = require('../controllers/recipe-controller');

const router = express.Router();

router.get('/', getAllRecipes);
router.get('/:id', getSingleRecipe);

module.exports = router;