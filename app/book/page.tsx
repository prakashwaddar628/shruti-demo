"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase"; // Import Supabase
import { motion } from "framer-motion";
import {
  Check,
  Calendar,
  CreditCard,
  ChevronLeft,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const packages = [
  {
    id: "silver",
    name: "Silver Package",
    price: 25000,
    advance: 5000,
    features: [
      "4 Hours Coverage",
      "1 Photographer",
      "100 Edited Photos",
      "Digital Album",
    ],
  },
  {
    id: "gold",
    name: "Gold Wedding",
    price: 45000,
    advance: 10000,
    features: [
      "8 Hours Coverage",
      "Candid + Traditional",
      "300 Edited Photos",
      "Cinematic Teaser",
      "Hardcover Album",
    ],
    popular: true,
  },
  {
    id: "platinum",
    name: "Royal Cinematic",
    price: 85000,
    advance: 20000,
    features: [
      "Full Day Coverage",
      "Drone Shots",
      "Cinematic Wedding Film",
      "Pre-Wedding Shoot Free",
      "Luxury Album Box",
    ],
  },
];

export default function BookingPage() {
  const [selectedPkg, setSelectedPkg] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", date: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const currentPkg = packages.find((p) => p.id === selectedPkg);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPkg) return;

    setLoading(true);

    // 1. In a real app, Razorpay opens here.
    // 2. For this demo, we assume payment succeeded and save to DB.

    try {
      const { data, error } = await supabase.from("bookings").insert([
        {
          customer_name: formData.name,
          customer_phone: formData.phone,
          event_date: formData.date,
          package_name: currentPkg.name,
          advance_amount: currentPkg.advance,
          status: "Paid", // In real life, this happens after Razorpay success
        },
      ]).select().single();

      if (error) throw error;

      if (data) {
        router.push(`/invoice/${data.id}`);
      }

      alert("Booking Successful! Redirecting to Invoice...");
    } catch (error) {
      alert("Error saving booking. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-500 selection:text-black">
      {/* Header */}
      <nav className="p-6 flex items-center gap-4 border-b border-gray-900 sticky top-0 bg-black/90 backdrop-blur-md z-50">
        <Link
          href="/"
          className="p-2 hover:bg-gray-800 rounded-full transition-colors"
        >
          <ChevronLeft />
        </Link>
        <div className="text-xl font-bold uppercase tracking-tight">
          Secure <span className="text-yellow-500">Booking</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-12">
        {/* LEFT SIDE: Package Selection */}
        <div className="lg:w-2/3">
          <h1 className="text-3xl font-bold mb-2">Select Your Package</h1>
          <p className="text-gray-400 mb-8">
            Choose the perfect coverage for your special day.
          </p>

          <div className="grid gap-6">
            {packages.map((pkg) => (
              <motion.div
                key={pkg.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedPkg(pkg.id)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all relative ${
                  selectedPkg === pkg.id
                    ? "border-yellow-500 bg-yellow-500/10"
                    : "border-gray-800 bg-gray-900/50 hover:border-gray-600"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg uppercase">
                    Most Popular
                  </div>
                )}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{pkg.name}</h3>
                    <div className="text-yellow-500 font-bold text-2xl mt-1">
                      ₹{pkg.price.toLocaleString()}
                    </div>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPkg === pkg.id ? "border-yellow-500 bg-yellow-500" : "border-gray-600"}`}
                  >
                    {selectedPkg === pkg.id && (
                      <Check size={14} className="text-black" />
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                  {pkg.features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-sm text-gray-400"
                    >
                      <Check size={14} className="text-gray-600" /> {feat}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE: Booking Form (Sticky) */}
        <div className="lg:w-1/3">
          <div className="sticky top-28 bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-2xl">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="text-yellow-500" size={20} /> Event Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                  Event Date
                </label>
                <input
                  type="date"
                  required
                  className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-500 focus:outline-none"
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Aditya & Priya"
                  required
                  className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-500 focus:outline-none"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 99999 99999"
                  required
                  className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-500 focus:outline-none"
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div className="border-t border-gray-800 my-6 pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Package Cost</span>
                  <span>
                    ₹{currentPkg ? currentPkg.price.toLocaleString() : "0"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold text-yellow-500">
                  <span>Advance Amount</span>
                  <span>
                    ₹{currentPkg ? currentPkg.advance.toLocaleString() : "0"}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  *Remaining balance due on event day.
                </p>
              </div>

              <button
                type="submit"
                disabled={!selectedPkg || loading}
                className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                  selectedPkg
                    ? "bg-yellow-500 text-black hover:bg-yellow-400"
                    : "bg-gray-800 text-gray-500 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <CreditCard size={20} />
                )}
                {loading
                  ? "Processing..."
                  : selectedPkg
                    ? `Pay ₹${currentPkg?.advance.toLocaleString()} Advance`
                    : "Select a Package"}
              </button>

              <div className="text-center mt-4">
                <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                  Secure Payment via Razorpay
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
