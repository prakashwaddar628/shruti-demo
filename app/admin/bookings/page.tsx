"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  Search,
  Phone,
  MessageCircle,
  Trash2,
  Calendar,
  CheckCircle,
  Clock,
} from "lucide-react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // 1. Fetch Bookings
  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setBookings(data);
    setLoading(false);
  }

  // 2. Delete Booking
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;

    const { error } = await supabase.from("bookings").delete().eq("id", id);
    if (!error) {
      setBookings(bookings.filter((b) => b.id !== id));
    } else {
      alert("Error deleting booking");
    }
  };

  // 3. Filter Logic
  const filteredBookings = bookings.filter(
    (b) =>
      b.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      b.package_name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold">Client Bookings</h1>
          <p className="text-gray-500">
            Manage your upcoming events and customer details.
          </p>
        </div>
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <input
            type="text"
            placeholder="Search client name or package..."
            className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-3 focus:border-yellow-500 focus:outline-none text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Bookings List */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            Loading bookings...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-black/50 text-gray-400 text-xs uppercase font-bold tracking-wider">
                <tr>
                  <th className="p-6">Client Details</th>
                  <th className="p-6">Event Date</th>
                  <th className="p-6">Package</th>
                  <th className="p-6">Payment</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="p-6">
                      <div className="font-bold text-lg text-white">
                        {booking.customer_name}
                      </div>
                      <div className="text-sm text-gray-500 flex gap-4 mt-1">
                        <a
                          href={`tel:${booking.customer_phone}`}
                          className="flex items-center gap-1 hover:text-white"
                        >
                          <Phone size={14} /> {booking.customer_phone}
                        </a>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar size={18} className="text-yellow-500" />
                        {new Date(booking.event_date).toLocaleDateString(
                          "en-IN",
                          { dateStyle: "medium" },
                        )}
                      </div>
                      {/* Logic to show "Upcoming" or "Passed" */}
                      {new Date(booking.event_date) < new Date() ? (
                        <span className="text-xs text-gray-600 mt-1 block">
                          Event Passed
                        </span>
                      ) : (
                        <span className="text-xs text-green-500 mt-1 block">
                          Upcoming
                        </span>
                      )}
                    </td>
                    <td className="p-6">
                      <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm font-medium border border-gray-700">
                        {booking.package_name}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="font-bold text-white">
                        ₹{booking.advance_amount?.toLocaleString()}
                      </div>
                      <span className="text-xs text-green-500 flex items-center gap-1">
                        <CheckCircle size={12} /> Advance Paid
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-2">
                        {/* WhatsApp Button */}
                        <a
                          href={`https://wa.me/91${booking.customer_phone.replace(/\D/g, "")}?text=Hi ${booking.customer_name}, confirming your booking for ${booking.event_date}.`}
                          target="_blank"
                          rel="noreferrer"
                          className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-500 transition-colors"
                          title="Message on WhatsApp"
                        >
                          <MessageCircle size={18} />
                        </a>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(booking.id)}
                          className="bg-red-500/10 text-red-500 p-2 rounded-lg hover:bg-red-500 hover:text-white transition-colors border border-red-500/20"
                          title="Delete Booking"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredBookings.length === 0 && (
              <div className="p-12 text-center">
                <div className="bg-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
                  <Clock size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-300">
                  No bookings found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or share your booking link!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
