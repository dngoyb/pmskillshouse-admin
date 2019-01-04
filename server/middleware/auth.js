let jwt = require('jsonwebtoken');

assessment.use((req, res, next) => {
	let token = req.body.token || req.headers['token'];
	decoded = jwt.decode(token);
	let response = {};
	if (token) {
		 		jwt.verify(token, process.env.SECRET_KEY, (err) => {
			if (err) {
				response["error"] = 1;
				response["data"] = "Token is invalid";
				res.status(200).json(response);
			} else {
				next();
			}
		});
	} else {
		response["error"] = 1;
		response["data"] = "Please send a token";
		res.status(200).json(response);
	}
});