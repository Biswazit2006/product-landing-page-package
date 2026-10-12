import Link from "next/link";
import React from "react";
import NavBar from "@/components/nav-bar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar";
import { ChartLine, LayoutDashboard, PackageSearch, ShoppingCartMinus, UsersRound } from "lucide-react";

const navigation =  [
    {
      label: "Overview",
      href: "/overview",
      icon: LayoutDashboard,
    },
    {
      label: "Orders",
      href: "/orders",
      icon: ShoppingCartMinus,
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: ChartLine,
    },
    {
      label: "Product",
      href: "/product",
      icon: PackageSearch,
    },
    {
      label: "Users",
      href: "/users",
      icon: UsersRound,
    },
  ]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="s h-svh w-full overflow-hidden bg-muted/40 pb-2 ">
      <SidebarProvider className="h-full min-h-0  " defaultOpen={false}>
        <AppSidebar navigation={navigation} />
        <main className="min-w-0 flex-1 overflow-hidden">
          <NavBar />
          <div className="min-h-full w-full overflow-auto p-2 mt-2 rounded-lg ">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
