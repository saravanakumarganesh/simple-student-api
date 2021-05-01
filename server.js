var express = require('express');
var app = express();

//======================================================
// configure app to use body parser so that it can read the request from POST methods
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//======================================================
// express routers to handle requests
var router = express.Router();

router.use((req, res, next) => {
  console.log('A request has come in for processing');
  next();
});

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});
//routes for api
//@api POST /api/students
//@desc creaet a student
router
  .route('/students')
  .post((req, res) => {
    var student = new Student();
    student.name = req.body.name;
    student.age = req.body.age;
    student.save((err) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Student created!' });
    });
  })
  //@api GET /api/students
  //@desc get all students
  .get((req, res) => {
    Student.find((err, students) => {
      if (err) {
        res.send(err);
      }
      res.json(students);
    });
  });
//@api GET /api/students/:student_id
//@desc get student by id
router
  .route('/students/:student_id')
  .get((req, res) => {
    Student.findById(req.params.student_id, (err, student) => {
      if (err) {
        res.send(err);
      }
      res.json(student);
    });
  })
  //@api PUT /api/students/:student_id
  //@desc updates student details
  .put((req, res) => {
    Student.findById(req.params.student_id, (err, student) => {
      if (err) {
        console.log(err);
        res.send(err);
      }

      student.age = req.body.age;
      student.save((err) => {
        if (err) {
          console.log(err);
          res.send(err);
        }
        res.json({ Message: 'Student updated!' });
      });
    });
  })
  //@api DELETE /api/students/:student_id
  //@desc delete student by id
  .delete((req, res) => {
    Student.findById(req.params.student_id, (err, student) => {
      if (err) {
        res.send(err);
      }
      student.remove((err) => {
        if (err) {
          res.send(err);
        }
        res.json({ Message: 'Student deleted!' });
      });
    });
  });

//======================================================
// register the routes
app.use('/api', router);
//======================================================

//======================================================
// mongoDB connect
var mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://testsaravana:Libjan21@@cluster0.2uatj.mongodb.net/school?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

var Student = require('./app/models/student');

//=============================================
var PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
