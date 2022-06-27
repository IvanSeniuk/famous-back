//const uuid = require("uuid");
//const path = require("path");
const { Product } = require("../models/models");
const ApiError = require("../error/ApiError");

class ProductController {
	async create(req, res, next) {
		try {
			const {
				name,
				price,
				composition,
				additions,
				config,
				productCategory,
				productType,
				weight,
			} = req.body;
			//const { img } = req.files;
			//let fileName = uuid.v4() + ".jpg";
			//img.mv(path.resolve(__dirname, "..", "static", fileName));
			const product = await Product.create({
				name,
				price,
				composition,
				additions,
				config,
				productCategory,
				productType,
				weight,

				img: fileName,
			});
			return res.json(product);
		} catch (err) {
			next(ApiError.badRequest(e.message));
		}
	}
	async getAll(req, res) {
		const { typeId, categoryId } = req.query;
		let products;
		if (typeId && !categoryId) {
			products = await Product.findAll({ where: { typeId } });
		}
		if (!typeId && !categoryId) {
			products = await Product.findAll();
		}
		if (typeId && categoryId) {
			products = await Product.findAll({ where: { typeId, categoryId } });
		}
		return res.json(products);
	}
	async getOne(req, res) {
		const { id } = req.params;
		const product = await Product.findOne({ where: { id } });
		return res.json(product);
	}
}

module.exports = new ProductController();
