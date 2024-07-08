import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
      username :{
        type: String,
        require: [true,"Plaese Provide Username"],
        unique: true
      },
      email :{
        type: String,
        require: [true,"Plaese Provide email"],
        unique: true
      },
      password :{
        type: String,
        require: [true,"Plaese Provide password"]
      },
      isVerified :{
        type: Boolean,
        default:false
      },
      isAdmin :{
        type: Boolean,
        default:false
      },
      forgotPasswordToken : String,
      forgotPasswordTokenExpory : Date,
      verifyToken : String,
      verifyTokenExpiry : Date
})


const User = mongoose.models.users || mongoose.model("users",userSchema)

export default User 