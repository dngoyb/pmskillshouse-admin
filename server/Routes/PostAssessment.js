let express = require('express');
let postassessment = express.Router();
let database = require('../Database/database');
let cors = require('cors');
let jwt = require('jsonwebtoken');

postassessment.use(cors());

postassessment.post('/create', (req, res) => {

	let response = {
		"error": 1,
		"data": ""
	};
	let userData = {
        "post_feedback": req.body.post_feedback,
        "question_id": req.body.question_id,
        "trainee_id": req.body.trainee_id
	}
	database.connection.getConnection((err, connection) => {
		if (err) {
			response["error"] = 1;
			response["data"] = "Internal Server Error";
			res.status(500).json(response);
		}	else {
			connection.query('INSERT INTO postassessment SET ?', userData, (err, rows, fields) => {
				console.log("Post assessment data: ", userData);
				if (!err) {
					response.error = 0;
					response["data"] = rows;
					res.status(201).json(response);
				} else {
					response["data"] = "Post assessment creation failed, missing mandatory data";
					res.status(400).json(response);
				}
			});
			connection.release();
		}
	});
});

postassessment.delete('/delete', (req, res) => {
	let response = {
		"error": 1,
		"data": ""
	};
	let id = req.body.postAssessment_id;
	database.connection.getConnection((err, connection) => {
		if (err) {
			response["error"] = 1;
			response["data"] = "Internal Server Error";
			res.status(500).json(response);
		}	else {
			let sql = "DELETE FROM postassessment WHERE postAssessment_id = ?";
			connection.query(sql, [id], (err, result) => {
				if (err) {
					response["error"] = 1;
					response["data"] = "An error has occured";
					res.status(200).json(response);
				}
				if (result.affectedRows <= 0) {
					response["error"] = 1;
					response["data"] = "Error post assessment not found";
					res.status(200).json(response);
				} else {
					response["error"] = 0;
					response["data"] = "Post assessment removed successfuly";
					res.status(200).json(response);
				}
			  });
			  connection.release();
			}
	});
});

module.exports = postassessment;
