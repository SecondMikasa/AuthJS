import { connectToDB } from '@/dbConfig/dbConfig'
import { User } from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || ""

        let tokenSecret = process.env.TOKEN_SECRET
        if (!tokenSecret) {
            throw new Error('TOKEN_SECRET is not defined'); 
        }

        const decodedToken: any = jwt.verify(token, tokenSecret)
        return decodedToken.id

    } catch (error) {
        
    }
}