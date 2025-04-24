const express = require("express");
const router = express.Router();

const {
  getPeople,
  postPeople,
  postPostMan,
  putId,
  deleteId,
} = require("../controller/people");

// router.get("/", getPeople);
// router.post("/", postPeople);
// router.post("/postman", postPostMan);
// router.put("/:id", putId);
// router.delete("/:id", deleteId);

// another way of router
router.route("/").get(getPeople).post(postPeople);
router.route("/postman").post(postPostMan);
router.route("/:id").put(putId).delete(deleteId);

module.exports = router;
