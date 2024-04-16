const User = require("../model/User");
const OTP = require("../model/Otp");
const otpgenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Profile = require("../model/Profile");
const mailSender = require("../utils/mailSender");
require("dotenv").config();

exports.sendOTP = async (req,res)=>{
    try{
        const {email} = req.body;
        const checkuserpresent = await User.findOne({email}).maxTimeMS(30000);
        if(checkuserpresent){
            return res.status(401).json({
                success:false,
                message:"User already exist ",
            })
        };

        var otp = otpgenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });

        console.log("otp generated", otp);

        let result = await OTP.findOne({otp:otp});

        while(result){
            var otp = otpgenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });

             result = await OTP.findOne({otp:otp});
        }

        const otpPayload = {email,otp};

        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        res.status(200).json({
            success:true,
            message:"Otp generated successfully",
            otp,
        })

    }
    catch(error){
        console.log("problem in otp generation",error);
        res.status(500).json({
            success:false,
            message:error.message,
        })

    }
};


exports.signup = async(req,res)=>{
    try{
        const {firstname, lastname, email, password , confirmPassword , accountType , ContactNumber , otp} = req.body;

        if(!firstname || !lastname || !email || !password || !confirmPassword || !accountType || !ContactNumber || !otp){
            return res.status(403).json({
                succees:false,
                message:"All field are required",
            });
        };

        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"password and confirm password does not match",
            });
        };

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists",
            });
        };
        let recentOtp = 0;
        const recentOtp1 = await OTP.find({email}).sort({_id:-1}).limit(1).exec();
        if(recentOtp1){
                  recentOtp = recentOtp1[0].otp;
        }

 

        console.error("helllo bhai here",otp,"bicha ka bhai ",recentOtp,"end of bhai");
        if(recentOtp.length == 0){
            return res.status(400).json({
                success:false,
                message:"Otp not found",
            });
        }
        else if(otp !== recentOtp){
            return res.status(400).json({
                success:false,
                message:"otp incorrect",
            });
        };

        const hashPassword = await bcrypt.hash(password,10);

        // const profileDetail = await Profile.create({
        //     gender:null,
        //     dateOfBirth:null,
        //     about:null,
        //     ContactNumber:null,
        // });

        const user = await User.create({
            firstname, lastname , email , password:hashPassword ,ContactNumber , accountType , 
        })

        return res.status(200).json({
            success:true,
            message:"User is registred successfully",
        })


    }
    catch(error){
        console.log("error occured while sign up",error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    };
}

exports.login = async(req,res)=>{
    try{

        const {email , password} = req.body;

        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All Field are mandatory",
            });
        }
        
        const user =await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success:false,
                message:"please sign up first ",
            });
        }

        if(await bcrypt.compare(password,user.password)){
            const payload = {
                email:user.email,
                accountType:user.accountType,
                id:user._id,
            };

            // const token = jwt.sign(payload , process.env.JWT_SECRETE,{
            //     expiresIn:"2h",
            // });

            // user.token = token;
            user.password = undefined;

            // const options = {
            //     expiresIn: new Date(Date.now() + 3*24*60*60*1000),
            //     httpOnly:true,
            // };

            res.cookie("token").status(200).json({
                success:true,
                user,
                message:"login successfully",
            });
        }
        else{
            return res.status(403).json({
                success:false,
                message:"Password not matching",
            });
        }

    }
    catch(err){
        console.log("error occured while login ",err);
        return res.status(400).json({
            success:false,
            message:err.message
        });
    }
}

// exports.changePassword = async (req,res)=>{
//     try{
//         const { email ,oldPassword , newPassword , confirmNewPassword} = req.body;
        
//         if(!email || !oldPassword || !newPassword || !confirmNewPassword){
//             return res.status(401).res({
//                 success:false,
//                 message:"All field are mandatary",
//             });
//         }

//         if(newPassword !== confirmNewPassword ){
//             return res.status(401).json({
//                 success:false,
//                 message:"Confirm password is different",
//             });
//         }

//         const user = User.findOne({email});

//         if(!user){
//             return res.status(403).res({
//                 succees:false,
//                 message:"User not exist",
//             });
//         }

//         if(await bcrypt.compare(oldPassword,user.password)){
//             user.password = newPassword;

//             try{
//                 const mailResponse = await mailSender(email,"Message from huehub","Your Password change succcessfully");
//                 console.log("Email send successfully",mailResponse);
//             }
//             catch(error){
//                 console.log("error occure while sending mail",error);
//                 throw error;
//             }


//         }
//         else{
//             return res.status(401).json({
//                 success:false,
//                 message:"Password is not matching ",
//             });
//         }
//     }
//     catch(err){
//         console.log("error occured while changing password ",err);
//         return res.status(500).json({
//             success:false,
//             message:err.message,
//         });
//     }
// }

// exports.autoLogin = async(req, res, next) => {
//     try{
 
//         console.log(789);
//         // console.log(res);
//         const response = await User.findOne({email:res.user.email});
//         console.log(response);
//         if (!response)
//         {
//                 res.status(401).json({
//                     "message":"Unauthorized"
//                 })
//                 return
//         }
//         response.password = null;   
//         res.status(200).json({
//             "data":response
//         })
//     }
//     catch(err)
//     {
//         res.status(400).json({
//             "message":err
//         })
//     }
    
// }
