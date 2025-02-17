import UsersModel from "../models/UsersModel.js";
import {TokenEncode} from "../utility/TokenUtility.js"
import SendEmail from "../utility/EmailUtility.js";


export const Registration = async (req, res) => {
  try {
    let reqBody = req.body;
    await UsersModel.create(reqBody);
    return res.json({
      status: "success",
      message: "User registration successful",
    });
  } catch (error) {
    return res.json({ status: "fail", message: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    let reqBody = req.body;
    let data = await UsersModel.findOne(reqBody);

    if (data == null) {
      return res.json({
        status: "fail",
        message: "User not found!",
      });
    } else {
      // Login Success
      let token = TokenEncode(data.email,data._id.toString());

      return res.json({
        status: "success",
        message: "User login successful",
        data:{token:token}
      });
    }
  } catch (error) {
    return res.json({ status: "fail", message: error.message });
  }
};

export const ProfileDetails = async (req, res) => {
  
    try {
        let user_id = req.headers['user_id']
        let data = await UsersModel.findOne({"user_id":user_id})
        return res.json({status:"success",message:"User found",data})

    } catch (error) {
        return res.json({status:"fail",message: error.message})
    }
};

export const ProfileUpdate = async (req, res) => {
  try{
    let reqBody = req.body;
    let user_id = req.headers['user_id']
    await UsersModel.updateOne({"user_id":user_id},reqBody)
    return res.json({status:"success",message:"User data updated successfully"})
  } catch (error) {
    return res.json({status:"fail",message: error.message})
  }
};

export const EmailVerify = async (req, res) => {

 try{
   let email = req.params.email;
   let data = await UsersModel.findOne({email: email})

   if (data == null) {
     return res.json({status:"fail",message:"User email not found!"})
   }
   else {
     let code = Math.floor(100000+Math.random()*900000)
     let EmailTo = data['email'];
     let EmailText = "Your verification code is" + code;
     let EmailSubject = "Task Manager Verification Code"

     await SendEmail(EmailTo,EmailText,EmailSubject)

     //   Update OTP in user
     await UsersModel.updateOne({email: email},{otp:code})
     return res.json({status:"success",message:"Verification code sent successfully,Please check email"})
   }
 } catch (error) {
   return res.json({status:"fail",message: error.message})
 }
};

export const CodeVerify = async (req, res) => {
  try{
    let reqBody = req.body;
    let data = await UsersModel.findOne({email: reqBody['email'], otp:reqBody['otp']})

    if (data == null) {
      return res.json({status:"fail",message:"Wrong verification code!"})
    }
    else{
      return res.json({status:"success",message:"Verification successful",})
    }
  } catch (error) {
    return res.json({status:"fail",message: error.message})
  }
};

export const ResetPassword = async (req, res) => {

  try{
    let reqBody = req.body;
    let data = await UsersModel.findOne({email: reqBody['email'], otp:reqBody['otp']})
    if (data == null) {
      return res.json({status:"fail",message:"Wrong verification code!"})
    }
    else{

      let data = await UsersModel.updateOne({email: reqBody['email']},{
        otp:"0", password:reqBody['password'],
    })
    return res.json({status:"success",message:"Password reset successful"})
    }

  } catch (error) {

    return res.json({status:"fail",message: error.message})
  }
};


