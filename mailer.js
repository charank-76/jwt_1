const nodemailer=require('nodemailer')
const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"charancharan2243@gmail.com",
        pass:"tlsu fgeq xzum fasd"
    }
})


function sendVerificationEmail(email,token){
   const link = `http://localhost:3001/verify?token=${token}`
    const option={
        from:"charancharan2243@gmail.com",
        to:email,
        subject:"Verify your email",
        html:  `<h1>Verify your account</h1>
        <a href="${link}">veify </a>`
        
    }
    transporter.sendMail(option,(err,info)=>{
        if(err)
            console.log(err)
        console.log(`Email sent info:${info}`)
    
    })
}
module.exports=sendVerificationEmail