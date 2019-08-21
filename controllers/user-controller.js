const userService = require('../services/user-service');

module.exports = class UserController {

    static async findProperties(req, res){

        const longtidude = req.query.longtidude;
        const latidude = req.query.latidude;
        const searchQuery = req.query.search_query;

        let props = await userService.findProperties(longtidude, latidude, searchQuery);

        res.send(props);

    }

    static execBookingRequest(req, res){

        const propertyObject = req.query.prop;

        //call helper

    }

}