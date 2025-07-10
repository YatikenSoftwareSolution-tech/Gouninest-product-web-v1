import "./globals.css";
import { GlobalProvider } from "@/context/GlobalContext";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingHelpButton from "@/components/FloatingHelpButton";
import FloatingChatBot from "@/components/FloatingChatBot";

export const metadata: Metadata = {
  title: "Go UniNest | Verified Student Accommodation in Australia",
  description: "Discover affordable, verified student accommodation near top universities in the UK, Australia, and the US. Book stress-free with flexible leases, instant quotes, and global support.",
  keywords: ["student accommodation near university", "verified student housing", "book student flats UK Australia US", "global student rentals"],
  authors: [{
      name: "Ram Chandel",
      url: "https://ramchandel.netlify.app/"
    }],
  icons: {
    icon: "/Logo.png"
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <GlobalProvider>
          <Navbar />
          {children}
          <FloatingHelpButton />
          <FloatingChatBot />
          <Footer />
        </GlobalProvider>
      </body>
    </html>
  );
}
