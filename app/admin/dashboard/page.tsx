"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { DollarSign, Users, Calendar, TrendingUp } from "lucide-react";

// Mock Data (We replace this with Supabase data later)
const revenueData = [
  { name: "Jan", revenue: 45000 },
  { name: "Feb", revenue: 65000 },
  { name: "Mar", revenue: 120000 }, // Wedding Season
  { name: "Apr", revenue: 95000 },
  { name: "May", revenue: 30000 },
  { name: "Jun", revenue: 55000 },
];

const bookingsList = [
  {
    id: 1,
    name: "Aditya & Priya",
    date: "2026-02-14",
    pkg: "Gold Wedding",
    amount: 45000,
    status: "Confirmed",
  },
  {
    id: 2,
    name: "Rahul S.",
    date: "2026-03-01",
    pkg: "Pre-Wedding",
    amount: 25000,
    status: "Pending",
  },
  {
    id: 3,
    name: "Kapoor Family",
    date: "2026-03-10",
    pkg: "Portraits",
    amount: 15000,
    status: "Completed",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-gray-500">
            Welcome back, Shruti. Here is your business snapshot.
          </p>
        </div>
        <div className="bg-gray-900 px-4 py-2 rounded-lg border border-gray-800 text-sm">
          Date: <span className="font-bold text-white">Jan 17, 2026</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: "Total Revenue",
            value: "₹4.1L",
            icon: DollarSign,
            color: "text-green-500",
          },
          {
            label: "Active Bookings",
            value: "12",
            icon: Calendar,
            color: "text-blue-500",
          },
          {
            label: "Pending Payments",
            value: "₹85k",
            icon: TrendingUp,
            color: "text-yellow-500",
          },
          {
            label: "Total Clients",
            value: "148",
            icon: Users,
            color: "text-purple-500",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-gray-900 p-6 rounded-xl border border-gray-800"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg bg-gray-800 ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs text-gray-500 bg-black px-2 py-1 rounded uppercase font-bold">
                +12% this month
              </span>
            </div>
            <div className="text-3xl font-bold text-white">{stat.value}</div>
            <div className="text-gray-500 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <h2 className="text-xl font-bold mb-6">Revenue Trends (6 Months)</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#eab308" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  vertical={false}
                />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#000",
                    border: "1px solid #333",
                  }}
                  itemStyle={{ color: "#eab308" }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#eab308"
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Bookings List */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 overflow-hidden">
          <h2 className="text-xl font-bold mb-6">Recent Bookings</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500 border-b border-gray-800 text-sm uppercase">
                  <th className="pb-3">Client</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {bookingsList.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-gray-800 last:border-0 hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-4 font-medium">
                      {booking.name}{" "}
                      <div className="text-xs text-gray-500">{booking.pkg}</div>
                    </td>
                    <td className="py-4 text-gray-400">{booking.date}</td>
                    <td className="py-4 font-bold text-white">
                      ₹{booking.amount.toLocaleString()}
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          booking.status === "Confirmed"
                            ? "bg-green-500/20 text-green-500"
                            : booking.status === "Pending"
                              ? "bg-yellow-500/20 text-yellow-500"
                              : "bg-blue-500/20 text-blue-500"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
