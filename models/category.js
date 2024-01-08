
var schemaCategory = require("../schema/category");

module.exports = {
  getAllProductsByCategory: function (categoryId) {
    return schemaCategory.find({ product_k: product_k }).exec();
  },
  getAll: function () {
    return schemaCategory.find({}).exec();
  },
  getallSort: function () {
    return schemaCategory.find({ isDelete: false })
      .sort({ order: 1 })
      .populate("product_k")
      .exec();
},
  getById: function (id) {
    return schemaCategory.findById(id);
  },
  getByName: function (name) {
    return schemaCategory.findOne({name}).exec();
  },
  createCategory: function (category) {
    return new schemaCategory(category).save();
  },
};