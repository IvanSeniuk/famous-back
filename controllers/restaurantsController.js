const { Restaurants } = require("../models/models");
const axios = require("../axios/axiosPoster");

class RestaurantsController {
	async create(req, res) {
		const { email } = req.body;
		const restaurants = await Restaurants.create({ email });
		return res.json(restaurants);
	}
	async getAll(req, res) {
		const { data } = await axios.get(
			`/access.getSpots?token=${process.env.TOKEN_POSTER}`
		);
		return res.json(data);
	}
}

module.exports = new RestaurantsController();
