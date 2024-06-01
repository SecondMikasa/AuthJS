import mongoose, { Schema } from "mongoose";
import { emit } from "process";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide an username"],
        unique: [true, "This username has already been taken"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: [true, "This email has already been taken"]
    },
    password: {
        type: String,
        required: [true, "Please provide an password"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

const User = mongoose.models.users || mongoose.model("users", userSchema)