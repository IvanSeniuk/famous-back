const jwt = require("jsonwebtoken");

module.exports = function (role) {
	return function (req, res, next) {
		if (req.method === "OPIONS") {
			next();
		}

		try {
			const token = req.headers.authorization.split(" ")[1];

			if (!token) {
				res.status(401).send(
					"Немає доступу. Користувач не авторизований..."
				);
			}
			const decoded = jwt.verify(token, process.env.SECRET_KEY);
			if (decoded.role !== role) {
				res.status(403).send("Доступ заборонено...");
			}
			req.user = decoded;
			next();
		} catch (e) {
			res.status(401).send(
				"Немає доступу. Користувач не авторизований..."
			);
		}
	};
};
