// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Sidebar from "@/components/layout/Sidebar"; 
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "My Dashboard",
  description: "Dashboard created with Next.js",
};

export default function RootLayout({ children }) {
  return (
    // ضفت كلمة light هنا في الكلاسات
    <html
      lang="en"
      className={`light ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full flex bg-gray-50 text-gray-900 overflow-hidden">
        
        <Sidebar />

        <div className="flex-1 flex flex-col min-w-0">
          
          <Navbar />

          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>

        </div>
      </body>
    </html>
  );
}