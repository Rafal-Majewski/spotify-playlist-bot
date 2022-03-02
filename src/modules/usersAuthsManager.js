const UsersAuthsManager = require("../classes/UsersAuthsManager.js");
const mainConfig = require("../../main_config.json");
const auth = require("../../auth.json");
const usersManager = require("./usersManager.js");
const playlistsManager = require("./playlistsManager.js");
const songsManager = require("./songsManager.js");


const usersAuthsManager = new UsersAuthsManager(
	mainConfig,
	auth,
	usersManager,
	playlistsManager,
	songsManager,
);


module.exports = usersAuthsManager;
