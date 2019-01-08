let express = require('express');
let users = express.Router();
let database = require('../Database/database');
let cors = require('cors')
let jwt = require('jsonwebtoken');
let validator = require("email-validator");
let mailer = require("../Mailer/mailer");
const bcrypt = require('bcrypt');
const saltRounds = 8;

users.use(cors());

/*
users.use((req, res, next) => {
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
});*/

users.post('/register', (req, res) => {

	let today = new Date();
	let response = {
		"error": 1,
		"data": ""
	};
	let userData = {
		"first_name": req.body.first_name,
		"last_name": req.body.last_name,
		"email": req.body.email,
		"identity_number": req.body.identity_number ? req.body.identity_number : 345555,
		"phone_number": req.body.phone_number ? req.body.phone_number : 1223444,
		"address": req.body.address ? req.body.address : 'soweto',
		"date_of_birth": req.body.date_of_birth ? req.body.date_of_birth : today,
		"employee_number": req.body.employee_number ? req.body.employee_number : 8888,
		"gender": req.body.gender ? req.body.gender : 'male',
		"role": req.body.role ? req.body.role : 2,
		"password": req.body.password,
		"created_date": today
	}
	if (req.body.password) {
		userData.password = bcrypt.hashSync(req.body.password, saltRounds);
	}
	let email = req.body.email;

	if (!validator.validate(email)) {
		response["data"] = "Error email provided is invalid";
		res.status(400).json(response);
	} else {
		database.connection.getConnection((err, connection) => {
			if (err) {
				response["error"] = 1;
				response["data"] = "Internal Server Error here am iam";
				res.status(500).json({
					response,
					err
				});
			} else {
				connection.query('SELECT * FROM user WHERE email = ?', [email], (err, rows, fields) => {
					if (rows.length > 0) {
						response.error = 1;
						response["data"] = "User already exists";
						res.status(201).json(response);
					} else {
						connection.query('INSERT INTO user SET ?', userData, (err, rows, fields) => {
							if (!err) {
								response.error = 0;
								response["data"] = "User registered successfully!";
								let msg_body = "You have been registered to PMSKILLSHOSE, use your email and this " + req.body.password + " password to login.";
								let mailOptions = {
									from: 'PMSKILLSHOUSE <noreply@pmskillshouse.com>',
									to: userData.email,
									subject: 'Welcome to PMSKILLSHOUSE',
									text: msg_body
								};
								mailer.sendMail(mailOptions, function (error, info) {
									if (error) {
										console.log(error);
									} else {
										console.log('Email sent: ' + info.response);
									}
								});
								res.status(201).json(response);
							} else {
								response["data"] = "Error user registration failed, missing mandatory data";
								console.log(err);
								res.status(400).json(response);
							}
						});
						connection.release();
					}
				})
			}
		});
	}
});

users.post('/signup', (req, res) => {

	let today = new Date();
	let response = {
		"error": 1,
		"data": ""
	};
	let userData = {
		"first_name": req.body.first_name,
		"last_name": req.body.last_name,
		"password": req.body.password,
		"email": req.body.email,
		"identity_number": req.body.identity_number,
		"phone_number": req.body.phone_number,
		"address": req.body.address,
		"date_of_birth": req.body.date_of_birth,
		"employee_number": req.body.employee_number ? req.body.employee_number : 8888,
		"gender": req.body.gender,
		"role": req.body.role ? req.body.role : 1,
		"created_date": today
	}
	if (req.body.password) {
		userData.password = bcrypt.hashSync(req.body.password, saltRounds);
	}
	let email = req.body.email;

	if (!validator.validate(email)) {
		response["data"] = "Error email provided is invalid";
		res.status(400).json(response);
	} else {
		database.connection.getConnection((err, connection) => {
			if (err) {
				response["error"] = 1;
				response["data"] = "Internal Server Error here am iam";
				res.status(500).json({
					response,
					err
				});
			} else {
				connection.query('SELECT * FROM user WHERE email = ?', [email], (err, rows, fields) => {
					if (rows.length > 0) {
						response.error = 1;
						response["data"] = "User already exists";
						res.status(201).json(response);
					} else {
						connection.query('INSERT INTO user SET ?', userData, (err, rows, fields) => {
							if (!err) {
								response.error = 0;
								response["data"] = "User registered successfully!";
								let msg_body = "You have been registered to PMSKILLSHOSE, use your email and this " + req.body.password + " password to login.";
								let mailOptions = {
									from: 'PMSKILLSHOUSE <noreply@pmskillshouse.com>',
									to: userData.email,
									subject: 'Welcome to PMSKILLSHOUSE',
									text: msg_body
								};
								mailer.sendMail(mailOptions, function (error, info) {
									if (error) {
										console.log(error);
									} else {
										console.log('Email sent: ' + info.response);
									}
								});
								res.status(201).json(response);
							} else {
								response["data"] = "Error user registration failed, missing mandatory data";
								console.log(err);
								res.status(400).json(response);
							}
						});
						connection.release();
					}
				})
			}
		});
	}
});




