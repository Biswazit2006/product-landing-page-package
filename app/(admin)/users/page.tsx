import { Card } from "@/components/ui/card";
import UserCardList from "./user-card-list";
import { Suspense } from "react";
import { LoaderIcon } from "lucide-react";
import { cn } from "cn";

export default async function CustomersPage() {
  return (
    <div className="flex flex-col gap-4">
      <Card className="w-full p-4 space-y-2 flex flex-col justify-center items-center gap-0 rounded-lg">
        <h1 className="text-2xl text-foreground font-bold font-sans">Users</h1>
        <p className="text-foreground font-mono">Manage your users here.</p>
      </Card>
      <Suspense
      fallback={
        <div className="w-full h-full flex justify-center items-center py-8">
          <LoaderIcon
            role="status"
            aria-label="Loading"
            className={cn("size-4 animate-spin")}
          />
        </div>
      } 
      >
        <UserCardList/>
      </Suspense>
      
    </div>
  );
}
