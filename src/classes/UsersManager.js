class UsersManager {
	#users = new Map();
	playlistsManager;
	getUserById(userId) {
		return this.#users.get(userId);
	}
	async addUser(user) {
		this.#users.set(user.id, user);
	}
	constructor(playlistsManager) {
		this.playlistsManager = playlistsManager;
	}
}

module.exports = UsersManager;
