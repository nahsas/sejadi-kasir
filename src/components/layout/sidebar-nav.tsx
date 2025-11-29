
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Coffee, LayoutDashboard, ClipboardList, History, BarChart3, BookOpen, User, Store, LogOut } from "lucide-react";
import { useAuth } from "@/context/auth-context";

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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";


const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard, roles: ['admin', 'kasir'] },
  { href: "/orders", label: "Orders", icon: ClipboardList, roles: ['admin', 'kasir'] },
  { href: "/menu", label: "Menu", icon: BookOpen, roles: ['admin'] },
  { href: "/history", label: "History", icon: History, roles: ['admin', 'kasir'] },
  { href: "/reports", label: "Reports", icon: BarChart3, roles: ['admin', 'kasir'] },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const userRole = user?.role || '';
  const userName = user?.email.split('@')[0];
  const displayName = userName ? userName.charAt(0).toUpperCase() + userName.slice(1) : '';
  const roleDisplay = user?.role === 'admin' ? '(admin on duty)' : '(cashier on duty)';


  const availableNavItems = navItems.filter(item => item.roles.includes(userRole));

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
          {availableNavItems.map((item) => (
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
            <div className="flex-1">
                <p className="font-bold text-sm">{displayName}</p>
                <p className="text-xs text-muted-foreground">{roleDisplay}</p>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-9 w-9 bg-green-100 text-green-600 hover:bg-green-200 hover:text-green-700">
                    <Store className="h-5 w-5" />
                </Button>
                <Button onClick={logout} variant="ghost" size="icon" className="h-9 w-9 bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700">
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
