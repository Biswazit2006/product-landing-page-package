import { unstable_cache } from "next/cache";
import { connectDb } from "@/lib/connectMongoDb";
import Order, { IOrder } from "@/model/orderModel";

export const getCachedOrders = unstable_cache(
  async (): Promise<IOrder[]> => {
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
    return orders;
  },
  ["admin-orders-key"], // ইউনিক ক্যাশ কি
  {
    tags: ["orders-tag"], // 👈 এই ট্যাগটিই আমরা পরে ইনভ্যালিডেট করব
  }
);