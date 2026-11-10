import { connectDb } from "@/lib/connectMongoDb";
import User, { IUser } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

// GET:Get all user Or GET: Get all users or a specific user by ID
export async function GET(req: NextRequest) {
  try {
    connectDb();
    const { searchParams } = new URL(req.url);
    const role = searchParams.get("role");
    const searchTerm = searchParams.get("search");

    // Making the query
    const matchQuery: any = {};
    if (role && role !== "All") {
      matchQuery.role = role;
    }
    if (searchTerm) {
      matchQuery.$or = [
        { name: { $regex: searchTerm, $options: 'i' } },
        { phone: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } }
      ];
    }
    // Querying the database
    const users: IUser[] = await User.aggregate([
        {
            $match: matchQuery
        },
        {
            $sort: { createdAt: -1 },
        },{
            $project: {
                _id: 0,
                id: { $toString: "$_id" },
                name: 1,
                email: 1,
                phone: 1,
                address: 1,
                district: 1,
                role: 1,
                createdAt: 1,
                updatedAt: 1,
            }
        }
    ]);
    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    console.error("Error connecting to database:", error);
    return NextResponse.json(
      { success: false, message: "Failed to connect to database" },
      { status: 500 },
    );
  }
}
