import { connectDb } from "@/lib/connectMongoDb";
import Order, { IOrder, ISecurityData } from "@/model/orderModel";
import { NextRequest, NextResponse } from "next/server";

// Get:
export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const searchTerm = searchParams.get("search");

    // Making the query
    const matchQuery: any = {};
    if (status && status !== "All") {
      matchQuery.status = status;
    }
    if (searchTerm) {
      matchQuery.$or = [
        { customerName: { $regex: searchTerm, $options: "i" } },
        { customerPhone: { $regex: searchTerm, $options: "i" } },
      ];
    }
    // Querying the database
    const orders = await Order.aggregate([
      {
        $match: matchQuery,
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $project: {
          _id: 0,
          id: { $toString: "$_id" },
          customerName: 1,
          customerPhone: 1,
          customerAddress: 1,
          customerDistrict: 1,
          variant: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
          paymentMethod: 1,
          paymentStatus: 1,
          securityData: 1,
        },
      },
    ]);
    // const orders: IOrder[] = await Order.find().sort({ createdAt: -1 })

    return NextResponse.json({ success: true, data: orders }, { status: 200 });
  } catch (error) {
    console.error("Error connecting to database:", error);
    return NextResponse.json(
      { success: false, message: "Failed to connect to database" },
      { status: 500 },
    );
  }
}

// POST: Create a new order
export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const formData = await req.formData();
    const name = formData.get("name") as string;
    if (!name) {
      return NextResponse.json(
        { success: false, message: "Name is required" },
        { status: 400 },
      );
    }

    const phone = formData.get("phone") as string;
    if (!phone) {
      return NextResponse.json(
        { success: false, message: "Phone is required" },
        { status: 400 },
      );
    }
    const address = formData.get("address") as string;
    if (!address || address.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Address is required" },
        { status: 400 },
      );
    }
    const district = formData.get("district") as string;
    if (!district || district.trim() === "") {
      return NextResponse.json(
        { success: false, message: "District is required" },
        { status: 400 },
      );
    }
    const variant = formData.get("variant") as string;
    if (!variant || variant.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Variant is required" },
        { status: 400 },
      );
    }
    // Honeypot Check
    const website_url = formData.get("website_url") as string;
    if (website_url.trim().length > 0) {
      return NextResponse.json(
        { success: false, message: "Spam Detected" },
        { status: 400 },
      );
    }

    const deviceId = formData.get("deviceId") as string;
    if (!deviceId || deviceId.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Device ID is required" },
        { status: 400 },
      );
    }
    // preparing security data
    // Ip address extraction
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ipAddress = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : "unknown";
    const ipCity = req.headers.get("x-vercel-ip-city") || "Unknown";
    const userAgent = req.headers.get("user-agent") || "";
    const isMobile = /mobile|android|iphone|ipad/i.test(userAgent);
    const deviceType = isMobile ? "Mobile" : "Desktop";
    const securityData: ISecurityData = {
      deviceFingerprint: deviceId,
      ipAddress: ipAddress,
      ipCity: ipCity,
      browserOs: userAgent.slice(0, 100),
      deviceType: deviceType,
    };

    const payload: Omit<IOrder, "id" | "status"> = {
      customerName: name,
      customerPhone: phone,
      customerAddress: address,
      customerDistrict: district,
      variant: variant,
    };
    const email = formData.get("email") as string;
    if (email) {
      payload.customerEmail = email;
    }
    // Process the form data and save it to the database
    const order = await Order.create({
      ...payload,
      status: "pending",
      paymentMethod: "cash_on_delivery",
      paymentStatus: "pending",
      securityData: securityData,
    });
    return NextResponse.json({success: true, data: order},{ status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create order" },
      { status: 500 },
    );
  }
}
