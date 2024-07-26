import React from "react";
import Image from "next/image";

import { Close, CheckMark, Menu, DarkMode, LightMode } from "@/lib/assets/svg";
import { menuItems } from "@/lib/constants";
import { useTheme } from "next-themes";

type Props = {};

const Togglebar = ({ onMenu }: any) => {
  const { theme, setTheme } = useTheme();
  return (
    <div
      className="absolute top-0 z-40 left-0 right-0 flex flex-col w-full h-auto items-center justify-center p-4 backdrop-blur-lg 
        dark:bg-black dark:text-white"
    >
      <div className="mt-0 mb-4 flex items-center justify-between">
        <div className="flex items-center justify-beween">
          <Image
            className="bg-transparent"
            src={theme === "dark" ? "/DarkLogo" : "/LightLogo"}
            alt=""
            layout="responsive"
            height={150}
            width={325}
            objectFit="contain"
          />
        </div>

        <div
          onClick={onMenu}
          className={`bg-gradient-to-r focus:ring-4 focus:ring-purple-500  from-purple-700 via-purple-500 font-semibold to-pink-400 flex text-center items-center justify-center p-2 text-sm lg:text-md 2xl:text-lg text-black hover:text-lime-500 active:text-orange-500 active:transform active:transition active:duration-300 active:ease-out active:scale-105 ${
            dark && "text-white"
          } `}
        >
          <Close />
        </div>
      </div>

      <ol className="flex flex-col items-center p-2 justify-start gap-y-3">
        {menuItems.map(({ id, text }) => (
          <li
            key={id}
            className="font-semibold my-4 text-center hover:text-lime-500 hover:cursor-pointer hover:transform hover:transition hover:duration-300 hover:ease-out hover:scale-105 active:ease-in active:text-orange-500 text-2xl text-black border-b-2 border-gray-300 
              dark:text-white"
          >
            {text}
          </li>
        ))}
      </ol>

      <div className="flex items-center hover:border-2 border-gray-300 rounded-2xl py-4 hover:shadow-lg justify-around gap-x-2 w-full">
        <button
          className="font-semibold text-2xl px-8 py-4 text-black hover:shadow-lg shadow-md hover:transform hover:transition hover:duration-300 hover:ease-in-out
            dark:text-white"
        >
          Login
        </button>

        <button className="outlinebutton h-24 w-1/4 my-24">
          <span
            className="outlinebuttonspan text-white bg-gray-200/30 backdrop-blur-lg h-18 text-2xl font-semibold text-center pt-6 w-full mx-6 my-3
             dark:bg-black dark:text-white"
          >
            Get Started
          </span>
        </button>

        <button
          type="submit"
          className="rounded-full item-center bg-lime-500 p-2 h-18 w-28 
            dark:bg-red-500"
        >
          <span className="text-black dark:text-white dark:ml-4">
            {theme === "light" ? (
              <span onClick={() => setTheme("dark")}>
                <DarkMode />{" "}
              </span>
            ) : (
              <span onClick={() => setTheme("light")}>
                <LightMode />
              </span>
            )}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Togglebar;
