const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

//GET NEW BLOG
router.get("/blogs/new", (req, res) => {
  res.render("new", { title: "New Blog" });
});

router.get("/blogs", (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log("No blog found!");
    } else {
      res.render("index", { blogs: blogs, title: "Home" });
    }
  });
});

//POST NEW BLOG
router.post("/blogs", (req, res) => {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  if (req.body.blog.image == "") {
    req.body.blog.image = undefined;
  }
  Blog.create(req.body.blog, (err, newBlog) => {
    if (err) {
      res.render("new");
    } else {
      res.redirect("/blogs");
    }
  });
});

//GET BLOG
router.get("/blogs/:id", (req, res) => {
  Blog.findById(req.params.id, (err, foundBlog) => {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("show", {
        blog: foundBlog,
        title: "Blog | " + foundBlog.title
      });
    }
  });
});

//GET UPDATE BLOG
router.get("/blogs/:id/edit", (req, res) => {
  Blog.findById(req.params.id, (err, foundBlog) => {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("edit", {
        blog: foundBlog,
        title: "Edit Blog | " + foundBlog.title
      });
    }
  });
});

//POST UPDATE BLOG
router.put("/blogs/:id", (req, res) => {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  if (req.body.blog.image == "") {
    req.body.blog.image = undefined;
  }
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, updatedBlog) => {
    if (err) {
      res.redirect("blogs");
    } else {
      res.redirect("/blogs/" + req.params.id);
    }
  });
});

//DELETE ROUTE
router.delete("/blogs/:id", (req, res) => {
  Blog.findByIdAndRemove(req.params.id, err => {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs");
    }
  });
});

module.exports = router;
