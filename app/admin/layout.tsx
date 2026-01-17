"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Users,
  LogOut,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-black text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 p-6 flex flex-col">
        <div className="text-2xl font-bold text-yellow-500 mb-10 tracking-tighter">
          SHRUTI <span className="text-white">ADMIN</span>
        </div>

        <nav className="flex-1 space-y-2">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 p-3 rounded-lg bg-yellow-500/10 text-yellow-500 font-bold"
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link
            href="/admin/gallery"
            className="flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white transition-colors"
          >
            <ImageIcon size={20} /> Gallery Manager
          </Link>
          <Link
            href="/admin/bookings"
            className="flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white transition-colors"
          >
            <Users size={20} /> Bookings & CRM
          </Link>
        </nav>

        <button className="flex items-center gap-3 p-3 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors mt-auto">
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 bg-black">{children}</main>
    </div>
  );
}
