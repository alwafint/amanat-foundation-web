import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";

const bengali = Noto_Sans_Bengali({ 
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bengali",
});

export const metadata: Metadata = {
  title: "আমানত ফাউন্ডেশন | দেশগড়ার প্রত্যয়ে অবিচল",
  description: "সমগ্র বাংলাদেশের মানুষের সেবায় নিয়োজিত একটি অলাভজনক সেবামূলক প্রতিষ্ঠান।",
  icons: {
    icon: '/img/fa.jpg', // <-- Favicon এখানে সেট করা হয়েছে
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={`${bengali.className} bg-slate-50 text-slate-900 antialiased`}>
        {children}
      </body>
    </html>
  );
}