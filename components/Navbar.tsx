import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { menuItems } from "@/lib/constants";
import { Menu, DarkMode, LightMode } from "@/lib/assets/svg";

type Props = {
  handleShowMenu: () => void;
};

const Navbar = ({ handleShowMenu }: Props) => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="sticky backdrop-blur-lg grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 w-full h-[10vh] bg-white dark:bg-black ">
      <div className="col-span-2 lg:col-span-1 flex items-center justify-start gap-x-4">
        <Image
          className="bg-transparent items-center justify-center"
          src={theme === "dark" ? "/DarkLogo.png" : "/LightLogo.png"}
          alt=""
          layout="responsive"
          height={150}
          width={150}
          objectFit="contain"
        />
      </div>
      <div className="hidden lg:block lg:col-span-3 my-10 rounded-2xl py-4 px-8 items-center justify-center"></div>
      <div className="col-span-1 md:col-span-2 lg:col-span-1">
        <div
          className="w-1/4 items-center ml-20 mt-20 justify-center place-end flex sm:block text-black text-right lg:hidden active:transform active:transition cursor-pointer active:duration-300 active:ease-out active:scale-105 text-lg 
                dark:text-white
              "
          onClick={handleShowMenu}
        >
          <Menu />
        </div>
        <div className="w-full hidden my-10 py-4 px-8 lg:block">
          <div className="flex items-center justify-around gap-x-2">
            <p className="mr-8 font-semibold text-2xl text-black dark:text-white">
              Login
            </p>

            <button className="outlinebutton p-2 flex-shrink-0">
              <span className="outlinebuttonspan dark:bg-black dark:text-white">
                Get Started
              </span>
            </button>

            <div className="rounded-full cursor-pointer object-contain item-center p-2 w-1/4 max-w-1/3 text-gray-500 dark:bg-black dark:text-white">
              {theme === "dark" ? (
                <span
                  onClick={() => setTheme("light")}
                  className="text-black  dark:text-white ml-4"
                >
                  <LightMode />
                </span>
              ) : (
                <span
                  onClick={() => setTheme("dark")}
                  className="text-black  dark:text-white ml-4"
                >
                  <DarkMode />
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

{
  /* <ul className="flex items-center px-2 justify-evenly w-full gap-x-2"> */
}
{
  /* {menuItems.map(({ id, text }) => (
  <li
    key={id}
    className="font-semibold w-1/5 text-center hover:text-lime-500 hover:cursor-pointer hover:transform hover:transition hover: duration-300 hover:ease-out hover:scale-105 active:ease-in active:text-orange-500 text-3xl text-black ${
          dark :text-white"
  >
    {text}
  </li>
))} */
}
// </ul>
