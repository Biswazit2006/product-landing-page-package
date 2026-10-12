import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-4">
    <Card className="w-full p-4 space-y-2 flex flex-col justify-center items-center gap-0 rounded-lg">
      <h1 className="text-2xl text-foreground font-bold font-sans">Users</h1>
      <p className="text-foreground font-mono">Manage your users here.</p>
    </Card>
    <Card>
      <Image src="https://github.com/shadcn.png" alt="User Image" width={100} height={100} />
      <p>This is a simple user card.</p>
      <p>This is a simple user card.</p>
    </Card>
    </div>
  )
}
