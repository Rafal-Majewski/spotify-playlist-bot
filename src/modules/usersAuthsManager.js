const UsersAuthsManager = require("../classes/UserAuthManager.js");
const mainConfig = require("../../main_config.json");
const auth = require("../../auth.json");


const usersAuthManager = new UsersAuthsManager(mainConfig, auth);


module.exports = usersAuthManager;
