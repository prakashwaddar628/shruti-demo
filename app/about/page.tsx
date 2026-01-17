"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Star,
  Send,
  User,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState({
    name: "",
    comment: "",
    rating: 5,
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch Reviews
  useEffect(() => {
    async function getReviews() {
      const { data } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      if (data) setReviews(data);
    }
    getReviews();
  }, []);

  // Submit Review
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await supabase.from("reviews").insert([
      {
        customer_name: newReview.name,
        comment: newReview.comment,
        rating: newReview.rating,
        approved: true, // Auto-approve for demo
      },
    ]);
    setSubmitting(false);
    setNewReview({ name: "", comment: "", rating: 5 });
    alert("Thank you for your feedback!");
    window.location.reload(); // Simple reload to show new review
  };

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
          About <span className="text-yellow-500">Us</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-16">
        {/* LEFT COLUMN: Info & Map */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold mb-6">The Studio.</h1>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed">
            Located in the heart of Karwar, Shruti Fotography has been capturing
            the coastal city&apos;s most beautiful moments for over 5 years. We
            specialize in blending natural light with cinematic storytelling.
          </p>

          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4 text-xl">
              <div className="bg-yellow-500/10 p-3 rounded-full text-yellow-500">
                <MapPin />
              </div>
              <span>Main Road, Near Beach, Karwar, 581301</span>
            </div>
            <div className="flex items-center gap-4 text-xl">
              <div className="bg-yellow-500/10 p-3 rounded-full text-yellow-500">
                <Phone />
              </div>
              <span>+91 99999 99999</span>
            </div>
            <div className="flex items-center gap-4 text-xl">
              <div className="bg-yellow-500/10 p-3 rounded-full text-yellow-500">
                <Mail />
              </div>
              <span>hello@shrutifoto.com</span>
            </div>
          </div>

          {/* Embed Google Map (Karwar Coordinates) */}
          <div className="rounded-2xl overflow-hidden border border-gray-800 h-64 grayscale hover:grayscale-0 transition-all">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3848.675003667554!2d74.1286!3d14.8153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbe866bd1768821%3A0x6b449b910e4a7c0!2sKarwar%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Reviews & Feedback */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Review Form */}
          <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Star className="text-yellow-500 fill-yellow-500" /> Leave a
              Review
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-500 focus:outline-none"
                value={newReview.name}
                onChange={(e) =>
                  setNewReview({ ...newReview, name: e.target.value })
                }
              />
              <textarea
                placeholder="Share your experience..."
                required
                rows={3}
                className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-500 focus:outline-none"
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
              />
              <div className="flex items-center gap-4">
                <label className="text-gray-400 text-sm">Rating:</label>
                <select
                  className="bg-black border border-gray-700 rounded-lg p-2 text-white"
                  value={newReview.rating}
                  onChange={(e) =>
                    setNewReview({
                      ...newReview,
                      rating: Number(e.target.value),
                    })
                  }
                >
                  <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                  <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                  <option value="3">⭐⭐⭐ (3 Stars)</option>
                </select>
              </div>
              <button
                disabled={submitting}
                className="w-full bg-yellow-500 text-black py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2"
              >
                {submitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send size={18} /> Post Review
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Recent Reviews List */}
          <div>
            <h3 className="text-xl font-bold mb-6">Recent Client Love</h3>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-gray-900/50 p-6 rounded-xl border border-gray-800/50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-bold flex items-center gap-2">
                      <div className="bg-gray-800 p-1 rounded-full">
                        <User size={14} />
                      </div>
                      {review.customer_name}
                    </div>
                    <div className="text-yellow-500 text-xs flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={12} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm italic">
                    &quot;{review.comment}&quot;
                  </p>
                </div>
              ))}
              {reviews.length === 0 && (
                <p className="text-gray-500">No reviews yet. Be the first!</p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
