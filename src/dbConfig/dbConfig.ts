import { error } from "console";
import mongoose from "mongoose";

export const connectToDB = async () => {
    try {
        const mongoString = process.env.MONGO_URI
        if (mongoString) {
            await mongoose.connect(mongoString)
            const connection = mongoose.connection 

            connection.on('connected', () => {
                console.log("MongoDB Connected")
            })

            connection.on('error', (error) => {
                console.log('MongoDB connection error. Please make sure that DB is up and running: ', + error)
                process.exit()
            })
        }
        // mongoose.connect(process.env.MONGO_URI!)
    } catch (error) {
        console.log(error)
        console.log('Something went wrong while connecting to database')
    }
}