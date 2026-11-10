"use client";
import { useEffect, useRef, useState } from "react";
import OrderCard from "./order-card";
import { IOrder } from "@/model/orderModel";
import { Badge } from "@/components/ui/badge";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import { VirtuosoGrid } from "react-virtuoso";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "cn";
import { LoaderIcon } from "lucide-react";

const statusList = ["All", "pending", "processing", "canceled", "delivered"];

export default function OrderCardList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") || "All";
  const currentSearch = searchParams.get("search") || "";

  const [searchInput, setSearchInput] = useState(currentSearch);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["orders", currentStatus, currentSearch],
      initialPageParam: 1,
      queryFn: async ({ pageParam = 1 }) => {
        // dynamic query parameters based on current status and page number
        const query = new URLSearchParams({
          page: pageParam.toString(),
          limit: "12",
        });

        if (currentStatus !== "All") query.set("status", currentStatus);
        if (currentSearch) query.set("search", currentSearch);

        // Calling the API with status and page parameters (limit 12 for a nice grid layout of 3 or 4 columns)
        const response = await fetch(`/api/order?${query.toString()}`);
        return response.json();
      },
      getNextPageParam: (lastPage) => {
        // Calculating next page based on the last page's meta data
        if (lastPage?.meta?.currentPage < lastPage?.meta?.totalPages) {
          return lastPage.meta.currentPage + 1;
        }
        return undefined; // No more pages to fetch
      },
    });
  const orders = data ? data.pages.flatMap((page) => page.data || []) : [];

  // const [orders, setOrders] = useState<IOrder[]>([]);
  // useEffect(() => {
  //   async function fetchOrders() {
  //     try {
  //       const query = currentStatus === "All" ? "" : `?status=${currentStatus}`;
  //       const response = await fetch(`/api/order${query}`);
  //       console.log(response);
  //       const data = await response.json();
  //       if (data.data) setOrders(data.data);
  //     } catch (error) {
  //       console.error("Initial load error:", error);
  //     }
  //   }
  //   fetchOrders();
  // }, [currentStatus]);

  const handleFilter = (role: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (role === "All") {
      params.delete("status");
    } else {
      params.set("status", role);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Search functionality
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchInput.trim()) {
      params.set("search", searchInput.trim());
    } else {
      params.delete("search");
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <div className="flex w-full justify-end items-center gap-2">
        {statusList.map((status) => (
          <Badge
            className="cursor-pointer text-mono"
            key={status}
            variant={currentStatus === status ? "default" : "secondary"}
            onClick={() => handleFilter(status)}
          >
            {status}
          </Badge>
        ))}
        <form onSubmit={handleSearch}>
          <Field orientation="horizontal" className="w-auto text-mono">
            <Input
              type="search"
              placeholder="Search by name or phone..."
              className="w-full p-2 border-none rounded-lg"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button type="submit" className="px-4 text-sm">
              Search
            </Button>
          </Field>
        </form>
      </div>
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center py-8">
           <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin")}
    />
        </div>
      ) : orders.length === 0 ? (
        <div className="col-span-full text-center text-foreground font-mono">
          No orders found.
        </div>
      ) : (
        // <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        //   {orders.map((order) => (
        //     <OrderCard
        //       key={order.id?.toString()}
        //       order={order}
        //       className="flex flex-col gap-0.5 justify-center items-start p-4 font-mono"
        //     />
        //   ))}
        // </div>
        <VirtuosoGrid
          useWindowScroll
          data={orders}
          endReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          listClassName="w-full h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          itemContent={(index, order: IOrder) => (
            <OrderCard
              key={order.id?.toString()}
              order={order}
              className="flex flex-col gap-0.5 justify-center items-start p-4 font-mono h-full"
            />
          )}
          components={{
            // Showing a spinner or text at the bottom when new data is being fetched
            Footer: () =>
              isFetchingNextPage ? (
                <div className="col-span-full text-center py-4 font-mono">
                  Loading more orders...
                </div>
              ) : null,
          }}
        />
      )}
    </>
  );
}
