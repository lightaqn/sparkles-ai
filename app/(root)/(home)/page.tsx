"use client";
import React, { useState } from "react";
import CTA from "@/components/CTA";
import Togglebar from "@/components/Togglebar";

import Banner from "@/components/Banner";
import VirtualWorld from "@/components/VirtualWorld";
import Slider from "@/components/Slider";

import { useTheme } from "next-themes";

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className="h-screen w-screen dark:bg-black">
      <div className="flex flex-col max-w-8xl mx-auto p-6 relative">
        <Banner />
      </div>
      {theme === "light" && <Slider />}

      {theme === "dark" ? <CTA /> : <VirtualWorld />}
    </div>
  );
}
