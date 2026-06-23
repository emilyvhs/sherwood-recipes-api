const express = require('express');

const {
    getAllRecipes,
} = require('../controllers/recipe-controller');

const router = express.Router();

router.get('/', getAllRecipes);

module.exports = router;