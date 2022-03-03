const fetchAllPages = require("../modules/fetchAllPages.js");
const Song = require("./Song.js");


class SongsManager {
	songs = new Map();
	getSongById(songId) {
		return this.songs.get(songId);
	}
	#addSong(song) {
		this.songs.set(song.id, song);
	}
	#addSongs(songs) {
		for (const song of songs) {
			this.#addSong(song);
		}
	}
	async fetchPlaylistSongs(playlist, userAuth) {
		console.log(`Fetching songs for playlist "${playlist.name}".`);
		const songsOnPlaylistRequestResponseData = await fetchAllPages(
			`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
			`Bearer ${userAuth.accessToken}`
		);
		const playlistSongsRequestResponseData = songsOnPlaylistRequestResponseData.map((songOnPlaylistRequestResponseData) => (
			songOnPlaylistRequestResponseData.track
		)).filter(Boolean);

		const playlistSongs = playlistSongsRequestResponseData.map((songRequestResponseData) => (
			this.getSongById(songRequestResponseData.id) || Song.fromSongRequestResponseData(songRequestResponseData)
		));
		this.#addSongs(playlistSongs);
		console.log(`Fetched ${playlistSongs.length} songs for playlist "${playlist.name}".`);
		return playlistSongs;
	}
}


module.exports = SongsManager;
