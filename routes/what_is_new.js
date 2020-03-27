const express = require('express');
const router = express.Router();

router.get("/what_is_new", (req, res) => { 
  res.render("what_is_new", { title: "What's new?"});
})

module.exports = router;