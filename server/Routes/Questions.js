let express = require('express');
let questions = express.Router();
let database = require('../Database/database');
let cors = require('cors');
let jwt = require('jsonwebtoken');

questions.use(cors());

questions.use((req, res, next) => {
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

questions.post('/create', (req, res) => {

	let response = {
		"error": 1,
		"data": ""
	};
	let userData = {
		"pre_question": req.body.pre_question,
        "post_question": req.body.post_question,
        "course_id": req.body.course_id,
        "question_type": req.body.question_type
	}
	database.connection.getConnection((err, connection) => {
		if (err) {
			response["error"] = 1;
			response["data"] = "Internal Server Error";
			res.status(500).json(response);
		}	else {
			connection.query('INSERT INTO question SET ?', userData, (err, rows, fields) => {
				if (!err) {
					response.error = 0;
					response["data"] = "Question created successfully!";
					res.status(201).json(response);
				} else {
					response["data"] = "Question creation failed, missing mandatory data";
					console.log(err);
					res.status(400).json(response);
				}
			});
			connection.release();
		}
	});
});

questions.get('/getquestions', (req, res) => {
	let course_id = req.query.course_id; //get it from url params

	let response = {};
		console.table(req.query);
		database.connection.getConnection((err, connection) => {
			if (err) {
				response["error"] = 1;
				response["data"] = "Internal Server Error";
				res.status(500).json(response);
		} else {
				connection.query('SELECT * FROM question WHERE course_id = ?', [course_id], (err, rows, fields) => {
					if (!err) {
						response["error"] = 0;
						response["data"] = rows;
						res.status(200).json(response);
				} else {
						response["data"] = "No data found";
						res.status(204).json(response);
				}
			});
			connection.release();
		}
	});
}); 

questions.delete('/delete', (req, res) => {
	let response = {
		"error": 1,
		"data": ""
	};
	let id = req.body.question_id;
	database.connection.getConnection((err, connection) => {
		if (err) {
			response["error"] = 1;
			response["data"] = "Internal Server Error";
			res.status(500).json(response);
		}	else {
			let sql = "DELETE FROM question WHERE question_id = ?";
			connection.query(sql, [id], (err, result) => {
				if (err) {
					response["error"] = 1;
					response["data"] = "An error has occured";
					res.status(200).json(response);
				}
				if (result.affectedRows <= 0) {
					response["error"] = 1;
					response["data"] = "Error question not found";
					res.status(200).json(response);
				} else {
					response["error"] = 0;
					response["data"] = "Question removed successfuly";
					res.status(200).json(response);
				}
			  });
			  connection.release();
			}
	});
});

questions.patch('/edit', (req, res) => {
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
			let sql = "UPDATE question SET pre_question = ?, post_question = ?, question_type = ?, course_id = ? WHERE question_id = ?";
            connection.query(sql, [req.body.pre_question,
                req.body.post_question, req.body.question_type, req.body.course_id, req.body.question_id], (err, result) => {
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
					response["data"] = "Questions edited successfuly";
					res.status(200).json(response);
				}
			  });
			  connection.release();
			}
	});
});

module.exports = questions;