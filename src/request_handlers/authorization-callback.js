const axios = require("axios");
const auth = require("../../auth.json");
const fs = require("fs/promises");
const serverConfig = require("../../server_config.json");

const requestHandler = async (req, res) => {
	const code = req.url.match(/.*\?.*code=([^&]*)/)[1];
	if (!code) {
		res.writeHead(400);
		res.end("No code provided");
		return;
	}
	const tokenRequestResponse = await axios.post(
		"https://accounts.spotify.com/api/token",
		[
			`grant_type=authorization_code`,
			`code=${code}`,
			`redirect_uri=${auth.redirectUri}`,
		].join("&"),
		{
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				"Authorization": `Basic ${Buffer.from(`${auth.clientId}:${auth.clientSecret}`).toString("base64")}`,
			},
		}
	);
	const meRequestResponse = await axios.get(
		"https://api.spotify.com/v1/me",
		{
			headers: {
				"Authorization": `Bearer ${tokenRequestResponse.data.access_token}`,
			},
		}
	);
	const usersAuthDirectoryPath = `./${serverConfig.usersAuthDirectoryName}`;
	const userAuthFilePath = `${usersAuthDirectoryPath}/${meRequestResponse.data.id}.json`;
	const userAuth = {
		userId: meRequestResponse.data.id,
		accessToken: tokenRequestResponse.data.access_token,
		refreshToken: tokenRequestResponse.data.refresh_token,
		expirationTimestamp: Date.now() / 1000 + tokenRequestResponse.data.expires_in,
	};
	await fs.mkdir(usersAuthDirectoryPath, {recursive: true});
	await fs.writeFile(userAuthFilePath, JSON.stringify(userAuth));
	res.writeHead(200);
	res.end(`Welcome ${meRequestResponse.data.display_name}! Successfully authorized.`);
};

module.exports = requestHandler;
