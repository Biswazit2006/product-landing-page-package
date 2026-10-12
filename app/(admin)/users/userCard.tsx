import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
import { IUser } from "@/model/userModel";
import { EllipsisVertical, ShieldUser, User, UserStar } from "lucide-react";
import Image from "next/image";

export default function UserCard({ className,user }: { className?: string,user:IUser }) {
  return (
        <Card className={className}>
      <div className="h-full flex justify-center items-center ">
      <Image src={user?.avatar || "https://github.com/shadcn.png"} alt="User Image" width={100} height={100}  className="rounded-lg"/>
      </div>
      <div className="flex flex-col gap-1 font-mono">
        <p className="flex gap-2">Name: {user?.name}
          <Badge variant="secondary" className="bg-primary">
            {
                user.role === 'admin' &&  <UserStar data-icon="inline-start" />
            }
            {
                user.role === 'moderator' &&  <ShieldUser data-icon="inline-start"/>
            }
            {
                user.role === 'customer' &&  <User data-icon="inline-start"/>
            }
       
        {user?.role}
      </Badge>
        </p>
        <p>Email: {user?.email}</p>
        <p>phone: {user?.phone}</p>
        <p>UserId: {user?.id}</p>
        <p>address: {user?.name}</p>
      </div>
      <div className="h-25 flex flex-col gap-2 ">
        
        <Popover>
  <PopoverTrigger render={<button ><EllipsisVertical /></button>}>
    Open Popover
  </PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle className="text-lg font-semibold font-heading">Title</PopoverTitle>
      <PopoverDescription className="text-sm font-mono">
        Description text here.
      </PopoverDescription>
      <div>
        <Button className="w-full text-md font-mono p-2">
          block user
        </Button>
        <Button className="w-full text-md font-mono p-2">
          view profile
        </Button>
      </div>
    </PopoverHeader>
  </PopoverContent>
</Popover>
      </div>
    </Card>
  )
}
