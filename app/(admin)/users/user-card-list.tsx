"use client";
import { Badge } from "@/components/ui/badge";
import { IRole } from "@/lib/interfaces";
import { useInfiniteQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { VirtuosoGrid } from "react-virtuoso";
import UserCard from "./userCard";
import { IUser } from "@/model/userModel";
import { LoaderIcon } from "lucide-react";
import { cn } from "cn";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const roles: Omit<IRole, "All">[] = ["admin", "moderator", "customer", "All"];

export default function UserCardList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentRole = searchParams.get("role") || "All";
  const currentSearch = searchParams.get("search") || "";

  const [searchInput, setSearchInput] = useState(currentSearch);

  //   fetch data
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["users", currentRole, currentSearch],
      initialPageParam: 1,
      queryFn: async ({ pageParam = 1 }) => {
        // dynamic query parameters based on current role and page number
        const query = new URLSearchParams({
          page: pageParam.toString(),
          limit: "12",
        });

        if (currentRole !== "All") query.set("role", currentRole);
        if (currentSearch) query.set("search", currentSearch);

        // Calling the API with status and page parameters (limit 12 for a nice grid layout of 3 or 4 columns)
        const response = await fetch(`/api/user?${query.toString()}`);
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
  const users = data ? data.pages.flatMap((page) => page.data || []) : [];

  // Handler for filter
  const handleFilter = (role: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (role === "All") {
      params.delete("role");
    } else {
      params.set("role", role);
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
        {roles.map((role) => (
          <Badge
            key={role}
            className="px-4 py-2 font-mono cursor-pointer"
            variant={currentRole === role ? "default" : "secondary"}
            onClick={() => handleFilter(role)}
          >
            {role.charAt(0).toUpperCase() + role.slice(1)}
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
      ) : users.length === 0 ? (
        <div className="col-span-full text-center text-foreground font-mono">
          No users found.
        </div>
      ) : (
        <VirtuosoGrid
          useWindowScroll
          data={users}
          endReached={() => {
            if (hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          }}
          listClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          itemContent={(index, user: Omit<IUser, "password">) => (
            <UserCard
              key={user.id?.toString()}
              user={user}
              className="p-4 space-y-2 flex flex-row justify-center items-center gap-2 rounded-lg"
            />
          )}
          components={{
            // Showing a spinner or text at the bottom when new data is being fetched
            Footer: () =>
              isFetchingNextPage ? (
                <div className="col-span-full text-center py-4 font-mono">
                  Loading more users...
                </div>
              ) : null,
          }}
        />
      )}
    </>
  );
}
