require('dotenv').config();
const express = require('express');
const app = express();
const connectToDB = require('./database/db');
const recipeRoutes = require('./routes/recipe-routes');
const chefRoutes = require('./routes/chef-routes');
const userRoutes = require('./routes/user-routes');
const port = process.env.PORT;
const cors = require('cors');

connectToDB();

app.use(express.json());
app.use(cors());
app.use('/api/recipes', recipeRoutes);
app.use('/api/chefs', chefRoutes);
app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`Server is connected at ${port}`);
});