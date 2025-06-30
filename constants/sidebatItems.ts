export const ADMIN_SIDEBAR_ITEMS = {
  menuItems: [
    {
      title: "Dashboard",
      icon: "LayoutDashboard", // Changed to string
      href: "/admin/dashboard",
      color: "text-blue-600",
    },
    {
      title: "User Management",
      icon: "Users", // Changed to string
      href: "/admin/users",
      color: "text-green-600",
    },
    {
      title: "Vendor Management",
      icon: "Building2", // Changed to string
      href: "/admin/vendors",
      color: "text-purple-600",
    },
    {
      title: "Properties",
      icon: "Home", // Changed to string
      href: "/admin/properties",
      color: "text-orange-600",
    },
    {
      title: "Bookings",
      icon: "Calendar", // Changed to string
      href: "/admin/bookings",
      color: "text-indigo-600",
    },
    {
      title: "Payments",
      icon: "DollarSign", // Changed to string
      href: "/admin/payments",
      color: "text-emerald-600",
    },
    {
      title: "Analytics",
      icon: "BarChart3", // Changed to string
      href: "/admin/analytics",
      color: "text-red-600",
    },
    {
      title: "Approvals",
      icon: "UserCheck", // Changed to string
      href: "/admin/approvals",
      color: "text-yellow-600",
    },
    {
      title: "Notifications",
      icon: "Bell", // Changed to string
      href: "/admin/notifications",
      color: "text-pink-600",
    },
    {
      title: "Settings",
      icon: "Settings", // Changed to string
      href: "/admin/settings",
      color: "text-gray-600",
    },
  ],
  logo: {
    icon: "Home", // Changed to string
    gradientFrom: "from-blue-600",
    gradientTo: "to-purple-600",
    title: "Go UniNest",
    subtitle: "Admin Panel"
  },
  user: {
    initial: "A",
    name: "Admin User",
    email: "admin@studenthome.com",
    bgColor: "bg-gray-300",
    textColor: "text-gray-700"
  },
  activeLinkStyle: {
    bgColor: "bg-blue-50",
    textColor: "text-blue-700",
    borderColor: "border-blue-700"
  }
};

export const VENDOR_SIDEBAR_ITEMS = {
  menuItems: [
    {
      title: "Dashboard",
      icon: "LayoutDashboard", // Changed to string
      href: "/vendor/dashboard",
      color: "text-blue-600",
    },
    {
      title: "My Properties",
      icon: "Home", // Changed to string
      href: "/vendor/properties",
      color: "text-green-600",
    },
    {
      title: "Bookings",
      icon: "Calendar", // Changed to string
      href: "/vendor/bookings",
      color: "text-orange-600",
    },
    {
      title: "Students",
      icon: "Users", // Changed to string
      href: "/vendor/students",
      color: "text-indigo-600",
    },
    {
      title: "Payments",
      icon: "DollarSign", // Changed to string
      href: "/vendor/payments",
      color: "text-emerald-600",
    },
    {
      title: "Analytics",
      icon: "BarChart3", // Changed to string
      href: "/vendor/analytics",
      color: "text-red-600",
    },
    {
      title: "Notifications",
      icon: "Bell", // Changed to string
      href: "/vendor/notifications",
      color: "text-pink-600",
    },
    {
      title: "Settings",
      icon: "Settings", // Changed to string
      href: "/vendor/settings",
      color: "text-gray-600",
    },
  ],
  logo: {
    icon: "Home", // Changed to string
    gradientFrom: "from-purple-600",
    gradientTo: "to-blue-600",
    title: "Go UniNest",
    subtitle: "Vendor Panel"
  },
  user: {
    initial: "V",
    name: "Metro Housing Ltd",
    email: "vendor@metrohousing.com",
    bgColor: "bg-purple-300",
    textColor: "text-purple-700"
  },
  activeLinkStyle: {
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
    borderColor: "border-purple-700"
  }
};

export const USER_SIDEBAR_ITEMS = {
  menuItems: [
    {
      title: "Dashboard",
      icon: "LayoutDashboard", // Changed to string
      href: "/user/dashboard",
      color: "text-blue-600",
    },
    {
      title: "Messages",
      icon: "MessageSquare", // Changed to string
      href: "/user/messages",
      color: "text-purple-600",
    },
    {
      title: "Payments",
      icon: "CreditCard", // Changed to string
      href: "/user/payments",
      color: "text-emerald-600",
    },
    {
      title: "Notifications",
      icon: "Bell", // Changed to string
      href: "/user/notifications",
      color: "text-pink-600",
    },
    {
      title: "Profile",
      icon: "User", // Changed to string (matches iconMap key)
      href: "/user/profile",
      color: "text-indigo-600",
    },
    {
      title: "Settings",
      icon: "Settings", // Changed to string
      href: "/user/settings",
      color: "text-gray-600",
    },
  ],
  logo: {
    icon: "Home", // Changed to string
    gradientFrom: "from-green-600",
    gradientTo: "to-blue-600",
    title: "Go UniNest",
    subtitle: "Resident Portal"
  },
  user: {
    initial: "J",
    name: "John Doe",
    email: "Room 204B",
    bgColor: "bg-green-300",
    textColor: "text-green-700"
  },
  activeLinkStyle: {
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    borderColor: "border-green-700"
  }
};