class Song {
	id;
	title;
	constructor({id, title}) {
		this.id = id;
		this.title = title;
	}
	static fromSongRequestResponseData(songRequestResponseData) {
		return new Song({
			id: songRequestResponseData.id,
			title: songRequestResponseData.name,
		});
	}
}


module.exports = Song;
