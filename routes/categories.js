var express = require("express");
const responseData = require("../helper/responseData");
var router = express.Router();


var modelCategory = require("../models/category");
var categoryschema = require("../schema/category");
const { body, validationResult } = require("express-validator");
var validate = require("../validates/product");


/* GET users listing. */
router.get("/", async function (req, res, next) {
  var categoryAll = await modelCategory.getallSort();
  responseData.responseReturn(res, 200, true, categoryAll);
});

router.get("/:id", async function (req, res, next) {
  // validate.validator(),
  try {
    var category = await modelCategory.getById(req.params.id).populate('productId');
    responseData.responseReturn(res, 200, true, category);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay category");
  }
});

router.post("/add",  async function (req, res, next) {
  var category = await modelCategory.getByName(req.body.name);
  if (category) {
    responseData.responseReturn(res, 404, false, "category da ton tai");
  } else {
    const newcategory = await modelCategory.createCategory({
      name: req.body.name,
      isDelete:req.body.isDelete,
      order:req.body.order,
      product_k:req.body.product_k
    });
    responseData.responseReturn(res, 200, true, newcategory);
  }
});

router.put("/edit/:id", async function (req, res, next) {
  try {
    var updatedCategory = await updatedCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );
    console.log(updatedCategory);
    responseData.responseReturn(res, 200, true, updatedCategory);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay category");
  }
});

router.put("/delete/:id", async function (req, res, next) {
  try {
    var deletedCategory = await categoryschema.findfindByIdAndUpdate(
      req.params.id,
      {
        isDelete:true
      },
      { returnDocument: "after" }
    );
    console.log(deletedCategory);
    responseData.responseReturn(res, 200, true, deletedCategory);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay category");
  }
});

module.exports = router;