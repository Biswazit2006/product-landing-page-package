import { ArrowUpRight, DollarSign, ShoppingBag, Users } from "lucide-react"
import { SectionCards } from "./section-card"

const metrics = [
  { label: "Total revenue", value: "$24,780", change: "+12.5%", icon: DollarSign },
  { label: "Orders", value: "1,248", change: "+8.2%", icon: ShoppingBag },
  { label: "Customers", value: "8,549", change: "+4.7%", icon: Users },
]

export default function OverviewPage() {
  return (
    <>
    <SectionCards />
    </>
  )
}
