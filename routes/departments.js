var express = require('express');
var router = express.Router();
var SchemaDepartment = require('../schema/department');
var responseData = require('../helper/responseData');
var modelDepartment = require('../models/department');
var validates = require('../validates/product');

router.get("/", async function (req, res, next) {
  var departmentAll = await modelDepartment.getAll();
  responseData.responseReturn(res, 200, true, departmentAll);
});

router.get('/:id', async function (req, res, next) {
  try{
    var department = await modelDepartment.getById(req.params.id);
    responseData.responseReturn(res, 200, true, department);
  }catch(err){
    responseData.responseReturn(res, 404, false, "khong tim thay department can tim");
  }
});

router.post("/add", async function(req, res, next){
  var department = await modelDepartment.getByName(req.body.name);
  if (department) {
    responseData.responseReturn(res, 404, false, "department da ton tai");
  } else {
    const newdepartment = await modelDepartment.createDepartment({
      name: req.body.name,
    });
    responseData.responseReturn(res, 200, true, newdepartment);
  }
});

router.put("/edit/:id", async function(req,res,next){
  try{
    var updatedDepartment = await SchemaDepartment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );
    console.log(updatedDepartment);
    responseData.responseReturn(res, 200, true, updatedDepartment);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay department");
  }
});

router.delete("/delete/:id", async function(req,res,next){
  try {
    var department = await SchemaDepartment.findByIdAndDelete(req.params.id);
    responseData.responseReturn(res, 200, true, "xoa thanh cong");
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay department can xoa");
  }
});
module.exports = router;