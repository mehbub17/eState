import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
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
    },
    avatar: {
        type: String,
        default:"https://asset.cloudinary.com/dor3tptud/a362a4bf771be608d20a51bb55b37158",
    },  
},{
    timestamps: true
});


const User =  mongoose.model('User', UserSchema);

export default User;