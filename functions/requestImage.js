const rp = require("request-promise");

module.exports = function(url) {
	return new Promise((resolve, reject) => {
		rp({
			uri: url,
			encoding: null
		}).then(result => {
			resolve(`data:image/jpg;base64,${result.toString("base64")}`);
		}).catch(error => reject(erroe));
	});
}