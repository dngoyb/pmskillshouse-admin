let express = require('express');
let cors = require('cors');
let bodyParser = require("body-parser");
let app = express();
const dotenv = require('dotenv')
let port = process.env.PORT || 3000;

dotenv.config();

process.env.SECRET_KEY = "PMSKILLSHOUSE_VESICA_TEAM";

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, Cache-Control, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

let Users = require('./Routes/Users');
let Courses = require('./Routes/Courses');
let Training = require('./Routes/Training');
let Questions = require('./Routes/Questions');
let Trainees = require('./Routes/Trainees');
let Assessment = require('./Routes/Assessment');
let PostAssessment = require('./Routes/PostAssessment');

app.use('/api/v1/users', Users);
app.use('/api/v1/courses', Courses);
app.use('/api/v1/training', Training);
app.use('/api/v1/questions', Questions);
app.use('/api/v1/trainees', Trainees);
app.use('/api/v1/assessment', Assessment);
app.use('/api/v1/postassessment', PostAssessment);

app.listen(port, () => {
    console.log("API Server is running on port: " + port);
});
