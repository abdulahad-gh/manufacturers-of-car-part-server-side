const userService = require("../services/user.service");
// const { sendMailByMailgun } = require("../utils/email");
const { generateToken } = require("../utils/token");

//signupController
module.exports.signupController = async (req, res) => {
  try {
    const data = await userService.signupService(req.body);
    const token = data.generateConfirmationToken()
    console.log(token)
    data.save({validateBeforeSave:false})
    const msgData = {
      to: ["abdulahad.dev.mail.acc@gmail.com"],
      subject: "verify your account",
      text: `thanks for create your account. please active your account with click this link=> ${req.protocol}://${req.get("host")}${req.originalUrl}/confirmation/${token}`,
    };
    // console.log(msgData)
    // sendMailByMailgun(msgData);

    if (!data) {
      return res.status(500).json({
        status: "failed",
        error: "can't created account, something went wrong!!!",
      });
    }
data.save({validateBeforeSave:false})
    res
      .status(200)
      .json({ status: "success", message: "successfully signup.", data });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: "dddd",
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
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({
        status: "failed",
        error: "please provide your credential",
      });
    }

    const user = await userService.userFindByEmailService(email);
    if (!user) {
      return res.status(402).json({
        status: "failed",
        error: "don't have account with the email, please create an account",
      });
    }
    console.log(user);
    const isValidPassword = await user.comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(403).json({
        status: "failed",
        error: "wrong email or password, try again with correct credential",
      });
    }
    if (user.role !== "active") {
      return res.status(403).json({
        status: "failed",
        error:
          "your account isn't active, please check your email to active your account.",
      });
    }
    const token = generateToken(user);
    res
      .status(200)
      .json({
        status: "success",
        message: "successfully signin.",
        data: { user, token },
      });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
};

//getMeCpntroller
exports.getMe = async (req, res) => {
  try {
    const user = await userService.userFindByEmailService(req?.user?.email);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
};

//**user**/
//userFindByEmailController
module.exports.userFindByEmailController = async (req, res) => {
  try {
    const email = req.params.email;
    const currentUser = req.body;
    console.log(email, currentUser);
    const user = await userService.userFindByEmailService(email, currentUser);
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
};
//confirmationToken
module.exports.confirmationToken = async (req, res) => {
  try {
    const {token} = req.params
    const user = await userService.confirmationTokenService(token);
    if(!user){
      return res.status(401).json({status:"fail",error:"your token is invalid"})
    }
    
    const expiredToken = new Date().getDate() > user.confirmationTokenExpired
    if(expiredToken){
      return res.status(401).json({status:"fail",error:"your token is expired"})
    }
    user.status = "active"
    user.confirmationToken = undefined
    user.confirmationTokenExpired = undefined
    user.save({validateBeforeSave:false})
    res.status(200).json({status:"success",message:"Yeeh! your account is now active."})
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
};
