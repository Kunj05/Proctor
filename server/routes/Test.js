const express = require("express");
const router = express.Router();
const {createTest, editTest, deleteTest} = require("../controllers/Test");
const {login} = require("../controllers/auth1");


router.post("/createTest",createTest)
router.post("/editTest/:id",editTest)
router.delete("/deleteTest/:id",deleteTest)
router.post("/login",login);

module.exports = router;