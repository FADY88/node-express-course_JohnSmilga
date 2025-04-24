const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  // console.log(req.body);
  if (req.body.name) {
    res.send(`Hello ${req.body.name}`);
  } else {
    res.status(401).send("Please provide credentials");
  }
});

module.exports = router;
