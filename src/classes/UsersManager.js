class UsersManager {
	#users = new Map();
	getUserById(userId) {
		return this.#users.get(userId);
	}
	addUser(user) {
		this.#users.set(user.id, user);
	}
}

module.exports = UsersManager;
