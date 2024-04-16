const express = require("express");
const router = express.Router();

const {login,signup,sendOTP,changePassword} = require("../controllers/auth1");

    
router.post("/login",login);
router.post("/signup",signup);
router.post("/sendOTP",sendOTP);

module.exports = router;

