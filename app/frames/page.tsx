"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { ShoppingBag, ChevronLeft, Ruler, Check } from "lucide-react";
import Link from "next/link";

export default function FramesPage() {
  const [frames, setFrames] = useState<any[]>([]);

  useEffect(() => {
    async function fetchFrames() {
      const { data } = await supabase.from("frames").select("*");
      if (data) setFrames(data);
    }
    fetchFrames();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-500 selection:text-black">
      {/* Navbar */}
      <nav className="p-6 flex items-center gap-4 border-b border-gray-900 sticky top-0 bg-black/90 backdrop-blur-md z-50">
        <Link
          href="/"
          className="p-2 hover:bg-gray-800 rounded-full transition-colors"
        >
          <ChevronLeft />
        </Link>
        <div className="text-xl font-bold uppercase tracking-tight">
          Custom <span className="text-yellow-500">Framing</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Preserve Your <span className="text-yellow-500">Memories.</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg">
          Choose from our premium collection of handcrafted frames. Perfect for
          your wedding portraits and wall art.
        </p>
      </section>

      {/* Frames Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {frames.map((frame, i) => (
            <motion.div
              key={frame.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 group hover:border-yellow-500/50 transition-all"
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <img
                  src={frame.image_url}
                  alt={frame.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-yellow-500 font-bold px-3 py-1 rounded-full text-sm">
                  ₹{frame.price}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-1">{frame.name}</h3>
                <div className="flex items-center gap-2 text-gray-400 text-sm mb-6">
                  <Ruler size={14} /> {frame.size} • {frame.material}
                </div>

                <a
                  href={`https://wa.me/919999999999?text=Hi, I am interested in the ${frame.name} Frame (Size: ${frame.size}) for ₹${frame.price}.`}
                  target="_blank"
                  className="block w-full bg-white text-black text-center py-3 rounded-lg font-bold uppercase tracking-wider hover:bg-yellow-500 transition-colors"
                >
                  Order Frame
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
