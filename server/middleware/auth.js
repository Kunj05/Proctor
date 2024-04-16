const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../model/UserP");

exports.auth = async(req,res,next) =>{
    try{
        const token = req.headers.authorization || req.cookies.token;
        console.log(token)
        
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token not found ",
            });
        }

        try{
            const decode = jwt.verify(token,process.env.JWT_SECRETE);
            res.user = decode;
            console.log(res.user)
            next();
        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:"Token is invalid", 
            });
        }
        
    }
    catch(err){
        console.log(err);
        return res.status(401).json({
            success:false,
            message:"Error occured while verifying token",
        });
    }
}

exports.isTeacher = (req,res,next) =>{
    try{
        if(req.user.accountType !== "Teacher"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Tecaher",
            });
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"User role can not be verified ",
        });
    }
}

exports.isStudent = (req,res,next) =>{
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Student",
            });
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"User role can not be verified ",
        });
    }
}

exports.isAdmin = (req,res,next) =>{
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for admin",
            });
        }
        next();
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"User role can not be verified ",
        });
    }
}
