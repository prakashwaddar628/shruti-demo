"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";
import { Printer, Download, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function InvoicePage() {
  const { id } = useParams();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInvoice() {
      if (!id) return;
      const { data } = await supabase
        .from("bookings")
        .select("*")
        .eq("id", id)
        .single();
      if (data) setBooking(data);
      setLoading(false);
    }
    fetchInvoice();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading)
    return (
      <div className="text-white text-center p-20">Generating Invoice...</div>
    );
  if (!booking)
    return (
      <div className="text-white text-center p-20">Invoice not found.</div>
    );

  return (
    <div className="min-h-screen bg-gray-900 py-10 px-4 print:bg-white print:p-0">
      {/* --- CSS TO REMOVE BROWSER HEADERS/FOOTERS --- */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 0; /* This removes the Date/URL/Title at top & bottom */
          }
          body {
            -webkit-print-color-adjust: exact; /* Ensures background colors print correctly */
            margin: 0;
            padding: 0;
          }
          /* We add our own margin to the content so it doesn't touch the edge */
          .print-content {
            margin: 20mm;
          }
        }
      `}</style>
      {/* ----------------------------------------------- */}

      {/* Navigation (Hidden when printing) */}
      <div className="max-w-3xl mx-auto mb-6 flex justify-between items-center print:hidden">
        <Link
          href="/"
          className="text-gray-400 hover:text-white flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Back to Home
        </Link>
        <button
          onClick={handlePrint}
          className="bg-yellow-500 text-black px-6 py-2 rounded-full font-bold flex items-center gap-2 hover:bg-yellow-400 transition-colors"
        >
          <Printer size={18} /> Print / Save PDF
        </button>
      </div>

      {/* THE INVOICE PAPER (A4 Style) */}
      {/* Added 'print-content' class for margins */}
      <div className="print-content max-w-3xl mx-auto bg-white text-black p-10 rounded-xl shadow-2xl print:shadow-none print:rounded-none">
        {/* Header */}
        <div className="flex justify-between items-start border-b-2 border-gray-100 pb-8 mb-8">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight uppercase">
              INVOICE
            </h1>
            <div className="text-green-600 font-bold flex items-center gap-1 mt-2">
              <CheckCircle size={16} /> Paid Successfully
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold uppercase tracking-tighter">
              Shruti<span className="text-yellow-600">Fotography</span>
            </div>
            <p className="text-gray-500 text-sm mt-1">
              Main Road, Karwar
              <br />
              Karnataka, India 581301
              <br />
              +91 99999 99999
            </p>
          </div>
        </div>

        {/* Client & Invoice Details */}
        <div className="flex justify-between mb-10">
          <div>
            <h3 className="text-gray-500 text-xs font-bold uppercase mb-1">
              Billed To:
            </h3>
            <div className="font-bold text-lg">{booking.customer_name}</div>
            <div className="text-gray-600">{booking.customer_phone}</div>
          </div>
          <div className="text-right">
            <h3 className="text-gray-500 text-xs font-bold uppercase mb-1">
              Invoice Details:
            </h3>
            <div className="text-gray-600">
              <span className="font-semibold">No:</span> #
              {booking.id.slice(0, 8)}
            </div>
            <div className="text-gray-600">
              <span className="font-semibold">Date:</span>{" "}
              {new Date(booking.created_at).toLocaleDateString()}
            </div>
            <div className="text-gray-600">
              <span className="font-semibold">Event:</span> {booking.event_date}
            </div>
          </div>
        </div>

        {/* Table */}
        <table className="w-full mb-8">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
            <tr>
              <th className="py-3 px-4 text-left">Description</th>
              <th className="py-3 px-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            <tr>
              <td className="py-4 px-4 font-semibold">
                {booking.package_name} Package (Booking Advance)
              </td>
              <td className="py-4 px-4 text-right">
                ₹{booking.advance_amount.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Totals */}
        <div className="flex justify-end mb-12">
          <div className="w-64">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-bold">
                ₹{booking.advance_amount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100 text-green-600">
              <span>Discount</span>
              <span>₹0</span>
            </div>
            <div className="flex justify-between py-4 text-xl font-extrabold border-b-2 border-gray-900">
              <span>Total Paid</span>
              <span>₹{booking.advance_amount.toLocaleString()}</span>
            </div>
            <div className="text-right text-xs text-gray-500 mt-2">
              *Balance amount due on event date.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 pt-8 text-center text-gray-500 text-sm">
          <p className="mb-2">
            Thank you for choosing Shruti Fotography. We are excited to capture
            your memories!
          </p>
          <p className="text-xs">This is a computer-generated invoice.</p>
        </div>
      </div>
    </div>
  );
}
