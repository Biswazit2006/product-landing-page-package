import { connectDb } from "@/lib/connectMongoDb";
import Order, { IOrder } from "@/model/orderModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try{
      await  connectDb();
    const formData = await req.formData();
    const name = formData.get("name") as string;
    if (!name) {
        return NextResponse.json({ success: false, message: "Name is required" }, { status: 400 });
    }
    
    const phone = formData.get("phone") as string;
    if (!phone) {
        return NextResponse.json({ success: false, message: "Phone is required" }, { status: 400 });
    }
    const address = formData.get("address") as string;
    if (!address || address.trim() === "") {
        return NextResponse.json({ success: false, message: "Address is required" }, { status: 400 });
    }
    const district = formData.get("district") as string;
    if (!district || district.trim() === "") {
        return NextResponse.json({ success: false, message: "District is required" }, { status: 400 });
    }
    const variant = formData.get("variant") as string;
    if (!variant || variant.trim() === "") {
        return NextResponse.json({ success: false, message: "Variant is required" }, { status: 400 });
    }
    const payload:Omit<IOrder,'id'> = {
        customerName: name,
        customerPhone: phone,
        customerAddress: address,
        customerDistrict: district,
        variant: variant,
    }
    const email = formData.get("email") as string;
    if(email){
        payload.customerEmail = email;
    }
    // Process the form data and save it to the database
    const order = await Order.create({
        ...payload,
        status: "pending",
        paymentMethod:'cash_on_delivery',
        paymentStatus:'pending',
    })
    if(order){
    return NextResponse.json({ success: true, message: "Order received successfully", order }, { status: 200 });
    }
    }catch(error){
        console.error("Error creating order:", error);
    return NextResponse.json({ success: false, message: "Failed to create order" }, { status: 500 });
    }
}