class UserAuth {
	userId;
	accessToken;
	refreshToken;
	expirationTimestamp;
	constructor({userId, accessToken, refreshToken, expirationTimestamp}) {
		this.userId = userId;
		this.accessToken = accessToken;
		this.refreshToken = refreshToken;
		this.expirationTimestamp = expirationTimestamp;
	}
	static fromTokenRequestResponseData(requestResponseData, userId) {
		return new UserAuth(
			{
				userId: userId,
				accessToken: requestResponseData.access_token,
				refreshToken: requestResponseData.refresh_token,
				expirationTimestamp: Date.now() / 1000 + requestResponseData.expires_in,
			}
		);
	}
}


module.exports = UserAuth;
