const express = require('express');

const {
    getAllChefs,
} = require('../controllers/chef-controller');

const router = express.Router();

router.get('/', getAllChefs);

module.exports = router;