import { connectToDB } from '@/dbConfig/dbConfig'
import { User } from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

connectToDB()

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody
        console.log(reqBody)

        const user = await User.findOne({ email: email })

        if (!user) {
            return NextResponse.json({ error: "Couldn't Find The Specified User" }, { status: 400 })
        }

        console.log("User exist")

        const validPass = await bcryptjs.compare(password, user.password)

        if (!validPass) {
            return NextResponse.json({ error: "Couldn't Find The Specified User, Check Your Credentials" }, { status: 400 })
        }

        // Payload
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        let tokenSecret: string;
        if (process.env.TOKEN_SECRET) {
            tokenSecret = process.env.TOKEN_SECRET;
        } else {
            throw new Error('TOKEN_SECRET is not defined');
        }

        const token = jwt.sign(tokenData, tokenSecret, { expiresIn: '1d' });
        //Error can be handled by using process.env.TOKEN_SECRET!
        
        const response = NextResponse.json({
            message: 'Logged In Successfully',
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response

    } catch (error: any) {
        return NextResponse.json({message: error.message}, {status: 500})
    }
}