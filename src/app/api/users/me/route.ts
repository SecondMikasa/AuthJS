import { connectToDB } from '@/dbConfig/dbConfig'
import { User } from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import { getDataFromToken } from '@/helpers/getDataFromToken'

connectToDB()

export async function POST(request: NextRequest, response: NextResponse) {
    const userId = await getDataFromToken(request)

    const user = await User.findOne({ _id: userId }).select("-password")
    //removing password from being sent
    console.log(user)

    if (!user) {
        throw new Error("We couldn't find you. Please try again")
    }

    return NextResponse.json({
        message: "User found",
        success: true,
        data: user
    })
}