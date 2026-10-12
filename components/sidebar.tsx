import {
  AudioWaveform,
  BookOpen,
  Bot,
  ChartLine,
  Command,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  LifeBuoy,
  Map,
  PackageSearch,
  PieChart,
  Settings,
  Settings2,
  ShoppingCartMinus,
  SquareTerminal,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronRight, type LucideIcon } from "lucide-react"
import Link from "next/link";

interface AppSidebarProps {
  navigation: {
    label: string;
    href: string;
    icon: React.ComponentType;
  }[];
}

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Overview",
      url: "overview",
      icon: LayoutDashboard,
    },
    {
      name: "Orders",
      url: "orders",
      icon: ShoppingCartMinus,
    },
    {
      name: "Analytics",
      url: "analytics",
      icon: ChartLine,
    },
    {
      name: "Product",
      url: "product",
      icon: PackageSearch,
    },
  ],
}

export function AppSidebar({ navigation }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" variant="floating"  className="border-none" >
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex h-12 items-center gap-2 px-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sm font-bold text-sidebar-primary-foreground font-mono">
            N
          </div>
          <span className="truncate text-base font-semibold group-data-[collapsible=icon]:hidden font-mono">
            NexusCart
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
         <SidebarGroup>
      <SidebarGroupLabel className="font-mono">Platform</SidebarGroupLabel>
      <SidebarMenu className="font-mono text-foreground">
  {data.projects.map((project) => (
    <SidebarMenuItem key={project.name} >
      <SidebarMenuButton render={<Link href={project.url} />} className="hover:bg-foreground/20">
        <project.icon  width="30px" height="30px" />
        <span>{project.name}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))}
</SidebarMenu>
    </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/settings" />}
              tooltip="Settings"
            >
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<Link href="/help" />}
              tooltip="Help and support"
            >
              <LifeBuoy />
              <span>Help and support</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
