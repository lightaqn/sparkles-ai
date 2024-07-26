"use client";
import "../globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Togglebar from "@/components/Togglebar";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar handleShowMenu={handleShowMenu} />
        {showMenu ? <Togglebar onMenu={() => handleShowMenu()} /> : <></>}
        <div className="">{children}</div>

        <Footer />
      </ThemeProvider>
    </>
  );
}
