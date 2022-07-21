const uuid = require("uuid");
const path = require("path");
const { Actions } = require("../models/models");

class ActionsController {
	async create(req, res) {
		const { title, text } = req.body;
		const { img } = req.files;
		let fileName = uuid.v4() + ".jpg";
		img.mv(path.resolve(__dirname, "..", "static", fileName));
		try {
			const action = await Actions.create({
				title,
				text,
				img: fileName,
			});
			return res.json(action);
		} catch (err) {
			console.log(err);
		}
	}
	async getActions(req, res) {
		let actions = await Actions.findAll();
		return res.json(actions);
	}
	async getOne(req, res) {
		const { id } = req.params;
		const item = await Actions.findOne({ where: { id } });
		return res.json(item);
	}
	async update(req, res) {
		try {
			console.log(req.body);
			const { id } = req.params;
			const { title, text } = req.body;
			const findActions = await Actions.findOne({ where: { id } });
			if (req.body) {
				if (title) {
					findActions.title = title;
				}
				if (text) {
					findActions.text = text;
				}
			}
			if (req.files) {
				const { img } = req.files;
				let fileName = uuid.v4() + ".jpg";
				if (img) {
					img.mv(path.resolve(__dirname, "..", "static", fileName));
				}
				if (img) {
					findActions.img = fileName;
				}
			}
			if (!findActions) {
				return res.status(400).send("Акцію з таким id не знайдено");
			}
			const action = await findActions.save();
			if (!action) {
				res.status(400).send("Помилка оновлення інформації ");
			}
			return res.json(action);
		} catch (err) {
			return res.status(400).send("Помилка оновлення інформації.");
		}
	}
	async delete(req, res) {
		const { id } = req.params;
		if (!id) {
			return res.status(404).send("Акцію не знайдено...");
		}
		try {
			await Actions.destroy({
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

module.exports = new ActionsController();
