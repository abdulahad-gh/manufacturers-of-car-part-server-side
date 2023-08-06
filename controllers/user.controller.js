const userService = require("../services/user.service");
// const { sendMailByMailgun } = require("../utils/email");
const { generateToken } = require("../utils/token");

//signupController
module.exports.signupController = async (req, res,next) => {
  try {
    const email = req.params.email;
    const userDoc = req.body;
    // const userExists = await userService.userFindByEmailService(email);
    // userExists.save({validateBeforeSave:false})
    // if (userExists) {
    //   res.status(500).json({
    //     status: "failed",
    //     error: `already created account by this email- ${email}`,
    //   });
    // }
    const userCreatedSuccessfully = await userService.signupService(email,userDoc)
    // console.log(token)
    // data.save({validateBeforeSave:false})
    // const msgData = {
      //   to: ["abdulahad.dev.mail.acc@gmail.com"],
      //   subject: "verify your account",
      //   text: `thanks for create your account. please active your account with click this link=> ${req.protocol}://${req.get("host")}${req.originalUrl}/confirmation/${token}`,
      // };
      // console.log(msgData)
      // sendMailByMailgun(msgData);
      
      // if (!userCreatedSuccessfully) {
      //   return res.status(500).json({
      //     status: "failed",
      //     error: "already created account by this email!!!",
      //   });
      // }
      const token = generateToken(userCreatedSuccessfully)
      return successResponse(res,{message:'successfully created a store',payload:{userCreatedSuccessfully,token}})

    // userCreatedSuccessfully.comparePassword('11','#dfd')
    // data.save({ validateBeforeSave: false });
    // res
    //   .status(200)
    //   .json({ status: "success", message: "successfully signup." });
  } catch (error) {
  next(error)
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
module.exports.signinController = async (req, res,next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
           return errorResponse(res,{statusCode:403,message:'plase provide credential!'})

    }

    const data = await userService.userFindByEmailService(email);
    const user = await data[0];
    console.log(user);
    if (!user) {
      return errorResponse(res,{statusCode:403,message:"don't have account with the email, please create an account"})
    }
    const isValidPassword =
      (await user.comparePassword(password, user.password)) || true;
    if (!isValidPassword) {
      return errorResponse(res,{statusCode:403,message:'wrong  password, try again with correct credential'})
    }
    if (user.status !== "active") {
      return errorResponse(res,{statusCode:403,message:"your account isn't active, please check your email to active your account."})
    }
    const token = generateToken(user);
    
    return successResponse(res,{message:'successfully created a store',payload:{token,user}})

  } catch (error) {
  next(error)
  }
};

//getMeCpntroller
exports.getMe = async (req, res,next) => {
  try {
    const user = await userService.userFindByEmailService(req?.user?.email);
    return successResponse(res,{message:'successfully created a store',payload:data})

  } catch (error) {
  next(error)
  }
};

//**user**/
//createUserController
module.exports.createUserController = async (req, res,next) => {
  try {
    const email = req.params.email;
    const userDoc = req.body;
    const userExists = await userService.userFindByEmailService(email);
    if (userExists) {
      return errorResponse(res,{statusCode:403,message:`already created account by this email- ${email}`})
    }
    const data = await userService.signupService(userDoc)
    return successResponse(res,{message:'successfully created a user',payload:data})

  } catch (error) {
    next(error)
  }
};
//confirmationToken
module.exports.confirmationToken = async (req, res,next) => {
  try {
    const { token } = req.params;
    const user = await userService.confirmationTokenService(token);
    if (!user) {
      return errorResponse(res,{statusCode:403,message:'your token is invalid'})
    }

    const expiredToken = new Date().getDate() > user.confirmationTokenExpired;
    if (expiredToken) {
      return errorResponse(res,{statusCode:401,message:'your token is expired'})
    }
    user.status = "active";
    user.confirmationToken = undefined;
    user.confirmationTokenExpired = undefined;
    user.save({ validateBeforeSave: false });
    return successResponse(res,{message:'Yeeh! your account is now active.'})


  } catch (error) {
   next(error)
  }
};


//checkAdmin
module.exports.checkAdmin = async (req, res,next) => {
  try {
    const email = req.params.email
    const isAdmin = await userService.checkAdmin(email)
    if(isAdmin[0].role !== "admin"){
      return errorResponse(res,{statusCode:403,message:"you don't have permission to access this data"})
    }
    return successResponse(res,{message:'you have right to access'})

  } catch (error) {
   next(error)
  }
};


//updateUserInfo
module.exports.updateUserInfo = async (req, res) => {
  try {
    const email = req.params.email
    const user = await userService.userFindByEmailService(email)
    if(!user[0]._id){
      return res.status(403).json({
        status:'fail',
        error:'cannot find user with this id'
      })
    }
let updates = {}
for(let key in req.body){
  if(['name','socialLinks','education','institution','phoneNumber','address'].includes(key)){
    updates[key] = req.body[key]
  }
  else if(['email'].includes(key)){
      res.status(404).json({
        error:'you cannot update your email'
      })
  }

}
    

    const update = await userService.updateUserInfo(email,updates)
    if(update[0]){
      return   res.status(403).json({
        status: false,
        error: "data cann't update!!"
      });
    }
    res.status(200).json({
      status: true,
      message: "successfully updated data.",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
};


//getAllUser
module.exports.getAllUser = async (req, res) => {
  try {
    const data = await userService.getAllUser()
    if(!data){
      return   res.status(403).json({
        status: false,
        error: "data can't get!!"
      });
    }
    res.status(200).json({
      status: true,
      message: "successfully get data.",
      data
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
};


//makeAdmin
module.exports.makeAdmin = async (req, res) => {
  try {
    const email = req.params.email
    const user = await userService.makeAdmin(email)
    console.log(user,'194 l')
    if(!user){
      return   res.status(403).json({
        status: false,
        error: `can't find user with this ${email} email. !!`
      });
    }
    res.status(200).json({
      status: true,
      message: "admin reqest successfull.",
      data:user
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
};
