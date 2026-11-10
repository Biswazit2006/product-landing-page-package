import { checkAuth } from "@/lib/checkAuth";
import { connectDb } from "@/lib/connectMongoDb";
import Product from "@/model/productModel";
import { NextRequest, NextResponse } from "next/server";

// GET: Fetch for product by id
export async function GET(request: NextRequest) {
    try {
        connectDb();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json({ success: false, message: "Product ID is required" }, { status: 400 });
        }
        const product = await Product.findById(id);
        if (!product) {
            return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: product });
    }catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Failed to fetch product data" }, { status: 500 });
    }
}

// POST: Create a new product
export async function POST(request: NextRequest) {
    try {
        connectDb();
        checkAuth(request, ["admin"]);
        const body = await request.json();
        const newProduct = new Product(body);
        await newProduct.save();
        return NextResponse.json({ success: true, data: newProduct });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Failed to create product" }, { status: 500 });
    }
}

// PUT: Update an existing product
export async function PUT(request: NextRequest) {
    try {
        connectDb();
        checkAuth(request, ["admin"]);

        const body = await request.json();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json({ success: false, message: "Product ID is required" }, { status: 400 });
        }
        const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });
        if (!updatedProduct) {
            return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: updatedProduct });
    }catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Failed to update product" }, { status: 500 });
    }
}

// DELETE: Delete a product
export async function DELETE(request: NextRequest) {
    try {
        connectDb();
        checkAuth(request, ["admin"]);
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json({ success: false, message: "Product ID is required" }, { status: 400 });
        }
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Product deleted successfully" });
    }catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, message: "Failed to delete product" }, { status: 500 });
    }
}