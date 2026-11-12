"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
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
import { motion } from "motion/react";

export default function OrderCard({
  className,
  order,
}: {
  className?: string;
  order: IOrder;
}) {
  let statusBgColor = "bg-primary";
  switch (order.status) {
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
            {order.status === "pending" && <Loader />}
            {order.status === "processing" && <RefreshCcw />}
            {order.status === "shipped" && <TruckElectric />}
            {order.status === "delivered" && <PackageCheck />}
            {order.status === "cancelled" && <CircleX />}
            {order.status}
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
                    <Check />
                    Confrim order
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 text-md font-mono p-1 bg-red-400 rounded-lg">
                    <X />
                    Cancel order
                  </button>
                </div>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </div>
        <p className="font-bold">Customer:{order.customerName}</p>
        <p>Id:{order.id?.toString()}</p>
        <p>Number:{order.customerPhone}</p>
        {order.customerEmail && <p>Email:{order.customerEmail}</p>}
        <p>Address:{order.customerAddress}</p>
        <p>District:{order.customerDistrict}</p>
        <p>
          Order Date:{" "}
          {order.createdAt
            ? new Date(order.createdAt).toLocaleDateString()
            : "N/A"}
        </p>
        <p>Payment Method:{order.paymentMethod}</p>
        <p>Payment Status:{order.paymentStatus}</p>
        <p>Status:{order.status}</p>
        {
          order.securityData && (

            <>
            <p>Unique ID: {order.securityData.deviceFingerprint}</p>
            <p>IP Address: {order.securityData.ipAddress}</p>
            <p>IP City: {order.securityData.ipCity}</p>
            <p>Device Type: {order.securityData.deviceType}</p>
            </>
          )
        }
        <p>
          Total Price:<span className="font-bold text-blue-950">$100.00</span>
        </p>

        {/* Action buttons Popup */}
      </Card>
    </motion.div>
  );
}
