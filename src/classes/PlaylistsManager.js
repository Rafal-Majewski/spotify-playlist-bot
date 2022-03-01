const fetchAllPages = require("../modules/fetchAllPages.js");
const Playlist = require("./Playlist.js");


class PlaylistsManager {
	#playlists = new Map();
	getPlaylistById(playlistId) {
		return this.#playlists.get(playlistId);
	}
	addPlaylist(playlist) {
		this.#playlists.set(playlist.id, playlist);
	}
	addPlaylists(playlists) {
		for (const playlist of playlists) {
			this.addPlaylist(playlist);
		}
	}
	async fetchUserPlaylists(user, userAuth, usersManager) {
		const userPlaylistsRequestResponseData = await fetchAllPages(
			`https://api.spotify.com/v1/users/${user.id}/playlists`,
			`Bearer ${userAuth.accessToken}`
		);
		const userPlaylists = userPlaylistsRequestResponseData.map((playlistRequestResponseData) => (
			this.getPlaylistById(playlistRequestResponseData.id) || Playlist.fromPlaylistRequestResponseData(playlistRequestResponseData, usersManager)
		));
		this.addPlaylists(userPlaylists);
		return userPlaylists;
	}
}


module.exports = PlaylistsManager;
