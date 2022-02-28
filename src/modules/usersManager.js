const UsersManager = require("../classes/UsersManager.js");
const playlistsManager = require("./playlistsManager.js");


const usersManager = new UsersManager(playlistsManager);

module.exports = usersManager;
