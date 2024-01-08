var express = require("express");
const responseData = require("../helper/responseData");
var router = express.Router();

var modelProduct = require("../models/product");

var productschema = require("../schema/product");
const { body, validationResult } = require("express-validator");
var validate = require("../validates/product");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  var productAll = await modelProduct.getallSort();
  responseData.responseReturn(res, 200, true, productAll);
});

router.get("/:id", async function (req, res, next) {
  try {
    var product = await modelProduct.getById(req.params.id);
    responseData.responseReturn(res, 200, true, product);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay product");
  }
});

router.post("/add", async function (req, res, next) {
  // , validate.validator()
  var errors = validationResult(req);
  if (!errors.isEmpty()) {
    responseData.responseReturn(
      res,
      404,
      false,
      errors.array().map((error) => error.msg)
    );
    return;
  }
  var product = await modelProduct.getByName(req.body.name);
  if (product) {
    responseData.responseReturn(res, 404, false, "product da ton tai");
  } else {
    const newProduct = await modelProduct.createProduct({
      // description: req.body.description,
      name: req.body.name,
      price: req.body.price,
      isDelete: req.body.isDelete,
      order: req.body.order,
      category_k: req.body.category_k
    });
    responseData.responseReturn(res, 200, true, newProduct);
  }
});
router.put("/edit/:id", async function (req, res, next) {
  try {
    var updatedProduct = await productschema.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );
    console.log(updatedProduct);
    responseData.responseReturn(res, 200, true, updatedProduct);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay product");
  }
});
router.delete("/delete/:id", async function (req, res, next) {
  //delete by Id
  try {
    var deletedProduct = await productschema.findByIdAndUpdate(
      req.params.id,
      {
        isDelete:true
      },
      { returnDocument: "after" }
    );
    console.log(deletedProduct);
    responseData.responseReturn(res, 200, true, deletedProduct);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "khong tim thay product");
  }
});
module.exports = router;