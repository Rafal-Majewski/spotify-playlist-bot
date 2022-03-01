class UsersManager {
	#users = new Map();
	getUserById(userId) {
		return this.#users.get(userId);
	}
	addUser(user) {
		this.#users.set(user.id, user);
	}
	async saveUser(user, userAuth, playlistsManager) {
		this.addUser(user);
		const userPlaylists = await playlistsManager.fetchUserPlaylists(user, userAuth, this);
		this.addPlaylistsToUser(userPlaylists, user);
		
	}
	addPlaylistToUser(playlist, user) {
		user.addPlaylist(playlist);
	}
	addPlaylistsToUser(playlists, user) {
		for (const playlist of playlists) {
			this.addPlaylistToUser(playlist, user);
		}
	}
}


module.exports = UsersManager;
