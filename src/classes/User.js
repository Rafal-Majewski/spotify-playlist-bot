class User {
	displayName;
	id;
	playlists = new Map();
	constructor({id, name}) {
		this.id = id;
		this.name = name;
	}
	static fromMeRequestResponseData(meRequestResponseData) {
		return new User({
			id: meRequestResponseData.id,
			name: meRequestResponseData.display_name,
		});
	}
	addPlaylist(playlist) {
		this.playlists.set(playlist.id, playlist);
	}
}


module.exports = User;
