import { connectDb } from "@/lib/connectMongoDb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IDecodedUser } from "@/lib/interfaces";
import { cookies } from "next/headers";
import User from "@/model/userModel";
export async function POST(req: Request) {
  try {
    //  get data from request
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    // validate data
    if (!name || !email || !password) {
      return NextResponse.json({success: false,message:"Name,email and password are required"}, { status: 400 })
    }
    // check existing user
    await connectDb();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({success: false, message: "User already exists" }, { status: 400 });
    }
    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: "customer",
    });
    const newUser = await user.save();
    // Create Token
    const InTokenDeta:IDecodedUser ={
      id:newUser._id,
      role:newUser.role,
      email:newUser.email,
    }

    const token = jwt.sign(InTokenDeta, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    
    // Set Cookie
    const cookie = await cookies();
    cookie.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    // Sent Final Responses
    return NextResponse.json({ success: true, message: "User created successfully", user: { _id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role } }, { status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create user" },
      { status: 500 }
    );
  }
}