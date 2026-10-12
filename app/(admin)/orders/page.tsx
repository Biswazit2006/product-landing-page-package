import { Card } from "@/components/ui/card";
import { connectDb } from "@/lib/connectMongoDb";
import Order, { IOrder } from "@/model/orderModel";
import OrderCard from "./order-card";

export default async function CustomersPage() {
  let orders:IOrder[] = []
  try{
    await connectDb()
     orders= await Order.find()
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
  return (
    <div className="flex flex-col gap-4">
    <Card className="w-full p-4 space-y-2 flex flex-col justify-center items-center gap-0 rounded-lg">
      <h1 className="text-2xl text-foreground font-bold font-sans">Orders</h1>
      <p className="text-foreground font-mono">Manage your orders here.</p>
    </Card>
    <div  className="w-full h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <OrderCard className="flex flex-col gap-0.5 justify-center items-start p-4 font-mono" order={'order'} />
      <OrderCard className="flex flex-col gap-0.5 justify-center items-start p-4 font-mono" order={'order'} />
      <OrderCard className="flex flex-col gap-0.5 justify-center items-start p-4 font-mono" order={'order'} />
      <OrderCard className="flex flex-col gap-0.5 justify-center items-start p-4 font-mono" order={'order'} />
      <OrderCard className="flex flex-col gap-0.5 justify-center items-start p-4 font-mono" order={'order'} />
      <OrderCard className="flex flex-col gap-0.5 justify-center items-start p-4 font-mono" order={'order'} />
      <OrderCard className="flex flex-col gap-0.5 justify-center items-start p-4 font-mono" order={'order'} />
      <OrderCard className="flex flex-col gap-0.5 justify-center items-start p-4 font-mono" order={'order'} />
      <OrderCard className="flex flex-col gap-0.5 justify-center items-start p-4 font-mono" order={'order'} />
      <OrderCard className="flex flex-col gap-0.5 justify-center items-start p-4 font-mono" order={'order'} />
      <OrderCard className="flex flex-col gap-0.5 justify-center items-start p-4 font-mono" order={'order'} />
      <OrderCard className="flex flex-col gap-0.5 justify-center items-start p-4 font-mono" order={'order'} />
      <OrderCard className="flex flex-col gap-0.5 justify-center items-start p-4 font-mono" order={'order'} />
      <OrderCard className="flex flex-col gap-0.5 justify-center items-start p-4 font-mono" order={'order'} />
      <OrderCard className="flex flex-col gap-0.5 justify-center items-start p-4 font-mono" order={'order'} />
      <OrderCard className="flex flex-col gap-0.5 justify-center items-start p-4 font-mono" order={'order'} />
    </div>
    
    </div>
  )
}
