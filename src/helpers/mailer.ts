import User from '@/models/usermodal';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs'

export const sendEmail = async({email,emailType,userId}:any) =>{
    try{
        //TODO: configure mail for usage
        const hashedToken = await bcryptjs.hash(userId.toString(),10)
        if (emailType === "Verify") {
            await User.findByIdAndUpdate(userId,{verifyToken : hashedToken, verifyTokenExpiry: Date.now() +3600000})
        } else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{forgotPasswordToken : hashedToken, forgotPasswordTokenExpory: Date.now() +3600000})
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "ae873d48298d25", 
              pass: "633572a48f5dfe"
            }
          });

          const mailOptions = {
            from: 'arpit@arpit.ai', // sender address
            to: email, // list of receivers
            subject: emailType === 'VERIFY' ? "Verify your email": "Reset your password", // Subject line
            html: "<p>Click here</p>", // html body
          }

          const mailResponse = await transport.sendMail(mailOptions)
          return mailResponse
    }catch(error:any){
         throw new Error(error.message)
    }
} 