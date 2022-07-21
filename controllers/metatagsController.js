const { Metatags } = require("../models/models");

class MetatagsController {
	async create(req, res) {
		const { metatags } = req.body;

		try {
			const metatagsList = await Metatags.create({
				metatags,
			});
			return res.json(metatagsList);
		} catch (err) {
			console.log(err);
		}
	}
	async getOne(req, res) {
		const { id } = req.params;
		const item = await Metatags.findOne({ where: { id } });
		return res.json(item);
	}
	async update(req, res) {
		try {
			const { id } = req.params;
			const { metatags } = req.body;
			const findMetatags = await Metatags.findOne({ where: { id } });
			if (req.body) {
				if (metatags) {
					findMetatags.metatags = metatags;
				}
			}
			if (!findMetatags) {
				return res.status(400).send("Даних не знайдено");
			}
			const metatagsList = await findMetatags.save();

			if (!metatagsList) {
				res.status(400).send("Помилка оновлення інформації ");
			}
			return res.json(metatagsList);
		} catch (err) {
			return res.status(400).send("Помилка оновлення інформації.");
		}
	}
}

module.exports = new MetatagsController();
