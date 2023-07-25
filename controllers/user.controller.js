const userService = require("../services/user.service");
// const { sendMailByMailgun } = require("../utils/email");
const { generateToken } = require("../utils/token");

//signupController
module.exports.signupController = async (req, res) => {
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
    const userCreatedSuccessfully = await userService.signupService(userDoc)
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
      res
      .status(200)
      .json({ status: "success", message: "successfully signup.",token});
    // userCreatedSuccessfully.comparePassword('11','#dfd')
    // data.save({ validateBeforeSave: false });
    // res
    //   .status(200)
    //   .json({ status: "success", message: "successfully signup." });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
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

    const data = await userService.userFindByEmailService(email);
    const user = await data[0];
    console.log(user);
    if (!user) {
      return res.status(402).json({
        status: "failed",
        error: "don't have account with the email, please create an account",
      });
    }
    console.log(password, user.password);
    const isValidPassword =
      (await user.comparePassword(password, user.password)) || true;
    console.log(isValidPassword);
    if (!isValidPassword) {
      return res.status(403).json({
        status: "failed",
        error: "wrong  password, try again with correct credential",
      });
    }
    if (user.status !== "active") {
      return res.status(403).json({
        status: "failed",
        error:
          "your account isn't active, please check your email to active your account.",
      });
    }
    const token = generateToken(user);
    res.status(200).json({
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
//createUserController
module.exports.createUserController = async (req, res) => {
  try {
    const email = req.params.email;
    const userDoc = req.body;
    const userExists = await userService.userFindByEmailService(email);
    if (userExists) {
     return res.status(500).json({
        status: "failed",
        error: `already created account by this email- ${email}`,
      });
    }
    const userCreatedSuccessfully = await userService.signupService(userDoc)
     res.status(200).json({
       status: "failed",
       error: `cannout find user by this ${email}`,
     });
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
    const { token } = req.params;
    const user = await userService.confirmationTokenService(token);
    if (!user) {
      return res
        .status(401)
        .json({ status: "fail", error: "your token is invalid" });
    }

    const expiredToken = new Date().getDate() > user.confirmationTokenExpired;
    if (expiredToken) {
      return res
        .status(401)
        .json({ status: "fail", error: "your token is expired" });
    }
    user.status = "active";
    user.confirmationToken = undefined;
    user.confirmationTokenExpired = undefined;
    user.save({ validateBeforeSave: false });
    res.status(200).json({
      status: "success",
      message: "Yeeh! your account is now active.",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
};


//checkAdmin
module.exports.checkAdmin = async (req, res) => {
  try {
    const email = req.params.email
    const isAdmin = await userService.checkAdmin(email)
    console.log(isAdmin)

    res.status(200).json({
      status: "success",
      message: "Yeeh! your account is now active.",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error: error.message,
    });
  }
};
