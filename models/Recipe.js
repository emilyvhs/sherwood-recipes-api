const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: String,       
    portions: Number,    
    ingredients: Array,
    quantities: Array,
    chefNames: Array,
    recipeLocation: String,
    lastCooked: Date, 
});

module.exports = mongoose.model('Recipe', RecipeSchema);