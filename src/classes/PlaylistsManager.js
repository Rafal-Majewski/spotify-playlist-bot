class PlaylistsManager {
	#playlists = new Map();
	getPlaylistById(playlistId) {
		return this.#playlists.get(playlistId);
	}
	addPlaylist(playlist) {
		this.#playlists.set(playlist.id, playlist);
	}
}

module.exports = PlaylistsManager;
