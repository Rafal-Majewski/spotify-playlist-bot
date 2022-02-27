const UsersAuthsManager = require("../classes/UsersAuthManager.js");
const mainConfig = require("../../main_config.json");
const auth = require("../../auth.json");
const usersManager = require("./usersManager.js");


const usersAuthManager = new UsersAuthsManager(mainConfig, auth, usersManager);


module.exports = usersAuthManager;
