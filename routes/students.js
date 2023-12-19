var express = require('express');
const { use } = require('.');
var router = express.Router();
var responseData = require('../helper/responseData');

const Students = [
  { id: 1,
    name: "Dung",
    diemTb: 8,},
  { id: 2, 
    name: "Nga",
    diemTb: 7, },
  { id: 3, 
    name: "Loc",
    diemTb: 5, }
];


//domain:port/users
/* GET users listing. */
router.get('/', function (req, res, next) {
  responseData.responseReturn(res, 200, true, Students);
});
router.get('/:id', function (req, res, next) {// get by ID
  var student = Students.find(student => student.id == req.params.id);
  if (student) {
    responseData.responseReturn(res, 200, true, student);
  } else {
    responseData.responseReturn(res, 404, false, "khong tim thay student");
  }
});
router.post('/add', function (req, res, next) {
  var student = Students.find(student => student.id == req.body.id);
  if(student){
    responseData.responseReturn(res, 404, false, "student da ton tai");
  }else{
    const newStudent = {
      id: req.body.id,
      name: req.body.name,
      diemTb: req.body.diemTb,
    }
    Students.push(newStudent);
    responseData.responseReturn(res, 200, true, newStudent);
  }
});
router.put('/edit/:id', function (req, res, next) {
  var student = Students.find(student => student.id == req.params.id);
  if (student) {
    student.name = req.body.name;
    student.diemTb = req.body.diemTb;
    responseData.responseReturn(res, 200, true, student);
  } else {
    responseData.responseReturn(res, 404, false, "khong tim thay student");
  }
});
router.delete('/delete/:id', function (req, res, next) {//delete by Id
  var ids = Students.map(student=>student.id);
  var index = ids.indexOf(parseInt(req.params.id));
  console.log(index);
  //var index  = users.indexOf(user);
  if (index>-1) {
    Students.splice(index,1);
    responseData.responseReturn(res, 200, true, Students);
  } else {
    responseData.responseReturn(res, 404, false, "khong tim thay student");
  }
});

module.exports = router;