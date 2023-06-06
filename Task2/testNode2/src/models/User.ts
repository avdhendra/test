import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    min: 2,
    max: 50,
    required: true,
  },
  lastName: {
    type: String,
    min: 2,
    max: 50,
    required: true,
    },
    email:{
    type: String,
        required: true,
        max: 50,
        unique:true,
    },
    password: {
        type: String,
        required: true,
        min:5,
    },
   

}, { timestamps: true });

const User = mongoose.model("User", UserSchema)

export default User;