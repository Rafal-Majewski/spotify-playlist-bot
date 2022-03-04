const PlaylistsManager = require("./PlaylistsManager.js");
const SongsManager = require("./SongsManager.js");
const UsersManager = require("./UsersManager.js");
const UsersAuthsManager = require("./UsersAuthsManager.js");
// const Bot = require("./Bot.js");


class App {
	playlistManager;
	songsManager;
	usersManager;
	usersAuthsManager;
	mainConfig;
	auth;
	// bot;
	constructor(mainConfig, auth) {
		this.mainConfig = mainConfig;
		this.auth = auth;
		this.songsManager = new SongsManager();
		this.playlistManager = new PlaylistsManager(this.songsManager);
		this.usersManager = new UsersManager(this.playlistManager);
		this.usersAuthsManager = new UsersAuthsManager(this.mainConfig, this.auth);
		// this.bot = new Bot();
	}
}


module.exports = App;
