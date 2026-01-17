"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, ChevronLeft, Filter } from "lucide-react";
import Link from "next/link";

// Mock Data (Later this will come from Supabase)
const galleryItems = [
  {
    id: 1,
    src: "1519741497674-611481863552",
    category: "Wedding",
    size: "tall",
  },
  {
    id: 2,
    src: "1511285560982-1351cdeb9821",
    category: "Pre-Wedding",
    size: "wide",
  },
  {
    id: 3,
    src: "1532712938310-341d957b4473",
    category: "Portraits",
    size: "tall",
  },
  {
    id: 4,
    src: "1529636798413-087529f79c24",
    category: "Events",
    size: "wide",
  },
  {
    id: 5,
    src: "1515934751635-c81c6bc9a2d8",
    category: "Wedding",
    size: "tall",
  },
  {
    id: 6,
    src: "1469334031218-e382a71b716b",
    category: "Fashion",
    size: "tall",
  },
  {
    id: 7,
    src: "1606800038501-b485114749a2",
    category: "Cinematic",
    size: "wide",
  },
  {
    id: 8,
    src: "1516035069371-29a1b244cc32",
    category: "Pre-Wedding",
    size: "wide",
  },
  {
    id: 9,
    src: "1500917293891-ef795e70e1f6",
    category: "Events",
    size: "tall",
  },
];

const categories = [
  "All",
  "Wedding",
  "Pre-Wedding",
  "Portraits",
  "Events",
  "Cinematic",
];

export default function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Filter Logic
  const filteredItems =
    filter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-500 selection:text-black">
      {/* Navbar */}
      <nav className="p-6 flex items-center justify-between border-b border-gray-900 sticky top-0 bg-black/90 backdrop-blur-md z-40">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft size={20} /> Back Home
        </Link>
        <div className="text-xl font-bold uppercase tracking-tight">
          Portfolio <span className="text-yellow-500">Gallery</span>
        </div>
        <div className="w-20"></div> {/* Spacer for center alignment */}
      </nav>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all border ${
                filter === cat
                  ? "bg-yellow-500 text-black border-yellow-500 scale-105"
                  : "bg-transparent text-gray-500 border-gray-800 hover:border-gray-600 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <motion.div
          layout
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5 }}
                className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-xl bg-gray-900"
                onClick={() => setSelectedImage(item.src)}
              >
                <img
                  src={`https://images.unsplash.com/photo-${item.src}?w=800&q=80`}
                  alt={item.category}
                  className="w-full h-auto object-cover opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-yellow-500 text-black p-3 rounded-full">
                    <ZoomIn size={24} />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                  <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Overlay (Full Screen View) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
              <X size={40} />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={`https://images.unsplash.com/photo-${selectedImage}?w=1600&q=90`}
              className="max-w-full max-h-[90vh] rounded-lg shadow-2xl border border-gray-800"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
