class UserAuth {
	userId;
	accessToken;
	refreshToken;
	expirationTimestamp;
	user;
	constructor({userId, accessToken, refreshToken, expirationTimestamp}, user) {
		this.userId = userId;
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
		this.expirationTimestamp = expirationTimestamp;
		this.user = user;
	}
	static fromTokenRequestResponseData(requestResponseData, user) {
		return new UserAuth(
			{
				userId: user.id,
				accessToken: requestResponseData.access_token,
				refreshToken: requestResponseData.refresh_token,
				expirationTimestamp: Date.now() / 1000 + requestResponseData.expires_in,
			},
			user
		);
	}
}

module.exports = UserAuth;
