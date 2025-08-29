import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: {
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
    }
});

const userModel = mongoose.model('User',userSchema);

export default userModel;