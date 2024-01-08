var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const schema = new mongoose.Schema({
    name: String,
    price: Number,
    isDelete: Boolean,
    order: Number,
    category_k: [
      {
        type: Schema.Types.ObjectId,
        ref: "categories",
      },
    ],
  });
module.exports = mongoose.model("products", schema);