users.post('/login', (req, res) => {

	let response = {};
	let email = req.body.email;
	let password = req.body.password;

	database.connection.getConnection((err, connection) => {
		if (err) {
			console.log(err);
			response["error"] = 1;
			response["data"] = "Internal Server Error";
			res.status(500).json(response);
		} else {
			connection.query('SELECT * FROM user WHERE email = ?', [email], (err, rows, fields) => {
				//console.log("Row: ", rows);
				if (err) {
					response.error = 1;
					response["data"] = "Error Occured!";
					res.status(201).json(response);
				} else {
					if (rows.length > 0) {
						if (bcrypt.compareSync(password, rows[0].password)) {
							let pay = {
								email: rows[0].email,
								id: rows[0].user_id,
								role: rows[0].role
							}
							let token = jwt.sign(pay, process.env.SECRET_KEY);
							response.error = 0;
							response["token"] = token;
							res.status(200).json(response);
						} else {
							response.error = 1;
							response["data"] = "Email and Password does not match";
							res.status(201).json(response);
						}
					} else {
						response.error = 1;
						response["data"] = "Email does not exists!";
						res.status(201).json(response);
					}
				}
			});
			connection.release();
		}
	});
});



users.post('/forgot', (req, res) => {

	let response = {
		"error": 1,
		"data": ""
	};
	let userData = {
		"email": req.body.email
	}

	database.connection.getConnection((err, connection) => {
		if (err) {
			response["data"] = "Internal Server Error";
			res.status(500).json(response);
		} else {
			connection.query('SELECT * FROM user WHERE email = ?', [userData.email], (err, rows, fields) => {
				if (rows.length > 0) {
					let code = Math.floor(Math.random() * (999999 - 4000)) + 4000;
					connection.query('UPDATE user SET code = ? WHERE email = ?', [code, userData.email], (err, result) => {
						if (err) {
							response.data = "SQL error";
							res.status(500).json(response);
						} else {
							let msg_body = "Use this code " + code + " to generate a new PMSKILLSHOUSE password.";
							let mailOptions = {
								from: 'PMSKILLSHOUSE <noreply@pmskillshouse.com>',
								to: userData.email,
								subject: 'PMSKILLSHOUSE: lOST PASSWORD',
								text: msg_body
							};
							mailer.sendMail(mailOptions, function (error, info) {
								if (error) {
									response.error = 1;
									response.data = "Error unable to send email";
									res.status(500).json(response);
								} else {
									response.error = 0;
									response.data = "Code sent to email";
									res.status(200).json(response);
								}
							});
						}
					});
				} else {
					response.data = "Email not found";
					res.status(404).json(response);
				}
			});
			connection.release();
		}
	});

});

users.put('/reset', (req, res) => {

	let response = {
		"error": 1,
		"data": ""
	};
	let userData = {
		"code": req.body.code,
		"password": req.body.password,
		"confirm_password": req.body.confirm_password
	}

	database.connection.getConnection((err, connection) => {
		if (err) {
			response["error"] = 1;
			response["data"] = "Internal Server Error";
			res.status(500).json(response);
		} else {
			connection.query('SELECT * FROM user WHERE code = ?', [userData.code], (err, rows, fields) => {
				console.log("Rows: ", rows);
				console.log("UserData: ", userData);
				if (rows.length > 0) {
					console.log(userData);
					if (userData.password === userData.confirm_password) {
						userData.password = bcrypt.hashSync(req.body.password, saltRounds);
						connection.query('UPDATE user SET password = ? WHERE code = ?', [userData.password, userData.code], (err, rows, fields) => {
							if (!err) {
								response.error = 0;
								response["data"] = "Password successfully reset!";
								res.status(201).json(response);
							} else {
								response["data"] = "Failed to reset password";
								res.status(400).json(response);
							}
						});
					} else {
						response["data"] = "Passwords do not match!";
						res.status(400).json(response);
					}
				} else {
					response["data"] = "Email not found";
					res.status(404).json(response);
				}
			});
			connection.release();
		}
	});
});

