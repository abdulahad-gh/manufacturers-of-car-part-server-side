const User = require("../models/User");
const userService = require("../services/user.service");
const { generateToken } = require("../utils/token");


//signupController
module.exports.signupController = async (req, res) => {
  try {
    const data = await userService.signupService(req.body);
    // if (!data) {
    //   return res.status(500).json({
    //     status: "failed",
    //     error: "can't created account, something went wrong!!!",
    //   });
    // }
    res.status(200).json({ status: "success", message: "successfully signup.", data });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error:'dddd'
    });
  }
};


//signinController
/** 
 * check if Email and password are given
 * load user with email
 * if not user send res
 * compare password
 * if password not correct send res
 * check user active
 * if user not active send res, like a messge {error: "please active your account!"}
 * generate token
 * res user data & token
*/
module.exports.signinController = async (req, res) => {
  try {
    const {email,password} = req.body
    if(!email || !password){
      return res.status(403).json({
        status:"failed",
        error:"please provide your credential"
      })
    }
    
    const user = await userService.userFindByEmailService(email);
if(!user){
  return res.status(402).json({
    status:"failed",
    error:"don't have account with the email, please create an account"
  })
}
console.log(user)
  const isValidPassword = await user.comparePassword(password,user.password)
  if(!isValidPassword){
    return res.status(403).json({
      status:"failed",
      error:"wrong email or password, try again with correct credential"
    })
  }
  if(user.role !== "active"){
    return res.status(403).json({
      status:"failed",
      error:"your account isn't active, please check your email to active your account."
    })
  }
const token = generateToken(user)
    res.status(200).json({ status: "success", message: "successfully signin.", data:{user,token} });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error:error.message
    });
  }
};


//getMeCpntroller
exports.getMe = async (req,res)=>{
 try {
  const {email} = req.user
  const user = await User.find({email})
  res.status(200).json({
    status: "success",
    data:user
  });
 } catch (error) {
  res.status(500).json({
    status: "failed",
    error:error.message
  });
 }

}