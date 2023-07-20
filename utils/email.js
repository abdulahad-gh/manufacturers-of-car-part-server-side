//email send with mailgun package
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  key: "e62581ee32260cc8022db5f3b8219c52-c30053db-8d05ec5c",
});

module.exports.sendMailByMailgun = async (data) => {
  const result = await mg?.message?.create(
    "sandboxa02d2f9acfd5469ea8d6294bc8afdf3b.mailgun.org",
    {
      from: "Mailgun Sandbox <postmaster@sandboxa02d2f9acfd5469ea8d6294bc8afdf3b.mailgun.org>",
      to: data.to,
      subject: data.subject,
      text: data.text,
    }
  );
  console.log(result?.id);
  return result?.id;
};

//email with nodemailer package & google
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground/"
);

oAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN})

module.exports.sendMailWithGmail = async (data)=>{
    const accessToken = await oAuth2Client.getAccessToken()
    
    let transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            type:"OAuth2",
            user:process.env.SENDER_MAIL,
            clientId:process.env.CLIENT_ID,
            clientSecret:process.env.CLIENT_SECRET,
            refreshToken:process.env.REFRESH_TOKEN,
            accessToken:accessToken
        }
    })

    const mailData = {
        from:process.env.SENDER_MAIL,
        to:data.to,
        subject:data.subject,
        text:data.text
    }

    let info = await transporter.sendMail(mailData)

    console.log("Message sent: %s", info.messageId)
    console.log("Preview url %s",nodemailer.getTestMessageUrl(info))
}

