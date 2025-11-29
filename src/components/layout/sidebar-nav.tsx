
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Coffee, LayoutDashboard, ClipboardList, History, BarChart3, BookOpen, User, Store, LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";


const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/orders", label: "Orders", icon: ClipboardList },
  { href: "/menu", label: "Menu", icon: BookOpen },
  { href: "/history", label: "History", icon: History },
  { href: "/reports", label: "Reports", icon: BarChart3 },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Coffee className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-headline font-bold">SejadiKopi</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))}
                  tooltip={item.label}
                >
                    <item.icon />
                    <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Separator className="my-2" />
        <div className="p-2 flex items-center gap-3">
            <Avatar className="h-10 w-10 bg-yellow-200">
                <AvatarFallback className="bg-transparent">
                    <User className="text-yellow-800" />
                </AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <p className="font-bold text-sm">Admin</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-9 w-9 bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-700">
                    <Store className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="h-9 w-9 bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700">
                    <LogOut className="h-5 w-5" />
                </Button>
            </div>
        </div>
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
