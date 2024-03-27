const mongoose = require("mongoose");

const ResturantInfoSchema = new mongoose.Schema({
  resturantname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

const ResturantInfo =
  mongoose.models.resturantuserinfo ||
  mongoose.model("resturantuserinfo", ResturantInfoSchema);

module.exports = ResturantInfo;
