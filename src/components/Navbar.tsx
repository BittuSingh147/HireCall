import React from 'react';
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import { Cpu } from "lucide-react"; // Changed from CodeIcon to Cpu for a more modern look
import { SignedIn, UserButton } from "@clerk/nextjs";
import DasboardBtn from "./DasboardBtn";

function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-16 items-center px-4 container mx-auto">
        {/* LEFT SIDE - LOGO */}
        <Link
          href="/"
          className="group flex items-center gap-3 font-semibold text-2xl mr-6 relative overflow-hidden"
        >
          <div className="relative">
            <Cpu className="size-8 text-purple-600 transition-all duration-300 group-hover:-rotate-12 group-hover:scale-110" />
            <div className="absolute inset-0 bg-purple-400/20 blur-xl group-hover:bg-purple-400/30 transition-all duration-300 animate-pulse" />
          </div>
          <span className="font-bold bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-600 bg-[length:200%] animate-gradient bg-clip-text text-transparent tracking-tight">
            HireCall
          </span>
        </Link>

        {/* RIGHT SIDE - ACTIONS */}
        <SignedIn>
          <div className="flex items-center space-x-6 ml-auto">
            <div className="relative group">
              <DasboardBtn />
              <div className="absolute inset-x-0 h-0.5 bottom-0 bg-gradient-to-r from-purple-600 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out" />
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full blur opacity-0 group-hover:opacity-20 transition duration-300" />
              <div className="relative hover:scale-105 transition-transform duration-200">
                <ModeToggle />
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full blur opacity-0 group-hover:opacity-20 transition duration-300" />
              <div className="relative hover:scale-105 transition-transform duration-200">
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "ring-2 ring-purple-500/20 hover:ring-purple-500/40 transition-all duration-300"
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </SignedIn>
      </div>
    </nav>
  );
}

export default Navbar;