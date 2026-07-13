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

const addRecipe = async (req, res) => {

    try {

        const data = req.body;

        if(!data) {
            res.status(404).json({
                success: false,
                message: 'No recipe data provided'
            });
        };

        const newRecipe = await Recipe.create(data);

        if(!newRecipe) {
            res.status(500).json({
                success: false,
                message: 'New recipe could not be created - please try again'
            });
        };

        if(newRecipe.errors) {
            res.status(422).json({
                success: false,
                message: 'New recipe could not be created - please fix validation errors',
                errors: newRecipe.errors,
            });
            console.log(newRecipe.errors);
        };       

        res.status(201).json({
            success: true,
            message: 'New recipe added successfully',
            data: newRecipe
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal error! Please try again'
        });
    };
};

const updateRecipe = async (req, res) => {

    try {

        const getRecipeId = req.params.id;
        const updatedRecipeData = req.body;

        if(!updatedRecipeData) {
            return res.status(400).json({
                success: false,
                message: 'No data sent - nothing to update!'
            });
        };

        const updatedRecipe = await Recipe.findByIdAndUpdate(getRecipeId, updatedRecipeData, { returnDocument: 'after', runValidators: true});

        if(!updatedRecipe) {
            return res.status(500).json({
                success: false,
                message: 'Recipe could not be updated - please try again'
            });
        };

        if(updatedRecipe.errors) {
            res.status(422).json({
                success: false,
                message: 'Recipe could not be updated - please fix validation errors',
                errors: updatedRecipe.errors
            });
            console.log(updatedRecipe.errors);
        };

        res.status(201).json({
            success: true,
            message: 'Recipe updated successfully',
            data: updatedRecipe
        });

    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal error! Please try again'
        });
    }
}

module.exports = {
    getAllRecipes,
    getSingleRecipe,
    addRecipe,
    updateRecipe,
};