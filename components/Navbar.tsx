"use client"
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <input id="menu-toggle" type="checkbox" className="hidden peer" />

        <div className="flex justify-between items-center h-16">
          <Link href="/" onClick={handleLinkClick} className="flex-shrink-0">
            <Image src={'/Logo.png'} alt="Go Uninest" height={60} width={60}/>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/about"
              className="  text-bold text-white hover:text-red-500 transition-colors duration-300"
            >
              About
            </Link>
            <Link
              href="/properties"
              className="text-bold text-white hover:text-red-500 transition-colors duration-300"
            >
              Properties
            </Link>
            <Link
              href="/reviews"
              className="text-bold text-white hover:text-red-500 transition-colors duration-300"
            >
              Reviews
            </Link>
            <Link
              href="/blogs"
              className="text-bold text-white hover:text-red-500 transition-colors duration-300"
            >
              Blogs
            </Link>
            <Link
              href="/contacts"
              className="text-bold text-white hover:text-red-500 transition-colors duration-300"
            >
              Contact
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">

            <Link href="/login">
              <Button className="bg-gradient-to-r from-[var(--color-electric-500)] to-lime-500 hover:from-electric-600 hover:to-amber-600 text-white text-sm rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-electric-500/30">
                Login / Signup
              </Button>
            </Link>
          </div>

          {/* Mobile toggle button */}
          <label
            htmlFor="menu-toggle"
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden cursor-pointer text-white hover:text-electric-300 transition"
          >
            <Menu size={24} className="peer-checked:hidden" />
            <X size={24} className="hidden peer-checked:inline" />
          </label>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <div className="mt-2 bg-black/80 rounded-lg px-3 py-4 space-y-2">
            <Link
              href="/about"
              onClick={handleLinkClick}
              className="block text-white hover:text-red-500 transition"
            >
              About
            </Link>
            <Link
              href="/properties"
              onClick={handleLinkClick}
              className="block text-white hover:text-red-500 transition"
            >
              Properties
            </Link>
            <Link
              href="/reviews"
              onClick={handleLinkClick}
              className="block text-white hover:text-red-500 transition"
            >
              Reviews
            </Link>
            <Link
              href="/blogs"
              onClick={handleLinkClick}
              className="block text-white hover:text-red-500 transition"
            >
              Blogs
            </Link>
            <Link
              href="/contacts"
              onClick={handleLinkClick}
              className="block text-white hover:text-red-500 transition"
            >
              Contact
            </Link>
            <Link href="/login">
              <Button className="w-full mt-3 rounded-full bg-[var(--color-electric-500)] hover:bg-[var(--color-electric-600)] text-white py-2 transition">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
