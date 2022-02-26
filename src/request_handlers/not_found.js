const requestHandler = (req, res) => {
	res.writeHead(404);
	res.end();
};

module.exports = requestHandler;
