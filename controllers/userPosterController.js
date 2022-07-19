const axios = require("../axios/axiosPoster");

class UserPosterController {
	async getUsers(req, res) {
		const { data } = await axios.get(
			`/clients.getClients?token=${process.env.TOKEN_POSTER}`
		);
		return res.json(data);
	}
}

module.exports = new UserPosterController();
