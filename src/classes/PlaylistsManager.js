const fetchAllPages = require("../modules/fetchAllPages.js");
const Playlist = require("./Playlist.js");


class PlaylistsManager {
	playlists = new Map();
	songsManager;
	constructor(songsManager) {
		this.songsManager = songsManager;
	}
	getPlaylistById(playlistId) {
		return this.playlists.get(playlistId);
	}
	#addPlaylist(playlist) {
		this.playlists.set(playlist.id, playlist);
	}
	#addPlaylists(playlists) {
		for (const playlist of playlists) {
			this.#addPlaylist(playlist);
		}
	}
	#addSongToPlaylist(song, playlist) {
		playlist.addSong(song);
	}
	#addSongsToPlaylist(songs, playlist) {
		for (const song of songs) {
			this.#addSongToPlaylist(song, playlist);
		}
	}
	async savePlaylist(playlist, userAuth) {
		this.#addPlaylist(playlist);
		const playlistSongs = await this.songsManager.fetchPlaylistSongs(playlist, userAuth);
		this.#addSongsToPlaylist(playlistSongs, playlist);
	}
	async savePlaylists(playlists, userAuth) {
		for (const playlist of playlists) {
			await this.savePlaylist(playlist, userAuth);
		}
	}
	async fetchUserPlaylists(user, userAuth, usersManager) {
		console.log(`Fetching playlists for user "${user.name}".`);
		const userPlaylistsRequestResponseData = await fetchAllPages(
			`https://api.spotify.com/v1/users/${user.id}/playlists`,
			`Bearer ${userAuth.accessToken}`
		);
		const userPlaylists = userPlaylistsRequestResponseData.map((playlistRequestResponseData) => (
			this.getPlaylistById(playlistRequestResponseData.id) || Playlist.fromPlaylistRequestResponseData(playlistRequestResponseData, usersManager)
		));
		await this.savePlaylists(userPlaylists, userAuth);
		console.log(`Fetched ${userPlaylists.length} playlists for user "${user.name}".`);
		return userPlaylists;
	}
}


module.exports = PlaylistsManager;
