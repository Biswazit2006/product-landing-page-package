import { Card } from "@/components/ui/card";
import UserCard from "./userCard";
import { connectDb } from "@/lib/connectMongoDb";
import User, { IUser } from "@/model/userModel";
import { Badge } from "@/components/ui/badge";

export default async function CustomersPage() {
  let users: Omit<IUser, "password">[] = [];
  try {
    await connectDb();
    users = await User.aggregate([
      {
        $project: {
          _id: 0,
          id: { $toString: "$_id" },
          name: 1,
          email: 1,
          phone: 1,
          role: 1,
          avatar: 1,
        },
      },
    ]);
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
  return (
    <div className="flex flex-col gap-4">
      <Card className="w-full p-4 space-y-2 flex flex-col justify-center items-center gap-0 rounded-lg">
        <h1 className="text-2xl text-foreground font-bold font-sans">Users</h1>
        <p className="text-foreground font-mono">Manage your users here.</p>
      </Card>
      <div className="flex w-full flex-wrap justify-end gap-2 px-4">
        <Badge variant="outline" className="bg-transparent px-4 py-2 font-mono">
          Admin
        </Badge>
        <Badge variant="outline" className="bg-transparent px-4 py-2 font-mono">
          Moderator
        </Badge>
        <Badge variant="outline" className="bg-transparent px-4 py-2 font-mono">
          Editor
        </Badge>
        <Badge variant="outline" className="bg-transparent px-4 py-2 font-mono">
          User
        </Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {users.map((user: Omit<IUser, "password">) => (
          <UserCard
            className=" p-4 space-y-2 flex flex-row justify-center items-center gap-2 rounded-lg"
            key={user.id}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}
