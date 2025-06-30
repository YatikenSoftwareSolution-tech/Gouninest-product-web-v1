"use client";

import {
  LayoutDashboard,
  Users,
  Building2,
  Home,
  Calendar,
  BarChart3,
  Settings,
  DollarSign,
  UserCheck,
  Bell,
  MessageSquare,
  CreditCard,
  User as UserIcon,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Users,
  Building2,
  Home,
  Calendar,
  BarChart3,
  Settings,
  DollarSign,
  UserCheck,
  Bell,
  MessageSquare,
  CreditCard,
  User: UserIcon,
};

interface SidebarItem {
  title: string;
  icon: string;
  href: string;
  color: string;
}

interface SidebarProps {
  menuItems: SidebarItem[];
  logo: {
    icon: string;
    gradientFrom: string;
    gradientTo: string;
    title: string;
    subtitle: string;
  };
  user: {
    initial: string;
    name: string;
    email: string;
    bgColor: string;
    textColor: string;
  };
  activeLinkStyle?: {
    bgColor: string;
    textColor: string;
    borderColor: string;
  };
}

export default function CommonSidebar({
  menuItems,
  logo,
  user,
  activeLinkStyle = {
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-700",
  },
}: SidebarProps) {
  const pathname = usePathname();

  const LogoIcon = iconMap[logo.icon] || Home;

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Logo/Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div
            className={`w-10 h-10 bg-gradient-to-br ${logo.gradientFrom} ${logo.gradientTo} rounded-lg flex items-center justify-center`}
          >
            <LogoIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">{logo.title}</h2>
            <p className="text-xs text-gray-600">{logo.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = iconMap[item.icon] || Home;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? `${activeLinkStyle.bgColor} ${activeLinkStyle.textColor} border-l-4 ${activeLinkStyle.borderColor}`
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5",
                      isActive ? activeLinkStyle.textColor : item.color
                    )}
                  />
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 px-3 py-2">
          <div
            className={`w-8 h-8 ${user.bgColor} rounded-full flex items-center justify-center`}
          >
            <span className={`text-sm font-medium ${user.textColor}`}>
              {user.initial}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
