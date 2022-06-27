const { Category } = require("../models/models");
const ApiError = require("../error/ApiError");

class CategoryController {
	async create(req, res) {
		const { name, typeId } = req.body;
		const category = await Category.create({ name, typeId });
		return res.json(category);
	}
	async getAll(req, res) {
		const categories = await Type.findAll();
		return res.json(categories);
	}
}

module.exports = new CategoryController();
