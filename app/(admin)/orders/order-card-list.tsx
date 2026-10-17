"use client";
import { useEffect, useState } from "react";
import OrderCard from "./order-card";
import { IOrder } from "@/model/orderModel";

export default function OrderCardList() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch("/api/order");
        console.log(response);
        const data = await response.json();
        if (data.data) setOrders(data.data);
      } catch (error) {
        console.error("Initial load error:", error);
      }
    }
    fetchOrders();
  }, []);
  return (
    <>
      {orders.map((order) => (
        <OrderCard
          key={order.id?.toString()}
          order={order}
          className="flex flex-col gap-0.5 justify-center items-start p-4 font-mono"
        />
      ))}
    </>
  );
}
