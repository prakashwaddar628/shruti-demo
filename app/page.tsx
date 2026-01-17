"use client";

import Link from "next/link";
import { Star, ArrowRight, CalendarCheck } from "lucide-react";
import { motion, Variants } from "framer-motion";

// Animation Variants
const fadeInUp: Variants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

// Marquee Images (A mix of wedding/event shots)
const marqueeImages = [
  "1519741497674-611481863552",
  "1511285560982-1351cdeb9821",
  "1532712938310-341d957b4473",
  "1529636798413-087529f79c24",
  "1515934751635-c81c6bc9a2d8",
  "1469334031218-e382a71b716b",
  "1606800038501-b485114749a2",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      {/* Navbar - Transparent & Sticky */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="p-6 flex justify-between items-center max-w-7xl mx-auto fixed top-0 left-0 right-0 z-50 mix-blend-difference"
      >
        <div className="text-2xl font-bold tracking-tighter uppercase">
          Shruti<span className="text-yellow-500">Fotography</span>
        </div>
        <Link
          href="/book"
          className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-yellow-500 transition-all flex items-center gap-2"
        >
          <CalendarCheck size={16} /> Book Dates
        </Link>
      </motion.nav>

      {/* Hero Section - Cinematic & Full Height */}
      <section className="relative h-screen flex items-center justify-start px-4 md:px-20 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
          <img
            src="https://images.unsplash.com/photo-1583957461034-98d7c2783909?q=80&w=2070&auto=format&fit=crop" // A dramatic, high-quality hero shot
            alt="Hero Background"
            className="w-full h-full object-cover scale-105 animate-[pulse_10s_ease-in-out_infinite_alternate]" // Subtle movement
          />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative z-20 max-w-3xl"
        >
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-2 text-yellow-500 font-bold uppercase tracking-widest mb-4"
          >
            <div className="h-[2px] w-10 bg-yellow-500"></div> Premium Wedding
            Studio
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-6xl md:text-8xl font-extrabold mb-8 leading-tight"
          >
            We Don&apos;t Just Take Photos. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500">
              We Stop Time.
            </span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-gray-300 text-xl max-w-xl mb-12 leading-relaxed"
          >
            Karwar&apos;s most sought-after photography team. Cinematic
            weddings, emotive portraits, and timeless storytelling.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex gap-5">
            <Link
              href="/gallery"
              className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-500 transition-all flex items-center gap-2 group"
            >
              View Portfolio{" "}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/book"
              className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all"
            >
              Check Availability
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2, duration: 1.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400 text-sm tracking-widest uppercase"
        >
          Scroll for Momentum
        </motion.div>
      </section>

      {/* THE MOMENTUM STRIP (Infinite Marquee) */}
      <section className="bg-yellow-500 py-4 overflow-hidden relative z-20 rotate-[-2deg] scale-110 my-20">
        <div className="flex animate-scroll w-[200%]">
          {/* We duplicate the list twice to create a seamless loop */}
          {[...marqueeImages, ...marqueeImages].map((id, i) => (
            <div
              key={i}
              className="w-[250px] h-[150px] mx-2 flex-shrink-0 overflow-hidden rounded-lg grayscale hover:grayscale-0 transition-all"
            >
              <img
                src={`https://images.unsplash.com/photo-${id}?w=400&q=80`}
                alt="momentum"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 3D Portfolio Grid (Kept from previous version as they liked it) */}
      <section className="max-w-7xl mx-auto px-4 py-32 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <h2 className="text-gray-500 uppercase tracking-widest font-bold mb-4">
              Selected Works
            </h2>
            <div className="text-4xl md:text-6xl font-extrabold">
              Our Latest <span className="text-yellow-500">Stories</span>
            </div>
          </div>
          <Link
            href="/gallery"
            className="text-xl border-b border-yellow-500 pb-2 hover:text-yellow-500 transition-colors flex items-center gap-2"
          >
            See All Projects <ArrowRight size={20} />
          </Link>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          style={{ perspective: "2000px" }}
        >
          {[
            {
              id: "1519741497674-611481863552",
              title: "Aditya & Priya",
              cat: "Royal Wedding",
            },
            {
              id: "1511285560982-1351cdeb9821",
              title: "Rahul & Sneha",
              cat: "Pre-Wedding",
            },
            {
              id: "1532712938310-341d957b4473",
              title: "The Kapoor Family",
              cat: "Portraits",
            },
            {
              id: "1515934751635-c81c6bc9a2d8",
              title: "Vikram Singh",
              cat: "Groom Series",
            },
            {
              id: "1606800038501-b485114749a2",
              title: "Destination Goa",
              cat: "Cinematic",
            },
            {
              id: "1529636798413-087529f79c24",
              title: "Haldi Vibrant",
              cat: "Ceremony",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
              className="aspect-[3/4] relative group cursor-pointer rounded-xl"
              whileHover={{
                rotateX: 5,
                rotateY: 5,
                scale: 1.02,
                z: 50,
                transition: { duration: 0.4, ease: "easeOut" },
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="w-full h-full rounded-xl overflow-hidden relative shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] bg-gray-900">
                <img
                  src={`https://images.unsplash.com/photo-${item.id}?w=600&q=80`}
                  alt={item.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300 flex items-end p-8">
                  <div>
                    <span className="text-yellow-500 font-bold tracking-widest text-sm uppercase mb-2 block">
                      {item.cat}
                    </span>
                    <h3 className="text-3xl font-bold text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Booking CTA Section - The Goal */}
      <section className="py-40 bg-yellow-500 text-black text-center relative overflow-hidden">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto px-4"
        >
          <h2 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
            Ready to create your masterpiece?
          </h2>
          <p className="text-xl mb-12 font-medium">
            Our calendar fills up fast. Check availability and secure your date
            online.
          </p>
          <Link
            href="/book"
            className="bg-black text-white text-xl px-12 py-5 rounded-full font-bold hover:scale-105 transition-transform inline-block"
          >
            Book Your Date Now
          </Link>
        </motion.div>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-gray-600 text-sm bg-black border-t border-gray-900">
        <p>© 2026 Shruti Fotography. Karwar, Karnataka.</p>
        <p className="mt-3 opacity-60">
          Powered by{" "}
          <span className="text-yellow-500">Laxpra Labs Premium</span>
        </p>
      </footer>
    </div>
  );
}
