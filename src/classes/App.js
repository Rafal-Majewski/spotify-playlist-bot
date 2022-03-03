const PlaylistsManager = require("./PlaylistsManager.js");
const SongsManager = require("./SongsManager.js");
const UsersManager = require("./UsersManager.js");
const UsersAuthsManager = require("./UsersAuthsManager.js");


class App {
	playlistManager;
	songsManager;
	usersManager;
	UsersAuthsManager;
	mainConfig;
	auth;
	constructor(mainConfig, auth) {
		this.mainConfig = mainConfig;
		this.auth = auth;
		this.songsManager = new SongsManager();
		this.playlistManager = new PlaylistsManager(this.songsManager);
		this.usersManager = new UsersManager(this.playlistManager);
		this.usersAuthsManager = new UsersAuthsManager(this.mainConfig, this.auth, this.usersManager);
	}
	async authorizeCode(code) {
		const user = await this.usersAuthsManager.authorizeCode(code);
		return user;
	}
}


module.exports = App;
