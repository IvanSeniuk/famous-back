const uuid = require("uuid");
const path = require("path");
const { Banner } = require("../models/models");

class BannerController {
	async create(req, res) {
		const { title, link } = req.body;
		const { img } = req.files;
		let fileName = uuid.v4() + ".jpg";
		img.mv(path.resolve(__dirname, "..", "static", fileName));
		try {
			const banner = await Banner.create({
				title,
				link,
				img: fileName,
			});
			return res.json(banner);
		} catch (err) {
			console.log(err);
		}
	}
	async getBanners(req, res) {
		let banners = await Banner.findAll();
		return res.json(banners);
	}
	async update(req, res) {
		try {
			console.log(req.body);
			const { id } = req.params;
			const { title, link } = req.body;
			const findBanner = await Banner.findOne({ where: { id } });
			if (req.body) {
				console.log(555);
				if (title) {
					findBanner.title = title;
				}
				if (link) {
					findBanner.link = link;
				}
			}
			if (req.files) {
				const { img } = req.files;
				let fileName = uuid.v4() + ".jpg";
				if (img) {
					img.mv(path.resolve(__dirname, "..", "static", fileName1));
				}
				if (img) {
					findBanner.img = fileName;
				}
			}
			if (!findBanner) {
				return res.status(400).send("Банер з таким id не знайдено");
			}
			const banner = await findBanner.save();
			if (!banner) {
				res.status(400).send("Помилка оновлення інформації ");
			}
			return res.json(banner);
		} catch (err) {
			return res.status(400).send("Помилка оновлення інформації.");
		}
	}
	async delete(req, res) {
		const { id } = req.params;
		if (!id) {
			return res.status(404).send("Банер не знайдено...");
		}
		try {
			await Banner.destroy({
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

module.exports = new BannerController();
