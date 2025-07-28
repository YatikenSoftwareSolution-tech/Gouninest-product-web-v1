import "./globals.css";
import { GlobalProvider } from "@/context/GlobalContext";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingHelpButton from "@/components/FloatingHelpButton";
import FloatingChatBot from "@/components/FloatingChatBot";

export const metadata: Metadata = {
  title: "Go UniNest | Find Your Perfect Student Home",
  description: "Discover affordable, verified student accommodation near top universities in the UK, Australia, and the US. Book stress-free with flexible leases, instant quotes, and global support.",
  keywords: [
    "student accommodation near university",
    "verified student housing",
    "book student flats UK Australia US",
    "global student rentals"
  ],
  authors: [{
    name: "Ram Chandel",
    url: "https://ramchandel.netlify.app/"
  }],
  icons: {
    icon: "/Logo.png"
  },
  openGraph: {
    title: "Go UniNest | Find Your Perfect Student Home",
    description: "Discover affordable, verified student accommodation near top universities in the UK, Australia, and the US. Book stress-free with flexible leases, instant quotes, and global support.",
    url: "https://gouninest.com", // Update to your actual domain
    siteName: "Go UniNest",
    images: [
      {
        url: "/Logo.png", // Place your OG image in the public folder
        width: 1200,
        height: 630,
        alt: "Go UniNest - Student Accommodation"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Go UniNest | Find Your Perfect Student Home",
    description: "Discover affordable, verified student accommodation near top universities in the UK, Australia, and the US.",
    images: ["/Logo.png"], 
    creator: "@ram_chande79083" 
  }
};
// ...existing code...

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
