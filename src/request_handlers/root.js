const auth = require("../../auth.json");

const requestHandler = (req, res) => {
	res.writeHead(303, {
		"location": `${auth.authorizationUrl}?${[
			`response_type=code`,
			`client_id=${auth.clientId}`,
			`redirect_uri=${auth.redirectUri}`,
			`scope=${auth.scope}`,
		].join("&")}`
	});
	res.end();
};

module.exports = requestHandler;
