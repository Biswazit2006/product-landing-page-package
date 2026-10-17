// lib/getProduct.ts
import { unstable_cache } from "next/cache";
import { connectDb } from "@/lib/connectMongoDb";
import Product from "@/model/productModel";

export const getCachedProduct = unstable_cache(
  async () => {
    await connectDb();
    const product = await Product.findOne().lean();
    return product;
  },
  ["landing-page-product"], // ক্যাশ কি
  {
    tags: ["product-data"], // 👈 এই ট্যাগ দিয়ে আমরা ক্যাশ ভাঙব
  }
);