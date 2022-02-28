const usersAuthsManager = require("../modules/usersAuthsManager.js");

const requestHandler = async (req, res) => {
	const code = req.url.match(/.*\?.*code=([^&]*)/)[1];
	if (!code) {
		res.writeHead(400);
		res.end("No code provided");
		return;
	}
	const user = await usersAuthsManager.authorize(code);
	res.writeHead(200);
	res.end(`Welcome ${user.displayName}! Successfully authorized.`);
};

module.exports = requestHandler;
