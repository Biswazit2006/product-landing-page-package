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
  {navigation.map((project) => (
    <SidebarMenuItem key={project.label} >
      <SidebarMenuButton render={<Link href={project.href} />} className="hover:bg-foreground/20">
        <project.icon  width="30px" height="30px" />
        <span>{project.label}</span>
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
