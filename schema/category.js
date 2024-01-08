var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var Schema = mongoose.Schema;
var jwt = require("jsonwebtoken");
const crypto = require("crypto");
const schema = new mongoose.Schema({
  name: String,
  isDelete: Boolean,
  order: Number,
  product_k: [
    {
      type: Schema.Types.ObjectId,
      ref: "products",
    },
  ],
});
schema.virtual("cat", {
  ref: "product",
  localField: "_id",
  foreignField: "category_k",
});
schema.set("toJSON", { virtuals: true });
schema.set("toObject", { virtuals: true });
module.exports = mongoose.model("categories", schema);