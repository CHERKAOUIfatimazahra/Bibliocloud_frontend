import React, { useState } from "react";
import {
  Library,
  BookOpen,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  BookMarked,
    UserCircle,
  BookAIcon,
  History,
  Tag,
  LineChart,
  CalendarClock,
  BookUp,
  Bell,
} from "lucide-react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      category: "Overview",
      items: [
        { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { title: "Analytics", icon: LineChart, path: "/analytics" },
      ],
    },
    {
      category: "Library Management",
      items: [
        { title: "All Books", icon: Library, path: "/books" },
        { title: "Categories", icon: Tag, path: "/categories" },
        { title: "New Arrivals", icon: BookUp, path: "/new-arrivals" },
        { title: "Borrowed Books", icon: BookOpen, path: "/borrowed" },
        { title: "Return History", icon: History, path: "/history" },
      ],
    },
    {
      category: "User Management",
      items: [
        { title: "Members", icon: Users, path: "/members" },
        { title: "Librarians", icon: UserCircle, path: "/librarians" },
        { title: "Reservations", icon: CalendarClock, path: "/reservations" },
      ],
    },
  ];

  return (
    <div className="relative">
      {/* Overlay button for mobile */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow-lg`}
      >
        {isCollapsed ? (
          <ChevronRight className="w-5 h-5" />
        ) : (
          <ChevronLeft className="w-5 h-5" />
        )}
      </button>

      <div
        className={`${
          isCollapsed ? "w-20" : "w-72"
        } min-h-screen bg-slate-900 text-white transition-all duration-300 ease-in-out fixed left-0 top-0 z-40`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          {!isCollapsed && (
            <div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                LibraryCMS
              </h2>
              <p className="text-xs text-slate-400">Admin Dashboard</p>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-slate-700 transition-colors hidden lg:block"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Admin Profile */}
        <div
          className={`px-4 py-3 border-b border-slate-700 ${
            isCollapsed ? "text-center" : ""
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <UserCircle className="w-6 h-6 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h3 className="text-sm font-medium">Admin Name</h3>
                <p className="text-xs text-slate-400">Library Manager</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6 px-3">
          {menuItems.map((section, index) => (
            <div key={index} className="mb-6">
              {!isCollapsed && (
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-4">
                  {section.category}
                </h3>
              )}
              {section.items.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className="flex items-center px-4 py-3 text-gray-300 hover:bg-slate-800 rounded-lg mb-1 group transition-colors"
                >
                  <item.icon className="w-5 h-5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600" />
                  {!isCollapsed && (
                    <span className="ml-3 text-sm group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600">
                      {item.title}
                    </span>
                  )}
                </a>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-full border-t border-slate-700">
          {!isCollapsed && (
            <div className="px-4 py-2">
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>v2.0.0</span>
                <Bell className="w-5 h-5 cursor-pointer hover:text-white" />
              </div>
            </div>
          )}
          <button className="flex items-center w-full px-4 py-3 text-gray-300 hover:bg-slate-800 transition-colors">
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3 text-sm">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main content overlay for mobile */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </div>
  );
};

export default Sidebar;
