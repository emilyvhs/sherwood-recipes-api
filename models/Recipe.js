const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide a name for this recipe'],
        minLength: [2, 'Recipe name too short! Must be longer than 1 character'],
        maxLength: [50, 'Recipe name too long! Must be shorter than 50 characters']
    },       
    portions: Number,
    ingredients: {
        type: Array,
        validate: {
            validator: v => Array.isArray(v) && v.length > 0,
            message: 'Please provide at least one ingredient for this recipe'
        }
    },
    chefNames: {
        type: Array,
        validate: {
            validator: v => Array.isArray(v) && v.length > 0,
            message: 'Please provide at least one chef who can cook this recipe'
        }
    },
    recipeLocation: String,
    lastCooked: {
        type: Date,
        required: [true, 'Please provide the date that you most recently cooked this recipe']
    }
});

module.exports = mongoose.model('Recipe', RecipeSchema);