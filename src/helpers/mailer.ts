import { User } from '@/models/userModel'
import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        //Configure Mail for usage
        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId,
                {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                })
        }
        else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                })
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "d9f6d2a7856544", // ❌ should be in .env
              pass: "b80eb0a66cd798" // ❌ should be in .env
            }
          });

        const mailOptions = {
            from: 'kumararnim1@vivaldi.net',
            to: email,
            subject: emailType === 'VERIFY' ? "Verify Your Email" : "Reset Your Password",
            html: emailType === 'VERIFY' ? 
            `<p>
            Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}"> here </a> to verify your email or paste the following link below in your browser
            <br/>
            "${process.env.DOMAIN}/verifyemail?token=${hashedToken}" 
            </p>` :
            `<p>
            Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}"> here </a> to reset your password
            or paste the link below in your browser
            <br/>
            "${process.env.DOMAIN}/resetpassword?token=${hashedToken}" 
            </p>`,
        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse

    } catch (error: any) {
        throw new Error(error.message)
    }
}