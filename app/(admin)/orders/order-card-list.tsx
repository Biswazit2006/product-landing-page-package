"use client";
import { useEffect, useState } from "react";
import OrderCard from "./order-card";
import { IOrder } from "@/model/orderModel";
import { Badge } from "@/components/ui/badge";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const roleList = ["All", "pending", "processing", "canceled", "delivered"];

export default function OrderCardList() {
const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") || "All";

  const [orders, setOrders] = useState<IOrder[]>([]);
  useEffect(() => {
    async function fetchOrders() {
      try {
        const query = currentStatus === "All" ? "" : `?status=${currentStatus}`;
        const response = await fetch(`/api/order${query}`);
        console.log(response);
        const data = await response.json();
        if (data.data) setOrders(data.data);
      } catch (error) {
        console.error("Initial load error:", error);
      }
    }
    fetchOrders();
  }, [currentStatus]);

  const handleFilter = (role: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (role === "All") {
      params.delete("status"); 
    } else {
      params.set("status", role);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <div className="flex w-full flex-wrap justify-end gap-2">
        {roleList.map((role) => (
          <Badge
          className="cursor-pointer"
            key={role}
            variant={
              currentStatus === (role) ? "default" : "secondary"
            }
            onClick={() => handleFilter(role)}
          >
            {role}
          </Badge>
        ))}
      </div>
      <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {orders.map((order) => (
          <OrderCard
            key={order.id?.toString()}
            order={order}
            className="flex flex-col gap-0.5 justify-center items-start p-4 font-mono"
          />
        ))}
        {
          orders.length === 0 && (
            <div className="col-span-full text-center text-foreground font-mono">
              No orders found.
            </div>
          )
        }
      </div>
    </>
  );
}
