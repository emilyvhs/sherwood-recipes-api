const mongoose = require('mongoose');

const ChefSchema = new mongoose.Schema({
    name: String,
    userId: Number
});

module.exports = mongoose.model('Chef', ChefSchema);