import { connectDB } from "@/lib/mongoose";
import UserModel from "@/Models/users.model";
import { NextRequest, NextResponse } from "next/server";
import jwt  from 'jsonwebtoken';

export const POST = async(req:NextRequest)=>{
    await connectDB();
try {
    
    const {name,email,profileImage} = await req.json();

    let user = await UserModel.findOne({email});


    if(!user){
        const username = await generateUsername(name);

        user = await UserModel.create({name,email,profileImage,username,byGoogle:true});
    }

    const userData = {
        userId: user._id,
        username: user.username,
        role: user.role,
        name: user.name,
      };
  
      const token = jwt.sign(userData, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });
  
      const response = NextResponse.json(
        { success: true, msg: `Welcome to Lestchat! Dear ${user.name}.` },
        { status: 200 }
      );
  
      response.cookies.set("token", token, {
        httpOnly: true,
        path: "/",
      });
  
      return response;


} catch (error:any) {
    return NextResponse.json({msg: error.message, success: false, error: true}, {status:500});
}
}

const generateUsername = async (name="anonymous user") => {
    const parts = name.split(" ");
    const firstName = parts[0];
    const lastName = parts[1]
    const base = `${firstName}${lastName}`.toLowerCase().replace(/\s+/g, '');
    
    const randomNumber = () => Math.floor(100 + Math.random() * 900); 
    const timestamp = Date.now().toString().slice(-4); 
    
    const variations = [
      base,                                      
      `${firstName}_${timestamp}_${lastName}`,                
      `${base}123`,                              
      `${firstName}_123_${lastName}`,            
      `${firstName}${randomNumber()}`,           
      `${base}_${randomNumber()}`,               
      `${base}_${timestamp}`,                    
      `${firstName}_${lastName}_${randomNumber()}`, 
      `${firstName.charAt(0)}_${lastName}_${randomNumber()}`, 
      `${lastName}_${firstName}_${timestamp}`,   
      `${firstName}${lastName.charAt(0)}_${randomNumber()}`,  
      `${lastName}${firstName}_${timestamp}`,    
    ];
  
    for (const username of variations) {
        const isTaken = await UserModel.exists({ username });
        if (!isTaken) {
          return username;
        }
      }
  };
  