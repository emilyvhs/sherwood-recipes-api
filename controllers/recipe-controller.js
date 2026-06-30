const Recipe = require('../models/Recipe');

const getAllRecipes = async (req, res) => {

    try {

        const allRecipes = await Recipe.find({});

        if(!allRecipes) {
            return res.status(404).json({
                success: false,
                message: 'Error retrieving recipes from database'
            });
        };

        if(allRecipes.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No recipes found'
            });
        };

        res.status(200).json({
            success: true,
            message: 'All recipes retrieved successfully',
            data: allRecipes
        });


    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal error! Please try again'
        });
    };
};

const getSingleRecipe = async (req, res) => {

    try {

        const getRecipeId = req.params.id;
        const singleRecipe = await Recipe.findById(getRecipeId);

        if(!singleRecipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found'
            });
        };

        res.status(200).json({
            success: true,
            message: 'Recipe retrieved successfully',
            data: singleRecipe
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal error! Please try again'
        });
    };

};

module.exports = {
    getAllRecipes,
    getSingleRecipe,
};