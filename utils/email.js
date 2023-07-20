//email send with mailgun package
const formData = require('form-data')
const Mailgun = require('mailgun.js')
const mailgun =  new Mailgun(formData)

const mg = mailgun.client({
    username:"api",
    key:"e62581ee32260cc8022db5f3b8219c52-c30053db-8d05ec5c"
})

module.exports.sendMailByMailgun = async (data)=>{
    const result = await mg?.message?.create("sandboxa02d2f9acfd5469ea8d6294bc8afdf3b.mailgun.org",{
        from:"Mailgun Sandbox <postmaster@sandboxa02d2f9acfd5469ea8d6294bc8afdf3b.mailgun.org>",
        to:data.to,
        subject:data.subject,
        text:data.text
    })
    console.log(result?.id)
    return result?.id
}

