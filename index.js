const bodyParser = require("body-parser"),
  path = require("path"),
  methodOverrite = require("method-override"),
  mongoose = require("mongoose"),
  expressSanitizer = require("express-sanitizer"),
  express = require("express"),
  Blog = require("./models/Blog"),
  app = express();

require("dotenv").config();

const PORT = process.env.PORT || 5000;
const CONNECTION_URL =
  process.env.MONGODB_URI || "mongodb://localhost/restful_blog_app";

mongoose.set("useUnifiedTopology", true);

mongoose.connect(CONNECTION_URL, {
  useNewUrlParser: true
});

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressSanitizer());
app.use(methodOverrite("_method"));

const about = require("./routes/about"),
  contact = require("./routes/contact"),
  blog = require("./routes/blog"),
  what_is_new = require("./routes/what_is_new");

app.use(about);
app.use(contact);
app.use(blog);
app.use(what_is_new);

//Redirect to home
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.listen(PORT, () => {
  console.log("Server is running!");
});
