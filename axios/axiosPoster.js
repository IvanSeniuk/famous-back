const axios = require("axios");

const axiosPoster = axios.create({
	baseURL: "https://joinposter.com/api",
});

module.exports = axiosPoster;
