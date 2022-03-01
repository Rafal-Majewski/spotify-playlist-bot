class Playlist {
	songs = new Map();
	owner;
	name;
	id;
	constructor({owner, name, id}) {
		this.owner = owner;
		this.name = name;
		this.id = id;
	}
	static fromPlaylistRequestResponseData(playlistRequestResponseData, usersManager) {
		return new Playlist({
			owner: usersManager.getUserById(playlistRequestResponseData.owner.id),
			name: playlistRequestResponseData.name,
			id: playlistRequestResponseData.id,
		});
	}
	addSong(song) {
		this.songs.set(song.id, song);
	}
}


module.exports = Playlist;
