"use client";

import React from "react";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChevronDown, ShoppingCart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import Link from "next/link";
import ThemeToggle from "./theme-tougle-btn";
import { SidebarTrigger } from "./ui/sidebar";

export default function NavBar() {

  return (
    <div className="flex justify-between items-center py-2 px-6 bg-card text-foreground backdrop-blur-sm border-b border-border/60 sticky top-0 z-50 rounded-lg">
      {/* The Logo */}
      <div className="w-[20%] flex">
        <SidebarTrigger/>
        <p className="text-foreground font-mono ">
          <Link href="/" className="text-md lg:text-2xl font-bold">
            NexusCart
          </Link>
        </p>
      </div>
      <div className="w-[80%] flex justify-end gap-6">
        {/* Theme Tougle Button */}
        <ThemeToggle />
        {/* Profile Dropdown */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                  <AvatarBadge className="bg-white text-black text-2xl">
                    <ChevronDown />
                  </AvatarBadge>
                </Avatar>
              }
            />
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <Link href="/">
                  <DropdownMenuItem>Home</DropdownMenuItem>
                </Link>
                <Link href={"/profile"}>
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                </Link>
                <Link href={"/orders"}>
                  <DropdownMenuItem>Orders</DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <Link href={"/wishlist"}>
                <DropdownMenuItem>My Wishlist</DropdownMenuItem>
              </Link>
              <Link href={"/cart"}>
                <DropdownMenuItem>Cart</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
