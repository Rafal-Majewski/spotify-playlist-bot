const AuthManager = require("../classes/AuthManager.js");
const mainConfig = require("../../main_config.json");
const auth = require("../../auth.json");


const authManager = new AuthManager(mainConfig, auth);


module.exports = authManager;
