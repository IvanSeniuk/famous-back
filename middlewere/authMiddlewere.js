const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
	if (req.method === "OPIONS") {
		next();
	}

	try {
		const token = req.headers.authorization.split(" ")[1];

		if (!token) {
			//console.log(err);
			return res
				.status(401)
				.send("Немає доступу. Користувач не авторизований...");
		}
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		req.user = decoded;
		next();
	} catch (e) {
		//console.log(e);
		return res
			.status(400)
			.send("Немає доступу. Недійсний токен авторизації...");
	}
};
