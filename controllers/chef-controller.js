const Chef = require('../models/Chef');

const getAllChefs = async (req, res) => {

    try {

        const allChefs = await Chef.find({});

        if(!allChefs) {
            return res.status(404).json({
                success: false,
                message: 'Error retrieving chef names from database'
            });
        };

        if(allChefs.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No chefs found'
            });
        };

        res.status(200).json({
            success: true,
            message: 'Chef names retrieved successfully',
            data: allChefs
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
    getAllChefs,
};