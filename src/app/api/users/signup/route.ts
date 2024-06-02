import { connectToDB } from '@/dbConfig/dbConfig'
import { User } from '@/models/userModel'
import { sendEmail } from '@/helpers/mailer'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'

connectToDB()

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        const reqBody = await request.json()
        console.log(reqBody)

        const { username, email, password } = reqBody

        //validation

        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json({error: "This email is already in use"}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        // send verification email

        await sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id })
        
        return NextResponse.json({
            message: "User registered successfully",
            success: true,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}