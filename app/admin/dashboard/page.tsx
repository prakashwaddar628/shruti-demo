"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DollarSign, Users, Calendar, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState({
    revenue: 0,
    bookings: 0,
    pending: 0,
    clients: 0,
  });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  // We'll keep mock graph data for now as we need date grouping logic which is complex
  const graphData = [
    { name: "Jan", revenue: 45000 },
    { name: "Feb", revenue: 65000 },
    { name: "Mar", revenue: 120000 },
    { name: "Apr", revenue: 95000 },
    { name: "May", revenue: 30000 },
    { name: "Jun", revenue: 55000 },
  ];

  useEffect(() => {
    async function fetchData() {
      // Fetch all bookings
      const { data } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        setRecentBookings(data);

        // Calculate Totals
        const totalRevenue = data.reduce(
          (sum, item) => sum + (Number(item.advance_amount) || 0),
          0,
        );
        const totalClients = new Set(data.map((item) => item.customer_phone))
          .size;

        setStats({
          revenue: totalRevenue,
          bookings: data.length,
          pending: data.length * 5000, // Just an estimate for pending
          clients: totalClients,
        });
      }
    }
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-gray-500">
            Welcome back, Shruti. Real-time business snapshot.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-lg bg-gray-800 text-green-500">
              <DollarSign size={24} />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">
            ₹{stats.revenue.toLocaleString()}
          </div>
          <div className="text-gray-500 text-sm">Total Advance Collected</div>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-lg bg-gray-800 text-blue-500">
              <Calendar size={24} />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">{stats.bookings}</div>
          <div className="text-gray-500 text-sm">Active Bookings</div>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-lg bg-gray-800 text-purple-500">
              <Users size={24} />
            </div>
          </div>
          <div className="text-3xl font-bold text-white">{stats.clients}</div>
          <div className="text-gray-500 text-sm">Total Clients</div>
        </div>
      </div>

      {/* Charts & Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart (Static for now) */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <h2 className="text-xl font-bold mb-6">Revenue Trends</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={graphData}>
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

        {/* REAL Recent Bookings List */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 overflow-hidden">
          <h2 className="text-xl font-bold mb-6">Recent Bookings</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500 border-b border-gray-800 text-sm uppercase">
                  <th className="pb-3">Client</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Advance</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-b border-gray-800 last:border-0 hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-4 font-medium">
                      {booking.customer_name}{" "}
                      <div className="text-xs text-gray-500">
                        {booking.package_name}
                      </div>
                    </td>
                    <td className="py-4 text-gray-400">{booking.event_date}</td>
                    <td className="py-4 font-bold text-white">
                      ₹{booking.advance_amount?.toLocaleString()}
                    </td>
                    <td className="py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/20 text-green-500">
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {recentBookings.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-gray-500">
                      No bookings yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
