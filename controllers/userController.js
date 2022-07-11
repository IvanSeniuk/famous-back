const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/models");

const generateJwt = (id, name, email, role, phone) => {
	return jwt.sign({ id, name, email, role, phone }, process.env.SECRET_KEY, {
		expiresIn: "24h",
	});
};

class UserController {
	async registration(req, res) {
		const { name, email, password, role, phone } = req.body;
		if (!name) {
			return res.status(400).send("Некоректне ім'я");
		}
		if (!email) {
			return res.status(400).send("Некоректний email");
		}
		if (!password) {
			return res.status(400).send("Некоректний пароль");
		}
		const candidate = await User.findOne({ where: { email } });
		if (candidate) {
			return res.status(400).send("Користувач з таким email вже існує");
		}
		const hashPassword = await bcrypt.hash(password, 5);
		const user = await User.create({
			name,
			email,
			role,
			phone,
			password: hashPassword,
		});
		//const basket = await Basket.create({ userId: user.id });
		const token = generateJwt(
			user.id,
			user.name,
			user.email,
			user.role,
			user.phone
		);
		res.send(token);
	}
	async login(req, res) {
		const { email, password } = req.body;
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return res
				.status(400)
				.send("Користувача з таким email не знайдено");
		}
		let comparePassword = bcrypt.compareSync(password, user.password);
		if (!comparePassword) {
			return res.status(400).send("Указано неправильний пароль");
			//return next(ApiError.internal("Указано неправильний пароль"));
		}
		const token = generateJwt(
			user.id,
			user.name,
			user.email,
			user.role,
			user.phone
		);
		res.send(token);
	}
	async check(req, res) {
		const token = generateJwt(
			req.user.id,
			req.user.name,
			req.user.email,
			req.user.role,
			req.user.phone
		);
		res.send(token);
	}
	async update(req, res) {
		try {
			const { id } = req.params;
			const { name, email, phone, password } = req.body;
			const findUser = await User.findOne({ where: { id } });
			if (!findUser) {
				return res
					.status(400)
					.send("Користувача з таким id не знайдено");
			}
			if (name) {
				findUser.name = name;
			}
			if (phone) {
				findUser.phone = phone;
			}
			if (email) {
				findUser.email = email;
			}
			if (password) {
				const hashPassword = await bcrypt.hash(password, 5);
				findUser.password = hashPassword;
			}

			const user = await findUser.save();
			if (!user) {
				res.status(400).send("Помилка оновлення інформації");
			}
			const token = generateJwt(
				user.id,
				user.name,
				user.email,
				user.role,
				user.phone
			);
			res.send(token);
		} catch (err) {
			return res
				.status(400)
				.send(
					"Помилка оновлення інформації. Можливо користувач з такою поштою або номером зареєстрований"
				);
		}
	}
	async getUsers(req, res) {
		let users = await User.findAll({ where: { role: "USER" } });
		return res.json(users);
	}
}

module.exports = new UserController();
