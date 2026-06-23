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
            message: 'All recipes retrived successfully',
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

module.exports = {
    getAllRecipes,
};