const UsersAuthsManager = require("../classes/UsersAuthsManager.js");
const mainConfig = require("../../main_config.json");
const auth = require("../../auth.json");
const usersManager = require("./usersManager.js");
const playlistsManager = require("./playlistsManager.js");


const usersAuthsManager = new UsersAuthsManager(mainConfig, auth, usersManager, playlistsManager);


module.exports = usersAuthsManager;
