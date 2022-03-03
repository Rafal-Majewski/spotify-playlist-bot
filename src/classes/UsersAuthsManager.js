const axios = require("axios");
const fs = require("fs/promises");
const User = require("./User.js");
const UserAuth = require("./UserAuth.js");


class UsersAuthsManager {
	mainConfig;
	auth;
	usersAuths = new Map();
	usersManager;
	constructor(mainConfig, auth, usersManager) {
		this.mainConfig = mainConfig;
		this.auth = auth;
		this.usersManager = usersManager;
	}
	async #requestToken(code) {
		return axios.post(
			"https://accounts.spotify.com/api/token",
			[
				`grant_type=authorization_code`,
				`code=${code}`,
				`redirect_uri=${this.auth.redirectUri}`,
			].join("&"),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Authorization": `Basic ${Buffer.from(`${this.auth.clientId}:${this.auth.clientSecret}`).toString("base64")}`,
				},
			}
		);
	}
	async #requestMe(accessToken) {
		return axios.get(
			"https://api.spotify.com/v1/me",
			{
				headers: {
					"Authorization": `Bearer ${accessToken}`,
				},
			}
		);
	}
	async #fetchMe(accessToken) {
		const meRequestResponse = await this.#requestMe(accessToken);
		const user = User.fromMeRequestResponseData(meRequestResponse.data);
		return user;
	}
	async saveUserAuth(userAuth) {
		this.usersAuths.set(userAuth.userId, userAuth);
		const userAuthFilePath = `${this.mainConfig.usersAuthDirectoryPath}/${userAuth.userId}.json`;
		await fs.mkdir(this.mainConfig.usersAuthDirectoryPath, {recursive: true});
		await fs.writeFile(userAuthFilePath, JSON.stringify(userAuth));
	}
	async saveUser(user, userAuth) {
		await this.usersManager.saveUser(user, userAuth);
	}
	async authorizeCode(code) {
		console.log(`Authorizing code "${code.slice(0, 5)}...".`);
		const tokenRequestResponse = await this.#requestToken(code);
		const user = await this.#fetchMe(tokenRequestResponse.data.access_token);
		const userAuth = UserAuth.fromTokenRequestResponseData(tokenRequestResponse.data, user.id);
		await this.saveUserAuth(userAuth);
		await this.saveUser(user, userAuth);
		return user;
	}
}


module.exports = UsersAuthsManager;
