"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IOrder } from "@/model/orderModel";
import {
  Check,
  CircleX,
  Ellipsis,
  Loader,
  PackageCheck,
  RefreshCcw,
  TruckElectric,
  X,
} from "lucide-react";
import {motion} from "motion/react";

export default function OrderCard({
  className,
  order,
}: {
  className?: string;
  order: string;
}) {
  const orderData: IOrder = {
    id: "skdj1002",
    customerName: "John Doe",
    customerPhone: "01354215854",
    customerAddress: "Ranibazar, Rajshahi",
    status: "delivered",
    createdAt: new Date("2023-01-01"),
    items: [],
    
  };
  let statusBgColor = "bg-primary";
  switch (orderData.status) {
    case "pending":
      statusBgColor = "bg-yellow-300";
      break;
    case "processing":
      statusBgColor = "bg-orange-300";
      break;
    case "shipped":
      statusBgColor = "bg-pink-400";
      break;
    case "delivered":
      statusBgColor = "bg-green-400";
      break;
    case "cancelled":
      statusBgColor = "bg-red-400";
      break;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
    <Card className={className}>
      <div className=" w-full flex justify-between items-center">
              <Badge
        variant="secondary"
        className={`flex text-foreground ${statusBgColor} items-center gap-2 `}
      >
        {orderData.status === "pending" && <Loader />}
        {orderData.status === "processing" && <RefreshCcw />}
        {orderData.status === "shipped" && <TruckElectric />}
        {orderData.status === "delivered" && <PackageCheck />}
        {orderData.status === "cancelled" && <CircleX />}
        {orderData.status}
      </Badge>
              <Popover>
        <PopoverTrigger
          render={
            <button className="float-start">
              <Ellipsis />
            </button>
          }
        >
          Open Popover
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <div className="flex flex-col gap-2">
              <button className="w-full flex items-center justify-center gap-2 text-md font-mono p-1 bg-primary rounded-lg">
                <Check />Confrim order
              </button>
              <button className="w-full flex items-center justify-center gap-2 text-md font-mono p-1 bg-red-400 rounded-lg">
                <X />Cancel order
              </button>
            </div>
          </PopoverHeader>
        </PopoverContent>
      </Popover>
      </div>
      <p className="font-bold">Customer:John Doe</p>
      <p>Id:skdj1002</p>
      <p>Number:01354215854</p>
      <p>Email:john.doe@example.com</p>
      <p>Address:Ranibazar ,Rajshahi</p>
      <p>Order Date:2023-01-01</p>
      <p>Payment Method:Credit Card</p>
      <p>Payment Status:Completed</p>
      <p>Status:Pending</p>
      <p>
        Total Price:<span className="font-bold text-blue-950">$100.00</span>
      </p>

      {/* Action buttons Popup */}

    </Card>
    </motion.div>
  );
}
