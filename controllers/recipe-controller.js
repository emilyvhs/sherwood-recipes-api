const { default: mongoose } = require('mongoose');
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

        res.status(201).json({
            success: true,
            message: 'New recipe added successfully',
            data: newRecipe
        });

    } catch(error) {

        if (error instanceof mongoose.Error.ValidationError) {
            console.log(error.errors);
            res.status(400).json({
                success: false,
                message: 'New recipe could not be created - please fix validation errors',
                errors: error.errors
            });

        } else {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Internal error! Please try again'
            });
        };
    };
};

const updateRecipe = async (req, res) => {

    try {

        const getRecipeId = req.params.id;
        const updatedRecipeData = req.body;

        const updatedRecipe = await Recipe.findByIdAndUpdate(getRecipeId, updatedRecipeData, { returnDocument: 'after', runValidators: true});

        res.status(201).json({
            success: true,
            message: 'Recipe updated successfully!',
            data: updatedRecipe
        });

    } catch(error) {

        if (error instanceof mongoose.Error.ValidationError) {
            console.log(error);
            res.status(400).json({
                success: false,
                message: 'Recipe could not be updated - please fix validation errors',
                errors: error.errors
            });

        } else {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Internal error! Please try again'
            });
        };
    };
};

const deleteRecipe = async (req, res) => {

    try {
        const getRecipeId = req.params.id;
        const deletedRecipe = await Recipe.findByIdAndDelete(getRecipeId);

        if(!deletedRecipe) {
            return res.status(404).json({
                success: false,
                message: 'Recipe not found!'
            });
        };

        res.status(200).json({
            success: true,
            message: 'Recipe deleted',
            data: deletedRecipe
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
    addRecipe,
    updateRecipe,
    deleteRecipe,
};