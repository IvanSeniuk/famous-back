//const uuid = require("uuid");
//const path = require("path");
//const { ProductP } = require("../models/models");
//const ApiError = require("../error/ApiError");
const axios = require("../axios/axiosPoster");

class OrderPosterController {
	async create(req, res) {
		const { data } = await axios.post(
			`/incomingOrders.createIncomingOrder?token=${process.env.TOKEN_POSTER}`,
			req.body
		);
		console.log(data);
		return res.json(data);
	}
	async getAll(req, res) {
		const { data } = await axios.get(
			`/incomingOrders.getIncomingOrders?token=${process.env.TOKEN_POSTER}`
		);

		return res.json(data);
	}

	async getOne(req, res) {
		const { id } = req.params;
		const { data } = await axios.get(
			`/incomingOrders.getIncomingOrder?token=${process.env.TOKEN_POSTER}&incoming_order_id=${id}`
		);
		return res.json(data);
	}
	//async update(req, res) {
	//	try {
	//		const { id } = req.params;
	//		const { name, price, composition, additions } = req.body;
	//		const findProduct = await ProductP.findOne({ where: { id } });
	//		if (!findProduct) {
	//			return res.status(400).send("Продукт з таким id не знайдено");
	//		}
	//		if (name) {
	//			findProduct.name = name;
	//		}
	//		if (price) {
	//			findProduct.price = price;
	//		}
	//		if (composition) {
	//			findProduct.composition = composition;
	//		}
	//		if (additions) {
	//			findProduct.additions = additions;
	//		}
	//		const product = await findProduct.save();
	//		if (!product) {
	//			res.status(400).send("Помилка оновлення інформації");
	//		}
	//		return res.json(product);
	//	} catch (err) {
	//		return res.status(400).send("Помилка оновлення інформації.");
	//	}
	//}
	//async delete(req, res) {
	//	const { id } = req.params;
	//	if (!id) {
	//		return res.status(404).send("Продукт не знайдено...");
	//	}
	//	try {
	//		await ProductP.destroy({
	//			where: {
	//				id: id,
	//			},
	//		});
	//		res.send(id);
	//	} catch (e) {
	//		res.status(500).send(e);
	//	}
	//}
}

module.exports = new OrderPosterController();
