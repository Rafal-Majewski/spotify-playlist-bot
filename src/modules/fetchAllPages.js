const axios = require("axios");


const fetchAllPages = async (url, authorizationHeader) => {
	const items = [];
	let currentPageUrl = url;
	while(currentPageUrl) {
		const response = await axios.get(currentPageUrl, {
			headers: {
				"Authorization": authorizationHeader
			}
		});
		items.push(...response.data.items);
		currentPageUrl = response.data.next;
	}
	return items;
};


module.exports = fetchAllPages;
