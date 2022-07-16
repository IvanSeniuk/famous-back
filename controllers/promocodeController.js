const { Promocodes } = require("../models/models");
const ApiError = require("../error/ApiError");

class PromocodeController {
	async create(req, res) {
		const { title, promo, count } = req.body;
		try {
			const promocode = await Promocodes.create({ title, promo, count });
			return res.json(promocode);
		} catch (err) {
			console.log(err);
		}
	}
	async getAll(req, res) {
		const promocodes = await Promocodes.findAll();
		return res.json(promocodes);
	}
	async getOne(req, res) {
		const { promo } = req.params;
		const item = await Promocodes.findOne({ where: { title: promo } });
		return res.json(item);
	}
	async update(req, res) {
		const { promo } = req.params;

		try {
			const item = await Promocodes.findOne({ where: { title: promo } });
			if (item) {
				item.count = item.count - 1;
				const newPromocode = await item.save();
				return res.json(newPromocode);
			} else return res.json(item);
		} catch (err) {
			return res;
		}
	}
	async delete(req, res) {
		const { id } = req.params;
		if (!id) {
			return res.status(404).send("Промокод не знайдено...");
		}
		try {
			await Promocodes.destroy({
				where: {
					id: id,
				},
			});
			res.send(id);
		} catch (e) {
			res.status(500).send(e);
		}
	}
}

module.exports = new PromocodeController();
