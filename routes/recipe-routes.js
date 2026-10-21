const express = require('express');

const {
    getAllRecipes,
    getSingleRecipe,
    addRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipesByUser,
} = require('../controllers/recipe-controller');

const router = express.Router();

router.get('/', getAllRecipes);
router.get('/:id', getSingleRecipe);
router.post('/add', addRecipe);
router.put('/update/:id', updateRecipe);
router.delete('/delete/:id', deleteRecipe);
router.get('/user/:userId', getRecipesByUser);

module.exports = router;