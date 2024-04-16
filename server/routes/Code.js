const express = require("express");
const router = express.Router();
const {login} = require("../controllers/auth1");
const {validateCode}=require('../controllers/CodeCheck')

router.post("/validateCode",validateCode)
router.post("/login",login);

module.exports = router;