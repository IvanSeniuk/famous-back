const uuid = require("uuid");
const path = require("path");
const { Contacts } = require("../models/models");

class ContactsController {
	async create(req, res) {
		const {
			phone1,
			phone2,
			facebook,
			instagram,
			map,
			hours,
			adress,
			email,
			text_delivery,
		} = req.body;
		const { img } = req.files;
		let fileName = uuid.v4() + ".jpg";
		img.mv(path.resolve(__dirname, "..", "static", fileName));

		try {
			const contacts = await Contacts.create({
				phone1,
				phone2,
				facebook,
				instagram,
				map,
				hours,
				adress,
				email,
				text_delivery,
				img: fileName,
			});
			return res.json(contacts);
		} catch (err) {
			console.log(err);
		}
	}
	async getOne(req, res) {
		const { id } = req.params;
		const item = await Contacts.findOne({ where: { id } });
		return res.json(item);
	}
	async update(req, res) {
		try {
			const { id } = req.params;
			const {
				phone1,
				phone2,
				facebook,
				instagram,
				map,
				hours,
				adress,
				email,
				text_delivery,
			} = req.body;
			const findContacts = await Contacts.findOne({ where: { id } });
			if (req.body) {
				if (phone1) {
					findContacts.phone1 = phone1;
				}
				if (phone2) {
					findContacts.phone2 = phone2;
				}
				if (facebook) {
					findContacts.facebook = facebook;
				}
				if (instagram) {
					findContacts.instagram = instagram;
				}
				if (map) {
					findContacts.map = map;
				}
				if (hours) {
					findContacts.hours = hours;
				}
				if (adress) {
					findContacts.adress = adress;
				}
				if (email) {
					findContacts.email = email;
				}
				if (text_delivery) {
					findContacts.text_delivery = text_delivery;
				}
			}
			if (req.files) {
				const { img } = req.files;

				let fileName = uuid.v4() + ".jpg";

				if (img) {
					img.mv(path.resolve(__dirname, "..", "static", fileName));
				}

				if (img) {
					findContacts.img = fileName;
				}
			}
			if (!findContacts) {
				return res.status(400).send("Даних не знайдено");
			}
			const contacts = await findContacts.save();

			if (!contacts) {
				res.status(400).send("Помилка оновлення інформації ");
			}
			return res.json(contacts);
		} catch (err) {
			return res.status(400).send("Помилка оновлення інформації.");
		}
	}
}

module.exports = new ContactsController();
