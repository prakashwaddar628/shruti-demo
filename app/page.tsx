"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { motion } from "framer-motion"; // 1. Import Motion

// Animation variants for staggering elements
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }, // Delay between each child animation
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Home() {
  return (
    // Ensure overflow-x-hidden to prevent scrollbars during 3D transforms
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* Navbar - Slides down from top */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="p-6 flex justify-between items-center max-w-6xl mx-auto border-b border-gray-900 sticky top-0 bg-black/90 backdrop-blur-md z-50"
      >
        <div className="text-2xl font-bold tracking-tighter uppercase">
          Shruti<span className="text-yellow-500">Fotography</span>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="https://wa.me/919999999999"
            className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Book a Shoot
          </Link>
        </motion.div>
      </motion.nav>

      {/* Hero Section - Staggered Fade Up */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center py-32 px-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-8xl font-extrabold mb-6 tracking-tight leading-none"
        >
          Capturing{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-white">
            Moments.
          </span>{" "}
          <br />
          Creating{" "}
          <span className="text-yellow-500 drop-shadow-[0_0_25px_rgba(234,179,8,0.4)]">
            Memories.
          </span>
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-gray-400 max-w-lg mx-auto mb-12 text-xl leading-relaxed"
        >
          Premium Wedding & Event Photography in Karwar. We turn your special
          days into timeless art.
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="flex gap-5 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#fbbf24" }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-500 text-black px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-yellow-500/20 transition-all"
          >
            View Gallery
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, borderColor: "#fff" }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-gray-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-900 transition-all"
          >
            Contact Us
          </motion.button>
        </motion.div>
      </motion.section>

      {/* 3D Portfolio Grid */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl font-bold">Featured Shoots</h2>
        </div>

        {/* Add 'perspective' to the container to enable 3D space */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          style={{ perspective: "2000px" }}
        >
          {[
            { id: "1519741497674-611481863552", title: "Royal Wedding" },
            { id: "1511285560982-1351cdeb9821", title: "Pre-Wedding" },
            { id: "1532712938310-341d957b4473", title: "Candid Portrait" },
            { id: "1529636798413-087529f79c24", title: "Haldi Ceremony" },
            { id: "1515934751635-c81c6bc9a2d8", title: "Groom Series" },
            { id: "1469334031218-e382a71b716b", title: "Cinematic" },
          ].map((item, i) => (
            // The 3D Card Container
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }} // Animate when scrolled into view
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1 }} // Stagger the loading
              className="relative group cursor-pointer rounded-2xl"
              // THE 3D HOVER EFFECT: Rotate on X and Y axes and lift up (Z)
              whileHover={{
                rotateX: 5,
                rotateY: 5,
                scale: 1.02,
                z: 50,
                transition: { duration: 0.4, ease: "easeOut" },
              }}
              style={{ transformStyle: "preserve-3d" }} // Crucial for 3D rendering
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden relative shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_30px_60px_-15px_rgba(234,179,8,0.3)] transition-shadow duration-500 bg-gray-900">
                <img
                  src={`https://images.unsplash.com/photo-${item.id}?w=600&q=80`}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                />
                {/* Gradient Overlay & Text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {item.title}
                    </h3>
                    <span className="text-yellow-500 font-bold tracking-widest text-sm uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                      View Album →
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section - Slide up on scroll */}
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-[#0a0a0a] py-24 mt-10 border-t border-gray-900 relative overflow-hidden"
      >
        {/* Background decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-yellow-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center gap-1 text-yellow-500 mb-6">
            <Star className="fill-current w-6 h-6 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
            <Star className="fill-current w-6 h-6 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
            <Star className="fill-current w-6 h-6 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
            <Star className="fill-current w-6 h-6 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
            <Star className="fill-current w-6 h-6 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
          </div>
          <h2 className="text-4xl font-bold mb-12 text-white">
            Client Stories
          </h2>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            {/* Testimonial Card 1 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm relative shadow-xl"
            >
              <div className="absolute -top-4 -left-4 text-7xl text-yellow-500/20 leading-none serif">
                "
              </div>
              <p className="text-gray-300 mb-8 relative z-10 text-lg italic">
                Best photographer in Karwar! The team was so professional and
                the candid shots came out amazing.
              </p>
              <div className="font-bold text-white flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-full flex items-center justify-center text-lg shadow-lg">
                  R
                </div>
                <div>
                  Rajesh & Sneha{" "}
                  <span className="block text-sm text-gray-500 font-normal">
                    Wedding Shoot
                  </span>
                </div>
              </div>
            </motion.div>
            {/* Testimonial Card 2 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm relative shadow-xl"
            >
              <div className="absolute -top-4 -left-4 text-7xl text-yellow-500/20 leading-none serif">
                "
              </div>
              <p className="text-gray-300 mb-8 relative z-10 text-lg italic">
                Shruti Fotography captured every moment perfectly. The album
                quality is top notch.
              </p>
              <div className="font-bold text-white flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-lg shadow-lg">
                  A
                </div>
                <div>
                  Amit Naik{" "}
                  <span className="block text-sm text-gray-500 font-normal">
                    Event Shoot
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mt-16 flex flex-col items-center gap-3 cursor-pointer inline-block"
          >
            <button className="text-yellow-400 border-2 border-yellow-500/50 px-8 py-3 rounded-full text-sm font-bold hover:bg-yellow-500/20 transition-all shadow-[0_0_20px_rgba(234,179,8,0.15)]">
              Write a Review
            </button>
            <p className="text-gray-500 text-xs tracking-widest uppercase">
              Powered by Laxpra Reviews
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-gray-900/50 py-12 text-center text-gray-500 text-sm bg-black">
        <p>© 2026 Shruti Fotography. Karwar, Karnataka.</p>
        <p className="mt-3 opacity-60 hover:opacity-100 transition-opacity">
          Crafted by <span className="text-yellow-500">Laxpra Labs</span>
        </p>
      </footer>
    </div>
  );
}
