let express = require('express');
let training = express.Router();
let database = require('../Database/database');
let cors = require('cors');
let multer = require("multer");
let fs = require("fs");
let jwt = require('jsonwebtoken');

training.use(cors());
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null, 'Photos/training')
  },
    filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.split(' ').join('-'))
  }
})
let upload = multer({ storage: storage })

let remove_image = (photo) => {
	fs.unlink(photo, (err) => {
		if (err)
			console.log(err);
	});
}

training.use((req, res, next) => {
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

training.post('/create', /*upload.single('image'),*/ (req, res) => {

	let token = req.body.token || req.headers['token'];
	decoded = jwt.decode(token);

    let today = new Date();
	let response = {
		"error": 1,
		"data": ""
	};
    //let photo = "Photos/training/" + req.file.filename;
	let userData = {
		"training_location": req.body.training_location,
        "training_date": req.body.training_date ? req.body.training_date : today,
		// "image": photo,
		"image": req.body.image,
        "course_id": req.body.course_id,
        "user_id": decoded.id
	}
	database.connection.getConnection((err, connection) => {
		if (err) {
			remove_image(photo);
			response["error"] = 1;
			response["data"] = "Internal Server Error";
			res.status(500).json(response);
		}	else {
			connection.query('INSERT INTO training SET ?', userData, (err, rows, fields) => {
				if (!err) {
					response.error = 0;
					response["data"] = rows;
					res.status(201).json(response);
				} else {
					remove_image(photo);
					response["data"] = "Training creation failed, missing mandatory data";
					console.log(err);
					res.status(400).json(response);
				}
			});
			connection.release();
		}
	});
});

training.delete('/delete', (req, res) => {
	let response = {
		"error": 1,
		"data": ""
	};
	let id = req.body.training_id;
    let image = "";
	database.connection.getConnection((err, connection) => {
		if (err) {
			response["error"] = 1;
			response["data"] = "Internal Server Error";
			res.status(500).json(response);
		}	else {
            let sql = "SELECT image FROM training WHERE training_id = ?";
            connection.query(sql, [id], (err, rows, fields) => {
                if (err) {
					response["error"] = 1;
					response["data"] = "An error has occured";
					res.status(200).json(response);
                }
                if (rows.length > 0)
                    image = rows[0].image;
            });
			sql = "DELETE FROM training WHERE training_id = ?";
			connection.query(sql, [id], (err, result) => {
				if (err) {
					response["error"] = 1;
					response["data"] = "An error has occured";
					res.status(200).json(response);
				}
				if (result.affectedRows <= 0) {
					response["error"] = 1;
					response["data"] = "Error training not found";
					res.status(200).json(response);
				} else {
					remove_image(image);
					response["error"] = 0;
					response["data"] = "Training removed successfuly";
					res.status(200).json(response);
				}
			  });
			  connection.release();
			}
	});
});

module.exports = training;
