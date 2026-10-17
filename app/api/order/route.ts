import { connectDb } from "@/lib/connectMongoDb";
import { getCachedOrders } from "@/lib/getOrder";
import { orderEvents } from "@/lib/orderEvents";
import Order, { IOrder } from "@/model/orderModel";
import { NextRequest, NextResponse } from "next/server";

// Get:
export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const orders = await Order.aggregate([
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
    });
    orderEvents.emit("new-order", order);
    if (order) {
      return NextResponse.json(
        { success: true, message: "Order received successfully", order },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create order" },
      { status: 500 },
    );
  }
}
