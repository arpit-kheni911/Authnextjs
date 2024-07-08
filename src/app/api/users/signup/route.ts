import {connect} from '@/dbConnect/dbConnect'
import User from '@/models/usermodal'
import { NextRequest , NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer'

connect()

export async function POST(request : NextRequest) {
    try{
        const reqBody = await request.json()
        const{username,email,password} = reqBody
        // Validation
        console.log(reqBody);

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error:"User Already exists"},{status:400})
        } 

        var salt = await bcryptjs.genSalt(10);
        const hashedpassword = await bcryptjs.hash(password,salt)

        const newUser = new User({
            username,
            email,
            password:hashedpassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        //send Varification

        await sendEmail({email,emailType : "Verify",userId: savedUser._id})

        return NextResponse.json({
            message: "User register Success",
            success : true,
            savedUser
        })


    }catch(error:any){
        return NextResponse.json({error:error.message},{status:500})
    }
}