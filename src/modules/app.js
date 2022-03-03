const App = require("../classes/App.js");
const mainConfig = require("../../main_config.json");
const auth = require("../../auth.json");


const app = new App(mainConfig, auth);


module.exports = app;
