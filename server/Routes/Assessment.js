let express = require('express');
let assessment = express.Router();
let database = require('../Database/database');
let cors = require('cors');
let jwt = require('jsonwebtoken');

assessment.use(cors());

assessment.post('/create', (req, res) => {

	let response = {
		"error": 1,
		"data": ""
	};
	let userData = {
		"pre_feedback": req.body.pre_feedback,
        "question_id": req.body.question_id,
        "trainee_id": req.body.trainee_id
	}
	database.connection.getConnection((err, connection) => {
		if (err) {
			response["error"] = 1;
			response["data"] = "Internal Server Error";
			res.status(500).json(response);
		}	else {
			connection.query('INSERT INTO assessment SET ?', userData, (err, rows, fields) => {
				console.log("Assessment data: ", userData);
				if (!err) {
					response.error = 0;
					response["data"] = rows;
					res.status(201).json(response);
				} else {
					response["data"] = "Assessment creation failed, missing mandatory data";
					res.status(400).json(response);
				}
			});
			connection.release();
		}
	});
});

assessment.delete('/delete', (req, res) => {
	let response = {
		"error": 1,
		"data": ""
	};
	let id = req.body.assessment_id;
	database.connection.getConnection((err, connection) => {
		if (err) {
			response["error"] = 1;
			response["data"] = "Internal Server Error";
			res.status(500).json(response);
		}	else {
			let sql = "DELETE FROM assessment WHERE assessment_id = ?";
			connection.query(sql, [id], (err, result) => {
				if (err) {
					response["error"] = 1;
					response["data"] = "An error has occured";
					res.status(200).json(response);
				}
				if (result.affectedRows <= 0) {
					response["error"] = 1;
					response["data"] = "Error assessment not found";
					res.status(200).json(response);
				} else {
					response["error"] = 0;
					response["data"] = "Assessment removed successfuly";
					res.status(200).json(response);
				}
			  });
			  connection.release();
			}
	});
});

module.exports = assessment;
