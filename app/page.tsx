"use client"

import { motion } from "motion/react"
import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  ChevronRight,
  CreditCard,
  Heart,
  Home as HomeIcon,
  Menu,
  MessageCircle,
  PackageCheck,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Star,
  Store,
  Truck,
  UserRound,
  X,
  Zap,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const categories = [
  { label: "Electronics", icon: Smartphone },
  { label: "Fashion", icon: Store },
  { label: "Top Stores", icon: Star },
  { label: "New Arrivals", icon: Zap },
  { label: "Home & Living", icon: HomeIcon },
]

const products = [
  { name: "AeroPro Wireless Studio", category: "Audio & Sound", price: "৳ 8,490", oldPrice: "৳ 10,990", discount: "23% OFF", color: "from-slate-200 to-slate-400", symbol: "◖◗" },
  { name: "Keychron K2 Mechanical", category: "Mechanical Keyboards", price: "৳ 9,850", oldPrice: "৳ 11,500", discount: "14% OFF", color: "from-indigo-100 to-blue-300", symbol: "⌨" },
  { name: "PulseFit Pro Watch", category: "Smart Wearables", price: "৳ 4,290", oldPrice: "৳ 5,990", discount: "28% OFF", color: "from-cyan-100 to-sky-300", symbol: "◌" },
  { name: "HydroPulse RGB Speaker", category: "Gadgets", price: "৳ 2,490", oldPrice: "৳ 3,490", discount: "29% OFF", color: "from-teal-100 to-cyan-300", symbol: "◉" },
]

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="min-h-screen bg-[#f8faff] pb-20 text-[#172033] md:pb-0">
      <div className="bg-[#102b6b] px-4 py-2 text-center text-xs font-medium text-white sm:text-sm">
        Ramadan Mega Deal — Free nationwide delivery on orders over ৳ 1,500
      </div>

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex h-16 items-center justify-between gap-4">
            <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="NexusCart home">
              <span className="flex size-9 items-center justify-center rounded-lg bg-[#1275e2] text-lg font-bold text-white shadow-sm">N</span>
              <span className="text-lg font-bold tracking-tight text-[#172033]">Nexus<span className="text-[#1275e2]">Cart</span></span>
            </Link>
            <div className="hidden items-center gap-7 text-sm font-medium text-slate-600 lg:flex">
              <Link href="#shop" className="hover:text-[#1275e2]">Shop</Link>
              <Link href="#stores" className="hover:text-[#1275e2]">Top Stores</Link>
              <Link href="#deals" className="hover:text-[#1275e2]">Deals</Link>
            </div>
            <div className="hidden max-w-md flex-1 items-center md:flex lg:mx-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <Input aria-label="Search products" placeholder="Search for products, brands and more..." className="h-10 rounded-lg border-slate-200 bg-slate-50 pl-10 text-sm" />
              </div>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <Link href="/orders" className="relative rounded-lg p-2.5 text-slate-600 hover:bg-slate-100 hover:text-[#1275e2]" aria-label="Notifications"><Bell className="size-5" /><span className="absolute right-1 top-1 size-2 rounded-full bg-[#1275e2]" /></Link>
              <Link href="/cart" className="rounded-lg p-2.5 text-slate-600 hover:bg-slate-100 hover:text-[#1275e2]" aria-label="Shopping cart"><ShoppingBag className="size-5" /></Link>
              <Button render={<Link href="/overview" />} className="h-10 rounded-lg bg-[#1275e2] px-4 text-white hover:bg-[#0b61c4]">Sign in</Button>
            </div>
            <button className="rounded-lg p-2 sm:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
              {menuOpen ? <X /> : <Menu />}
            </button>
          </nav>
          {menuOpen && (
            <div className="space-y-2 border-t border-slate-100 py-4 sm:hidden">
              <div className="relative pb-2">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <Input placeholder="Search products..." className="h-11 rounded-lg bg-slate-50 pl-10" />
              </div>
              <Link onClick={() => setMenuOpen(false)} href="#shop" className="block rounded-lg px-3 py-3 text-sm font-medium">Shop all products</Link>
              <Link onClick={() => setMenuOpen(false)} href="#stores" className="block rounded-lg px-3 py-3 text-sm font-medium">Top stores</Link>
              <Link onClick={() => setMenuOpen(false)} href="/overview" className="block rounded-lg bg-[#1275e2] px-3 py-3 text-sm font-semibold text-white">Sign in</Link>
            </div>
          )}
        </div>
      </header>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          {categories.map((category, index) => (
            <Link key={category.label} href="#shop" className={`flex min-w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${index === 0 ? "bg-[#e8f2ff] text-[#1275e2]" : "text-slate-600 hover:bg-slate-100"}`}>
              <category.icon className="size-4" /> {category.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8 lg:pt-8">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }} className="relative overflow-hidden rounded-2xl bg-[#eaf3ff]">
          <div className="absolute -right-20 -top-24 size-80 rounded-full bg-[#c9e1ff] blur-2xl" />
          <div className="absolute bottom-0 right-1/3 size-32 rounded-full bg-white/60 blur-3xl" />
          <div className="relative grid min-h-[360px] items-center gap-8 px-6 py-10 sm:px-10 lg:grid-cols-[1.05fr_.95fr] lg:px-16">
            <div className="max-w-xl">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-[#1275e2]"><Zap className="size-3.5 fill-current" /> Fresh finds, better prices</p>
              <h1 className="text-4xl font-bold leading-[1.08] tracking-[-.04em] text-[#11295f] sm:text-5xl lg:text-6xl">Your everyday,<br /><span className="text-[#1275e2]">upgraded.</span></h1>
              <p className="mt-5 max-w-md text-base leading-7 text-slate-600 sm:text-lg">Authentic gadgets, lifestyle essentials, and everything in between — delivered across Bangladesh.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button render={<Link href="#shop" />} size="lg" className="h-12 rounded-lg bg-[#1275e2] px-6 text-white hover:bg-[#0b61c4]">Shop the collection <ArrowRight /></Button>
                <Link href="#stores" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[#b9d5f5] bg-white/70 px-5 text-sm font-semibold text-[#1d4b8f] hover:bg-white">Explore top stores <ChevronRight className="size-4" /></Link>
              </div>
            </div>
            <div className="relative mx-auto flex h-56 w-full max-w-md items-center justify-center sm:h-64 lg:h-full">
              <div className="absolute size-48 rounded-full bg-white/70 sm:size-64" />
              <div className="absolute bottom-5 left-1/2 flex size-36 -translate-x-1/2 items-center justify-center rounded-[2rem] bg-gradient-to-br from-[#15284c] to-[#4169e1] text-7xl text-white shadow-2xl shadow-[#4169e1]/30 sm:size-48 sm:text-8xl">◖◗</div>
              <div className="absolute right-4 top-2 rounded-xl bg-white px-3 py-2 text-xs font-bold text-[#1275e2] shadow-lg sm:right-12">Up to 35% off</div>
              <div className="absolute bottom-1 left-3 rounded-xl bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-lg sm:left-10"><Star className="mr-1 inline size-3.5 fill-amber-400 text-amber-400" /> 4.9 rated</div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="shop" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[.14em] text-[#1275e2]">Handpicked for you</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Trending right now</h2>
          </div>
          <Link href="/overview" className="hidden items-center gap-1 text-sm font-semibold text-[#1275e2] sm:flex">View all <ArrowRight className="size-4" /></Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {products.map((product, index) => (
            <motion.div key={product.name} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }} transition={{ delay: index * .07 }} whileHover={{ y: -4 }} className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
              <div className={`relative flex aspect-square items-center justify-center bg-gradient-to-br ${product.color}`}>
                <span className="text-7xl font-light text-white drop-shadow-lg transition-transform duration-500 group-hover:scale-110 sm:text-8xl">{product.symbol}</span>
                <span className="absolute left-3 top-3 rounded-md bg-[#1275e2] px-2 py-1 text-[10px] font-bold text-white">{product.discount}</span>
                <button className="absolute right-2 top-2 flex size-9 items-center justify-center rounded-full bg-white/85 text-slate-500 hover:text-rose-500" aria-label={`Add ${product.name} to wishlist`}><Heart className="size-4" /></button>
              </div>
              <div className="p-3.5 sm:p-4">
                <p className="text-[11px] font-medium text-slate-500">{product.category}</p>
                <h3 className="mt-1 line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-slate-800">{product.name}</h3>
                <div className="mt-3 flex items-end gap-2"><span className="text-base font-bold">{product.price}</span><span className="text-xs text-slate-400 line-through">{product.oldPrice}</span></div>
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500"><span><Star className="mr-1 inline size-3 fill-amber-400 text-amber-400" /> 4.8</span><span className="text-emerald-600">In stock</span></div>
                <Button className="mt-3 h-10 w-full rounded-lg bg-[#edf5ff] text-[#1275e2] hover:bg-[#dcecff]">Add to cart</Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="stores" className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="flex items-end justify-between gap-4">
            <div><p className="text-sm font-semibold uppercase tracking-[.14em] text-[#1275e2]">Verified sellers</p><h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Meet GadgetZone</h2></div>
            <Link href="/overview" className="hidden items-center gap-1 text-sm font-semibold text-[#1275e2] sm:flex">Visit store <ArrowRight className="size-4" /></Link>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-[#f7faff]">
            <div className="h-28 bg-gradient-to-r from-[#102b6b] via-[#4169e1] to-[#62c7dd]" />
            <div className="relative px-5 pb-6 sm:px-8">
              <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-end gap-4">
                  <div className="flex size-24 items-center justify-center rounded-full border-4 border-white bg-[#162c68] text-2xl font-bold text-white shadow-md">GZ</div>
                  <div className="pb-1"><div className="flex items-center gap-2"><h3 className="text-xl font-bold">GadgetZone</h3><BadgeCheck className="size-5 fill-[#1275e2] text-white" /></div><p className="text-sm text-slate-500">@gadgetzone · Dhaka, Bangladesh</p></div>
                </div>
                <div className="flex gap-2"><Button variant="outline" className="h-11 rounded-lg border-slate-300 bg-white"><MessageCircle className="size-4" /> Chat with seller</Button><Button className="h-11 rounded-lg bg-[#1275e2] text-white hover:bg-[#0b61c4]">Visit store <ArrowRight /></Button></div>
              </div>
              <div className="mt-7 grid grid-cols-2 gap-4 border-t border-slate-200 pt-5 text-sm sm:grid-cols-4">
                <span><Star className="mr-1 inline size-4 fill-amber-400 text-amber-400" /><b>4.9</b> <span className="text-slate-500">(150+ reviews)</span></span><span><b>84</b> <span className="text-slate-500">items in stock</span></span><span><b>2025</b> <span className="text-slate-500">joined NexusCart</span></span><span className="text-emerald-600"><ShieldCheck className="mr-1 inline size-4" /> Verified merchant</span>
              </div>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[["Fast nationwide delivery", "Dispatched within 24h", Truck], ["7-day free replacement", "Zero-friction exchange", PackageCheck], ["Cash on delivery", "Verify at your doorstep", CreditCard]].map(([title, description, Icon]) => (
              <div key={title as string} className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4"><div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#e8f2ff] text-[#1275e2]"><Icon className="size-5" /></div><div><p className="text-sm font-semibold">{title as string}</p><p className="mt-0.5 text-xs text-slate-500">{description as string}</p></div></div>
            ))}
          </div>
        </div>
      </section>

      <section id="deals" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-[1.15fr_.85fr]">
          <div className="rounded-2xl bg-[#102b6b] p-7 text-white sm:p-10"><p className="text-sm font-semibold uppercase tracking-[.15em] text-[#8ac7ff]">Buy with confidence</p><h2 className="mt-3 max-w-md text-3xl font-bold tracking-tight">Doorstep delivery. Open-box verification. Zero guesswork.</h2><p className="mt-4 max-w-lg text-sm leading-6 text-blue-100">Pay securely by card, bKash, Nagad, or choose Cash on Delivery. Check your package before you pay.</p><Link href="/overview" className="mt-7 inline-flex h-11 items-center gap-2 rounded-lg bg-white px-5 text-sm font-semibold text-[#102b6b] hover:bg-blue-50">Learn how it works <ArrowRight className="size-4" /></Link></div>
          <div className="rounded-2xl border border-[#b8ebf4] bg-[#e9fbff] p-7 sm:p-10"><p className="text-sm font-semibold uppercase tracking-[.15em] text-[#128aa4]">Need it now?</p><h2 className="mt-3 text-3xl font-bold tracking-tight text-[#123946]">Talk to a real person.</h2><p className="mt-4 text-sm leading-6 text-[#456f78]">WhatsApp us for product questions or direct order support.</p><a href="https://wa.me/8801700000000" className="mt-7 inline-flex h-11 items-center gap-2 rounded-lg bg-[#18b96b] px-5 text-sm font-semibold text-white hover:bg-[#0e9f5a]"><MessageCircle className="size-4" /> +880 1700-000000</a></div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8"><p className="font-bold text-[#172033]">Nexus<span className="text-[#1275e2]">Cart</span></p><p>© 2025 NexusCart · Made for Bangladesh</p><p className="flex items-center gap-1"><ShieldCheck className="size-4 text-[#1275e2]" /> Secure shopping</p></div>
      </footer>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-4 py-2 backdrop-blur-md md:hidden">
        <div className="mx-auto flex max-w-md items-center justify-around">
          {[[HomeIcon, "Home", "/"], [Search, "Search", "#shop"], [ShoppingBag, "Cart", "/cart"], [UserRound, "Account", "/overview"]].map(([Icon, label, href]) => <Link key={label as string} href={href as string} className={`flex min-h-11 min-w-11 flex-col items-center justify-center gap-0.5 text-[10px] font-medium ${label === "Home" ? "text-[#1275e2]" : "text-slate-500"}`}><Icon className="size-5" />{label as string}</Link>)}
        </div>
      </nav>
    </main>
  )
}
