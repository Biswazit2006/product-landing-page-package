import { ArrowUpRight, DollarSign, ShoppingBag, Users } from "lucide-react"

const metrics = [
  { label: "Total revenue", value: "$24,780", change: "+12.5%", icon: DollarSign },
  { label: "Orders", value: "1,248", change: "+8.2%", icon: ShoppingBag },
  { label: "Customers", value: "8,549", change: "+4.7%", icon: Users },
]

export default function OverviewPage() {
  return (
    <div className="space-y-8 p-6 lg:p-8">
      <div>
        <p className="text-sm font-medium text-muted-foreground">Dashboard</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Here is what is happening with your store today.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-xl border bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <metric.icon className="size-4 text-muted-foreground" />
            </div>
            <p className="mt-4 text-2xl font-semibold">{metric.value}</p>
            <p className="mt-1 text-xs font-medium text-emerald-600">
              {metric.change} from last month
            </p>
          </div>
        ))}
      </div>
      <div className="rounded-xl border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Recent activity</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Keep track of your latest store updates.
            </p>
          </div>
          <ArrowUpRight className="size-5 text-muted-foreground" />
        </div>
        <div className="mt-8 flex min-h-32 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
          Your recent orders and activity will appear here.
        </div>
      </div>
    </div>
  )
}
