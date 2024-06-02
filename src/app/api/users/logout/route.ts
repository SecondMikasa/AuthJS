import { connectToDB } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'

connectToDB()

export async function GET(request: NextRequest, response: NextResponse) {
    try {
        const response = NextResponse.json({
            message: "Logout Successfully",
            success: true
        })

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return response

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}