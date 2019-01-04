let express = require('express');
let courses = express.Router();
let database = require('../Database/database');
let cors = require('cors');
let jwt = require('jsonwebtoken');

courses.use(cors());

courses.use((req, res, next) => {
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

courses.post('/create', (req, res) => {

	let response = {
		"error": 1,
		"data": ""
	};
	let userData = {
		"course_name": req.body.course_name,
		"course_description": req.body.course_description,
	}
	database.connection.getConnection((err, connection) => {
		if (err) {
			response["error"] = 1;
			response["data"] = "Internal Server Error";
			res.status(500).json(response);
		}	else {
			connection.query('INSERT INTO course SET ?', userData, (err, rows, fields) => {
				if (!err) {
					response.error = 0;
					response["data"] = "Course created successfully!";
					res.status(201).json(response);
				} else {
					response["data"] = "Course creation failed, missing mandatory data";
					console.log(err);
					res.status(400).json(response);
				}
			});
			connection.release();
		}
	});
});

courses.delete('/delete', (req, res) => {
	let response = {
		"error": 1,
		"data": ""
	};
	let id = req.body.course_id;
	database.connection.getConnection((err, connection) => {
		if (err) {
			response["error"] = 1;
			response["data"] = "Internal Server Error";
			res.status(500).json(response);
		}	else {
			let sql = "DELETE FROM course WHERE course_id = ?";
			connection.query(sql, [id], (err, result) => {
				if (err) {
					response["error"] = 1;
					response["data"] = "An error has occured";
					res.status(200).json(response);
				}
				if (result.affectedRows <= 0) {
					response["error"] = 1;
					response["data"] = "Error course not found";
					res.status(200).json(response);
				} else {
					response["error"] = 0;
					response["data"] = "Course removed successfuly";
					res.status(200).json(response);
				}
			  });
			  connection.release();
			}
	});
});

courses.patch('/edit', (req, res) => {
	let response = {
		"error": 1,
		"data": ""
	};
	database.connection.getConnection((err, connection) => {
		if (err) {
			response["error"] = 1;
			response["data"] = "Internal Server Error";
			res.status(500).json(response);
		}	else {
			let sql = "UPDATE course SET course_name = ?, course_description = ? WHERE course_id = ?";
			connection.query(sql, [req.body.course_name, req.body.course_description, req.body.course_id], (err, result) => {
				if (err) {
					response["error"] = 1;
					response["data"] = "An error has occured";
					res.status(200).json(response);
				}
				if (result.affectedRows <= 0) {
					response["error"] = 1;
					response["data"] = "Error course not found";
					res.status(200).json(response);
				} else {
					response["error"] = 0;
					response["data"] = "Course edited successfuly";
					res.status(200).json(response);
				}
			  });
			  connection.release();
			}
	});
});


courses.get('/display', (req, res) => {

	let token = req.body.token || req.headers['token'];
	decoded = jwt.decode(token);
	console.log("Course token data: ",decoded);

	let response = {
		"error": 1,
		"data": ""
	};
	let userData = {
		"course_name": req.body.course_name,
		"course_description": req.body.course_description,
	}

	
	database.connection.getConnection((err, connection) => {
		if (err) {
			response["error"] = 1;
			response["data"] = "Internal Server Error";
			res.status(500).json(response);
		}	else {
			connection.query('SELECT * FROM course', userData, (err, rows, fields) => {
				console.log("Course data: ", rows);
				if (!err) {
					response.error = 0;
					response["data"] = rows;
					res.status(201).json(response);
				} else {
					response["data"] = "Courses cannot be displayed";
					console.log(err);
					res.status(400).json(response);
				}
			});
			connection.release();
		}
	});
});

module.exports = courses;