const uuid = require("uuid");
const path = require("path");
const { Product } = require("../models/models");
const ApiError = require("../error/ApiError");

class ProductController {
	async create(req, res, next) {
		try {
			const {
				name,
				composition,
				additions,
				config,
				price,
				weight,
				productCategory,
				productType,
			} = req.body;
			const { img } = req.files;
			let fileName = uuid.v4() + ".jpg";
			img.mv(path.resolve(__dirname, "..", "static", fileName));
			const product = await Product.create({
				name,
				weight,
				img: fileName,
				composition,
				additions,
				config,
				productCategory,
				productType,
				price,
				typeId,
				categoryId,
			});
			return res.json(product);
		} catch (err) {
			next(ApiError.badRequest(e.message));
		}
	}
	async getAll(req, res) {
		let products;

		const { productCategory, productType } = req.query;

		if (productCategory && !productType) {
			products = await Product.findAll({ where: { productCategory } });
		}
		if (!productCategory && productType) {
			products = await Product.findAll({ where: { productType } });
		}
		if (!productType && !productCategory) {
			products = await Product.findAll();
		}
		if (productType && productCategory) {
			products = await Product.findAll({
				where: { productType, productCategory },
			});
		}
		return res.json(products);
	}

	async getOne(req, res) {
		const { id } = req.params;
		const product = await Product.findOne({ where: { id } });
		return res.json(product);
	}
	async update(req, res) {
		try {
			const { id } = req.params;
			const { name, price, composition, additions } = req.body;
			const findProduct = await Product.findOne({ where: { id } });
			if (!findProduct) {
				return res.status(400).send("Продукт з таким id не знайдено");
			}
			if (name) {
				findProduct.name = name;
			}
			if (price) {
				findProduct.price = price;
			}
			if (composition) {
				findProduct.composition = composition;
			}
			if (additions) {
				findProduct.additions = additions;
			}
			const product = await findProduct.save();
			if (!product) {
				res.status(400).send("Помилка оновлення інформації");
			}
			return res.json(product);
		} catch (err) {
			return res.status(400).send("Помилка оновлення інформації.");
		}
	}
	async delete(req, res) {
		const { id } = req.params;

		if (!id) {
			return res.status(404).send("Продукт не знайдено...");
		}

		try {
			await Product.destroy({
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

module.exports = new ProductController();
