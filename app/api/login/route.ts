import { connectDb } from "@/lib/connectMongoDb";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IDecodedUser } from "@/lib/interfaces";
import { cookies } from "next/headers";
import User from "@/model/userModel";

export async function POST(req: NextRequest) {
  try {
    // Get data from request
    const formData = await req.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    // Find User
    await connectDb() 
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({success:false,message:"User not found"}, { status: 404 });
    }
    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({success:false,message:"Password is incorrect"}, { status: 401 });
    }
    // Create Token
    const InTokenDeta:IDecodedUser ={
      id:user._id,
      role:user.role,
      email:user.email,
    }

    const token = jwt.sign(InTokenDeta, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    // Set Cookie
    const cookie = await cookies();
    cookie.set('token',token,{
      httpOnly:true,
      secure:true,
      sameSite:'strict',
      maxAge:60*60*24*7,
      path:'/'
    });
    // Send Response
    console.log(user)
    return NextResponse.json({ success:true,message:"Logged in successfully", user:{_id:user._id,name:user.name,email:user.email,role:user.role,cart:user.cart || null} }, { status: 200 });
  } catch (error) {
    console.log("Error in login:", error);
    return NextResponse.json({ success:false,message:"Something went wrong,try again later" }, { status: 500 });
  }
}