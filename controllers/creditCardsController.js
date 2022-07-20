const uuid = require("uuid");
const path = require("path");
const { CreditCard } = require("../models/models");

class CreditCardController {
	async create(req, res) {
		const { number } = req.body;
		const { img } = req.files;
		let fileName = uuid.v4() + ".jpg";
		img.mv(path.resolve(__dirname, "..", "static", fileName));
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
			console.log(req.body);
			const { id } = req.params;
			const { number } = req.body;
			const findCreditCard = await CreditCard.findOne({ where: { id } });
			if (req.body) {
				if (number) {
					findCreditCard.title = title;
				}
			}
			if (req.files) {
				const { img } = req.files;
				let fileName = uuid.v4() + ".jpg";
				if (img) {
					img.mv(path.resolve(__dirname, "..", "static", fileName1));
				}
				if (img) {
					findCreditCard.img = fileName;
				}
			}
			if (!findCreditCard) {
				return res.status(400).send("Банер з таким id не знайдено");
			}
			const creditCard = await findCreditCard.save();
			if (!creditCard) {
				res.status(400).send("Помилка оновлення інформації ");
			}
			return res.json(creditCard);
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
