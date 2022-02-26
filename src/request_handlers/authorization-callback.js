const requestHandler = (req, res) => {
	res.writeHead(200);
	res.end("Authorization callback");
};

module.exports = requestHandler;
