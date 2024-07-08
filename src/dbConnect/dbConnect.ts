import { error } from "console";
import mongoose from "mongoose";

export async function connect() {
    try{
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection
        connection.on('connected',() =>{
            console.log("mongoDB Connected")
        })

        connection.on('error',(error)=>{
            console.log("mongoDb connection error :",+ error)
            process.exit()
        })
    } catch(error){
        console.log("Something Went Wrong");
        console.log(error)
    }
}