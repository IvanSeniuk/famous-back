const uuid = require("uuid");
const path = require("path");
const { About } = require("../models/models");

class AboutController {
	async create(req, res) {
		const { title, subtitle, text1, text2 } = req.body;
		const { img1 } = req.files;
		let fileName1 = uuid.v4() + ".jpg";
		img1.mv(path.resolve(__dirname, "..", "static", fileName1));
		const { img2 } = req.files;
		let fileName2 = uuid.v4() + ".jpg";
		img2.mv(path.resolve(__dirname, "..", "static", fileName2));
		const { img3 } = req.files;
		let fileName3 = uuid.v4() + ".jpg";
		img3.mv(path.resolve(__dirname, "..", "static", fileName3));
		try {
			const about = await About.create({
				title,
				subtitle,
				text1,
				text2,
				img1: fileName1,
				img2: fileName2,
				img3: fileName3,
			});
			return res.json(about);
		} catch (err) {
			console.log(err);
		}
	}
	async getOne(req, res) {
		const { id } = req.params;
		const item = await About.findOne({ where: { id } });
		return res.json(item);
	}
	async update(req, res) {
		try {
			console.log(req.body);
			//if (req.files === null || undefined) {
			//	console.log(9999);
			//}
			const { id } = req.params;
			const { title, subtitle, text1, text2 } = req.body;
			const findAbout = await About.findOne({ where: { id } });
			if (req.body) {
				console.log(555);
				if (title) {
					findAbout.title = title;
				}
				if (subtitle) {
					findAbout.subtitle = subtitle;
				}
				if (text1) {
					findAbout.text1 = text1;
				}
				if (text2) {
					findAbout.text2 = text2;
				}
			}
			if (req.files) {
				const { img1 } = req.files;
				const { img2 } = req.files;
				const { img3 } = req.files;
				let fileName1 = uuid.v4() + ".jpg";
				let fileName2 = uuid.v4() + ".jpg";
				let fileName3 = uuid.v4() + ".jpg";

				if (img1) {
					img1.mv(path.resolve(__dirname, "..", "static", fileName1));
				}
				if (img2) {
					img2.mv(path.resolve(__dirname, "..", "static", fileName2));
				}
				if (img3) {
					img3.mv(path.resolve(__dirname, "..", "static", fileName3));
				}

				if (img1) {
					findAbout.img1 = fileName1;
				}
				if (img2) {
					findAbout.img2 = fileName2;
				}
				if (img3) {
					findAbout.img3 = fileName3;
				}
			}
			if (!findAbout) {
				return res.status(400).send("Сторінку з таким id не знайдено");
			}
			const about = await findAbout.save();
			if (!about) {
				res.status(400).send("Помилка оновлення інформації ");
			}
			return res.json(about);
		} catch (err) {
			return res.status(400).send("Помилка оновлення інформації.");
		}
	}
}

module.exports = new AboutController();
