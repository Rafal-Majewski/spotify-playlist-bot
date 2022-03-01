class User {
	displayName;
	id;
	playlists = new Map();
	constructor({id, displayName}) {
		this.id = id;
		this.displayName = displayName;
	}
	static fromMeRequestResponseData(meRequestResponseData) {
		return new User({
			id: meRequestResponseData.id,
			displayName: meRequestResponseData.display_name,
		});
	}
	addPlaylist(playlist) {
		this.playlists.set(playlist.id, playlist);
	}
}


module.exports = User;
