const app = require("../modules/app.js");

const requestHandler = async (req, res) => {
	const code = req.url.match(/.*\?.*code=([^&]*)/)[1];
	if (!code) {
		res.writeHead(400);
		res.end("No code provided");
		return;
	}
	await app.usersAuthsManager.authorizeCode(code).then((user) => {
		res.writeHead(200);
		return res.end(`Welcome ${user.name}! Successfully authorized.`);
	}).catch((error) => {
		if (
				error.response && (
					error.response.url === "https://accounts.spotify.com/api/token"
					&& error.response.status === 400 
				)
			) {
			res.writeHead(400);
			return res.end("Invalid code.");

		}
		res.writeHead(500);
		return res.end("Internal server error.");
	});
};

module.exports = requestHandler;
