import { Card } from "@/components/ui/card";
import { connectDb } from "@/lib/connectMongoDb";
import Order, { IOrder } from "@/model/orderModel";
import OrderCard from "./order-card";
import { getCachedOrders } from "@/lib/getOrder";
import OrderCardList from "./order-card-list";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CustomersPage() {
  const orders: IOrder[] = await getCachedOrders();

  // try {
  //   await connectDb();
  //   orders = await Order.aggregate([
  //     {
  //       $sort: { createdAt: -1 },
  //     },
  //     {
  //       $project: {
  //         _id: 0,
  //         id: { $toString: "$_id" },
  //         customerName: 1,
  //         customerPhone: 1,
  //         customerAddress: 1,
  //         customerDistrict: 1,
  //         variant: 1,
  //         status: 1,
  //         createdAt: 1,
  //         updatedAt: 1,
  //         paymentMethod: 1,
  //         paymentStatus: 1,
  //       },
  //     },
  //   ]);
  // } catch (error) {
  //   console.error("Error connecting to database:", error);
  // }
  return (
    <div className="flex flex-col gap-4">
      <Card className="w-full p-4 space-y-2 flex flex-col justify-center items-center gap-0 rounded-lg">
        <h1 className="text-2xl text-foreground font-bold font-sans">Orders</h1>
        <p className="text-foreground font-mono">Manage your orders here.</p>
      </Card>
      <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <OrderCardList />
      </div>
    </div>
  );
}
