const { Subscription } = require("../models/models");

class SubscriptionController {
	async create(req, res) {
		const { email } = req.body;
		const subscription = await Subscription.create({ email });
		return res.json(subscription);
	}
	async getAll(req, res) {
		const subscription = await Subscription.findAll();
		return res.json(subscription);
	}
}

module.exports = new SubscriptionController();
