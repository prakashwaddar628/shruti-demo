import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- THIS IS THE PART THAT CHANGES THE TAB NAME ---
export const metadata: Metadata = {
  title: "Shruti Fotography | Premium Wedding Photography Karwar",
  description: "Capturing moments, creating memories. The best wedding and event photography studio in Karwar.",
  icons: {
    icon: '/favicon.ico', // This looks for a favicon in your 'public' folder
  },
};
// --------------------------------------------------

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}