users.post('/addCourse', (req, res) => {

	let response = {
		"error": 1,
		"data": ""
	};
	let courseData = {
		"course_name": req.body.course_name,
		"course_description": req.body.course_description
	}
	database.connection.getConnection((err, connection) => {
		if (err) {
			response["error"] = 1;
			response["data"] = "Internal Server Error";
			res.status(500).json(response);
		} else {
			connection.query('INSERT INTO assessment SET ?', courseData, (err, rows, fields) => {
				console.log("Assessment data: ", courseData);
				if (!err) {
					response.error = 0;
					response["data"] = rows;
					res.status(201).json(response);
				} else {
					response["data"] = "Course creation failed, missing mandatory data";
					res.status(400).json(response);
				}
			});
			connection.release();
		}
	});
});

users.get('/getUsers', (req, res) => {

	let response = {};

	database.connection.getConnection((err, connection) => {
		if (err) {
			response["error"] = 1;
			response["data"] = "Internal Server Error";
			res.status(500).json(response);
		} else {
			connection.query('SELECT * FROM user', (err, rows, fields) => {
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

users.get('/getCourses', (req, res) => {

	let response = {};

	database.connection.getConnection((err, connection) => {
		if (err) {
			response["error"] = 1;
			response["data"] = "Internal Server Error";
			res.status(500).json(response);
		} else {
			connection.query('SELECT * FROM course', (err, rows, fields) => {
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

users.get('/getTrainings', (req, res) => {

	let response = {};

	database.connection.getConnection((err, connection) => {
		if (err) {
			response["error"] = 1;
			response["data"] = "Internal Server Error";
			res.status(500).json(response);
		} else {
			connection.query('SELECT * FROM training', (err, rows, fields) => {
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

users.get('/getAssessments', (req, res) => {

	let response = {};

	database.connection.getConnection((err, connection) => {
		if (err) {
			response["error"] = 1;
			response["data"] = "Internal Server Error";
			res.status(500).json(response);
		} else {
			connection.query('SELECT * FROM assessment', (err, rows, fields) => {
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

users.get('/getPostAssessments', (req, res) => {

	let response = {};

	database.connection.getConnection((err, connection) => {
		if (err) {
			response["error"] = 1;
			response["data"] = "Internal Server Error";
			res.status(500).json(response);
		} else {
			connection.query('SELECT * FROM postassessment', (err, rows, fields) => {
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

users.get('/getQuestions', (req, res) => {

	let response = {};

	database.connection.getConnection((err, connection) => {
		if (err) {
			response["error"] = 1;
			response["data"] = "Internal Server Error";
			res.status(500).json(response);
		} else {
			connection.query('SELECT * FROM question', (err, rows, fields) => {
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

users.get('/getTrainees', (req, res) => {

	let response = {};

	database.connection.getConnection((err, connection) => {
		if (err) {
			response["error"] = 1;
			response["data"] = "Internal Server Error";
			res.status(500).json(response);
		} else {
			connection.query('SELECT t.trainee_id "Trainee ID", CONCAT(t.first_name, " ", t.last_name) \
				"Trainee Name", t.gender "Gender", t.phone_number "Phone Number",\
				t.address "Address", t.date_of_birth "Date of birth", t.identity_number "ID Number",\
				t.username "Username", CONCAT(u.first_name, " ", u.last_name) "Trainer Name",\
				tr.training_location "Training location", tr.training_date "Date"\
				FROM trainee t, user u, training tr WHERE t.user_id = u.user_id;', (err, rows, fields) => {
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



module.exports = users;