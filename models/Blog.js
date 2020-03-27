const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  image: {
    type: String,
    default:
      "https://afrobarometer.org/sites/default/files/default_images/afrobarometer-default-graphic-blog-thumbnai_brown_02l_1.jpg"
  },
  body: String,
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Blog", blogSchema);
