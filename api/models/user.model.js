import e from "express";
import { Schema,Mongoose } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
});


const User =  Mongoose.model('User', UserSchema);

export default User;