let express = require('express');
let trainees = express.Router();
let database = require('../Database/database');
let cors = require('cors');
let fs = require("fs");
let jwt = require('jsonwebtoken');
let imageDataURI = require('image-data-uri');

let remove_image = (photo) => {
	fs.unlink(photo, (err) => {
		if (err)
			console.log(err);
	});
}
trainees.use(cors());

trainees.use((req, res, next) => {
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

trainees.post('/create', (req, res) => {
	let token = req.body.token || req.headers['token'];
	decoded = jwt.decode(token);
	//console.log(decoded);

    let today = new Date();
	let response = {
		"error": 1,
		"data": ""
	};
	let r = Math.random().toString(36).substring(2);
	let photo = "Photos/signatures/" + Date.now() + "-" + r +".png";
	if (!req.body.first_name || !req.body.last_name || !req.body.signature) {
		response["data"] = "Trainee creation failed, missing mandatory data";
		return res.status(400).json(response);
	}
	imageDataURI.outputFile(req.body.signature, photo).then(res =>
		console.log(res)).catch(err => {
			console.log("Image err: "+err);
		});
	let userData = {
		"first_name": req.body.first_name,
        "last_name": req.body.last_name,
        "signature": photo,
        "phone_number": req.body.phone_number,
        "address": req.body.address,
        "date_of_birth": req.body.date_of_birth ? req.body.date_of_birth : today,
        "identity_number": req.body.identity_number ? req.body.identity_number : "NA",
        "user_id": decoded.id,
       	"gender": req.body.gender,
        "training_id": req.body.training_id ? req.body.training_id : 55,
		"username": req.body.first_name.toLowerCase() + req.body.last_name.toLowerCase()
	}

	database.connection.getConnection((err, connection) => {
		if (err) {
			remove_image(photo);
			response["error"] = 1;
			response["data"] = "Internal Server Error";
			res.status(500).json(response);
		}	else {
			connection.query('INSERT INTO trainee SET ?', userData, (err, rows, fields) => {
				if (!err) {
					response.error = 0;
					response["data"] = rows;
					res.status(201).json(response);
				} else {
					remove_image(photo);
					response["data"] = "Trainee creation failed, missing mandatory data";
					console.log(err);
					res.status(400).json(response);
				}
			});
			connection.release();
		}
	});
});

trainees.post('/traineeLogin', (req, res) => {

	let response = {};
	let username = req.body.username;
	console.log("req.body", req.body)

	database.connection.getConnection((err, connection) => {
		if (err) {
			console.log(err);
			response["error"] = 1;
			response["data"] = "Internal Server Error";
			res.status(500).json(response);
		} else {
			connection.query('SELECT * FROM trainee WHERE username = ?', [username], (err, rows, fields) => {
				if (err) {
					response.error = 1;
					response["data"] = "Error Occured!"+JSON.stringify(err);
					res.status(201).json(response);
				} else {
					console.log("row", rows, `(${username})`)
					if (rows.length > 0) {
						if (username === rows[0].username) {
							response.error = 0;
							response["data"] = rows;
							res.status(200).json(response);
						} else {
							response.error = 1;
							response["data"] = "username does not exist";
							res.status(201).json(response);
						}
					} else {
						response.error = 1;
						response["data"] = "trainee does not exists!";
						res.status(201).json(response);
					}
				}
			});
			connection.release();
		}
	});
});

trainees.delete('/delete', (req, res) => {
	let response = {
		"error": 1,
		"data": ""
	};
	let id = req.body.trainee_id;
    let image = "";
	database.connection.getConnection((err, connection) => {
		if (err) {
			response["error"] = 1;
			response["data"] = "Internal Server Error";
			res.status(500).json(response);
		}	else {
            let sql = "SELECT signature FROM trainee WHERE trainee_id = ?";
            connection.query(sql, [id], (err, rows, fields) => {
                if (err) {
					response["error"] = 1;
					response["data"] = "An error has occured";
					res.status(200).json(response);
                }
                if (rows.length > 0)
                    image = rows[0].signature;
            });
			sql = "DELETE FROM trainee WHERE trainee_id = ?";
			connection.query(sql, [id], (err, result) => {
				if (err) {
					response["error"] = 1;
					response["data"] = "An error has occured";
					res.status(200).json(response);
				}
				if (result.affectedRows <= 0) {
					response["error"] = 1;
					response["data"] = "Error trainee not found";
					res.status(200).json(response);
				} else {
					remove_image(image);
					response["error"] = 0;
					response["data"] = "Trainee removed successfuly";
					res.status(200).json(response);
				}
			  });
			  connection.release();
			}
	});
});

module.exports = trainees;
