const uuid = require("uuid");
const path = require("path");
const { CreditCard } = require("../models/models");

class CreditCardController {
	async create(req, res) {
		const { number } = req.body;
		let fileName = "";
		if (req.files) {
			const { img } = req.files;
			fileName = uuid.v4() + ".jpg";
			img.mv(path.resolve(__dirname, "..", "static", fileName));
		}

		try {
			const creditCards = await CreditCard.create({
				number,
				img: fileName,
			});

			return res.json(creditCards);
		} catch (err) {
			console.log(err);
		}
	}
	async getAll(req, res) {
		let creditCards = await CreditCard.findAll();
		return res.json(creditCards);
	}
	async update(req, res) {
		try {
			const { id } = req.params;
			const { number } = req.body;
			const findCreditCard = await CreditCard.findOne({ where: { id } });
			//console.log(req.body);
			if (req.body.number) {
				findCreditCard.number = number;
				const creditcard = await findCreditCard.save();
				return res.json(creditcard);
			}

			if (req.files.img) {
				const { img } = req.files;
				let fileName = uuid.v4() + ".jpg";
				img.mv(path.resolve(__dirname, "..", "static", fileName));
				findCreditCard.img = fileName;
			}

			if (!findCreditCard) {
				return res.status(400).send("Карту з таким id не знайдено");
			}
			const creditcard = await findCreditCard.save();
			if (!creditcard) {
				res.status(400).send("Помилка оновлення інформації ");
			}
			return res.json(creditcard);
		} catch (err) {
			return res.status(400).send("Помилка оновлення інформації.");
		}
	}
	async delete(req, res) {
		const { id } = req.params;
		if (!id) {
			return res.status(404).send("Карта не знайдена...");
		}
		try {
			await CreditCard.destroy({
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

module.exports = new CreditCardController();
