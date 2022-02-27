const config = require("./config.json");
const http = require("http");
const notFoundRequestHandler = require("./src/request_handlers/not_found.js");
const requestHandlerByPath = {
	"/": require("./src/request_handlers/root.js"),
	[config.authorizationCallbackPath]: require("./src/request_handlers/authorization-callback.js"),
};

const mainRequestHandler = (req, res) => {
	const path = req.url.match(/^(\/[^?#]*)/)[1];
	const requestHandler = requestHandlerByPath[path] || notFoundRequestHandler;
	requestHandler(req, res);
};
const server = http.createServer(mainRequestHandler);

server.listen(config.port);
